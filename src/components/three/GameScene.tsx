"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
	latLngToVector3,
	PLANET_RADIUS,
	PLAYER_HEIGHT,
	vector3ToLatLng,
	ZONE_DATA,
} from "@/lib/spherical-math";
import { useGameStore } from "@/store/game-store";
import { GameAudio } from "./GameAudio";
import { Planet } from "./Planet";
import { PlanetParticles } from "./PlanetParticles";
import { Player } from "./Player";
import { WorldSky } from "./WorldSky";

const ROTATION_SPEED = 0.012;

// ---------------------------------------------------------------------------
// Helpers (extracted to keep useFrame complexity low)
// ---------------------------------------------------------------------------

/** Rotate the planet group based on current move input.
 *
 * The player sits fixed at the world north-pole (0, R, 0).
 * Camera is at (0, 18, 32) → "forward" = −Z, "right" = +X.
 *
 *  UP    → player moves −Z → planet rotates around world +X so −Z rises  → rotateOnWorldAxis(X, +speed)
 *  DOWN  → player moves +Z → planet rotates around world +X so +Z rises  → rotateOnWorldAxis(X, -speed)
 *  LEFT  → player moves −X → planet rotates around world +Z so −X rises  → rotateOnWorldAxis(Z, +speed)
 *  RIGHT → player moves +X → planet rotates around world +Z so +X rises  → rotateOnWorldAxis(Z, -speed)
 */
function applyPlanetRotation(
	group: THREE.Group,
	moveInput: { up: boolean; down: boolean; left: boolean; right: boolean },
	delta: number,
) {
	const speed = ROTATION_SPEED * delta * 60;
	const axisX = new THREE.Vector3(1, 0, 0);
	const axisZ = new THREE.Vector3(0, 0, 1);
	if (moveInput.up) group.rotateOnWorldAxis(axisX, speed);
	if (moveInput.down) group.rotateOnWorldAxis(axisX, -speed);
	if (moveInput.left) group.rotateOnWorldAxis(axisZ, speed);
	if (moveInput.right) group.rotateOnWorldAxis(axisZ, -speed);
}

/** Find the closest zone id to the player's local-space north-pole position */
function detectNearestZone(group: THREE.Group): string | null {
	const playerWorldPos = new THREE.Vector3(0, PLANET_RADIUS + PLAYER_HEIGHT, 0);
	const playerLocalPos = group.worldToLocal(playerWorldPos).normalize();
	const THRESHOLD_DOT = 0.985; // ~10° trigger cone

	let closest: string | null = null;
	let closestDot = THRESHOLD_DOT;
	for (const zone of ZONE_DATA) {
		const zoneDir = latLngToVector3(
			zone.lat,
			zone.lng,
			PLANET_RADIUS,
		).normalize();
		const d = playerLocalPos.dot(zoneDir);
		if (d > closestDot) {
			closestDot = d;
			closest = zone.id;
		}
	}
	return closest;
}

/** Smoothly move the camera to track the (stationary) player */
function trackCamera(camera: THREE.Camera) {
	const playerPos = new THREE.Vector3(0, PLANET_RADIUS + PLAYER_HEIGHT, 0);
	const targetCamPos = playerPos.clone().add(new THREE.Vector3(0, 18, 32));
	camera.position.lerp(targetCamPos, 0.05);
	camera.lookAt(playerPos);
}

// ---------------------------------------------------------------------------
// Zone-entry helper (outside component to avoid recreating each render)
// ---------------------------------------------------------------------------
const VALID_ZONE_TYPES = [
	"about",
	"experience",
	"projects",
	"research",
	"skills",
	"education",
	"awards",
	"contact",
] as const;
type ZoneType = (typeof VALID_ZONE_TYPES)[number];

function enterZone(zoneId: string) {
	const type: ZoneType = VALID_ZONE_TYPES.includes(zoneId as ZoneType)
		? (zoneId as ZoneType)
		: "about";
	useGameStore.getState().actions.enterZone(zoneId, {
		id: zoneId,
		title: zoneId.charAt(0).toUpperCase() + zoneId.slice(1),
		description: "",
		type,
		data: null,
	});
}

