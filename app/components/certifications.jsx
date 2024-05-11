"use client";
import Image from "next/image";
import { Card } from "react-bootstrap";

const Certifications = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mt-4">
        <Card.Header className="text-4xl w-full mb-6 text-left">Certifications</Card.Header>
        <Card.Body>
            <div className="w-full flex mb-2 bg-black rounded-lg px-4 py-2">
                <div className="w-1/5 ms-4 me-4">
                    <p className="text-xl">2023</p>
                </div>
                <div className="w-4/5">
                    <h1 className="text-2xl mb-2">Machine Learning Specialization</h1>
                    <p className="text-xl">By DeepLearning.ai</p>
                    <Image unoptimized src="https://mirzaazwad.github.io/mirzaazwad/certificate.jpeg" alt="ICT Fest 2024 By IUT CSE" width={500} height={300} className="m-4 px-4 py-2 border border-white rounded-lg" />
                </div>
            </div>
        </Card.Body>
    </Card>);
}

export default Certifications;