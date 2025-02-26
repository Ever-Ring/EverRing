import Image from "next/image";
import { IMAGES } from "@constants/gathering";
import { extractHour, isExpired } from "@utils/dateFormatter";

interface GatheringStatusBadgeProps {
  registrationEnd?: string;
}

export default function GatheringStatusBadge({
  registrationEnd,
}: GatheringStatusBadgeProps) {
  const expired = isExpired(registrationEnd);
  const deadlineTime = extractHour(registrationEnd || "");

  return (
    <div className="absolute right-0 top-0 z-10 flex h-8 min-w-[100px] rounded-bl-xl bg-mint-600 p-2">
      <Image src={IMAGES.WATCH} alt="WATCH" width={24} height={24} />
      <p className="text-xs font-medium text-white">
        {expired ? "마감된 모임" : `${deadlineTime}시 마감 예정`}
      </p>
    </div>
  );
}
