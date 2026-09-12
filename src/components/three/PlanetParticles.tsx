"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PLANET_RADIUS } from "@/lib/spherical-math";

/** Soft circular sprite texture for the dust motes */
function buildDotTexture(): THREE.CanvasTexture {
	const c = document.createElement("canvas");
	c.width = 32;
	c.height = 32;
	const ctx = c.getContext("2d");
	if (!ctx) return new THREE.CanvasTexture(c);
	const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
	g.addColorStop(0, "rgba(220,200,180,1)");
	g.addColorStop(0.4, "rgba(200,180,150,0.6)");
	g.addColorStop(1, "rgba(200,180,150,0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 32, 32);
	return new THREE.CanvasTexture(c);
}

const DUST_COUNT = 600; // low count → CPU friendly
const MIN_R = PLANET_RADIUS + 1;
const MAX_R = PLANET_RADIUS + 8;

export function PlanetParticles() {
	const pointsRef = useRef<THREE.Points>(null);
	const velRef = useRef<Float32Array>(new Float32Array(DUST_COUNT * 3));

	const { geo, mat } = useMemo(() => {
		const positions = new Float32Array(DUST_COUNT * 3);
		const vel = velRef.current;

		for (let i = 0; i < DUST_COUNT; i++) {
			const r = MIN_R + Math.random() * (MAX_R - MIN_R);
			const phi = Math.acos(2 * Math.random() - 1);
			const theta = Math.random() * Math.PI * 2;
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.cos(phi);
			positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
			// Gentle tangential drift
			vel[i * 3] = (Math.random() - 0.5) * 0.008;
			vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
			vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

		const material = new THREE.PointsMaterial({
			map: buildDotTexture(),
			size: 0.5, // tiny
			sizeAttenuation: true,
			transparent: true,
			opacity: 0.35,
			depthWrite: false,
			blending: THREE.NormalBlending,
			color: new THREE.Color(0xd4b896),
		});

		return { geo: geometry, mat: material };
	}, []);

	useFrame((_s, delta) => {
		if (!pointsRef.current) return;
		const pos = pointsRef.current.geometry.attributes.position
			.array as Float32Array;
		const vel = velRef.current;

		for (let i = 0; i < DUST_COUNT; i++) {
			const idx = i * 3;
			pos[idx] += vel[idx] * delta * 60;
			pos[idx + 1] += vel[idx + 1] * delta * 60;
			pos[idx + 2] += vel[idx + 2] * delta * 60;

			// Keep within shell
			const r = Math.sqrt(
				pos[idx] ** 2 + pos[idx + 1] ** 2 + pos[idx + 2] ** 2,
			);
			if (r > MAX_R || r < MIN_R) {
				const scale = (MIN_R + Math.random() * (MAX_R - MIN_R)) / r;
				pos[idx] *= scale;
				pos[idx + 1] *= scale;
				pos[idx + 2] *= scale;
			}
		}
		pointsRef.current.geometry.attributes.position.needsUpdate = true;
		// Slow drift of the whole cloud
		pointsRef.current.rotation.y += 0.00004 * delta * 60;
	});

	return <points ref={pointsRef} geometry={geo} material={mat} />;
}
