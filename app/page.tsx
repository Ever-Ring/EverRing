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
      <AnimatedSection>
        <LandingHero />
      </AnimatedSection>

      <AnimatedSection>
        <FeatureSection />
      </AnimatedSection>
      {/* <AnimatedSection> relative top-[60px] flex-1 */}

      <div className="">
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
