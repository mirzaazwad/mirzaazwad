"use client";

import {
	Award,
	Check,
	Copy,
	ExternalLink,
	Globe,
	GraduationCap,
	Link2 as LinkedinIcon,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";
import { useState } from "react";

interface ContactPanelProps {
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
}

export function ContactPanel({ identity }: ContactPanelProps) {
	const [copied, setCopied] = useState<string | null>(null);

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		setCopied(label);
		setTimeout(() => setCopied(null), 2000);
	};

	const contacts = [
		{
			label: "Email",
			value: identity.email,
			icon: Mail,
			copyable: true,
			href: `mailto:${identity.email}`,
		},
		{
			label: "Phone",
			value: identity.phone,
			icon: Phone,
			copyable: true,
			href: `tel:${identity.phone}`,
		},
		{
			label: "Location",
			value: identity.location,
			icon: MapPin,
			copyable: false,
		},
		{
			label: "GitHub",
			value: identity.github,
			icon: ExternalLink,
			copyable: false,
			href: identity.github,
			external: true,
		},
		{
			label: "LinkedIn",
			value: identity.linkedin,
			icon: LinkedinIcon,
			copyable: false,
			href: identity.linkedin,
			external: true,
		},
		{
			label: "Google Scholar",
			value: identity.scholar,
			icon: GraduationCap,
			copyable: false,
			href: identity.scholar,
			external: true,
		},
		{
			label: "ORCID",
			value: identity.orcid,
			icon: Award,
			copyable: false,
			href: identity.orcid,
			external: true,
		},
		{
			label: "Portfolio",
			value: identity.portfolio,
			icon: Globe,
			copyable: false,
			href: identity.portfolio,
			external: true,
		},
		{
			label: "Facebook",
			value: identity.facebook,
			icon: Globe,
			copyable: false,
			href: identity.facebook,
			external: true,
		},
	];

	return (
		<div className="space-y-4">
			<div className="glass rounded-xl p-5 border border-gray-700/50">
				<h4 className="font-bold text-white text-lg mb-4">Get in Touch</h4>
				<p className="text-gray-400 mb-6">
					I'm always open to discussing new projects, research collaborations,
					or just saying hello.
				</p>

				<div className="space-y-3">
					{contacts.map((contact) => (
						<div
							key={contact.label}
							className="flex items-center gap-4 p-3 rounded-lg glass border border-gray-700/50 hover:border-cyan-400/30 transition-all"
						>
							<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
								<contact.icon className="w-5 h-5 text-cyan-400" />
							</div>
							<div className="flex-1 min-w-0">
								<span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
									{contact.label}
								</span>
								<div className="text-white truncate">{contact.value}</div>
							</div>
							{contact.copyable && (
								<button
									type="button"
									onClick={() => copyToClipboard(contact.value, contact.label)}
									className="p-2 rounded-lg hover:bg-white/10 transition-colors"
									aria-label={`Copy ${contact.label}`}
								>
									{copied === contact.label ? (
										<Check className="w-4 h-4 text-green-400" />
									) : (
										<Copy className="w-4 h-4 text-gray-400" />
									)}
								</button>
							)}
							{contact.href && !contact.copyable && (
								<a
									href={contact.href}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg hover:bg-white/10 transition-colors text-cyan-400"
									aria-label={`Open ${contact.label}`}
								>
									<Globe className="w-4 h-4" />
								</a>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
