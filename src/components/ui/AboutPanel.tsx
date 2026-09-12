"use client";

import {
	Award,
	ExternalLink,
	Globe,
	GraduationCap,
	Link2 as LinkedinIcon,
	Mail,
	User,
} from "lucide-react";
import type { profileData } from "@/lib/profile-data";

interface AboutPanelProps {
	data: typeof profileData;
}

export function AboutPanel({ data }: AboutPanelProps) {
	const links = [
		{ label: "GitHub", url: data.identity.github, icon: ExternalLink },
		{ label: "LinkedIn", url: data.identity.linkedin, icon: LinkedinIcon },
		{
			label: "Google Scholar",
			url: data.identity.scholar,
			icon: GraduationCap,
		},
		{ label: "ORCID", url: data.identity.orcid, icon: Award },
		{ label: "Portfolio", url: data.identity.portfolio, icon: Globe },
		{ label: "Email", url: `mailto:${data.identity.email}`, icon: Mail },
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
					<User className="w-10 h-10 text-white" />
				</div>
				<div>
					<h3 className="text-2xl font-bold text-white">
						{data.identity.name}
					</h3>
					<p className="text-cyan-400">Software Engineer L-1 at bKash Ltd.</p>
					<p className="text-gray-400 text-sm">{data.identity.location}</p>
				</div>
			</div>

			<div className="prose prose-invert max-w-none">
				<p className="text-gray-300 leading-relaxed">{data.bio}</p>
			</div>

			<div className="flex flex-wrap gap-3">
				{links.map((link) => (
					<a
						key={link.label}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors text-sm"
					>
						<link.icon className="w-4 h-4 text-cyan-400" />
						<span className="text-gray-300">{link.label}</span>
					</a>
				))}
			</div>
		</div>
	);
}
