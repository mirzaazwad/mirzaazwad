"use client";
import Image from "next/image";
import { Card } from "react-bootstrap";

const Certifications = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mt-4">
        <Card.Header className="text-4xl w-full mb-6 text-left">Certifications</Card.Header>
        <Card.Body>
            <div className="w-full flex mb-2 bg-black rounded-lg px-4 py-2">
                <div className="w-full">
                    <p className="text-gray-400">Auguest, 2023</p>
                    <h1 className="text-lg mb-2 md:text-2xl">Machine Learning Specialization</h1>
                    <p className="text-sm mb-2 md:text-xl">By DeepLearning.ai</p>
                    <div className="w-full flex justify-center items-center">
                    <Image src="/certificate.jpeg" alt="ICT Fest 2024 By IUT CSE" width={600} height={600} className="m-4 px-4 py-2 border border-white rounded-lg" />   
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>);
}

export default Certifications;