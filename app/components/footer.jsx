"use client";
import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, logoYoutube, logoLinkedin, logoGithub, mail } from "ionicons/icons";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bottom-0 w-full bg-zinc-950">
            <div className="w-full flex justify-center items-center">
                <div className="flex">
                    <ul className="flex justify-between items-center px-4 py-4">
                        <Link href={"https://www.facebook.com/mirza.mohammadazwad.5/"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={logoFacebook} className="text-2xl"></IonIcon></li></Link>
                        <Link href={"https://www.instagram.com/mirzaazwad/"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={logoInstagram} className="text-2xl"></IonIcon></li></Link>
                        <Link href={"https://www.youtube.com/channel/UCwh0jldnZT8UNQs17OMCD9A"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={logoYoutube} className="text-2xl"></IonIcon></li></Link>
                        <Link href={"https://www.linkedin.com/in/mirza-mohammad-azwad-b5239b1a4/"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={logoLinkedin} className="text-2xl"></IonIcon></li></Link>
                        <Link href={"https://github.com/mirzaazwad"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={logoGithub} className="text-2xl"></IonIcon></li></Link>
                        <Link href={"mailto:mirzaazwad@iut-dhaka.edu"}><li className="px-2 cursor-pointer  hover:bg-white hover:border-white hover:rounded-lg hover:text-black"><IonIcon icon={mail} className="text-2xl"></IonIcon></li></Link>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="w-full flex justify-center items-center">
                © Copyright 2024 Mirza Mohammad Azwad. Powered by NextJS. Hosted by GitHub Pages.
            </div>
        </div>
    );
}

export default Footer;