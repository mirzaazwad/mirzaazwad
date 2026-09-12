"use client";

import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PLANET_RADIUS, PLAYER_HEIGHT } from "@/lib/spherical-math";
import type { GameState } from "@/store/game-store";
import { useGameStore } from "@/store/game-store";

// ---------------------------------------------------------------------------
// Greeting messages (cycle every 4 s)
// ---------------------------------------------------------------------------
const GREETINGS = [
	"👋 Welcome to Azwad's World!",
	"🌍 Use WASD / ↑↓←→ to navigate",
	"🔬 Reach the holograms to explore zones!",
	"💡 Each new zone gives +100 XP!",
	"🚀 Press any direction to start!",
];

// ---------------------------------------------------------------------------
// Keyboard helpers — extracted to keep useEffect complexity low
// ---------------------------------------------------------------------------
function applyKeyDown(key: string, actions: GameState["actions"]) {
	const k = key.toLowerCase();
	if (k === "w" || k === "arrowup") {
		actions.setMoveInput({ up: true });
		return;
	}
	if (k === "s" || k === "arrowdown") {
		actions.setMoveInput({ down: true });
		return;
	}
	if (k === "a" || k === "arrowleft") {
		actions.setMoveInput({ left: true });
		return;
	}
	if (k === "d" || k === "arrowright") {
		actions.setMoveInput({ right: true });
		return;
	}
}

function applyKeyUp(key: string, actions: GameState["actions"]) {
	const k = key.toLowerCase();
	if (k === "w" || k === "arrowup") {
		actions.setMoveInput({ up: false });
		return;
	}
	if (k === "s" || k === "arrowdown") {
		actions.setMoveInput({ down: false });
		return;
	}
	if (k === "a" || k === "arrowleft") {
		actions.setMoveInput({ left: false });
		return;
	}
	if (k === "d" || k === "arrowright") {
		actions.setMoveInput({ right: false });
		return;
	}
}

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------
function animateArms(
	leftArm: React.RefObject<THREE.Group | null>,
	rightArm: React.RefObject<THREE.Group | null>,
	wc: number,
	isMoving: boolean,
) {
	const swing = isMoving ? Math.sin(wc) * 0.5 : 0;
	if (leftArm.current) leftArm.current.rotation.x = swing;
	if (rightArm.current) rightArm.current.rotation.x = -swing;
}

function animateBodyBob(
	body: React.RefObject<THREE.Group | null>,
	head: React.RefObject<THREE.Group | null>,
	time: number,
	isMoving: boolean,
	wc: number,
) {
	if (body.current) {
		body.current.position.y = isMoving
			? 1.0 + Math.abs(Math.sin(wc * 2)) * 0.1
			: 1.0 + Math.sin(time * 0.7) * 0.05;
	}
	if (head.current) {
		head.current.rotation.y = Math.sin(time * 0.35) * 0.12;
	}
}

function animateBlink(
	leftEye: React.RefObject<THREE.Mesh | null>,
	rightEye: React.RefObject<THREE.Mesh | null>,
	blinkRef: React.MutableRefObject<number>,
	delta: number,
) {
	blinkRef.current += delta;
	if (blinkRef.current > 3 + Math.random() * 2) {
		blinkRef.current = 0;
		if (leftEye.current) leftEye.current.scale.y = 0.05;
		if (rightEye.current) rightEye.current.scale.y = 0.05;
		setTimeout(() => {
			if (leftEye.current) leftEye.current.scale.y = 1;
			if (rightEye.current) rightEye.current.scale.y = 1;
		}, 140);
	}
}

