import Image from "next/image";
import Button from "@components/common/Button";
import StateChip from "@features/mypage/components/StateChip";
import { formatDateTime } from "@utils/dateFormatter";

interface MypageCardProps {
  id: number;
  name: string;
  location: string;
  dateTime: string;
  image: string;
  isCompleted?: boolean;
  participantCount: number;
  capacity: number;
  isMyGatheringTab?: boolean;
  isMadeByMe?: boolean;
}

export default function MypageCard({
  id,
  name,
  location,
  dateTime,
  image,
  isCompleted,
  isMyGatheringTab,
  isMadeByMe,
  participantCount,
  capacity,
}: MypageCardProps) {
  const formattedDateTime = formatDateTime(dateTime);

  return (
    <div className="mb-6 flex flex-col gap-4 border-b-2 border-dotted pb-6 md:flex-row">
      <div className="relative h-[9.75rem] w-full rounded-3xl md:w-[17.5rem]">
        <Image
          src={image}
          alt="gathering image"
          fill
          sizes="100%"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
      <div className="relative flex w-full flex-1 flex-col gap-y-3">
        {isMyGatheringTab && (
          <StateChip
            isPending={participantCount < capacity}
            isCompleted={isCompleted}
          />
        )}
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row gap-x-2">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-lg font-semibold">|</p>
            <p>{location}</p>
          </div>
          <div className="flex flex-row items-center">
            <p className="mr-3">{formattedDateTime}</p>
            <Image
              src="/image/person.svg"
              alt="participant icon"
              width={16}
              height={16}
              className="mr-1"
            />
            <p>
              {participantCount}/{capacity}
            </p>
          </div>
        </div>
        {!isMadeByMe && (
          <div className="md:absolute md:bottom-0 md:left-0">
            <Button
              text={isCompleted ? "리뷰 작성하기" : "예약 취소하기"}
              size="small"
              disabled={false}
              variant={isCompleted ? "solid" : "outlined"}
              type="button"
              onClick={() => {
                // TODO: 버튼 인터랙션 기능 추가
                console.log("id: ", id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
