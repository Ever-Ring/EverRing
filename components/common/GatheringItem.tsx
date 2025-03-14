import Image from "next/image";
import Link from "next/link";
import { formatDateTime, isExpired } from "@utils/dateFormatter";
import ChipInfo from "@components/common/ChipInfo";
import { GatheringItemProps } from "@customTypes/gathering";
import { IMAGES } from "@constants/gathering";
import GatheringStatusBadge from "@features/list/components/GatheringStatusBadge";
import { useFavoriteStore } from "@stores/favoriteStore";
import { useHiddenGatheringStore } from "@stores/hiddenGatheringStore";

export default function GatheringItem({ gathering }: GatheringItemProps) {
  const { date, time } = formatDateTime(gathering.dateTime);
  const isFull = gathering.participantCount >= gathering.capacity;
  const isGatheringOpen = gathering.participantCount >= 5;
  const expired = isExpired(gathering.registrationEnd);
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const isLiked = isFavorite(gathering.id);
  const { hideExpiredGathering } = useHiddenGatheringStore();

  return (
    <div className="relative w-full">
      <Link
        href={`/list-detail/${gathering.id}`}
        className="z-10 flex min-h-[19.75rem] flex-col self-stretch overflow-hidden rounded-[1.5rem] border-2 border-gray-100 bg-white md:min-h-[9.75rem] md:flex-row"
      >
        <div className="relative min-h-[9.75rem] w-full md:w-[17.5rem]">
          <GatheringStatusBadge registrationEnd={gathering.registrationEnd} />
          <Image
            fill
            sizes="100%"
            alt={gathering.name || "list-default"}
            src={gathering.image || IMAGES.DEFAULT_REVIEW}
          />
        </div>
        <div className="flex flex-col justify-start p-4 md:flex-1">
          <div className="mb-7 flex h-[60px] justify-between">
            <div>
              <div>
                <span className="text-lg font-semibold">
                  {gathering.name} |{" "}
                </span>
                <span className="text-sm font-medium">
                  {gathering.type === "WORKATION"
                    ? "온라인"
                    : gathering.location}
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <ChipInfo info={date} />
                <ChipInfo info={time} variant="mint" />
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(gathering.id);
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
              <div className="relative mt-2 min-h-1 w-full overflow-hidden rounded-full bg-gray-200">
                {/* eslint-disable prettier/prettier */}
                <div
                  className="absolute left-0 top-0 h-full animate-progress rounded-full bg-mint-600"
                  style={
                    {
                      width: `${(gathering.participantCount / gathering.capacity) * 100}%`,
                      "--progress-width": `${(gathering.participantCount / gathering.capacity) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
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
                    style={{ width: "auto", height: "auto" }}
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
            alt="마감된 챌린지를 삭제하려면 클릭하세요"
            width={48}
            height={48}
            className="absolute top-[64%] cursor-pointer transition-all duration-200 hover:opacity-80 sm:right-6 sm:top-6"
            onClick={() => hideExpiredGathering(gathering.id)}
          />
        </div>
      )}
    </div>
  );
}
