"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

const textVariants = cva("text-white", {
	variants: {
		variant: {
			h1: "text-4xl font-extrabold tracking-tight lg:text-5xl text-cyan-400",
			h2: "text-2xl font-bold tracking-tight text-cyan-300",
			h3: "text-xl font-semibold tracking-tight text-cyan-200",
			p: "leading-7 [&:not(:first-child)]:mt-4",
			muted: "text-sm text-gray-400",
			small: "text-sm font-medium leading-none",
		},
	},
	defaultVariants: {
		variant: "p",
	},
});

export interface TextVariantProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {
	asChild?: boolean;
}

const TextVariant = React.forwardRef<HTMLParagraphElement, TextVariantProps>(
	({ className, variant, asChild = false, ...props }, ref) => {
		const Comp = asChild ? "span" : "p";
		return (
			<Comp
				className={cn(textVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
TextVariant.displayName = "TextVariant";

export { TextVariant, textVariants };
