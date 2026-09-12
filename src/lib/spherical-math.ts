import * as THREE from "three";

export const PLANET_RADIUS = 50;
export const PLAYER_HEIGHT = 2.5;
export const MOVE_SPEED = 0.8;
export const ROTATION_SPEED = 0.003;
export const ZONE_TRIGGER_DISTANCE = 0.15;

export interface LatLng {
	lat: number;
	lng: number;
}

export interface ZoneData {
	id: string;
	name: string;
	lat: number;
	lng: number;
	color: number;
	size: number;
}

export const ZONE_DATA: ZoneData[] = [
	{
		id: "about",
		name: "About Me",
		lat: 0,
		lng: 0,
		color: 0x0ea5e9,
		size: 0.15,
	},
	{
		id: "experience",
		name: "Experience",
		lat: 30,
		lng: 45,
		color: 0x22c55e,
		size: 0.12,
	},
	{
		id: "projects",
		name: "Projects",
		lat: -20,
		lng: 120,
		color: 0xf59e0b,
		size: 0.12,
	},
	{
		id: "research",
		name: "Research",
		lat: 45,
		lng: -60,
		color: 0xa855f7,
		size: 0.12,
	},
	{
		id: "skills",
		name: "Skills",
		lat: -40,
		lng: -120,
		color: 0xec4899,
		size: 0.12,
	},
	{
		id: "education",
		name: "Education",
		lat: 60,
		lng: 150,
		color: 0x06b6d4,
		size: 0.1,
	},
	{
		id: "awards",
		name: "Awards",
		lat: -60,
		lng: 30,
		color: 0xf97316,
		size: 0.1,
	},
	{
		id: "contact",
		name: "Contact",
		lat: 15,
		lng: -150,
		color: 0x84cc16,
		size: 0.1,
	},
];

export function latLngToVector3(
	lat: number,
	lng: number,
	radius: number,
): THREE.Vector3 {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);
	return new THREE.Vector3(
		radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta),
	);
}

export function vector3ToLatLng(vector: THREE.Vector3): LatLng {
	const radius = vector.length();
	const lat = 90 - THREE.MathUtils.radToDeg(Math.acos(vector.y / radius));
	const lng = THREE.MathUtils.radToDeg(Math.atan2(vector.z, vector.x)) - 180;
	return { lat, lng };
}

export function getTangentVector(lat: number, lng: number) {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lng + 180) * (Math.PI / 180);

	const up = new THREE.Vector3(
		Math.sin(phi) * Math.cos(theta),
		Math.cos(phi),
		Math.sin(phi) * Math.sin(theta),
	);

	const north = new THREE.Vector3(0, 1, 0);
	const east = new THREE.Vector3().crossVectors(north, up).normalize();
	const northTangent = new THREE.Vector3().crossVectors(up, east).normalize();

	return { up, east, north: northTangent };
}

export function moveOnSphere(
	currentPos: THREE.Vector3,
	moveInput: THREE.Vector2,
	speed: number,
	delta: number,
): THREE.Vector3 {
	const latLng = vector3ToLatLng(currentPos);
	const { up, east, north } = getTangentVector(latLng.lat, latLng.lng);

	const worldMove = new THREE.Vector3()
		.addScaledVector(north, -moveInput.y)
		.addScaledVector(east, moveInput.x)
		.normalize();

	const angle = speed * delta * 60;
	const axis = new THREE.Vector3().crossVectors(up, worldMove).normalize();

	if (axis.length() > 0) {
		const quat = new THREE.Quaternion().setFromAxisAngle(axis, angle);
		const newPos = currentPos.clone().applyQuaternion(quat);
		newPos.setLength(currentPos.length());
		return newPos;
	}

	return currentPos;
}

export function getQuaternionForPosition(
	position: THREE.Vector3,
): THREE.Quaternion {
	const up = position.clone().normalize();
	return new THREE.Quaternion().setFromUnitVectors(
		new THREE.Vector3(0, 1, 0),
		up,
	);
}

export function getDistance(pos1: THREE.Vector3, pos2: THREE.Vector3): number {
	const v1 = pos1.clone().normalize();
	const v2 = pos2.clone().normalize();
	const dot = Math.max(-1, Math.min(1, v1.dot(v2)));
	return Math.acos(dot);
}

export function isInZone(
	playerPos: THREE.Vector3,
	zoneLat: number,
	zoneLng: number,
	triggerAngle: number = 0.15,
): boolean {
	const zonePos = latLngToVector3(zoneLat, zoneLng, PLANET_RADIUS);
	const distance = getDistance(playerPos, zonePos);
	return distance < triggerAngle;
}
