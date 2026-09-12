"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/game-store";

export function useMovementKeys() {
	const setMoveInput = useGameStore((s) => s.actions.setMoveInput);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.code) {
				case "ArrowUp":
				case "KeyW":
					setMoveInput({ up: true });
					break;
				case "ArrowDown":
				case "KeyS":
					setMoveInput({ down: true });
					break;
				case "ArrowLeft":
				case "KeyA":
					setMoveInput({ left: true });
					break;
				case "ArrowRight":
				case "KeyD":
					setMoveInput({ right: true });
					break;
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.code) {
				case "ArrowUp":
				case "KeyW":
					setMoveInput({ up: false });
					break;
				case "ArrowDown":
				case "KeyS":
					setMoveInput({ down: false });
					break;
				case "ArrowLeft":
				case "KeyA":
					setMoveInput({ left: false });
					break;
				case "ArrowRight":
				case "KeyD":
					setMoveInput({ right: false });
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [setMoveInput]);
}
