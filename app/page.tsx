"use client";

import AnimatedSection from "@features/landing/components/AnimatedSection";
import LandingHero from "@features/landing/components/LandingHeroSection";
import FeatureSection from "@features/landing/components/FeatureSection";
import ReviewSection from "@features/landing/components/ReviewSection";
import ServiceShowcaseSection from "@features/landing/components/ServiceShowcaseSection";
import FooterSection from "@features/landing/components/FooterSection";

export default function Landing() {
  return (
    <div className="relative w-full bg-gray-50">
      <LandingHero />

      <AnimatedSection>
        <FeatureSection />
      </AnimatedSection>

      <div>
        <ServiceShowcaseSection />
      </div>

      <AnimatedSection>
        <ReviewSection />
      </AnimatedSection>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}
