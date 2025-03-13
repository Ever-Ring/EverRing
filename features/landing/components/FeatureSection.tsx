import { features } from "@features/landing/constants/featureData";
import FeatureCard from "@features/landing/components/FeatureCard";

export default function FeatureSection() {
  return (
    <section className="mb-[3.75rem] flex w-full flex-col items-center justify-between px-4 py-[3.75rem] md:mb-[6.25rem] md:px-6 md:py-[6.25rem] lg:mb-[7.5rem] lg:px-[15%] lg:py-[7.5rem]">
      <div className="mb-[1.875rem] flex flex-col items-center gap-5 md:mb-10 lg:mb-32">
        <h2 className="text-3xl font-bold md:text-4xl">
          에버링이 처음이신가요?
        </h2>
        <p className="text-center text-base">
          다양한 페이지를 둘러보고 마음에 드는 모임에 참여해보세요!
        </p>
      </div>
      <div className="flex w-full shrink-0 flex-col items-center justify-center gap-[1.875rem] lg:flex-row">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
