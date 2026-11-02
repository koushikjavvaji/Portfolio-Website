import { lazy, Suspense } from "react";
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

const VoiceWaveBackground = lazy(() => import("@/components/VoiceWaveBackground"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Suspense fallback={null}>
        <VoiceWaveBackground />
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
