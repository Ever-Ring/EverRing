import Image from "next/image";
import Link from "next/link";
import { formatDateTime2, isExpired } from "@utils/dateFormatter";
import ChipInfo from "@components/common/ChipInfo";
import { GatheringItemProps } from "@customTypes/gathering";
import { IMAGES } from "@constants/gathering";
import GatheringStatusBadge from "@features/list/GatheringStatusBadge";
import { useFavoriteStore } from "@stores/favoriteStore";
import { useHiddenGatheringStore } from "@stores/hiddenGatheringStore";

export default function GatheringItem({ gathering }: GatheringItemProps) {
  const { date, time } = formatDateTime2(gathering.dateTime);
  const isFull = gathering.participantCount >= gathering.capacity;
  const isGatheringOpen = gathering.participantCount >= 5;
  const expired = isExpired(gathering.registrationEnd);
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const isLiked = isFavorite(gathering.id);
  const { hideExpiredGathering } = useHiddenGatheringStore();

  return (
    <div className="relative w-full">
      <Link
        href={`/gathering/${gathering.id}`}
        className="z-10 flex min-h-[19.75rem] flex-col self-stretch overflow-hidden rounded-[1.5rem] border-2 border-gray-100 bg-white md:min-h-[9.75rem] md:flex-row"
      >
        {/* 위쪽영역 */}
        <div className="relative min-h-[9.75rem] w-full md:w-[17.5rem]">
          <GatheringStatusBadge registrationEnd={gathering.registrationEnd} />
          <Image
            fill
            alt={gathering.name || "list-default"}
            src={gathering.image || IMAGES.DEFAULT_REVIEW}
          />
        </div>

        {/* 아래쪽영역 */}
        <div className="flex flex-col justify-start p-4 md:flex-1">
          <div className="mb-7 flex h-[60px] justify-between">
            <div>
              <div>
                <span className="text-lg font-semibold">
                  {gathering.name} |{" "}
                </span>
                <span className="text-sm font-medium">
                  {gathering.location}
                </span>
              </div>

              {/* 마감시간으로 설정  */}
              <div className="mt-2 flex gap-2">
                <ChipInfo info={date} />
                <ChipInfo info={time} variant="mint" />
              </div>
            </div>

            {/* ✅ 하트 버튼 (찜하기) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // ✅ 부모 Link 클릭 방지
                toggleFavorite(gathering.id); // ✅ 찜하기 상태 업데이트
              }}
              className="flex items-center justify-center"
            >
              <Image
                alt="찜하기"
                src={isLiked ? IMAGES.HEART_ACTIVE : IMAGES.HEART_INACTIVE}
                width={48}
                height={48}
                className={`transition-all duration-200 ${
                  isLiked ? "scale-110 opacity-100" : "scale-100 opacity-80"
                }`}
              />
            </button>
          </div>

          <div className="items-beween flex h-9 justify-between gap-6">
            {/* 밑에 왼쪽 */}
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-1">
                <Image
                  alt="person_icon"
                  src={IMAGES.PERSON}
                  width={20}
                  height={20}
                  className="inline-block"
                />
                <span>
                  {gathering.participantCount}/{gathering.capacity}
                </span>
                {/* 개설확정 추가 */}
                {isGatheringOpen && (
                  <div className="flex items-center">
                    <Image
                      alt="checkbox"
                      src={IMAGES.CHECKBOX}
                      width={24}
                      height={24}
                    />
                    <span className="text-sm font-medium text-mint-500">
                      개설확정
                    </span>
                  </div>
                )}
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
            <div className="flex min-w-[5.5rem] items-center justify-between text-base font-semibold text-mint-600">
              {isFull ? (
                <span className="mr-2 mt-3 flex-grow text-end">closed</span>
              ) : (
                <div className="mt-2 flex gap-2">
                  join now
                  <Image
                    alt="join_arrow"
                    src={IMAGES.ARROW_RIGHT}
                    width={18}
                    height={18}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      {expired && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[1.5rem] bg-black/70 text-lg font-medium text-white">
          <p>마감된 챌린지에요,</p>
          <p>다음 기회에 만나요 🙏</p>
          <Image
            src={IMAGES.BYE}
            alt="BYE"
            width={48}
            height={48}
            className="absolute top-[64%] sm:right-6 sm:top-6"
            onClick={() => hideExpiredGathering(gathering.id)}
          />
        </div>
      )}
    </div>
  );
}
