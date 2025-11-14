import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import StorySection from "../components/sections/StorySection";
import EventSection from "../components/sections/EventSection";
import ProjectSection from "../components/sections/ProjectSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <HeroSection />
      <StatsSection />
      <StorySection />
      <EventSection />
      <ProjectSection />
    </div>
  );
};

export default Home;