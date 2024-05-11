"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const currentPath = usePathname();
    return (
        <nav className="flex justify-end bg-zinc-950 px-4 py-2">
            <ul className="flex justify-end items-center">
                <Link href="/"><li className={`ms-4 me-4 ${currentPath === "/" ? "bg-black border border-white" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>Home</li></Link>
                <Link href="/publications"><li className={`ms-4 me-4 ${currentPath === "/publications" ? "bg-black border border-white" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                    Publications
                </li></Link>
                <Link href="/resume"><li className={`ms-4 me-4 ${currentPath === "/resume" ? "bg-black border border-white" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                    Resume
                </li></Link>
                <Link href="/contact"><li className={`ms-4 me-4 ${currentPath === "/contact" ? "bg-black border border-white" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                    Contact
                </li></Link>
            </ul>
        </nav>
    );
}

export default NavBar;