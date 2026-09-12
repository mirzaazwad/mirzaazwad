"use client";

import { useEffect, useRef } from "react";
import {
	latLngToVector3,
	PLANET_RADIUS,
	ZONE_DATA,
} from "@/lib/spherical-math";
import { useGameStore } from "@/store/game-store";

const RING_RADIUS = 60;
const RING_WIDTH = 8;

function getZonePosition(zone: (typeof ZONE_DATA)[0]) {
	return latLngToVector3(zone.lat, zone.lng, PLANET_RADIUS).normalize();
}

function normalizeAngle(angle: number) {
	let normalized = angle;
	while (normalized > Math.PI) normalized -= Math.PI * 2;
	while (normalized < -Math.PI) normalized += Math.PI * 2;
	return normalized;
}

function drawRingBackground(ctx: CanvasRenderingContext2D, center: number) {
	ctx.beginPath();
	ctx.arc(center, center, RING_RADIUS, 0, Math.PI * 2);
	ctx.strokeStyle = "rgba(14, 165, 233, 0.2)";
	ctx.lineWidth = RING_WIDTH;
	ctx.stroke();
}

function drawZoneIndicator(
	ctx: CanvasRenderingContext2D,
	center: number,
	relativeAngle: number,
	zone: (typeof ZONE_DATA)[0],
	isVisited: boolean,
) {
	const x = center + Math.sin(relativeAngle) * RING_RADIUS;
	const y = center - Math.cos(relativeAngle) * RING_RADIUS;

	ctx.beginPath();
	ctx.arc(x, y, isVisited ? 8 : 6, 0, Math.PI * 2);
	ctx.fillStyle = isVisited
		? `#${zone.color.toString(16).padStart(6, "0")}`
		: `rgba(${zone.color >> 16}, ${(zone.color >> 8) & 255}, ${zone.color & 255}, 0.8)`;
	ctx.fill();

	const innerRadius = RING_RADIUS - RING_WIDTH - 4;
	const ix = center + Math.sin(relativeAngle) * innerRadius;
	const iy = center - Math.cos(relativeAngle) * innerRadius;

	ctx.beginPath();
	ctx.arc(ix, iy, 3, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
	ctx.fill();
}

function drawCenterMarker(ctx: CanvasRenderingContext2D, center: number) {
	ctx.beginPath();
	ctx.arc(center, center, 4, 0, Math.PI * 2);
	ctx.fillStyle = "#38bdf8";
	ctx.fill();
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 1;
	ctx.stroke();
}

function drawCardinalDirections(
	ctx: CanvasRenderingContext2D,
	center: number,
	camYaw: number,
) {
	const directions = ["N", "E", "S", "W"];
	for (let i = 0; i < directions.length; i++) {
		const dir = directions[i];
		const angle = (i * Math.PI) / 2 - camYaw;
		const x = center + Math.sin(angle) * (RING_RADIUS + 15);
		const y = center - Math.cos(angle) * (RING_RADIUS + 15);

		ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
		ctx.font = "10px Inter, system-ui, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(dir, x, y);
	}
}

export function CompassRing() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const ctx = canvasRef.current.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		const size = (RING_RADIUS + RING_WIDTH) * 2;
		canvasRef.current.width = size * dpr;
		canvasRef.current.height = size * dpr;
		canvasRef.current.style.width = `${size}px`;
		canvasRef.current.style.height = `${size}px`;
		ctx.scale(dpr, dpr);

		let frameId: number;

		const renderLoop = () => {
			const state = useGameStore.getState();
			const { visitedZones, cameraYaw } = state;

			const center = size / 2;

			ctx.clearRect(0, 0, size, size);

			drawRingBackground(ctx, center);

			for (const zone of ZONE_DATA) {
				const zonePos = getZonePosition(zone);
				const zoneYaw = Math.atan2(zonePos.x, zonePos.z);

				const relativeAngle = normalizeAngle(zoneYaw - cameraYaw);

				if (Math.abs(relativeAngle) < Math.PI * 0.66) {
					const isVisited = visitedZones.has(zone.id);
					drawZoneIndicator(ctx, center, relativeAngle, zone, isVisited);
				}
			}

			drawCenterMarker(ctx, center);
			drawCardinalDirections(ctx, center, cameraYaw);

			frameId = requestAnimationFrame(renderLoop);
		};

		frameId = requestAnimationFrame(renderLoop);

		return () => cancelAnimationFrame(frameId);
	}, []);

	return (
		<div className="fixed top-4 right-4 z-40 glass-strong rounded-xl p-2 border border-cyan-400/20 pointer-events-none">
			<canvas
				ref={canvasRef}
				className="block pointer-events-auto"
				aria-label="Compass"
			/>
		</div>
	);
}
