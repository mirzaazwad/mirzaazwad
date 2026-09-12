"use client";

import { Calendar, GraduationCap } from "lucide-react";

interface EducationPanelProps {
	education: Array<{
		degree: string;
		institution: string;
		period: string;
		details: string;
	}>;
}

export function EducationPanel({ education }: EducationPanelProps) {
	return (
		<div className="space-y-4">
			{education.map((edu) => (
				<article
					key={`${edu.degree}-${edu.institution}`}
					className="glass rounded-xl p-5 border border-gray-700/50 hover:border-cyan-400/30 transition-all"
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
							<GraduationCap className="w-6 h-6 text-cyan-400" />
						</div>
						<div className="flex-1">
							<h4 className="font-bold text-white text-lg">{edu.degree}</h4>
							<p className="text-cyan-400 font-medium">{edu.institution}</p>
							<div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
								<span className="flex items-center gap-1">
									<Calendar className="w-3 h-3" />
									{edu.period}
								</span>
							</div>
							<p className="text-gray-300 mt-2">{edu.details}</p>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}
