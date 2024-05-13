"use client";
import Image from "next/image";
import { Card } from "react-bootstrap";

const AwardsAndAchievements = () => {
    return (
        <Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mt-4">
            <Card.Header className="text-4xl w-full mb-6 text-left">Highlighted Awards & Achievements</Card.Header>
            <Card.Body>
                <div className="w-full flex mb-2 bg-black rounded-lg px-4 py-2">
                    <div className="w-full">
                        <p className="text-gray-400">April, 2024</p>
                        <h1 className="text-lg md:text-2xl mb-2">ICT Fest 2024 By IUT CSE</h1>
                        <p className="text-sm md:text-xl">Team M3 managed to achieve the 2nd Runners Up at the Streamstech presents 11th IUT National ICT Fest 2024 Code Catalyst: Refactoring Contest organized by IUTCS</p>
                        <div className="w-full flex justify-center items-center">
                            <Image src="/m3.jpg" alt="ICT Fest 2024 By IUT CSE" width={600} height={600} className="m-4 px-4 py-2 border border-white rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex  mb-2 bg-black rounded-lg px-4 py-2">
                    <div className="w-full">
                        <p className="text-gray-400">March, 2024</p>
                        <h1 className="text-lg md:text-2xl mb-2">DevSprint 2024 By CodeCrafters Ltd. and BUET CSE</h1>
                        <p className="text-sm md:text-xl">Team IUT_NaN managed to achieve the second position at CodeCrafters {"In't"} Ltd. presents DevSprint 2024 by IEEE Computer Society BUET Student chapter. </p>
                        <div className="w-full flex justify-center items-center">
                            <Image src="/devsprint.jpg" alt="ICT Fest 2024 By IUT CSE" width={600} height={600} className="m-4 px-4 py-2 border border-white rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex  mb-2 bg-black rounded-lg px-4 py-2">
                    <div className="w-full">
                        <p className="text-gray-400">September, 2024</p>
                        <h1 className="text-lg md:text-2xl mb-2">BUET CSE Fest 2023 By BUET CSE</h1>
                        <p className="text-sm md:text-xl">Team IUT_NaN managed to achieve the third position in the DevOps segment of the BUET CSE Fest Hackathon 2023</p>
                        <div className="w-full flex justify-center items-center">
                            <Image src="/buetcsefest.jpg" alt="ICT Fest 2024 By IUT CSE" width={600} height={600} className="m-4 px-4 py-2 border border-white rounded-lg" />
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default AwardsAndAchievements;