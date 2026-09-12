"use client";

import { GameScene } from "@/components/three/GameScene";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { GameUI } from "@/components/ui/GameUI";

export default function Home() {
	return (
		<div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
			{/* 3D canvas fills the entire viewport */}
			<ThreeCanvas>
				<GameScene />
			</ThreeCanvas>
			{/* HTML UI layered on top */}
			<GameUI />
		</div>
	);
}
