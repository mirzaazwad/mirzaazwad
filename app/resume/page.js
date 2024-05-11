import Education from "./components/education";
import Skills from "./components/skills";
import Awards from "./components/awards";
import Certifications from "./components/certifications";
import Projects from "./components/projects";
import CV from "./components/cv";

const Resume = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6">
            <CV/>
            <Education/>
            <Skills/>
            <Awards/>
            <Certifications/>
            <Projects/>
        </main>
    );
}

export default Resume;