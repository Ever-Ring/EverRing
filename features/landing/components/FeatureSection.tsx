import { features } from "@features/landing/constants/featureData";
import FeatureCard from "@features/landing/components/FeatureCard";

export default function FeatureSection() {
  // const router = useRouter();
  return (
    <section className="flex w-full flex-col items-center justify-between px-4 py-[3.75rem] md:px-6 md:py-[6.25rem] lg:px-[15%] lg:py-[7.5rem]">
      <div className="mb-[1.875rem] flex flex-col items-center gap-5 md:mb-10 lg:mb-32">
        <h2 className="text-4xl font-bold">에버링이 처음이신가요?</h2>
        <p className="text-center text-base">
          다양한 페이지를 둘러보고 마음에 드는 모임에 참여해보세요!
          {/* 다양한 모임을 둘러보고 마음껏 참여해보세요! <br />
          찜하기 버튼을 눌러 마음에 드는 모임을 한 눈에 모아볼 수 있어요. <br />
          참여한 모임이 마음에 들었다면 <br />
          리뷰를 달아서 다른 참여자들에게 알려주세요 */}
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
