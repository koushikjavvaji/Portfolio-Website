import { lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import FooterSection from "@/components/FooterSection";
import CommandPalette from "@/components/CommandPalette";
import LoadingScreen from "@/components/LoadingScreen";

const SpaceBackground = lazy(() => import("@/components/SpaceBackground"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Suspense fallback={null}>
        <SpaceBackground />
      </Suspense>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <SkillsSection />
      <EducationSection />
      <FooterSection />
      <CommandPalette />
    </div>
  );
};

export default Index;
