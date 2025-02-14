import ReviewRating from "@components/common/ReviewRating";
import Image from "next/image";
import UnderLine from "@assets/underline.svg";

interface ReviewItemProps {
  gatheringImage: string;
  score: number;
  comment: string;
  gatheringName: string;
  gatheringLocation: string;
  userImage: string;
  userName: string;
  createdAt: Date;
  isMypage?: boolean;
  isReviewPage?: boolean;
}

export default function ReviewItem({
  gatheringImage,
  score,
  comment,
  gatheringName,
  gatheringLocation,
  userImage,
  userName,
  createdAt,
  isMypage,
  isReviewPage,
}: ReviewItemProps) {
  return (
    <li className="flex flex-col items-start gap-6 text-gray-700 sm:flex-row">
      {!isReviewPage && (
        <div className="relative h-[9.75rem] w-full sm:w-[17.5rem]">
          <Image
            fill
            alt="gathering-image"
            src={gatheringImage}
            className="shrink-0 rounded-3xl object-cover"
          />
        </div>
      )}
      <div className="flex h-[10.5rem] flex-col items-start justify-between self-stretch sm:h-[9.75rem] sm:flex-1">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
            <ReviewRating score={score} />
            <p className="text-sm font-medium">{comment}</p>
            {!isReviewPage && (
              <p className="flex flex-row items-center gap-[0.375rem] text-xs font-medium">
                <span>{gatheringName} 이용</span>
                <span>·</span>
                <span>{gatheringLocation}</span>
              </p>
            )}
          </div>
          <div className="flex flex-row items-center gap-3">
            {!isMypage && (
              <p className="flex flex-row items-center gap-2">
                <span className="relative size-6">
                  <Image alt="user-profile" fill src={userImage} />
                </span>
                <span className="text-xs font-medium">{userName}</span>
                <span>|</span>
              </p>
            )}
            <span className="text-xs font-medium text-gray-500">
              {createdAt.toISOString().split("T")[0]}
            </span>
          </div>
        </div>

        <UnderLine className="w-full shrink-0 self-stretch fill-gray-200" />
      </div>
    </li>
  );
}
