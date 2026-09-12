export interface ProfileData {
	identity: {
		name: string;
		email: string;
		phone: string;
		location: string;
		github: string;
		linkedin: string;
		scholar: string;
		orcid: string;
		portfolio: string;
		facebook: string;
	};
	bio: string;
	experience: Experience[];
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
	research: Research[];
	projects: Project[];
	awards: Award[];
	education: Education[];
}

export interface Experience {
	company: string;
	role: string;
	period: string;
	description: string[];
	technologies: string[];
}

export interface Research {
	title: string;
	venue: string;
	year: number;
	description: string;
	doi?: string;
	link?: string;
}

export interface Project {
	name: string;
	description: string;
	technologies: string[];
	github?: string;
	link?: string;
	highlight?: boolean;
}

export interface Award {
	title: string;
	year: number;
	description: string;
}

export interface Education {
	degree: string;
	institution: string;
	period: string;
	details: string;
}