// ---------------------------------------------------------------------------
// Player — no legs, original boxy robot, speech bubble via Html
// ---------------------------------------------------------------------------
export function Player() {
	const timeRef = useRef(0);
	const walkCycleRef = useRef(0);
	const blinkRef = useRef(0);

	const bodyGroupRef = useRef<THREE.Group>(null);
	const headRef = useRef<THREE.Group>(null);
	const leftArmRef = useRef<THREE.Group>(null);
	const rightArmRef = useRef<THREE.Group>(null);
	const leftEyeRef = useRef<THREE.Mesh>(null);
	const rightEyeRef = useRef<THREE.Mesh>(null);
	const shadowRef = useRef<THREE.Mesh>(null);

	const [msgIndex, setMsgIndex] = useState(0);
	const [showBubble, setShowBubble] = useState(true);

	useEffect(() => {
		const id = setInterval(
			() => setMsgIndex((i) => (i + 1) % GREETINGS.length),
			4000,
		);
		return () => clearInterval(id);
	}, []);

	const actions = useGameStore((s) => s.actions);
	useEffect(() => {
		const down = (e: KeyboardEvent) => applyKeyDown(e.key, actions);
		const up = (e: KeyboardEvent) => applyKeyUp(e.key, actions);
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, [actions]);

	// Materials
	const whiteMat = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				color: 0xfafafa,
				roughness: 0.4,
				metalness: 0.25,
			}),
		[],
	);
	const darkMat = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				color: 0x111111,
				roughness: 0.3,
				metalness: 0.6,
			}),
		[],
	);

	useFrame((_s, delta) => {
		timeRef.current += delta;
		const time = timeRef.current;
		const { moveInput } = useGameStore.getState();
		const isMoving =
			moveInput.up || moveInput.down || moveInput.left || moveInput.right;
		if (isMoving) walkCycleRef.current += delta * 9;

		animateArms(leftArmRef, rightArmRef, walkCycleRef.current, isMoving);
		animateBodyBob(bodyGroupRef, headRef, time, isMoving, walkCycleRef.current);
		animateBlink(leftEyeRef, rightEyeRef, blinkRef, delta);

		// Subtle shadow pulse
		if (shadowRef.current) {
			const s = 1 - Math.abs(Math.sin(time * 0.7)) * 0.06;
			shadowRef.current.scale.set(s, 1, s);
		}
	});

	const PLAYER_Y = PLANET_RADIUS + PLAYER_HEIGHT;

	return (
		<group position={[0, PLAYER_Y, 0]}>
			{/* ── Robot body group – bobs up/down ── */}
			<group ref={bodyGroupRef} position={[0, 1.0, 0]}>
				{/* Torso */}
				<RoundedBox
					args={[1.2, 1.4, 1.1]}
					radius={0.28}
					smoothness={4}
					material={whiteMat}
					position={[0, 0.7, 0]}
					castShadow
				/>

				{/* Head group */}
				<group ref={headRef} position={[0, 1.8, 0]}>
					<RoundedBox
						args={[1.0, 0.82, 0.95]}
						radius={0.22}
						smoothness={4}
						material={whiteMat}
						castShadow
					/>
					{/* Face visor (black inset) */}
					<RoundedBox
						args={[0.72, 0.46, 0.15]}
						radius={0.08}
						smoothness={4}
						material={darkMat}
						position={[0, -0.05, 0.45]}
					/>
					{/* Left eye */}
					<mesh ref={leftEyeRef} position={[-0.15, -0.05, 0.52]}>
						<boxGeometry args={[0.14, 0.09, 0.04]} />
						<meshStandardMaterial
							color={0x0055ff}
							emissive={new THREE.Color(0x0033ff)}
							emissiveIntensity={3.5}
							roughness={0}
						/>
					</mesh>
					{/* Right eye */}
					<mesh ref={rightEyeRef} position={[0.15, -0.05, 0.52]}>
						<boxGeometry args={[0.14, 0.09, 0.04]} />
						<meshStandardMaterial
							color={0x0055ff}
							emissive={new THREE.Color(0x0033ff)}
							emissiveIntensity={3.5}
							roughness={0}
						/>
					</mesh>
					{/* Antenna */}
					<mesh position={[0, 0.56, 0]} material={whiteMat}>
						<cylinderGeometry args={[0.04, 0.04, 0.36, 8]} />
					</mesh>
					<mesh position={[0, 0.77, 0]}>
						<sphereGeometry args={[0.1, 8, 8]} />
						<meshStandardMaterial
							color={0x00ccff}
							emissive={new THREE.Color(0x0099ff)}
							emissiveIntensity={4}
						/>
					</mesh>
				</group>

				{/* Left arm */}
				<group ref={leftArmRef} position={[-0.78, 0.85, 0]}>
					<mesh material={whiteMat} position={[0, -0.4, 0]} castShadow>
						<capsuleGeometry args={[0.14, 0.72, 4, 8]} />
					</mesh>
				</group>

				{/* Right arm */}
				<group ref={rightArmRef} position={[0.78, 0.85, 0]}>
					<mesh material={whiteMat} position={[0, -0.4, 0]} castShadow>
						<capsuleGeometry args={[0.14, 0.72, 4, 8]} />
					</mesh>
				</group>
			</group>

			{/* ── Flat shadow blob on the surface ── */}
			<mesh
				ref={shadowRef}
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, 0.05, 0]}
			>
				<circleGeometry args={[0.85, 32]} />
				<meshBasicMaterial
					color={0x000000}
					transparent
					opacity={0.35}
					depthWrite={false}
				/>
			</mesh>

			{/* ── Point light emanating from robot ── */}
			<pointLight
				color={0x4499ff}
				intensity={2.5}
				distance={12}
				decay={2}
				position={[0, 3, 0]}
			/>

			{/* ── Html speech bubble — always attached to head ── */}
			{showBubble && (
				<Html
					position={[0, PLAYER_Y * 0 + 5.8, 0]}
					center
					distanceFactor={20}
					style={{ pointerEvents: "none" }}
				>
					<div
						style={{
							background: "rgba(2,8,20,0.88)",
							border: "2px solid rgba(0,170,255,0.65)",
							borderRadius: "12px",
							padding: "8px 16px",
							color: "#d8f0ff",
							fontFamily: "monospace",
							fontSize: "13px",
							whiteSpace: "nowrap",
							boxShadow:
								"0 0 20px rgba(0,140,255,0.35), inset 0 0 8px rgba(0,80,200,0.15)",
							position: "relative",
						}}
					>
						{GREETINGS[msgIndex]}
						{/* Tail */}
						<div
							style={{
								position: "absolute",
								bottom: -10,
								left: "50%",
								transform: "translateX(-50%)",
								width: 0,
								height: 0,
								borderLeft: "9px solid transparent",
								borderRight: "9px solid transparent",
								borderTop: "10px solid rgba(0,170,255,0.65)",
							}}
						/>
						{/* Close button */}
						<button
							type="button"
							aria-label="Close speech bubble"
							onClick={() => setShowBubble(false)}
							style={{
								position: "absolute",
								top: 3,
								right: 6,
								background: "none",
								border: "none",
								color: "rgba(150,200,255,0.7)",
								cursor: "pointer",
								fontSize: "12px",
								lineHeight: 1,
								pointerEvents: "auto",
							}}
						>
							×
						</button>
					</div>
				</Html>
			)}
		</group>
	);
}
