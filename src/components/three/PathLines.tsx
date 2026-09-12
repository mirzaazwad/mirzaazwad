"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
	latLngToVector3,
	PLANET_RADIUS,
	ZONE_DATA,
} from "@/lib/spherical-math";

export function PathLines() {
	const linesRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (!linesRef.current) return;

		const positions: number[] = [];

		for (let i = 0; i < ZONE_DATA.length; i++) {
			const zone1 = ZONE_DATA[i];
			const zone2 = ZONE_DATA[(i + 1) % ZONE_DATA.length];

			const pos1 = latLngToVector3(zone1.lat, zone1.lng, PLANET_RADIUS + 0.2);
			const pos2 = latLngToVector3(zone2.lat, zone2.lng, PLANET_RADIUS + 0.2);

			const curve = new THREE.QuadraticBezierCurve3(
				pos1,
				new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(1.3),
				pos2,
			);

			const points = curve.getPoints(30);
			for (const p of points) {
				positions.push(p.x, p.y, p.z);
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3),
		);

		const material = new THREE.LineBasicMaterial({
			color: 0x38bdf8,
			transparent: true,
			opacity: 0.3,
			linewidth: 1,
		});

		const line = new THREE.Line(geometry, material);
		linesRef.current.add(line);

		return () => {
			geometry.dispose();
			material.dispose();
		};
	}, []);

	useFrame(() => {
		if (linesRef.current) {
			linesRef.current.rotation.y += 0.0001;
		}
	});

	return <group ref={linesRef} />;
}
