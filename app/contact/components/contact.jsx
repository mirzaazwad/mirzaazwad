"use client";
import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, mail, phonePortrait } from "ionicons/icons";
import Link from "next/link";

const Contact = () => {
    return (<div className="w-full bg-zinc-950 rounded-lg px-4 py-2">
        <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
        <p className="text-xl px-4 py-2"><IonIcon icon={mail} className="me-4"></IonIcon> mirzaazwad@iut-dhaka.edu</p>
        <p className="text-xl px-4 py-2"><IonIcon icon={phonePortrait} className="me-4"></IonIcon>+8801991681338</p>
        <p className="text-xl px-4 py-2"><Link href="https://www.facebook.com/mirza.mohammadazwad.5/"><IonIcon icon={logoFacebook} className="me-4"></IonIcon>Mirza Mohammad Azwad</Link></p>
        <p className="text-xl px-4 py-2"><Link href="https://www.instagram.com/mirzaazwad/"><IonIcon icon={logoInstagram} className="me-4"></IonIcon>mirzaazwad</Link></p>
        <h1 className="text-4xl font-bold mt-4 mb-4">Address</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.82439492137!2d90.38332497783671!3d23.948165841920403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4abf8334fb1%3A0xbb003124c3dedc91!2sIslamic%20University%20of%20Technology!5e0!3m2!1sen!2sbd!4v1715434634989!5m2!1sen!2sbd" width="600" height="450" className="w-full border border-white rounded-lg" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>);
}

export default Contact;