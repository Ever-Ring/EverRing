import { reviews } from "@features/landing/constants/reviewData";
import ReviewCard from "@features/landing/components/ReviewCard";

export default function ReviewSection() {
  return (
    <section className="flex w-full flex-col items-center justify-between px-4 py-[3.75rem] md:px-6 md:py-[6.25rem] lg:px-[15%] lg:py-[7.5rem]">
      <div className="mb-[1.875rem] flex flex-col items-center gap-5 md:mb-10 lg:mb-32">
        <h2 className="text-4xl font-bold text-black">
          사용자들의 생생한 리뷰를 확인해보세요.
        </h2>
        <p className="text-center text-base text-gray-800">
          모든 리뷰 페이지에서 더 많은 리뷰와 함께 <br />
          원하는 카테고리의 리뷰만 모아볼 수 있어요.
        </p>
      </div>
      <div className="flex w-full shrink-0 flex-col items-center justify-center gap-[1.875rem] lg:flex-row">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}
