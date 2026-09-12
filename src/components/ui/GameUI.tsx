"use client";

import { useState } from "react";
import { useMovementKeys } from "@/hooks/useMovementKeys";
import { useGameStore } from "@/store/game-store";
import { CompassRing } from "./CompassRing";
import { Minimap } from "./Minimap";
import { SettingsPanel } from "./SettingsPanel";
import { ZoneOverlay } from "./ZoneOverlay";

export function GameUI() {
	const showZoneInfo = useGameStore((s) => s.showZoneInfo);
	const zoneContent = useGameStore((s) => s.zoneContent);
	const isLoading = useGameStore((s) => s.isLoading);
	const shadersReady = useGameStore((s) => s.shadersReady);
	const xp = useGameStore((s) => s.xp);
	const level = useGameStore((s) => s.level);
	const [showSettings, setShowSettings] = useState(false);

	// Must be called in the normal React tree (outside the R3F Canvas)
	useMovementKeys();

	return (
		<div className="pointer-events-none fixed inset-0 z-10">
			{/* Zone content overlay */}
			{showZoneInfo && zoneContent && (
				<div className="pointer-events-auto">
					<ZoneOverlay
						zone={zoneContent}
						onClose={() => useGameStore.getState().actions.exitZone()}
					/>
				</div>
			)}

			{/* Settings */}
			{showSettings && (
				<div className="pointer-events-auto">
					<SettingsPanel
						isOpen={showSettings}
						onClose={() => setShowSettings(false)}
					/>
				</div>
			)}

			{/* Map and Compass */}
			<div className="pointer-events-auto z-10">
				<Minimap />
				<CompassRing />
			</div>

			{/* HUD — top left: XP & Level */}
			<section
				className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1"
				aria-label="Player stats"
			>
				<div
					style={{
						background: "rgba(0,0,0,0.6)",
						border: "1px solid rgba(0,170,255,0.4)",
						borderRadius: 8,
						padding: "6px 12px",
						color: "#e0f0ff",
						fontFamily: "monospace",
						fontSize: 13,
					}}
				>
					<span style={{ color: "#88ccff" }}>LVL {level}</span>
					{"  "}
					<span style={{ color: "#aaa" }}>XP {xp}</span>
				</div>
			</section>

			{/* Settings button — bottom right */}
			<div className="pointer-events-auto absolute bottom-4 right-4">
				<button
					type="button"
					onClick={() => setShowSettings(true)}
					style={{
						background: "rgba(0,0,0,0.6)",
						border: "1px solid rgba(0,170,255,0.4)",
						borderRadius: 8,
						padding: "6px 14px",
						color: "#e0f0ff",
						fontFamily: "monospace",
						fontSize: 13,
						cursor: "pointer",
					}}
					aria-label="Open settings"
				>
					⚙ Settings
				</button>
			</div>

			{/* Controls hint — bottom left */}
			<div
				className="pointer-events-none absolute bottom-4 left-4"
				style={{
					color: "rgba(200,220,255,0.5)",
					fontFamily: "monospace",
					fontSize: 12,
				}}
			>
				WASD / ↑↓←→ to explore
			</div>

			{/* Full-screen loading overlay — blocks until shaders ready */}
			{isLoading && (
				<div
					className="pointer-events-auto fixed inset-0 flex flex-col items-center justify-center z-50"
					style={{ background: "#03050f" }}
				>
					<div className="text-center">
						{/* Planet spinner */}
						<div
							style={{
								width: 64,
								height: 64,
								borderRadius: "50%",
								border: "4px solid rgba(0,120,255,0.2)",
								borderTop: "4px solid #0af",
								animation: "spin 1s linear infinite",
								margin: "0 auto 24px",
							}}
						/>
						<h1
							style={{
								color: "#a0d0ff",
								fontFamily: "monospace",
								fontSize: 22,
								marginBottom: 8,
								letterSpacing: "0.1em",
							}}
						>
							AZWAD&apos;S WORLD
						</h1>
						<p
							style={{
								color: "rgba(100,160,255,0.7)",
								fontFamily: "monospace",
								fontSize: 13,
								marginBottom: 20,
							}}
						>
							{!shadersReady ? "Building world…" : "Almost ready…"}
						</p>
						{/* Progress bar */}
						<div
							style={{
								width: 200,
								height: 4,
								background: "rgba(0,100,200,0.2)",
								borderRadius: 4,
								overflow: "hidden",
								margin: "0 auto",
							}}
						>
							<div
								style={{
									height: "100%",
									width: shadersReady ? "90%" : "40%",
									background: "linear-gradient(90deg,#0af,#06f)",
									borderRadius: 4,
									transition: "width 0.8s ease",
								}}
							/>
						</div>
					</div>
					<style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
				</div>
			)}
		</div>
	);
}
