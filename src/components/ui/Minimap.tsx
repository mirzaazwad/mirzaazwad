"use client";

import { useEffect, useRef } from "react";
import {
	latLngToVector3,
	PLANET_RADIUS,
	ZONE_DATA,
} from "@/lib/spherical-math";
import { useGameStore } from "@/store/game-store";

const MINIMAP_SIZE = 150;

export function Minimap() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;

		canvasRef.current.width = MINIMAP_SIZE * 2;
		canvasRef.current.height = MINIMAP_SIZE * 2;
		canvasRef.current.style.width = `${MINIMAP_SIZE}px`;
		canvasRef.current.style.height = `${MINIMAP_SIZE}px`;

		let frameId: number;

		const renderLoop = () => {
			const state = useGameStore.getState();
			const { playerPosition, visitedZones, cameraYaw } = state;

			ctx.clearRect(0, 0, MINIMAP_SIZE * 2, MINIMAP_SIZE * 2);

			// Draw planet circle
			ctx.beginPath();
			ctx.arc(MINIMAP_SIZE, MINIMAP_SIZE, MINIMAP_SIZE - 10, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
			ctx.fill();
			ctx.strokeStyle = "rgba(14, 165, 233, 0.5)";
			ctx.lineWidth = 2;
			ctx.stroke();

			// Draw zones
			for (const zone of ZONE_DATA) {
				const zonePos = latLngToVector3(zone.lat, zone.lng, PLANET_RADIUS);

				// Project to 2D (top-down view)
				const x =
					MINIMAP_SIZE + (zonePos.x / PLANET_RADIUS) * (MINIMAP_SIZE - 15);
				const y =
					MINIMAP_SIZE + (zonePos.z / PLANET_RADIUS) * (MINIMAP_SIZE - 15);

				const isVisited = visitedZones.has(zone.id);

				// Zone marker
				ctx.beginPath();
				ctx.arc(x, y, isVisited ? 6 : 4, 0, Math.PI * 2);
				ctx.fillStyle = isVisited
					? `#${zone.color.toString(16).padStart(6, "0")}`
					: `rgba(${zone.color >> 16}, ${(zone.color >> 8) & 255}, ${zone.color & 255}, 0.6)`;
				ctx.fill();

				if (isVisited) {
					ctx.strokeStyle = "#ffffff";
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			}

			// Draw player position
			const playerX =
				Math.sin(((90 - playerPosition.lat) * Math.PI) / 180) *
				Math.cos(((playerPosition.lng + 180) * Math.PI) / 180);
			const playerZ =
				Math.sin(((90 - playerPosition.lat) * Math.PI) / 180) *
				Math.sin(((playerPosition.lng + 180) * Math.PI) / 180);

			const px = MINIMAP_SIZE + playerX * (MINIMAP_SIZE - 15);
			const py = MINIMAP_SIZE + playerZ * (MINIMAP_SIZE - 15);

			ctx.beginPath();
			ctx.arc(px, py, 5, 0, Math.PI * 2);
			ctx.fillStyle = "#38bdf8";
			ctx.fill();
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 2;
			ctx.stroke();

			// Direction indicator using cameraYaw
			const dx = Math.sin(cameraYaw);
			const dz = Math.cos(cameraYaw);

			ctx.beginPath();
			ctx.moveTo(px, py);
			ctx.lineTo(px + dx * 15, py + dz * 15);
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 2;
			ctx.stroke();

			frameId = requestAnimationFrame(renderLoop);
		};

		frameId = requestAnimationFrame(renderLoop);

		return () => cancelAnimationFrame(frameId);
	}, []);

	return (
		<div className="fixed bottom-4 left-4 z-40 glass-strong rounded-xl p-2 border border-cyan-400/20 pointer-events-none">
			<canvas
				ref={canvasRef}
				className="block pointer-events-auto"
				aria-label="Minimap"
			/>
		</div>
	);
}
