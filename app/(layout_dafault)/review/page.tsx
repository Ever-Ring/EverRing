import Image from "next/image";
import ReviewContentContainer from "@features/review/components/ReviewContentContainer";
import ReviewApi from "@apis/ReviewApi";

export default async function Review() {
  // TODO 아직 데이터가 많이 없어서 임시로 limit 작게 설정
  const params = { limit: 4, offset: 0 };
  const reviewDataResponse = await ReviewApi.getReviewData(params);
  const initialData = reviewDataResponse.data?.data ?? [];
  const totalItemCount = reviewDataResponse.data?.totalItemCount ?? 0;

  const reviewScoreResponse = await ReviewApi.getReviewScore({});
  const initialScore = reviewScoreResponse.data[0];

  return (
    <div className="flex h-full w-full flex-col items-start pt-6 md:pt-8">
      <section className="flex items-center gap-4">
        <Image
          src="image/img-head-review.svg"
          alt="review head image"
          width={72}
          height={72}
        />
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
            모든 리뷰
          </h1>
          <h2 className="text-sm font-medium text-gray-700">
            에버링을 이용한 분들은 이렇게 느꼈어요🍀
          </h2>
        </div>
      </section>
      <ReviewContentContainer
        initialData={initialData}
        totalItemCount={totalItemCount}
        initialScore={initialScore}
      />
    </div>
  );
}
