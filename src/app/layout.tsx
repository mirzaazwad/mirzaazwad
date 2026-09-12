import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Azwad's World | Mirza Mohammad Azwad",
	description:
		"An interactive 3D world portfolio by Mirza Mohammad Azwad — Software Engineer at bKash Ltd., AI/ML Researcher, Full-stack Developer. Explore projects, publications, and experience.",
	keywords: [
		"Mirza Mohammad Azwad",
		"Software Engineer",
		"AI Researcher",
		"Full-stack Developer",
		"bKash",
		"Portfolio",
		"Dhaka",
		"Bangladesh",
	],
	authors: [{ name: "Mirza Mohammad Azwad" }],
	openGraph: {
		title: "Azwad's World | Mirza Mohammad Azwad",
		description:
			"Explore Azwad's World — an interactive 3D portfolio by Mirza Mohammad Azwad",
		type: "website",
	},
	icons: {
		icon: "/icon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
				inter.variable,
				jetbrainsMono.variable,
				"h-full overflow-hidden",
			)}
		>
			<body className="h-full w-full overflow-hidden bg-black m-0 p-0">
				<main className="fixed inset-0 w-screen h-screen">{children}</main>
			</body>
		</html>
	);
}
