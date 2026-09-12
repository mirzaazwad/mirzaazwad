"use client";

import { Monitor, Sun, Volume2, VolumeX, X, Zap, ZapOff } from "lucide-react";
import { useState } from "react";
import { useGameStore } from "@/store/game-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { TextVariant } from "./TextVariant";

interface SettingsPanelProps {
	isOpen: boolean;
	onClose: () => void;
}

type TabId = "graphics" | "audio" | "accessibility";

const TABS: { id: TabId; label: string; icon: typeof Monitor }[] = [
	{ id: "graphics", label: "Graphics", icon: Monitor },
	{ id: "audio", label: "Audio", icon: Volume2 },
	{ id: "accessibility", label: "Accessibility", icon: Zap },
];

const QUALITIES = ["low", "medium", "high"] as const;

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
	const { settings, actions } = useGameStore();
	const [activeTab, setActiveTab] = useState<TabId>("graphics");

	if (!isOpen) return null;

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className="glass-strong w-full max-w-md rounded-2xl border border-cyan-400/20 p-0 sm:max-w-md"
				showCloseButton={false}
			>
				<DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-cyan-400/20 space-y-0">
					<DialogTitle asChild>
						<TextVariant variant="h2" className="text-xl">
							Settings
						</TextVariant>
					</DialogTitle>
					<button
						type="button"
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-white/10 transition-colors"
						aria-label="Close settings"
					>
						<X className="w-5 h-5 text-gray-400 hover:text-white" />
					</button>
				</DialogHeader>

				<div className="flex border-b border-cyan-400/20">
					{TABS.map((tab) => (
						<button
							type="button"
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
								activeTab === tab.id
									? "text-cyan-400 border-b-2 border-cyan-400"
									: "text-gray-500 hover:text-gray-300"
							}`}
						>
							<tab.icon className="w-4 h-4" />
							{tab.label}
						</button>
					))}
				</div>

				<div className="p-4 max-h-[60vh] overflow-y-auto">
					{activeTab === "graphics" && (
						<div className="space-y-6">
							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Sun className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Graphics Quality
									</TextVariant>
								</h3>
								<div className="grid grid-cols-3 gap-3">
									{QUALITIES.map((quality) => (
										<button
											type="button"
											key={quality}
											onClick={() => actions.setGraphicsQuality(quality)}
											className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
												settings.graphicsQuality === quality
													? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
													: "border-gray-700 text-gray-400 hover:border-gray-600"
											}`}
										>
											{quality.charAt(0).toUpperCase() + quality.slice(1)}
										</button>
									))}
								</div>
							</div>

							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Zap className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Reduced Motion
									</TextVariant>
								</h3>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={settings.reducedMotion}
										onChange={(e) => actions.setReducedMotion(e.target.checked)}
										className="w-4 h-4 accent-cyan-400 rounded border-gray-600"
									/>
									<span className="text-gray-300">
										Reduce animations and particle effects
									</span>
								</label>
							</div>
						</div>
					)}

					{activeTab === "audio" && (
						<div className="space-y-6">
							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Volume2 className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Master Volume
									</TextVariant>
								</h3>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={settings.musicEnabled}
										onChange={() => actions.toggleMusic()}
										className="w-5 h-5 accent-cyan-400 rounded border-gray-600"
									/>
									<span className="text-gray-300">Background Music</span>
									{settings.musicEnabled ? (
										<Volume2 className="w-5 h-5 text-cyan-400" />
									) : (
										<VolumeX className="w-5 h-5 text-gray-500" />
									)}
								</label>
							</div>

							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Volume2 className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Sound Effects
									</TextVariant>
								</h3>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										checked={settings.sfxEnabled}
										onChange={() => actions.toggleSfx()}
										className="w-5 h-5 accent-cyan-400 rounded border-gray-600"
									/>
									<span className="text-gray-300">Zone interaction sounds</span>
								</label>
							</div>
						</div>
					)}

					{activeTab === "accessibility" && (
						<div className="space-y-6">
							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Monitor className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										High Contrast Mode
									</TextVariant>
								</h3>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										className="w-5 h-5 accent-cyan-400 rounded border-gray-600"
									/>
									<span className="text-gray-300">
										Increase contrast for better visibility
									</span>
								</label>
							</div>

							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<Zap className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Keyboard Navigation
									</TextVariant>
								</h3>
								<p className="text-gray-400 text-sm mb-4">
									Use arrow keys to navigate between zones. Press Escape to
									close overlays.
								</p>
								<div className="space-y-2 text-sm text-gray-500">
									<div className="flex justify-between">
										<span>W / ↑</span>
										<span>Move Forward</span>
									</div>
									<div className="flex justify-between">
										<span>S / ↓</span>
										<span>Move Backward</span>
									</div>
									<div className="flex justify-between">
										<span>A / ←</span>
										<span>Turn Left</span>
									</div>
									<div className="flex justify-between">
										<span>D / →</span>
										<span>Turn Right</span>
									</div>
									<div className="flex justify-between">
										<span>Enter / Click</span>
										<span>Enter Zone</span>
									</div>
									<div className="flex justify-between">
										<span>Escape</span>
										<span>Close Overlay</span>
									</div>
								</div>
							</div>

							<div>
								<h3 className="font-medium text-white mb-4 flex items-center gap-2">
									<ZapOff className="w-4 h-4" />
									<TextVariant variant="h3" className="text-base text-white">
										Screen Reader Support
									</TextVariant>
								</h3>
								<p className="text-gray-400 text-sm">
									All interactive elements have proper ARIA labels and
									announcements for zone changes.
								</p>
							</div>
						</div>
					)}
				</div>

				<div className="p-4 border-t border-cyan-400/20 flex justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors font-medium"
					>
						Done
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
