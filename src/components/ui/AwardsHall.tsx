"use client";

import { Calendar, Trophy } from "lucide-react";

interface AwardsHallProps {
	awards: Array<{
		title: string;
		year: number;
		description: string;
	}>;
}

export function AwardsHall({ awards }: AwardsHallProps) {
	const sortedAwards = [...awards].sort((a, b) => b.year - a.year);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{sortedAwards.map((award) => (
				<article
					key={`${award.title}-${award.year}`}
					className="glass rounded-xl p-5 border border-gray-700/50 hover:border-yellow-400/50 transition-all relative overflow-hidden"
				>
					<div className="absolute top-3 right-3 text-yellow-400/50">
						<Trophy className="w-8 h-8" />
					</div>
					<div className="relative z-10">
						<div className="flex items-center justify-between mb-2">
							<span className="text-xs font-mono text-yellow-400/80">
								{award.year}
							</span>
							<Calendar className="w-4 h-4 text-gray-500" />
						</div>
						<h4 className="font-bold text-white text-lg leading-snug">
							{award.title}
						</h4>
						{award.description && (
							<p className="text-gray-400 text-sm mt-2">{award.description}</p>
						)}
					</div>
				</article>
			))}
		</div>
	);
}
