"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/game-store";

export function GameAudio() {
	const { settings } = useGameStore();
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = new Audio("/robot.mp3");
		audioRef.current.loop = true;
		audioRef.current.volume = settings.musicEnabled ? 0.3 : 0;

		const playAudio = () => {
			if (audioRef.current && settings.musicEnabled) {
				audioRef.current.play().catch(() => {});
			}
		};

		document.addEventListener("click", playAudio, { once: true });
		document.addEventListener("keydown", playAudio, { once: true });

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, [settings.musicEnabled]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = settings.musicEnabled ? 0.3 : 0;
		}
	}, [settings.musicEnabled]);

	return null;
}
