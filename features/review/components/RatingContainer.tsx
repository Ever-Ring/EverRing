import ReviewRating from "@components/common/ReviewRating";
import RatingBreakdown from "@features/review/components/RatingBreakdown";
import { Scores } from "@customTypes/review";

interface RatingContainerProps {
  scoreData?: Scores;
}

export default function RatingContainer({ scoreData }: RatingContainerProps) {
  return (
    <div className="w-full shrink-0 border-b-2 border-t-2 border-gray-200 bg-white px-6 py-8">
      <div className="flex w-full items-center justify-center gap-[10%] md:gap-[15%]">
        <div className="flex flex-col items-center gap-2">
          <p className="flex items-start gap-[0.125rem] text-2xl font-semibold">
            <span className="text-gray-900">
              {scoreData?.averageScore ?? 0}
            </span>
            <span className="text-gray-400">/5</span>
          </p>
          <ReviewRating score={scoreData?.averageScore ?? 0} />
        </div>
        <RatingBreakdown scoreData={scoreData} />
      </div>
    </div>
  );
}
