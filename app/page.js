import AwardsAndAchievements from "./components/awards&achievements";
import Certifications from "./components/certifications";
import Introduction from "./components/introduction-tile";
import News from "./components/news";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="w-full">
        <Introduction/>
        <News/>
        <Certifications/>
        <AwardsAndAchievements/>
      </div>
    </main>
  );
}
