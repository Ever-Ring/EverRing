import Link from "next/link";

export interface GatheringItemProps {
  gathering: {
    teamId: number;
    id: number;
    type: string; // 모임 유형 (예: "DALLAEMFIT", "YOGA", "DANCE" 등)
    name: string; // 모임 이름
    dateTime: string; // 모임 날짜 및 시간 (ISO 8601 형식)
    registrationEnd: string; // 모집 마감일
    location: string; // 모임 위치
    participantCount: number; // 현재 참여 인원
    capacity: number; // 최대 인원
    image: string; // 대표 이미지 URL
    createdBy: number; // 생성자 ID
    canceledAt: string | null; // 취소된 경우 날짜, 없으면 null
  };
}

export default function GatheringItem({ gathering }: GatheringItemProps) {
  return (
    <Link
      href={`/gathering/${gathering.id}`}
      className="flex min-h-[19.75rem] flex-col self-stretch border border-black bg-gray-100 md:min-h-[9.75rem] md:flex-row"
    >
      {/* 위쪽영역 */}
      <div className="min-h-[9.75rem] w-full border border-black md:w-[17.5rem]">
        {gathering.id}
      </div>

      {/* 아래쪽영역 */}
      <div className="flex flex-col justify-start p-4 md:flex-1">
        <div className="mb-7 flex h-[60px] justify-between border border-black">
          <div>
            <div>달램핏 오피스 스트레칭 | 을지로 3</div>
            <div>달력 시간</div>
          </div>
          <div className="flex items-center justify-center">하트표시</div>
        </div>

        <div className="flex h-9 items-center justify-between border border-black">
          <div>개설확정 꾸겨 넣기</div>
          <div>조인나우</div>
        </div>
      </div>
    </Link>
  );
}
