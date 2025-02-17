import Image from "next/image";
import ReviewContentContainer from "@features/review/components/ReviewContentContainer";

export default function Review() {
  return (
    <div className="flex h-full w-full flex-col items-start">
      <section className="flex items-center gap-4">
        <Image
          src="image/img-head-review.svg"
          alt="review head image"
          width={72}
          height={72}
        />
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-semibold text-gray-900 sm:text-2xl">
            모든 리뷰
          </h1>
          <h2 className="text-sm font-medium text-gray-700">
            에버링을 이용한 분들은 이렇게 느꼈어요🍀
          </h2>
        </div>
      </section>
      <ReviewContentContainer />
    </div>
  );
}
