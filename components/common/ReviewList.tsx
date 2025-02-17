import ReviewItem from "@components/common/ReviewItem";
import { ReviewListProps } from "@customTypes/review";

export default function ReviewList({ reviewData }: ReviewListProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {reviewData.map((review) => (
        <ReviewItem
          key={review.id}
          score={review.score}
          comment={review.comment}
          userImage={review.User.image}
          userName={review.User.name}
          createdAt={review.createdAt}
        />
      ))}
    </ol>
  );
}
