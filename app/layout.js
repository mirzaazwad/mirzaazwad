import { League_Spartan } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

const inter = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "Mirza Mohammad Azwad | Home",
  description: "I am an aspiring software engineer who is currently enrolled as a student of Islamic University of Technology, pursuing a BSc in Software Engineering degree. I like to work mainly with DevOps and Machine Learning but am also open to front-end and back-end development. I am constantly learning and hoping to hone my skills for the better. When I am not coding you might find me watching anime, reading manga or at a coffee place enjoying its ambience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Mirza Mohammad Azwad | Portfolio</title>
      <link rel="icon" href="/icon.jpg" />
      <body className={inter.className}>
        <NavBar/>
        {children}  
        <Footer/>
      </body>
    </html>
  );
}
