"use client";
import { Card } from "react-bootstrap";

const Education = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
        <Card.Header className="text-2xl w-full mb-6 text-left">Education</Card.Header>
        <Card.Body>
            <div className="flex gap-6 justify-center">
            <div className="w-1/3 px-4 py-4 bg-black rounded-lg">
            <Card.Title className="text-xl mb-2">Islamic University of Technology, IUT</Card.Title>
            <Card.Text className="text-lg mb-2">Bachelor of Science in Software Engineering</Card.Text>
            <Card.Text className="text-lg mb-2">GPA: 3.90</Card.Text>
            <Card.Text className="text-sm mb-2 italic">Competitive Programming, Competitive Programming Instructor, Web Development, Hackathon, CTF, Code Refactoring</Card.Text>
            </div>
            <div className="w-1/3 px-4 py-4 bg-black rounded-lg">
            <Card.Title className="text-xl mb-2">SFX Greenherald In’t School and College</Card.Title>
            <Card.Text className="text-lg mb-2">A Levels</Card.Text>
            <Card.Text className="text-lg mb-2">4 A*, 1 A</Card.Text>
            <Card.Text className="text-sm mb-2 italic">Extra-curriculur activities: Greenherald Computer Club(GCC): Founding President</Card.Text>
            </div>
            <div className="w-1/3 px-4 py-4 bg-black rounded-lg">
            <Card.Title className="text-xl mb-2">SFX Greenherald In’t School and College</Card.Title>
            <Card.Text className="text-lg mb-2">O Levels</Card.Text>
            <Card.Text className="text-lg mb-2">8 A*, 1 A</Card.Text>
            <Card.Text className="text-sm mb-2 italic">Extra-curriculur activities: Greenherald Debating Society(GDS): Participated in BTV
debate 2016, Greenworld Earth Club(GWEC): Secretary of Publication and Confab, Fx13 Chrome Science Club: Olympiad Secretary</Card.Text>
            </div>
            </div>
        </Card.Body>
    </Card>);
}

export default Education;