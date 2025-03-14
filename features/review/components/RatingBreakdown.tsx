function RatingBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-1 w-full rounded-sm bg-gray-200">
      <div
        className="transition-width h-full rounded-sm bg-gray-900 duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function RatingBreakdownItem({
  score,
  count = 0,
  totalReviewCount,
}: {
  score: number;
  count: number;
  totalReviewCount: number;
}) {
  const ratingPercentage =
    totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0;
  return (
    <li className="flex items-start gap-3">
      <div className="flex flex-row items-center gap-3">
        <span className="w-[1.3125rem] text-sm font-medium text-gray-700">
          {score}점
        </span>
        <span className="h-1 w-[5.25rem] md:w-60">
          <RatingBar percentage={ratingPercentage} />
        </span>
      </div>
      <span className="text-sm font-medium text-gray-400">{count}</span>
    </li>
  );
}

interface Scores {
  teamId: number;
  // gatheringId: 0, 얘가 무슨 역할을 하는지 아직 모르겠음..
  type: string;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

interface RatingBreakdownProps {
  scoreData?: Scores;
}

export default function RatingBreakdown({ scoreData }: RatingBreakdownProps) {
  const ratings = [
    { rating: 5, count: scoreData?.fiveStars },
    { rating: 4, count: scoreData?.fourStars },
    { rating: 3, count: scoreData?.threeStars },
    { rating: 2, count: scoreData?.twoStars },
    { rating: 1, count: scoreData?.oneStar },
  ];

  const totalReviewCount = ratings.reduce(
    (acc, cur) => acc + (cur.count || 0),
    0,
  );

  return (
    <ol className="flex flex-col items-start gap-1">
      {ratings.map((rating) => (
        <RatingBreakdownItem
          key={rating.rating}
          score={rating.rating}
          count={rating.count ?? 0}
          totalReviewCount={totalReviewCount}
        />
      ))}
    </ol>
  );
}
