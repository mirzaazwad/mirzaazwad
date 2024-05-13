"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { closeOutline, menuOutline } from "ionicons/icons";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentPath = usePathname();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
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
                </div>

                <div className="md:hidden justify w-full md:block md:w-auto" id="navbar-dropdown">
                    <div className="flex">
                        <div className="cursor-pointer" onClick={toggleDropdown}>
                            <IonIcon icon={menuOutline} className="text-4xl text-white" />
                        </div>
                        <div className="flex-grow"></div>
                        {isDropdownOpen && (<div className="cursor-pointer" onClick={() => setIsDropdownOpen(false)}>
                            <IonIcon icon={closeOutline} className="text-4xl text-white" />
                        </div>)}
                    </div>
                    {isDropdownOpen && (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
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
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
