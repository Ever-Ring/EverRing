import ReviewRating from "@components/common/ReviewRating";
import Image from "next/image";
import UnderLine from "@assets/underline.svg";
import { ReviewItemProps } from "@customTypes/review";
import { formatDate } from "@utils/dateFormatter";
import { DEFAULT_USER_IMAGE } from "@constants/user";

export default function ReviewItem({ review }: ReviewItemProps) {
  // TODO 스켈레톤 UI 표시
  if (!review) {
    return <div>스켈레톤</div>;
  }

  return (
    <li className="flex flex-1 flex-col items-start gap-4 text-gray-700">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
          <ReviewRating score={review?.score} />
          <p className="text-sm font-medium">{review?.comment}</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p className="flex flex-row items-center gap-2">
            <span className="relative size-6">
              <Image
                alt="user-profile"
                fill
                src={review?.User?.image ?? DEFAULT_USER_IMAGE}
              />
            </span>
            <span className="text-xs font-medium">{review?.User?.name}</span>
            <span>|</span>
          </p>
          <span className="text-xs font-medium text-gray-500">
            {formatDate(review?.createdAt)}
          </span>
        </div>
      </div>

      <UnderLine className="w-full shrink-0 self-stretch fill-gray-200" />
    </li>
  );
}
