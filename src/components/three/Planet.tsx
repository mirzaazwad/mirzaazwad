"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
	latLngToVector3,
	PLANET_RADIUS,
	ZONE_DATA,
} from "@/lib/spherical-math";

// ---------------------------------------------------------------------------
// Dune-style sandy desert texture — generated once on CPU
// ---------------------------------------------------------------------------
function buildDuneTexture(size = 512): THREE.CanvasTexture {
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (!ctx) return new THREE.CanvasTexture(canvas);

	// Simple value-noise helpers
	function hash(x: number, y: number): number {
		return Math.abs(Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
	}
	function lerp(a: number, b: number, t: number) {
		return a + (b - a) * t;
	}
	function smooth(t: number) {
		return t * t * (3 - 2 * t);
	}
	function noise(x: number, y: number): number {
		const ix = Math.floor(x),
			iy = Math.floor(y);
		const fx = x - ix,
			fy = y - iy;
		const ux = smooth(fx),
			uy = smooth(fy);
		return lerp(
			lerp(hash(ix, iy), hash(ix + 1, iy), ux),
			lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), ux),
			uy,
		);
	}
	// Ridge noise for dune crests
	function ridge(x: number, y: number): number {
		return 1 - Math.abs(noise(x, y) * 2 - 1);
	}
	function fbm(x: number, y: number, oct: number): number {
		let v = 0,
			a = 0.5,
			f = 1;
		for (let i = 0; i < oct; i++) {
			v += a * noise(x * f, y * f);
			f *= 2.07;
			a *= 0.5;
		}
		return v;
	}
	function fbmRidge(x: number, y: number, oct: number): number {
		let v = 0,
			a = 0.5,
			f = 1;
		for (let i = 0; i < oct; i++) {
			v += a * ridge(x * f, y * f);
			f *= 2.07;
			a *= 0.5;
		}
		return v;
	}

	// Dune palette — pure desert, no water, no green
	// h in [0,1]:  0=dark shadowed sand, 1=bright sunlit crest
	function duneColor(h: number): [number, number, number] {
		// Deep shadow valley
		if (h < 0.25) {
			const t = h / 0.25;
			return [
				Math.round(lerp(60, 120, t)),
				Math.round(lerp(30, 65, t)),
				Math.round(lerp(10, 25, t)),
			];
		}
		// Mid dune body
		if (h < 0.55) {
			const t = (h - 0.25) / 0.3;
			return [
				Math.round(lerp(120, 190, t)),
				Math.round(lerp(65, 120, t)),
				Math.round(lerp(25, 50, t)),
			];
		}
		// Sunlit dune flanks
		if (h < 0.8) {
			const t = (h - 0.55) / 0.25;
			return [
				Math.round(lerp(190, 225, t)),
				Math.round(lerp(120, 165, t)),
				Math.round(lerp(50, 80, t)),
			];
		}
		// Bright crest / exposed rock
		const t = (h - 0.8) / 0.2;
		return [
			Math.round(lerp(225, 245, t)),
			Math.round(lerp(165, 200, t)),
			Math.round(lerp(80, 130, t)),
		];
	}

	const img = ctx.createImageData(size, size);
	const d = img.data;

	for (let py = 0; py < size; py++) {
		for (let px = 0; px < size; px++) {
			const u = (px / size) * 6;
			const v = (py / size) * 6;

			// Combine large-scale terrain with ridge dunes
			const base = fbm(u * 0.5, v * 0.5, 5);
			const dunes = fbmRidge(u * 1.5, v * 1.5, 4) * 0.55;
			const detail = fbm(u * 3, v * 3, 3) * 0.1;
			const h = Math.max(0, Math.min(1, base * 0.35 + dunes * 0.55 + detail));

			const [r, g, b] = duneColor(h);
			const idx = (py * size + px) * 4;
			d[idx] = r;
			d[idx + 1] = g;
			d[idx + 2] = b;
			d[idx + 3] = 255;
		}
	}
	ctx.putImageData(img, 0, 0);
	const tex = new THREE.CanvasTexture(canvas);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

// ---------------------------------------------------------------------------
// Holographic zone marker — solid glowing beacon
// ---------------------------------------------------------------------------
interface ZoneMarkerProps {
	zone: (typeof ZONE_DATA)[0];
	radius: number;
}