// ---------------------------------------------------------------------------
// Lighting rig
// ---------------------------------------------------------------------------
function Lighting() {
	const { scene } = useThree();
	const sunRef = useRef<THREE.DirectionalLight | null>(null);
	const timeRef = useRef(0);
	const CYCLE_SPEED = 240;

	useEffect(() => {
		const sun = new THREE.DirectionalLight(0xffffff, 2.5);
		sun.castShadow = false;
		sunRef.current = sun;
		scene.add(sun);
		const ambient = new THREE.AmbientLight(0x8899cc, 0.6);
		scene.add(ambient);
		return () => {
			scene.remove(sun);
			scene.remove(ambient);
			sun.dispose();
			ambient.dispose();
		};
	}, [scene]);

	useFrame((_s, delta) => {
		timeRef.current += delta;
		const tod = ((timeRef.current * CYCLE_SPEED) / 86400) % 1;
		useGameStore.getState().actions.setTimeOfDay(tod);
		if (!sunRef.current) return;
		const angle = (tod - 0.25) * Math.PI * 2;
		sunRef.current.position.set(
			Math.cos(angle) * 200,
			Math.sin(angle) * 100,
			Math.sin(angle) * 60,
		);
		sunRef.current.target.position.set(0, 0, 0);
		sunRef.current.intensity = 0.3 + Math.max(0, Math.sin(angle)) * 2.5;
	});

	return null;
}

// ---------------------------------------------------------------------------
// Planet group — rotates in response to player input
// ---------------------------------------------------------------------------
function PlanetGroup() {
	const groupRef = useRef<THREE.Group>(null);
	const { camera } = useThree();
	const lastZoneRef = useRef<string | null>(null);

	useFrame((_s, delta) => {
		if (!groupRef.current) return;
		const { moveInput } = useGameStore.getState();

		applyPlanetRotation(groupRef.current, moveInput, delta);
		trackCamera(camera);

		// Zone proximity detection
		const nearest = detectNearestZone(groupRef.current);
		if (nearest !== lastZoneRef.current) {
			lastZoneRef.current = nearest;
			if (nearest) {
				enterZone(nearest);
			} else {
				useGameStore.getState().actions.exitZone();
			}
		}

		// Update store for Minimap / Compass
		const playerWorldPos = new THREE.Vector3(0, PLANET_RADIUS, 0);
		const localPos = groupRef.current
			.worldToLocal(playerWorldPos.clone())
			.normalize();
		const { lat, lng } = vector3ToLatLng(localPos);

		const forwardWorldPos = new THREE.Vector3(0, PLANET_RADIUS, -1);
		const localForward = groupRef.current
			.worldToLocal(forwardWorldPos)
			.sub(localPos.clone().multiplyScalar(PLANET_RADIUS))
			.normalize();
		const yaw = Math.atan2(localForward.x, localForward.z);

		useGameStore.getState().actions.updatePlayerPosition({ lat, lng });
		useGameStore
			.getState()
			.actions.updateCameraPosition({ x: 0, y: 18, z: 32 }, yaw);
	});

	return (
		<group ref={groupRef}>
			<Planet />
			<PlanetParticles />
		</group>
	);
}

// ---------------------------------------------------------------------------
// GameScene root
// ---------------------------------------------------------------------------
function GameSceneContent() {
	const { gl } = useThree();
	const shadersReadyRef = useRef(false);

	useEffect(() => {
		useGameStore.getState().actions.initialize();
	}, []);

	useEffect(() => {
		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 1.1;
	}, [gl]);

	useFrame(() => {
		if (!shadersReadyRef.current) {
			shadersReadyRef.current = true;
			useGameStore.getState().actions.setShadersReady();
		}
	});

	return (
		<>
			<WorldSky />
			<Lighting />
			<PlanetGroup />
			<Player />
			<GameAudio />
		</>
	);
}

export function GameScene() {
	return <GameSceneContent />;
}
