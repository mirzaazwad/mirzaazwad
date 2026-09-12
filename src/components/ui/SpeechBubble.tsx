"use client";

import { useEffect, useState } from "react";

interface BubbleState {
	message: string;
	visible: boolean;
}

export function SpeechBubble() {
	const [bubble, setBubble] = useState<BubbleState>({
		message: "",
		visible: false,
	});

	useEffect(() => {
		const greetTimer = setTimeout(() => {
			setBubble({
				message:
					"Welcome to Mars! Use WASD or Arrow Keys to explore the planet.",
				visible: true,
			});
		}, 1500);

		const hideTimer = setTimeout(() => {
			setBubble((prev) => ({ ...prev, visible: false }));
		}, 8000);

		const idleTimer = setInterval(() => {
			setBubble({
				message: "Waiting for command... Use WASD/Arrows to move",
				visible: true,
			});
			setTimeout(() => {
				setBubble((prev) => ({ ...prev, visible: false }));
			}, 5000);
		}, 45000);

		return () => {
			clearTimeout(greetTimer);
			clearTimeout(hideTimer);
			clearInterval(idleTimer);
		};
	}, []);

	if (!bubble.visible) return null;

	return (
		<div className="fixed top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
			<div
				className={`relative bg-[#1a0a04]/90 border border-[#e86100]/40 rounded-xl px-6 py-3 max-w-md text-center transition-all duration-500 ${
					bubble.visible
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-4"
				}`}
			>
				<p className="text-[#ffcc88] font-mono text-sm leading-relaxed">
					{bubble.message}
				</p>
				<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a0a04]/90 border-b border-r border-[#e86100]/40 rotate-45" />
			</div>
		</div>
	);
}