function ZoneMarker({ zone, radius }: ZoneMarkerProps) {
	const beaconRef = useRef<THREE.Mesh>(null);
	const haloRef = useRef<THREE.Mesh>(null);
	const beamRef = useRef<THREE.Mesh>(null);
	const t = useRef(Math.random() * Math.PI * 2);

	const position = useMemo(
		() => latLngToVector3(zone.lat, zone.lng, radius + 2),
		[zone.lat, zone.lng, radius],
	);

	// Shared solid colour material for this zone
	const solidMat = useMemo(
		() => new THREE.MeshBasicMaterial({ color: zone.color }),
		[zone.color],
	);
	const haloPulseMat = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: zone.color,
				transparent: true,
				opacity: 0.4,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[zone.color],
	);
	const beamMat = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: zone.color,
				transparent: true,
				opacity: 0.18,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[zone.color],
	);

	// "Up" quaternion so the marker stands perpendicular to the planet surface
	const upQuat = useMemo(() => {
		return new THREE.Quaternion().setFromUnitVectors(
			new THREE.Vector3(0, 1, 0),
			position.clone().normalize(),
		);
	}, [position]);

	useFrame((_s, delta) => {
		t.current += delta;
		if (beaconRef.current) {
			beaconRef.current.rotation.y += delta * 0.9;
			// Float up/down
			const floatOffset = Math.sin(t.current * 1.4) * 0.6;
			beaconRef.current.position
				.copy(position)
				.addScaledVector(position.clone().normalize(), floatOffset);
		}
		if (haloRef.current && haloRef.current.material instanceof THREE.Material) {
			(haloRef.current.material as THREE.MeshBasicMaterial).opacity =
				0.25 + Math.sin(t.current * 2.2) * 0.2;
			haloRef.current.scale.setScalar(1 + Math.sin(t.current * 1.6) * 0.2);
		}
	});

	return (
		<group quaternion={upQuat} position={position}>
			{/* Solid spinning octahedron — main beacon */}
			<mesh ref={beaconRef} material={solidMat}>
				<octahedronGeometry args={[1.5, 0]} />
			</mesh>

			{/* Pulsing halo ring flat on the surface */}
			<mesh
				ref={haloRef}
				rotation={[Math.PI / 2, 0, 0]}
				position={[0, -1.8, 0]}
				material={haloPulseMat}
			>
				<ringGeometry args={[2.0, 3.2, 32]} />
			</mesh>

			{/* Vertical beam of light */}
			<mesh ref={beamRef} material={beamMat} position={[0, 6, 0]}>
				<cylinderGeometry args={[0.06, 0.06, 16, 6, 1, true]} />
			</mesh>

			{/* Label */}
			<Html
				position={[0, 5, 0]}
				center
				distanceFactor={25}
				zIndexRange={[80, 0]}
				style={{
					pointerEvents: "none",
					color: "#ffffff",
					textShadow: "0 2px 4px rgba(0,0,0,0.8)",
					fontFamily: "monospace",
					fontSize: "14px",
					fontWeight: "bold",
					textTransform: "uppercase",
					letterSpacing: "0.1em",
					whiteSpace: "nowrap",
				}}
			>
				{zone.name}
			</Html>
		</group>
	);
}

// ---------------------------------------------------------------------------
// Planet
// ---------------------------------------------------------------------------
interface PlanetProps {
	radius?: number;
	onZoneEnter?: (zoneId: string) => void;
}

export function Planet({ radius = PLANET_RADIUS }: PlanetProps) {
	const texture = useMemo(() => buildDuneTexture(512), []);
	const sphereGeo = useMemo(
		() => new THREE.SphereGeometry(radius, 64, 64),
		[radius],
	);

	const planetMat = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				map: texture,
				roughness: 0.95,
				metalness: 0.0,
			}),
		[texture],
	);

	// Thin dusty atmosphere — warm amber haze
	const atmosGeo = useMemo(
		() => new THREE.SphereGeometry(radius * 1.035, 32, 32),
		[radius],
	);
	const atmosMat = useMemo(
		() =>
			new THREE.MeshBasicMaterial({
				color: new THREE.Color(0xd4703a),
				transparent: true,
				opacity: 0.07,
				side: THREE.BackSide,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[],
	);

	return (
		<group>
			<mesh
				geometry={sphereGeo}
				material={planetMat}
				receiveShadow
				castShadow
			/>
			<mesh geometry={atmosGeo} material={atmosMat} />
			{ZONE_DATA.map((zone) => (
				<ZoneMarker key={zone.id} zone={zone} radius={radius} />
			))}
		</group>
	);
}
