import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewRating from "@components/common/ReviewRating";

import { ReviewItemWithImageProps } from "@customTypes/review";
import { formatDate } from "@utils/dateFormatter";

import { GATHERING_TYPE_MAP, GatheringType } from "@constants/gatheringType";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import Link from "next/link";
import { truncateText } from "@utils/truncateText";

export default function ReviewItemWithImage({
  review,
  hasUserInfo,
  priority,
}: ReviewItemWithImageProps) {
  const [isMoreView, setIsMoreView] = useState(false);
  const [isShowFullComment, setIsShowText] = useState(false);

  useEffect(() => {
    if (review?.comment) {
      setIsMoreView(review.comment.length > 60);
    }
  }, [review?.comment]);

  const gatheringType =
    GATHERING_TYPE_MAP[review?.Gathering?.type as GatheringType] || "";

  return (
    <li className="flex w-full flex-col items-start gap-6 text-gray-700 md:flex-row">
      <div className="relative h-[9.75rem] w-full md:w-[17.5rem]">
        <Image
          fill
          alt="gathering-image"
          src={review?.Gathering?.image}
          className="shrink-0 rounded-3xl object-cover"
          sizes="(max-width: 768px) 100vw, 17.5rem"
          priority={priority}
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-8 self-stretch md:flex-1 md:gap-6">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
            <ReviewRating score={review?.score} />
            <div className="relative text-sm font-medium">
              <p>
                {isShowFullComment ? (
                  review?.comment
                ) : (
                  <>
                    {truncateText(review?.comment)}
                    {isMoreView && (
                      <button
                        type="button"
                        onClick={() => setIsShowText(true)}
                        className="text-sm font-medium text-gray-500"
                      >
                        더보기
                      </button>
                    )}
                  </>
                )}
              </p>
            </div>

            <Link href={`/list-detail/${review?.Gathering?.id}`}>
              <p className="flex flex-row items-center gap-[0.375rem] text-xs font-medium">
                <span>
                  {gatheringType} {review?.Gathering?.name} 이용
                </span>
                <span>·</span>
                <span>{review?.Gathering?.location}</span>
                <span className="pl-1 font-semibold text-gray-500"> 〉 </span>
              </p>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              {hasUserInfo && (
                <p className="flex flex-row items-center gap-2">
                  <span className="relative size-6 overflow-hidden rounded-full">
                    <Image
                      alt="user-profile"
                      fill
                      sizes="24px"
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
                {formatDate(review?.Gathering.dateTime)}
              </span>
            </div>
            <span className="text-end text-xs font-medium text-gray-500">
              작성일 {formatDate(review?.createdAt)}
            </span>
          </div>
        </div>
        <div className="inline-block w-full border-b-2 border-dashed border-gray-200" />
      </div>
    </li>
  );
}
