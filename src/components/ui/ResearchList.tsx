"use client";

import { Award, ExternalLink, FileText } from "lucide-react";

interface ResearchListProps {
	research: Array<{
		title: string;
		venue: string;
		year: number;
		description: string;
		doi?: string;
	}>;
}

export function ResearchList({ research }: ResearchListProps) {
	return (
		<div className="space-y-4">
			{research.map((paper) => (
				<article
					key={`${paper.title}-${paper.year}`}
					className="glass rounded-xl p-5 border border-gray-700/50 hover:border-cyan-400/30 transition-all"
				>
					<div className="flex items-start justify-between gap-4 mb-2">
						<div className="flex-1">
							<h4 className="font-bold text-white text-lg mb-1">
								{paper.title}
							</h4>
							<div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
								<span className="flex items-center gap-1">
									<Award className="w-3 h-3" />
									{paper.venue}
								</span>
								<span>{paper.year}</span>
							</div>
						</div>
					</div>
					<p className="text-gray-300 text-sm mb-3 leading-relaxed">
						{paper.description}
					</p>
					{paper.doi && (
						<a
							href={`https://doi.org/${paper.doi}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
						>
							<FileText className="w-4 h-4" />
							<span>DOI: {paper.doi}</span>
							<ExternalLink className="w-3 h-3" />
						</a>
					)}
				</article>
			))}
		</div>
	);
}
