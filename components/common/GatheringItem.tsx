import Image from "next/image";
import Link from "next/link";
import { formatDateTime2 } from "@utils/dateFormatter";
import ChipInfo from "@components/common/ChipInfo";

export interface GatheringItemProps {
  gathering: {
    teamId: number;
    id: number;
    type?: string; // 모임 유형 (예: "DALLAEMFIT", "YOGA", "DANCE" 등)
    name: string; // 모임 이름
    dateTime: string; // 모임 날짜 및 시간 (ISO 8601 형식)
    registrationEnd?: string; // 모집 마감일
    location?: string; // 모임 위치
    participantCount: number; // 현재 참여 인원
    capacity: number; // 최대 인원
    image?: string; // 대표 이미지 URL
    createdBy: number; // 생성자 ID
    canceledAt?: string | null; // 취소된 경우 날짜, 없으면 null
  };
}

const DEFAULT_REVIEW_IMAGE = "/image/list-default.png";

// const HEART_ACTIVE_IMAGE = "icon-save-large-active.svg";
const HEART_INACTIVE_IMAGE = "/image/icon-save-large-inactive.svg";
const ARROW_RIGHT = "/image/arrow_right.svg";

const PERSON_IMAGE = "/image/person.svg";

export default function GatheringItem({ gathering }: GatheringItemProps) {
  const { date, time } = formatDateTime2(gathering.registrationEnd);
  const isFull = gathering.participantCount >= gathering.capacity;

  return (
    <Link
      href={`/gathering/${gathering.id}`}
      className="z-10 flex min-h-[19.75rem] flex-col self-stretch overflow-hidden rounded-[1.5rem] border-2 border-gray-100 bg-gray-100 bg-white md:min-h-[9.75rem] md:flex-row"
    >
      {/* 위쪽영역 */}
      <div className="relative min-h-[9.75rem] w-full md:w-[17.5rem]">
        <Image
          fill
          alt={gathering.name || "list-default"}
          // src={gathering.image || DEFAULT_REVIEW_IMAGE}
          src={DEFAULT_REVIEW_IMAGE}
        />
      </div>

      {/* 아래쪽영역 */}
      <div className="flex flex-col justify-start p-4 md:flex-1">
        <div className="mb-7 flex h-[60px] justify-between">
          <div>
            <div>
              <span className="text-lg font-semibold">{gathering.name} | </span>
              <span className="text-sm font-medium">{gathering.location}</span>
            </div>

            {/* 마감시간으로 설정  */}
            <div className="mt-2 flex gap-2">
              <ChipInfo info={date} />
              <ChipInfo info={time} variant="mint" />
            </div>
          </div>
          {/* 하트 부분 설정 필요 */}
          <div className="flex items-center justify-center">
            <Image
              alt={gathering.name || "list-default"}
              // src={gathering.image || DEFAULT_REVIEW_IMAGE}
              src={HEART_INACTIVE_IMAGE}
              width={48}
              height={48}
            />
          </div>
        </div>

        <div className="items-beween flex h-9 justify-between gap-6">
          {/* 밑에 왼쪽 */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1">
              <Image
                alt="person_icon"
                src={PERSON_IMAGE}
                width={20}
                height={20}
                className="inline-block"
              />
              <span>
                {gathering.participantCount}/{gathering.capacity}
              </span>
              <span>2</span>
            </div>
            <div className="relative mt-2 min-h-1 w-full rounded-full bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-mint-600 transition-all"
                style={{
                  width: `${(gathering.participantCount / gathering.capacity) * 100}%`,
                }}
              />
            </div>
          </div>
          {/* 밑에 오른쪽 */}
          <div className="flex min-w-[5.5rem] items-center justify-center text-base font-semibold text-mint-600">
            {isFull ? (
              <span className="flex-grow text-center">closed</span>
            ) : (
              <div className="flex gap-2">
                join now
                <Image
                  alt="join_arrow"
                  src={ARROW_RIGHT}
                  width={18}
                  height={18}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
