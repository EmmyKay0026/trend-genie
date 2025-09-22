import CTASection from "@/components/CTASection";
import DemoVideoSection from "@/components/DemoVideoSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import MainTemplates from "@/components/MainTemplate";
import React from "react";

const HomePage = () => {
  return (
    <MainTemplates>
      <HeroSection />
      <DemoVideoSection />
      <FeaturesSection />
      <CTASection />
    </MainTemplates>
  );
};

export default HomePage;
