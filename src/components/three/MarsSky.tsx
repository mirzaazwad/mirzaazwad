"use client";

import { Sky, Stars } from "@react-three/drei";
import { useGameStore } from "@/store/game-store";

export function MarsSky() {
	const { timeOfDay } = useGameStore();

	// Calculate sun position based on time of day (0-1)
	const sunAngle = (timeOfDay - 0.25) * Math.PI * 2;
	const sunPosition: [number, number, number] = [
		Math.cos(sunAngle) * 100,
		Math.sin(sunAngle) * 50,
		Math.sin(sunAngle) * 30,
	];

	// Star intensity peaks at night
	let starOpacity = 0;
	if (timeOfDay < 0.2 || timeOfDay > 0.8) {
		starOpacity = 1;
	} else if (timeOfDay < 0.3) {
		starOpacity = 1 - (timeOfDay - 0.2) / 0.1;
	} else if (timeOfDay > 0.7) {
		starOpacity = (timeOfDay - 0.7) / 0.1;
	}

	return (
		<>
			<Sky
				distance={450000}
				sunPosition={sunPosition}
				inclination={0}
				azimuth={0.25}
				mieCoefficient={0.01}
				mieDirectionalG={0.8}
				rayleigh={2}
				turbidity={10}
			/>
			{starOpacity > 0.01 && (
				<group>
					{/* Add a dark background sphere behind the stars so sky doesn't bleed during night */}
					<mesh scale={500}>
						<sphereGeometry args={[1, 32, 32]} />
						<meshBasicMaterial
							color={0x000000}
							side={2}
							transparent
							opacity={starOpacity * 0.8}
							depthWrite={false}
						/>
					</mesh>
					<Stars
						radius={100}
						depth={50}
						count={3000}
						factor={4}
						saturation={0}
						fade
						speed={1}
					/>
				</group>
			)}
		</>
	);
}
