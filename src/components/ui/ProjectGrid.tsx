"use client";

import { ExternalLink, Star } from "lucide-react";

interface ProjectGridProps {
	projects: Array<{
		name: string;
		description: string;
		technologies: string[];
		github?: string;
		highlight?: boolean;
	}>;
}

export function ProjectGrid({ projects }: ProjectGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{projects.map((project) => (
				<article
					key={project.name}
					className={`glass rounded-xl p-5 border ${
						project.highlight
							? "border-cyan-400/30 shadow-lg shadow-cyan-500/10"
							: "border-gray-700/50"
					} hover:border-cyan-400/50 transition-all`}
				>
					<div className="flex items-start justify-between gap-2 mb-3">
						<h4 className="font-bold text-white text-lg flex-1">
							{project.name}
						</h4>
						{project.highlight && (
							<Star
								className="w-5 h-5 text-yellow-400 flex-shrink-0"
								aria-label="Highlighted Project"
							/>
						)}
					</div>
					<p className="text-gray-300 text-sm mb-4 line-clamp-3">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-2 mb-4">
						{project.technologies.slice(0, 6).map((tech) => (
							<span
								key={tech}
								className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-600"
							>
								{tech}
							</span>
						))}
						{project.technologies.length > 6 && (
							<span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-500 rounded border border-gray-600">
								+{project.technologies.length - 6} more
							</span>
						)}
					</div>
					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
						>
							<ExternalLink className="w-4 h-4" />
							<span>View Code</span>
						</a>
					)}
				</article>
			))}
		</div>
	);
}
