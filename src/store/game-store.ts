import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlayerPosition {
	lat: number;
	lng: number;
	radius: number;
}

export interface GameState {
	isInitialized: boolean;
	isLoading: boolean;
	shadersReady: boolean;
	currentZone: string | null;
	showZoneInfo: boolean;
	zoneContent: ZoneContent | null;
	playerPosition: PlayerPosition;
	cameraPosition: { x: number; y: number; z: number };
	cameraYaw: number;
	visitedZones: Set<string>;
	settings: {
		musicEnabled: boolean;
		sfxEnabled: boolean;
		graphicsQuality: "low" | "medium" | "high";
		reducedMotion: boolean;
	};
	moveInput: { up: boolean; down: boolean; left: boolean; right: boolean };
	timeOfDay: number;
	xp: number;
	level: number;
	actions: {
		initialize: () => void;
		setLoading: (loading: boolean) => void;
		setShadersReady: () => void;
		enterZone: (zoneId: string, content: ZoneContent) => void;
		exitZone: () => void;
		updatePlayerPosition: (position: Partial<PlayerPosition>) => void;
		updateCameraPosition: (
			position: { x: number; y: number; z: number },
			yaw: number,
		) => void;
		markZoneVisited: (zoneId: string) => void;
		setMoveInput: (
			input: Partial<{
				up: boolean;
				down: boolean;
				left: boolean;
				right: boolean;
			}>,
		) => void;
		toggleMusic: () => void;
		toggleSfx: () => void;
		setGraphicsQuality: (quality: "low" | "medium" | "high") => void;
		setReducedMotion: (enabled: boolean) => void;
		setTimeOfDay: (time: number) => void;
		addXp: (amount: number) => void;
	};
}

export interface ZoneContent {
	id: string;
	title: string;
	description: string;
	type:
		| "about"
		| "experience"
		| "projects"
		| "research"
		| "skills"
		| "contact"
		| "education"
		| "awards";
	data: unknown;
}

const initialPlayerPosition: PlayerPosition = {
	lat: 0,
	lng: 0,
	radius: 10,
};

const initialState = {
	isInitialized: false,
	isLoading: true,
	shadersReady: false,
	currentZone: null,
	showZoneInfo: false,
	zoneContent: null,
	playerPosition: initialPlayerPosition,
	cameraPosition: { x: 0, y: 5, z: 15 },
	cameraYaw: 0,
	visitedZones: new Set<string>(),
	moveInput: { up: false, down: false, left: false, right: false },
	settings: {
		musicEnabled: true,
		sfxEnabled: true,
		graphicsQuality: "high" as const,
		reducedMotion: false,
	},
	timeOfDay: 0.5,
	xp: 0,
	level: 1,
};

export const useGameStore = create<GameState>()(
	persist(
		(set, _get) => ({
			...initialState,
			actions: {
				initialize: () => {
					set({ isInitialized: true });
				},
				setLoading: (loading: boolean) => {
					set({ isLoading: loading });
				},
				setShadersReady: () => {
					set({ shadersReady: true, isLoading: false });
				},
				enterZone: (zoneId: string, content: ZoneContent) => {
					set((state) => {
						const isNewZone = !state.visitedZones.has(zoneId);
						const newVisited = new Set(state.visitedZones).add(zoneId);
						let xpGain = 0;
						if (isNewZone) {
							xpGain = 100;
						}

						let newXp = state.xp + xpGain;
						const nextLevelXp = state.level * 500;
						let newLevel = state.level;

						if (newXp >= nextLevelXp) {
							newLevel += 1;
							newXp -= nextLevelXp;
						}

						return {
							currentZone: zoneId,
							showZoneInfo: true,
							zoneContent: content,
							visitedZones: newVisited,
							xp: newXp,
							level: newLevel,
						};
					});
				},
				exitZone: () => {
					set({
						currentZone: null,
						showZoneInfo: false,
						zoneContent: null,
					});
				},
				updatePlayerPosition: (position: Partial<PlayerPosition>) => {
					set((state) => ({
						playerPosition: { ...state.playerPosition, ...position },
					}));
				},
				updateCameraPosition: (
					position: { x: number; y: number; z: number },
					yaw: number,
				) => {
					set({ cameraPosition: position, cameraYaw: yaw });
				},
				markZoneVisited: (zoneId: string) => {
					set((state) => ({
						visitedZones: new Set([...state.visitedZones, zoneId]),
					}));
				},
				setMoveInput: (input) => {
					set((state) => ({ moveInput: { ...state.moveInput, ...input } }));
				},
				toggleMusic: () => {
					set((state) => ({
						settings: {
							...state.settings,
							musicEnabled: !state.settings.musicEnabled,
						},
					}));
				},
				toggleSfx: () => {
					set((state) => ({
						settings: {
							...state.settings,
							sfxEnabled: !state.settings.sfxEnabled,
						},
					}));
				},
				setGraphicsQuality: (quality: "low" | "medium" | "high") => {
					set((state) => ({
						settings: { ...state.settings, graphicsQuality: quality },
					}));
				},
				setReducedMotion: (enabled: boolean) => {
					set((state) => ({
						settings: { ...state.settings, reducedMotion: enabled },
					}));
				},
				setTimeOfDay: (time: number) => {
					set({ timeOfDay: Math.max(0, Math.min(1, time)) });
				},
				addXp: (amount: number) => {
					set((state) => {
						let newXp = state.xp + amount;
						const nextLevelXp = state.level * 500;
						let newLevel = state.level;

						if (newXp >= nextLevelXp) {
							newLevel += 1;
							newXp -= nextLevelXp;
						}

						return {
							xp: newXp,
							level: newLevel,
						};
					});
				},
			},
		}),
		{
			name: "azwad-portfolio-game",
			partialize: (state) => ({
				visitedZones: Array.from(state.visitedZones),
				settings: state.settings,
			}),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.visitedZones = new Set(
						state.visitedZones as unknown as string[],
					);
				}
			},
		},
	),
);

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameSettings = () => useGameStore((state) => state.settings);
export const usePlayerPosition = () =>
	useGameStore((state) => state.playerPosition);
export const useCurrentZone = () =>
	useGameStore((state) => ({
		currentZone: state.currentZone,
		showZoneInfo: state.showZoneInfo,
		zoneContent: state.zoneContent,
	}));
export const useVisitedZones = () =>
	useGameStore((state) => state.visitedZones);
