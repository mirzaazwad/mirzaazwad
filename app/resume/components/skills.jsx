"use client";
import { Card } from "react-bootstrap";

const Skills = () => {
    return (<Card className="w-full bg-zinc-950 px-4 py-2 rounded-lg mb-5">
        <Card.Header className="text-4xl w-full mb-6 text-center">Skills</Card.Header>
        <Card.Body>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Coding Skills</h2>
                <p>Python, JavaScript, TypeScript, Java, PHP, C, C++, C#, Prolog, SQL, NOSQL, Dart, HTML, CSS, ShellScript (Bash)</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Machine Learning Skills</h2>
                <p>Pandas, Spark, Scikit-Learn, Numpy, Scipy, PyTorch, fastAI</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Database Skills</h2>
                <p>MySQL, PostgreSQL, MongoDB, neo4j, IndexedDB, OracleXE</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Framework Skills</h2>
                <p>ReactJS, ExpressJS, JAVA Springboot, PHP Laravel, DART Flutter</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Language Skills</h2>
                <p>English, Bangla</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Game Development Skills</h2>
                <p>C#, Unity Engine</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Miscellaneous Skills</h2>
                <p>Competitive Programming (Solved 700+ Problems in Codeforces, AtCoder, LeetCode, CodeChef, UVA, CSES, LightOJ and Vjudge), CTF, Web Development Projects, Machine Learning</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">Cloud Services Skills</h2>
                <p>Google Cloud Platform (google cloud run, google cloud build, compute engines, api engine, cloud functions, cloud sql, cloud object storage, memory store, vpc configurations)</p>
            </div>

            <div className="w-full bg-black px-4 py-2 rounded-lg mb-2">
                <h2 className="text-xl">DevOps Skills</h2>
                <p>GitHub Actions, Terraform, Docker, RabbitMQ, Apache Kafka, Kubernetes</p>
            </div>

        </Card.Body>
    </Card>);
}

export default Skills;