import Image from "next/image";
import ReviewRating from "@components/common/ReviewRating";
import { ReviewItemProps } from "@customTypes/review";
import { formatDate } from "@utils/dateFormatter";
import { DEFAULT_USER_IMAGE } from "@constants/user";

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className="flex w-full flex-1 flex-col items-start gap-4 text-gray-700">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
          <ReviewRating score={review?.score} />
          <p className="text-sm font-medium">{review?.comment}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <p className="flex flex-row items-center gap-2">
              <span className="relative size-6 overflow-hidden rounded-full">
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
              {formatDate(review?.Gathering.dateTime)}
            </span>
          </div>
          <span className="text-end text-xs font-medium text-gray-500">
            작성일 {formatDate(review?.createdAt)}
          </span>
        </div>
      </div>
      <div className="inline-block w-full border-b-2 border-dashed border-gray-200" />
    </li>
  );
}
