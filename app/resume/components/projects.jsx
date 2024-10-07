"use client";
import { IonIcon } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import Link from "next/link";
import { Card } from "react-bootstrap";

const Projects = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
        <Card.Header className="text-4xl w-full mb-6 text-center">Projects</Card.Header>
        <Card.Body>
        <div className="projects">

            <div className="subrubric">
                <Link href="https://github.com/mirzaazwad"><h1 className="text-xl mb-2 hover:text-black hover:bg-white px-4 py-2 rounded-lg">Projects <IonIcon icon={logoGithub}></IonIcon></h1></Link>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">CSE 4554-Machine Learning</div>
                    <div>Titled: <strong>Automated Python Code Bug Detection using Software Metrics</strong>, employing software metrics and ML to predict bugs in Python code.</div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">SWE 4304-Software Project Lab I</div>
                    <div>Titled: <strong>{"\"Ed-Ez\""}</strong>, a Google Classroom clone using HTML, CSS, JavaScript, PHP, and MySQL.</div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">SWE 4404-Software Project Lab II</div>
                    <div>Titled: <strong>{"\"MedGuard\""}</strong>, a pharmacy-based e-commerce system on the MERN stack, incorporating Cloudinary for file storage, oAuth, Google Map Services, and socket.io for chat systems.</div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">SWE 4504-Design Project Lab I</div>
                    <div>Titled: <strong>DataAnalytica.io</strong>, built with React, Python, Django, and MongoDB for Exploratory Data Analysis and basic ML simulations.</div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">Vaccine App</div>
                    <div>Developed with Google Cloud Run and Cloud Build, logging with DataDog. <strong>(BUET CSE Fest Hackathon 2023-DevOps Segment)</strong></div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">Tax Wizard</div>
                    <div>Automated CI/CD with GitHub actions, deployment using Terraform on Google Cloud Run and Google Cloud Build, logging with DataDog. <strong>(DU ITverse HackTheVerse Hackathon 2023-DevOps Segment)</strong></div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">Diving Deeper</div>
                    <div>Developed a 2D game with Unity Engine and C#. <strong>(Brackleys GameJam 2023)</strong></div>
                </div>
                <div className="flex flex-col mb-2 px-4 py-2 rounded-lg bg-black">
                    <div className="w-1/5 font-bold">ProjectHub</div>
                    <div>MERN stack project-management tool with real-time features and CI/CD pipelines. <strong>(BUET DevSprint 2024)</strong></div>
                </div>
            </div>

        </div>
        </Card.Body>
    </Card>);
}

export default Projects;
