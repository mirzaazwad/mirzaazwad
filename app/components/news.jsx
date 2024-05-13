"use client";
import { Card } from "react-bootstrap";

const News = () => {
    return (
        <Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg">
            <Card.Header className="text-4xl w-full mb-6 text-left">News</Card.Header>
            <Card.Body>
                <div className="w-full flex flex-col">
                    <p className="text-sm text-gray-400">5<sup>th</sup> May, 2024</p>
                    <h1 className="text-lg md:text-2xl">Intenship Alert</h1>
                    <p className="text-md md:text-xl">I have recently received an intenship oppurtunity to work at <a href="https://bangladesh.ai/">Intelligent Machines, Bangladesh</a></p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default News;