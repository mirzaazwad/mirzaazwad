"use client";
import { Card } from "react-bootstrap";

const News = () => {
    return ( 
        <Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg">
            <Card.Header className="text-4xl w-full mb-6 text-left">News</Card.Header>
            <Card.Body>
                <div className="w-full flex">
                    <div className="w-1/5 ms-4 me-4">
                        <p className="text-xl">5<sup>th</sup> May, 2024</p>
                    </div>
                    <div className="w-4/5">
                        <h1 className="text-2xl">Intenship Alert</h1>
                        <p className="text-xl">I have recently received an intenship oppurtunity to work at <a href="https://bangladesh.ai/">Intelligent Machines, Bangladesh</a></p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
 
export default News;