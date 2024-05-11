"use client";
import { IonIcon } from "@ionic/react";
import { document } from "ionicons/icons";
import Link from "next/link";

const CV = () => {
    return (<div className="flex justify-end mb-2 w-full">
        <Link href={"/CV.pdf"}><div className="cursor-pointer hover:bg-white hover:text-black border border-white px-4 py-2 rounded-full"><IonIcon className="text-lg" icon={document}></IonIcon> PDF</div></Link>
    </div>);
}

export default CV;