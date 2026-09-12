"use client";

import { Stars } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { useGameStore } from "@/store/game-store";

/**
 * WorldSky — fills the full background sphere with:
 *  - A deep-space star field (always visible, even during daytime)
 *  - A large solid backdrop sphere so there is NEVER a white/empty gap
 *  - A subtle gradient sky dome that fades night → dawn → day
 */
export function WorldSky() {
	const { timeOfDay } = useGameStore();

	// Sky dome colour: transitions from near-black (night) to deep-indigo (day)
	// This gives a planet-from-orbit look — always dark space behind the stars
	const skyColor = useMemo(() => {
		if (timeOfDay < 0.2 || timeOfDay > 0.8) {
			return new THREE.Color(0x00000a); // deep night
		}
		if (timeOfDay < 0.35) {
			const t = (timeOfDay - 0.2) / 0.15;
			return new THREE.Color().lerpColors(
				new THREE.Color(0x00000a),
				new THREE.Color(0x050a20),
				t,
			);
		}
		if (timeOfDay > 0.65) {
			const t = (timeOfDay - 0.65) / 0.15;
			return new THREE.Color().lerpColors(
				new THREE.Color(0x050a20),
				new THREE.Color(0x00000a),
				t,
			);
		}
		return new THREE.Color(0x050a20); // day — still looks like space from orbit
	}, [timeOfDay]);

	return (
		<>
			{/* Solid backdrop — prevents ANY white gaps from WebGL clear colour */}
			<mesh scale={1500} renderOrder={-1}>
				<sphereGeometry args={[1, 16, 16]} />
				<meshBasicMaterial
					color={skyColor}
					side={THREE.BackSide}
					depthWrite={false}
				/>
			</mesh>

			{/* Stars — always rendered, fade at opacity by time of day */}
			<Stars
				radius={800}
				depth={100}
				count={5000}
				factor={5}
				saturation={0.1}
				fade
				speed={0.3}
			/>
		</>
	);
}
