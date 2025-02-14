import ReviewItemWithImage from "@components/common/ReviewItemWithImage";
import { ReviewListWithImageProps } from "@customTypes/review";

export default function ReviewListwithImage({
  reviewData,
  hasUserInfo,
}: ReviewListWithImageProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {reviewData.map((review) => (
        <ReviewItemWithImage
          key={review.id}
          score={review.score}
          comment={review.comment}
          userImage={review.User.image}
          userName={review.User.name}
          gatheringImage={review.Gathering.image}
          gatheringName={review.Gathering.name}
          gatheringLocation={review.Gathering.location}
          createdAt={review.createdAt}
          hasUserInfo={hasUserInfo}
        />
      ))}
    </ol>
  );
}
