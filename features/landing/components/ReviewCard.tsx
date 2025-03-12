import Image from "next/image";
import CardContainer from "@features/landing/components/CardContainer";
import ReviewRating from "@components/common/ReviewRating";

interface ReviewCardProps {
  name: string;
  gatheringName: string;
  content: string;
}

export default function ReviewCard({ review }: { review: ReviewCardProps }) {
  return (
    <CardContainer>
      <div className="flex flex-col items-center gap-[1.875rem] self-stretch">
        <div className="flex flex-col items-center justify-center gap-4 self-stretch">
          <div className="size-14 overflow-hidden rounded-full">
            <Image
              src="/image/img-profile-large-default.svg"
              alt="review-profile-image"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-center gap-[0.375rem] self-stretch text-center">
            <span className="text-xl font-semibold text-gray-900">
              {review.name}
            </span>
            <p className="text-sm font-normal text-gray-700">
              {review.gatheringName}
            </p>
          </div>
        </div>
        <p className="text-center text-base text-gray-900">{review.content}</p>
        <ReviewRating score={5} />
      </div>
    </CardContainer>
  );
}
