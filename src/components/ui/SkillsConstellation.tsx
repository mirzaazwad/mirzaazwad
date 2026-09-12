"use client";

import {
	Award,
	Brain,
	Cloud,
	Code,
	Database,
	Layers,
	Server,
} from "lucide-react";
import { useState } from "react";

interface SkillsConstellationProps {
	skills: {
		languages: string[];
		databases: string[];
		frameworks: string[];
		cloud: string[];
		devops: string[];
		aiMl: string[];
		certifications: string[];
		languagesSpoken: string[];
	};
}

const SKILL_CATEGORIES = [
	{
		key: "languages",
		label: "Languages",
		icon: Code,
		color: "from-cyan-500 to-blue-500",
		count: 6,
	},
	{
		key: "frameworks",
		label: "Frameworks",
		icon: Layers,
		color: "from-purple-500 to-pink-500",
		count: 7,
	},
	{
		key: "databases",
		label: "Databases",
		icon: Database,
		color: "from-emerald-500 to-teal-500",
		count: 4,
	},
	{
		key: "cloud",
		label: "Cloud",
		icon: Cloud,
		color: "from-orange-500 to-red-500",
		count: 3,
	},
	{
		key: "devops",
		label: "DevOps",
		icon: Server,
		color: "from-indigo-500 to-blue-500",
		count: 12,
	},
	{
		key: "aiMl",
		label: "AI/ML",
		icon: Brain,
		color: "from-pink-500 to-rose-500",
		count: 6,
	},
	{
		key: "certifications",
		label: "Certifications",
		icon: Award,
		color: "from-yellow-500 to-orange-500",
		count: 6,
	},
	{
		key: "languagesSpoken",
		label: "Languages Spoken",
		icon: Code,
		color: "from-green-500 to-emerald-500",
		count: 2,
	},
];

export function SkillsConstellation({ skills }: SkillsConstellationProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const getCategory = (key: string) =>
		SKILL_CATEGORIES.find((c) => c.key === key);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				{SKILL_CATEGORIES.map((cat) => {
					const categorySkills = skills[
						cat.key as keyof typeof skills
					] as string[];
					const isSelected = selectedCategory === cat.key;

					return (
						<button
							type="button"
							key={cat.key}
							onClick={() => setSelectedCategory(isSelected ? null : cat.key)}
							className={`relative group p-4 rounded-xl border transition-all ${
								isSelected
									? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
									: "border-gray-700/50 hover:border-cyan-400/50"
							}`}
						>
							<div className="flex items-center gap-3">
								<div
									className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}
								>
									<cat.icon className="w-5 h-5 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<span className="font-medium text-white">{cat.label}</span>
									<span className="text-xs text-gray-500">
										{categorySkills.length} items
									</span>
								</div>
							</div>
							<div
								className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all ${isSelected ? "bg-cyan-400" : "bg-gray-600"}`}
							/>
						</button>
					);
				})}
			</div>

			{selectedCategory &&
				getCategory(selectedCategory) &&
				(() => {
					const cat = getCategory(selectedCategory);
					if (!cat) return null;
					return (
						<div className="animate-in fade-in slide-in-from-top-2 duration-300 glass rounded-xl p-5 border border-cyan-400/20">
							<div className="flex items-center justify-between mb-4">
								<h4 className="font-bold text-white text-lg flex items-center gap-2">
									<cat.icon className="w-5 h-5" />
									{cat.label}
								</h4>
								<button
									type="button"
									onClick={() => setSelectedCategory(null)}
									className="text-gray-400 hover:text-white text-sm"
								>
									Close
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{(
									skills[selectedCategory as keyof typeof skills] as string[]
								).map((skill) => (
									<span
										key={skill}
										className="px-3 py-1.5 text-sm bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					);
				})()}
		</div>
	);
}
