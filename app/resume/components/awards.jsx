"use client";
import { Card } from "react-bootstrap";

const Awards = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
        <Card.Header className="text-4xl w-full mb-6 text-center">Awards and Achievements</Card.Header>
        <Card.Body>
            <div className="awards">
                <div className="font-bold">2024</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>Participated in CodeCrafters International Ltd. Devsprint 2024: 1st {"Runner\'s"} Up, Team NaN</div>
                </div>
                <div className="font-bold">2023</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>
                        <ul>
                            <li>2nd Runners Up BUET CSE FEST Hackathon Dev Ops Segment, Team IUT_NaN</li>
                            <li>5th Position in CodeRush 1.0 Intra IUT CTF, Team CyberShepards</li>
                            <li>15th Position in DU ITverse CTF, Team IUT_Quaso</li>
                            <li>Participated in Brackleys GameJam 2023.2, we became 693rd Internationally</li>
                            <li>Participated DU ITverse Hackathon Dev Ops Segment, Team IUT_NaT</li>
                        </ul>
                    </div>
                </div>
                <div className="font-bold">2022</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>
                        13th Position in International Rover Design Challenge as a part of IUT Mars Rover, Anirban
                    </div>
                </div>
                <div className="font-bold">2021</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>
                        <ul>
                            <li>1st Runners Up MIST Inter-University ICT Innovation fest Hackathon Prompt: For Education, Team: Ligno</li>
                            <li>Participated in Intra First Year Programming Contest Became one of the top 7 teams</li>
                            <li>Participated in National Cyber Drill 2021 Became one of the top 300 teams in our first CTF</li>
                        </ul>
                    </div>
                </div>
                <div className="font-bold">2018</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>
                        <ul>
                            <li>Participated in Microsoft Young Bangla Internship Program {"\"Shohayotha\""}, rose to the top 15 teams, offering telemedicine solutions for improved mental health support</li>
                        </ul>
                    </div>
                </div>
                <div className="font-bold">2016</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div> 1st Runners Up Web Design, Notre Dame Annual Science Festival 2016 and 26th GKC</div>
                </div>
            </div>
        </Card.Body>
    </Card>);
}

export default Awards;