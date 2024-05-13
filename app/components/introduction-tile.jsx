"use client";
import Image from "next/image";
import { Card } from "react-bootstrap";



const Introduction = () => {
    return (
        <Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
            <Card.Header className="text-lg md:text-4xl w-full mb-6 text-center">Hi! {"I\'m"} <strong>Mirza Mohammad Azwad</strong></Card.Header>
            <Card.Body>
                    <div className="w-full flex justify-center items-center me-5">
                        <Image src={'/propic.png'} className="rounded-full" width={'250'} height={'250'} alt="Profile Picture" />
                    </div>
                    <div className="w-full mt-4">
                        <p className="text-sm md:text-2xl">I am an aspiring software engineer who is currently enrolled as a student of Islamic University of Technology, pursuing a BSc in Software Engineering degree. I like to work mainly with DevOps and Machine Learning but am also open to front-end and back-end development. I am constantly learning and hoping to hone my skills for the better. When I am not coding you might find me watching anime, reading manga or at a coffee place enjoying its ambience.</p>
                        <h2 className="text-sm md:text-2xl mt-4">Favorite Quote: </h2>
                        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                            <p className="text-sm md:text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{"\"I strive to be something greater than just a name on a gravestone\""}</p>
                        </blockquote>
                    </div>
            </Card.Body>
        </Card>
    );
}

export default Introduction;