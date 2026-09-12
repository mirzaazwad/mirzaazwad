"use client";

import { Canvas, extend } from "@react-three/fiber";
import { type ReactNode, Suspense } from "react";
import * as THREE from "three";

// Register all THREE objects so drei helpers work declaratively.
extend(THREE as unknown as Parameters<typeof extend>[0]);

interface ThreeCanvasProps {
	children: ReactNode;
	className?: string;
	cameraPosition?: [number, number, number];
}

export function ThreeCanvas({
	children,
	className = "",
	cameraPosition = [0, 80, 120],
}: ThreeCanvasProps) {
	return (
		<div className={`fixed inset-0 w-screen h-screen ${className}`}>
			<Canvas
				camera={{ position: cameraPosition, fov: 55, near: 0.1, far: 2000 }}
				dpr={1}
				gl={{
					antialias: false, // OFF for CPU perf
					alpha: false,
					powerPreference: "high-performance",
					// Soft shadow-map disabled to save GPU/CPU
				}}
				style={{ width: "100%", height: "100%", display: "block" }}
			>
				{/* Keep Suspense so lazy-loaded drei helpers don't break */}
				<Suspense fallback={null}>{children}</Suspense>
			</Canvas>
		</div>
	);
}
