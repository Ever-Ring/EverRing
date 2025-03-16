import ReviewItemWithImage from "@components/common/ReviewItemWithImage";
import { ReviewListWithImageProps } from "@customTypes/review";

export default function ReviewListwithImage({
  reviewData,
  hasUserInfo,
}: ReviewListWithImageProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {reviewData &&
        reviewData.map((review, index) => (
          <ReviewItemWithImage
            key={review.id}
            review={review}
            hasUserInfo={hasUserInfo}
            priority={index === 0}
          />
        ))}
    </ol>
  );
}
