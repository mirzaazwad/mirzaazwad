export const profileData = {
	identity: {
		name: "Mirza Mohammad Azwad",
		email: "mirzaazwad8@gmail.com",
		phone: "+8801991-681338",
		location: "Dhaka, Bangladesh",
		github: "https://github.com/mirzaazwad",
		linkedin: "https://www.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4/",
		scholar: "https://scholar.google.com/citations?user=EPII4T0AAAAJ&hl=en",
		orcid: "https://orcid.org/0009-0007-5050-3537",
		portfolio: "https://mirzaazwad-portfolio.netlify.app/",
		facebook: "https://m.facebook.com/mirza.mohammadazwad.5/",
	},
	bio: 'Software Engineer L-1 at bKash Ltd. (Product Engineering, augmented via Intelligent Machines Ltd.), based in Dhaka, Bangladesh. B.Sc. in Software Engineering from Islamic University of Technology (CGPA 3.91, 2021–2025). Works across backend engineering, cloud/DevOps, and applied AI/computer vision research. GitHub bio line: "Searching for interesting projects."',
	experience: [
		{
			company: "bKash Ltd.",
			role: "Software Engineer L-1, Product Engineering",
			period: "Jan 2026 – Present",
			description: [
				"Architected the Infinity Business Platform (Express.js + FastAPI, CQRS, SAGA, API Gateway patterns, fault-tolerant message queues)",
				'Optimized the "Bitoron" relief disbursement pipeline on a multi-node ScyllaDB cluster',
				"Led architectural redesign of an agent-location system with real-time observability",
				"Migrated bKash's facial recognition service from AWS Rekognition to a self-hosted DeepFace solution for on-premises execution",
			],
			technologies: [
				"Express.js",
				"FastAPI",
				"CQRS",
				"SAGA",
				"API Gateway",
				"ScyllaDB",
				"DeepFace",
				"Docker",
				"Kubernetes",
			],
		},
		{
			company: "Intelligent Machines Ltd.",
			role: "Junior Software Engineer, Product Engineering",
			period: "Oct 2025 – Dec 2025",
			description: [
				"OCR-based financial analyzer for Prime Bank (Tesseract)",
				"Async video-analytics pipelines (OpenCV) for a Grameenphone customer-service monitoring system",
				"Observability tooling (Grafana/Prometheus/Loki)",
				"SonarQube code-quality enforcement",
			],
			technologies: [
				"Tesseract",
				"OpenCV",
				"Grafana",
				"Prometheus",
				"Loki",
				"SonarQube",
				"Python",
				"Django",
			],
		},
		{
			company: "Intelligent Machines Ltd.",
			role: "Software Engineer Trainee, Product Engineering",
			period: "Oct 2024 – Sep 2025",
			description: [
				"Services in Express.js/Django/FastAPI/React.js/Flutter",
				"AWS EC2 + Kubernetes infra",
				"AWS Rekognition attendance system that scaled into bKash's centralized authentication service",
				"Automated Tesseract OCR for bank cheque processing",
				"Contributed to a government (a2i) blockchain livestock-traceability system",
			],
			technologies: [
				"Express.js",
				"Django",
				"FastAPI",
				"React.js",
				"Flutter",
				"AWS",
				"Kubernetes",
				"Rekognition",
				"Blockchain",
			],
		},
		{
			company: "Intelligent Machines Ltd.",
			role: "Software Engineering Intern, Product/AI Engineering",
			period: "Jun 2024 – Sep 2024",
			description: [
				"Prototyped full-stack apps (React.js, Django, Express.js)",
				"PoC AI pipelines (multilingual OCR, facial recognition)",
			],
			technologies: [
				"React.js",
				"Django",
				"Express.js",
				"Python",
				"OCR",
				"Computer Vision",
			],
		},
	],
	skills: {
		languages: ["Python", "JavaScript", "TypeScript", "Java", "C#", "Bash"],
		databases: ["MySQL", "PostgreSQL", "MongoDB", "ScyllaDB"],
		frameworks: ["Next.js", "Express.js", "Spring Boot", "Django", "FastAPI"],
		cloud: ["AWS", "GCP", "Azure"],
		devops: [
			"GitHub Actions",
			"Terraform",
			"Docker",
			"Kubernetes",
			"RabbitMQ",
			"Jenkins",
			"Harbor",
			"Trivy",
			"Zap",
			"Prometheus",
			"Grafana",
			"Loki",
		],
		aiMl: [
			"PyTorch",
			"TensorFlow",
			"FastAI",
			"Agentic Systems",
			"LangChain",
			"ChromaDB",
		],
		certifications: [
			"DeepLearning.AI — Supervised ML",
			"DeepLearning.AI — Advanced Learning Algorithms",
			"DeepLearning.AI — Unsupervised Learning",
			"DeepLearning.AI — Recommenders",
			"DeepLearning.AI — Reinforcement Learning",
		],
		languagesSpoken: ["English (IELTS 8.5)", "Bangla"],
	},
	research: [
		{
			title:
				"SIMCODE: A Benchmark for Natural Language to ns-3 Network Simulation Code Generation",
			venue: "IEEE LCN 2025 (CORE A)",
			year: 2025,
			description:
				"Collaborated with Queen's University GOAL Lab; 400-task benchmark dataset; evaluated Gemini-2.0/GPT-4.1",
			doi: "10.1109/LCN65610.2025.11146057",
		},
		{
			title:
				"TYMBERT: Compressed BERT Variant for Resource-Constrained Environments",
			venue: "2025 2nd Int'l Conf. on Next-Gen Computing, IoT and ML (NCIM)",
			year: 2025,
			description:
				"Knowledge distillation + FP16 quantization, 15x size reduction, 0.9995 AUC for real-time SMS spam detection",
			doi: "10.1109/NCIM65934.2025.11160230",
		},
		{
			title: "SLR on NLP in Software Debugging",
			venue: "Elsevier Science of Computer Programming (Q3)",
			year: 2024,
			description:
				"Systematic review of 50 studies (2000–2023), novel taxonomy for NLP in bug categorization/localization/resolution",
			doi: "10.2139/ssrn.5060080",
		},
		{
			title: "TransSeg: Hybrid CNN-Transformer for Medical Image Segmentation",
			venue: "Undergraduate Thesis",
			year: 2025,
			description:
				"Hybrid CNN-Transformer (convolutional feature extraction + Transformer global context + dynamic task-aware prompt fusion) evaluated on 4 clinical datasets (incl. BraTS 2021, Prostate MRI)",
		},
	],
	projects: [
		{
			name: "TaxWizard",
			description:
				"Terraform IaC + GitHub Actions CI/CD to Google Cloud Run, Datadog monitoring. DU ITverse DevOps Segment, 2024",
			technologies: [
				"Terraform",
				"GitHub Actions",
				"Google Cloud Run",
				"Datadog",
			],
			github: "https://github.com/mirzaazwad/TaxWizard",
			highlight: true,
		},
		{
			name: "ProjectHub",
			description:
				"Real-time project-management platform, MERN + Socket.io, GitHub Actions/Cloud Build/Artifact Registry deploys. BUET DevSprint 2024",
			technologies: [
				"MERN",
				"Socket.io",
				"GitHub Actions",
				"Cloud Build",
				"Artifact Registry",
			],
			github: "https://github.com/mirzaazwad/ProjectHubClient",
			highlight: true,
		},
		{
			name: "BIT",
			description:
				"Microservices Java Spring Boot (Spring Cloud Gateway, WebSockets, MongoDB, PostgreSQL/Flyway), React frontend. Therap JavaFest 2024",
			technologies: [
				"Java",
				"Spring Boot",
				"Spring Cloud Gateway",
				"WebSockets",
				"MongoDB",
				"PostgreSQL",
				"Flyway",
				"React",
			],
			highlight: true,
		},
		{
			name: "Vaccine App",
			description:
				"HA vaccine-scheduling app, Google Cloud Run + Cloud Build + Datadog. BUET CSE Fest DevOps Segment 2023",
			technologies: [
				"Google Cloud Run",
				"Cloud Build",
				"Datadog",
				"Docker",
				"Kubernetes",
			],
			github: "https://github.com/mirzaazwad/vaccine-app-server",
			highlight: true,
		},
		{
			name: "Datanalytica.io",
			description:
				"Traditional ML simulation platform, Django + React (Vite) + MongoDB + Cloudinary. Islamic University of Technology",
			technologies: [
				"Django",
				"React",
				"Vite",
				"MongoDB",
				"Cloudinary",
				"Machine Learning",
			],
		},
		{
			name: "AIToolProject",
			description:
				"AI agent tool, design patterns / robust architecture (Python)",
			technologies: ["Python", "Design Patterns", "AI Agents", "Architecture"],
			github: "https://github.com/mirzaazwad/AIToolProject",
		},
		{
			name: "Diving Deeper (Brackleys GameJam 2023.2)",
			description: "C# game, 693rd internationally",
			technologies: ["C#", "Unity", "Game Development"],
			github:
				"https://github.com/mirzaazwad/Diving_Deeper_Brackleys_GameJam_2023.2",
		},
	],
	awards: [
		{ title: "Top 10, Therap JavaFest", year: 2024, description: "" },
		{ title: "Top 100, BUET IUPC", year: 2024, description: "" },
		{
			title: "1st Runner's Up, CodeCrafters Int'l Devsprint",
			year: 2024,
			description: "",
		},
		{
			title: "2nd Runners Up, BUET CSE Fest Hackathon (DevOps)",
			year: 2023,
			description: "",
		},
		{
			title: "5th, CodeRush 1.0 Intra IUT CTF (Team CyberShepards)",
			year: 2023,
			description: "",
		},
		{ title: "15th, DU ITverse CTF", year: 2023, description: "" },
		{
			title: "Participant, Brackleys GameJam 2023.2 (693rd internationally)",
			year: 2023,
			description: "",
		},
		{
			title:
				"13th, International Rover Design Challenge (IUT Mars Rover, Anirban)",
			year: 2022,
			description: "",
		},
		{
			title:
				"1st Runners Up, MIST Inter-University ICT Innovation Fest Hackathon",
			year: 2021,
			description: "",
		},
		{
			title: "Top 7, Intra First Year Programming Contest",
			year: 2021,
			description: "",
		},
		{
			title: "Top 300, National Cyber Drill 2021 (first CTF)",
			year: 2021,
			description: "",
		},
	],
	education: [
		{
			degree: "B.Sc. Eng. in Software Engineering",
			institution: "Islamic University of Technology",
			period: "2021–2025",
			details: "CGPA 3.91",
		},
		{
			degree: "O-Levels & A-Levels",
			institution: "SFX Greenherald Int'l School and College",
			period: "2007–2020",
			details: "8 A*, 1A and 4 A*, 1A",
		},
	],
};
