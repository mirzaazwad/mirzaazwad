"use client";
import { Card } from "react-bootstrap";

const Certifications = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
        <Card.Header className="text-4xl w-full mb-6 text-center">Certifications</Card.Header>
        <Card.Body>
            <div className="certificates">
                <div className="font-bold">2023</div>
                <div className="mb-2 px-4 py-2 rounded-lg bg-black">
                    <div>
                        <ul>
                            <li><strong>Certified DeepLearning.AI:</strong> Unsupervised Learning, Recommenders, and Reinforcement Learning</li>
                            <li><strong>Certified DeepLearning.AI:</strong> Advanced Learning Algorithms</li>
                            <li><strong>Certified DeepLearning.AI:</strong> Supervised Machine Learning: Regression and Classification</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>);
}

export default Certifications;