"use client";

import { Building2, ChevronDown, Code } from "lucide-react";
import { useState } from "react";

interface ExperienceTimelineProps {
	experiences: Array<{
		company: string;
		role: string;
		period: string;
		description: string[];
		technologies: string[];
	}>;
}

const ICONS: Record<string, typeof Building2> = {
	bKash: Building2,
	"Intelligent Machines": Code,
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
	const [expanded, setExpanded] = useState<string | null>(null);

	return (
		<div className="space-y-4">
			{experiences.map((exp) => {
				const isExpanded = expanded === exp.company;
				const Icon = ICONS[exp.company] || Code;

				return (
					<div
						key={`${exp.company}-${exp.role}`}
						className="glass rounded-xl p-5 border border-gray-700/50"
					>
						<button
							type="button"
							onClick={() => setExpanded(isExpanded ? null : exp.company)}
							className="w-full flex items-start gap-4 text-left"
						>
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
								<Icon className="w-6 h-6 text-cyan-400" />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between gap-4">
									<div>
										<h4 className="font-bold text-white text-lg">{exp.role}</h4>
										<p className="text-cyan-400 font-medium">{exp.company}</p>
									</div>
									<span className="text-gray-500 text-sm whitespace-nowrap">
										{exp.period}
									</span>
								</div>
								<ChevronDown
									className={`w-5 h-5 text-gray-500 transition-transform mt-1 ${isExpanded ? "rotate-180" : ""}`}
								/>
							</div>
						</button>

						<div
							className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
						>
							<div className="space-y-3 pt-2 border-t border-gray-700/50">
								<div>
									<h5 className="text-sm font-medium text-gray-400 mb-2">
										Key Achievements
									</h5>
									<ul className="space-y-1 pl-4">
										{exp.description.map((desc) => (
											<li
												key={desc}
												className="text-gray-300 text-sm flex items-start gap-2"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
												<span>{desc}</span>
											</li>
										))}
									</ul>
								</div>
								<div>
									<h5 className="text-sm font-medium text-gray-400 mb-2">
										Technologies
									</h5>
									<div className="flex flex-wrap gap-2">
										{exp.technologies.map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/20"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
