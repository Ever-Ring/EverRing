import ReviewRating from "@components/common/ReviewRating";
import Image from "next/image";
import UnderLine from "@assets/underline.svg";
import { ReviewItemProps } from "@customTypes/review";
import dateFormatter from "@utils/dateFormatter";

export default function ReviewItem({
  score,
  comment,
  userImage,
  userName,
  createdAt,
}: ReviewItemProps) {
  return (
    <li className="flex flex-1 flex-col items-start gap-4 text-gray-700">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
          <ReviewRating score={score} />
          <p className="text-sm font-medium">{comment}</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p className="flex flex-row items-center gap-2">
            <span className="relative size-6">
              <Image alt="user-profile" fill src={userImage} />
            </span>
            <span className="text-xs font-medium">{userName}</span>
            <span>|</span>
          </p>
          <span className="text-xs font-medium text-gray-500">
            {dateFormatter(createdAt)}
          </span>
        </div>
      </div>

      <UnderLine className="w-full shrink-0 self-stretch fill-gray-200" />
    </li>
  );
}
