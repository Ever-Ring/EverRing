import ReviewRating from "@components/common/ReviewRating";
import Image from "next/image";
import UnderLine from "@assets/underline.svg";

import { ReviewItemWithImageProps } from "@customTypes/review";
import { formatDate } from "@utils/dateFormatter";

import { GATHERING_TYPE_MAP, GatheringType } from "@constants/gatheringType";
import { DEFAULT_USER_IMAGE } from "@constants/user";

export default function ReviewItemWithImage({
  review,
  hasUserInfo,
}: ReviewItemWithImageProps) {
  const gatheringType =
    GATHERING_TYPE_MAP[review?.Gathering?.type as GatheringType] || "";

  return (
    <li className="flex flex-col items-start gap-6 text-gray-700 md:flex-row">
      <div className="relative h-[9.75rem] w-full md:w-[17.5rem]">
        <Image
          fill
          alt="gathering-image"
          src={review?.Gathering?.image}
          className="shrink-0 rounded-3xl object-cover"
        />
      </div>
      <div className="flex h-[10.5rem] flex-col items-start justify-between self-stretch md:h-[9.75rem] md:flex-1">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
            <ReviewRating score={review?.score} />
            {/* // TODO height&overflow 임시 적용 */}
            <p className="h-[3.75rem] overflow-hidden text-sm font-medium md:h-[2.5rem]">
              {review?.comment}
            </p>
            <p className="flex flex-row items-center gap-[0.375rem] text-xs font-medium">
              <span>
                {gatheringType} {review?.Gathering?.name} 이용
              </span>
              <span>·</span>
              <span>{review?.Gathering?.location}</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-3">
            {hasUserInfo && (
              <p className="flex flex-row items-center gap-2">
                <span className="relative size-6">
                  <Image
                    alt="user-profile"
                    fill
                    src={review?.User?.image ?? DEFAULT_USER_IMAGE}
                  />
                </span>
                <span className="text-xs font-medium">
                  {review?.User?.name}
                </span>
                <span>|</span>
              </p>
            )}
            <span className="text-xs font-medium text-gray-500">
              {formatDate(review?.createdAt)}
            </span>
          </div>
        </div>

        <UnderLine className="w-full shrink-0 self-stretch fill-gray-200" />
      </div>
    </li>
  );
}
