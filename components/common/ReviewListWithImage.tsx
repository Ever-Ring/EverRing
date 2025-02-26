import ReviewItemWithImage from "@components/common/ReviewItemWithImage";
import { ReviewListWithImageProps } from "@customTypes/review";

export default function ReviewListwithImage({
  reviewData,
  hasUserInfo,
}: ReviewListWithImageProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {reviewData &&
        reviewData.map((review) => (
          <ReviewItemWithImage
            key={review.id}
            review={review}
            hasUserInfo={hasUserInfo}
          />
        ))}
    </ol>
  );
}
