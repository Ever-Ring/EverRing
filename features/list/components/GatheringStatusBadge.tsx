import Image from "next/image";
import { IMAGES } from "@constants/gathering";
import { getRemainingHours, isExpired } from "@utils/dateFormatter";

interface GatheringStatusBadgeProps {
  registrationEnd?: string;
}

export default function GatheringStatusBadge({
  registrationEnd,
}: GatheringStatusBadgeProps) {
  const expired = isExpired(registrationEnd);
  const remainingHours = getRemainingHours(registrationEnd || "");

  return (
    <div className="absolute right-0 top-0 z-10 flex h-8 min-w-[100px] rounded-bl-xl bg-mint-600 p-2">
      <Image src={IMAGES.WATCH} alt="WATCH" width={24} height={24} />
      <p className="text-xs font-medium text-white">
        {expired
          ? "마감된 모임"
          : remainingHours <= 0
            ? "곧 마감"
            : remainingHours < 24
              ? `${remainingHours}시간 후 마감  `
              : `${Math.floor(remainingHours / 24)}일 후 마감`}
      </p>
    </div>
  );
}
