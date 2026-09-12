"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { profileData } from "@/lib/profile-data";
import { useGameStore } from "@/store/game-store";
import { AboutPanel } from "./AboutPanel";
import { AwardsHall } from "./AwardsHall";
import { ContactPanel } from "./ContactPanel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { EducationPanel } from "./EducationPanel";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ProjectGrid } from "./ProjectGrid";
import { ResearchList } from "./ResearchList";
import { SkillsConstellation } from "./SkillsConstellation";
import { TextVariant } from "./TextVariant";

type ZoneType =
	| "about"
	| "experience"
	| "projects"
	| "research"
	| "skills"
	| "education"
	| "awards"
	| "contact";

interface ZoneOverlayProps {
	zone: {
		id: string;
		title: string;
		description: string;
		type: ZoneType;
		data: unknown;
	};
	onClose: () => void;
}

const ZONE_ORDER: ZoneType[] = [
	"about",
	"experience",
	"projects",
	"research",
	"skills",
	"education",
	"awards",
	"contact",
];

function getZoneContent(zoneId: ZoneType) {
	switch (zoneId) {
		case "about":
			return <AboutPanel data={profileData} />;
		case "experience":
			return <ExperienceTimeline experiences={profileData.experience} />;
		case "projects":
			return <ProjectGrid projects={profileData.projects} />;
		case "research":
			return <ResearchList research={profileData.research} />;
		case "skills":
			return <SkillsConstellation skills={profileData.skills} />;
		case "education":
			return <EducationPanel education={profileData.education} />;
		case "awards":
			return <AwardsHall awards={profileData.awards} />;
		case "contact":
			return <ContactPanel identity={profileData.identity} />;
		default:
			return (
				<div className="p-8 text-center text-gray-400">
					Content not available
				</div>
			);
	}
}

export function ZoneOverlay({ zone, onClose }: ZoneOverlayProps) {
	const [currentIndex, setCurrentIndex] = useState(
		ZONE_ORDER.indexOf(zone.id as ZoneType),
	);
	const [isAnimating, setIsAnimating] = useState(false);

	const navigate = useCallback(
		(direction: number) => {
			if (isAnimating) return;
			setIsAnimating(true);
			const newIndex =
				(currentIndex + direction + ZONE_ORDER.length) % ZONE_ORDER.length;
			setCurrentIndex(newIndex);
			const newZoneId = ZONE_ORDER[newIndex];
			useGameStore.getState().actions.enterZone(newZoneId, {
				id: newZoneId,
				title: newZoneId,
				description: "",
				type: newZoneId,
				data: null,
			});
			setTimeout(() => setIsAnimating(false), 300);
		},
		[currentIndex, isAnimating],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") navigate(-1);
			if (e.key === "ArrowRight") navigate(1);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose, navigate]);

	const currentZoneId = ZONE_ORDER[currentIndex];

	return (
		<Dialog open onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className="glass-strong max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-cyan-400/20 p-0 sm:max-w-4xl"
				showCloseButton={false}
			>
				<DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-cyan-400/20 space-y-0">
					<DialogTitle asChild>
						<TextVariant variant="h2" className="tracking-wide uppercase">
							{currentZoneId}
						</TextVariant>
					</DialogTitle>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => navigate(-1)}
							disabled={isAnimating}
							className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
							aria-label="Previous zone"
						>
							<ChevronLeft className="w-5 h-5 text-cyan-300" />
						</button>
						<button
							type="button"
							onClick={() => navigate(1)}
							disabled={isAnimating}
							className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
							aria-label="Next zone"
						>
							<ChevronRight className="w-5 h-5 text-cyan-300" />
						</button>
						<button
							type="button"
							onClick={onClose}
							className="p-2 rounded-lg hover:bg-white/10 transition-colors"
							aria-label="Close"
						>
							<X className="w-5 h-5 text-gray-400 hover:text-white" />
						</button>
					</div>
				</DialogHeader>

				<div className="p-4 md:p-6 overflow-y-auto max-h-[70vh]">
					<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
						{getZoneContent(currentZoneId)}
					</div>
				</div>

				<div className="flex justify-center gap-4 p-4 border-t border-cyan-400/20">
					{ZONE_ORDER.map((zoneId) => (
						<button
							type="button"
							key={zoneId}
							onClick={() => {
								const index = ZONE_ORDER.indexOf(zoneId);
								if (index >= 0) setCurrentIndex(index);
								useGameStore.getState().actions.enterZone(zoneId, {
									id: zoneId,
									title: zoneId,
									description: "",
									type: zoneId as ZoneType,
									data: null,
								});
							}}
							className={`w-2 h-2 rounded-full transition-all ${
								zoneId === currentZoneId
									? "bg-cyan-400 w-6"
									: "bg-gray-600 hover:bg-gray-400"
							}`}
							aria-label={`Go to ${zoneId}`}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
