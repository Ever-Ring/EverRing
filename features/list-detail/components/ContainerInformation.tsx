"use client";

import { useState } from "react";
import useGetParticipants from "@features/list-detail/hooks/useGetParticipants";
import { useFavoriteStore } from "@stores/favoriteStore";
import ChipInfo from "@components/common/ChipInfo";
import HeartIconActive from "@assets/icon-save-large-active.svg";
import HeartIconInActive from "@assets/icon-save-large-inactive.svg";
import IconCheck from "@assets/ic-check-variant.svg";
import Ellipse from "@assets/ellipse.svg";

interface ContainerInformationProps {
  maxCount: number;
  gatheringId: number;
  title: string;
  location: string;
  date: string;
  time: string;
}

function ContainerInformation({
  maxCount,
  gatheringId,
  title,
  location,
  date,
  time,
}: ContainerInformationProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { data: participants = [] } = useGetParticipants(gatheringId);

  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const isSaved = isFavorite(gatheringId);

  const handleToggleSave = () => {
    toggleFavorite(gatheringId);
  };

  const currentCount = participants.length;
  const isConfirmed = currentCount >= 5;
  const progress = Math.min((currentCount / maxCount) * 100, 100);

  const visibleUsers = participants.slice(0, 4);
  const hiddenUsers = participants.slice(4);
  const hiddenCount = Math.max(0, participants.length - 4);

  return (
    <div className="flex w-[486px] flex-col items-start rounded-3xl border-2 border-gray-200 bg-white py-6">
      <div className="mb-11 flex w-full px-6">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex flex-col gap-3 pr-16">
            <div className="flex flex-col gap-[2px]">
              <span className="text-lg font-semibold leading-7 text-gray-900">
                {title}
              </span>
              <span className="text-sm font-medium leading-5 text-gray-700">
                {location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChipInfo info={date} />
              <ChipInfo info={time} variant="mint" />
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleSave}
            className="absolute right-0 top-0 focus:outline-none"
          >
            {isSaved ? (
              <HeartIconActive
                className="h-12 w-12"
                aria-label="찜 아이콘 등록 상태"
              />
            ) : (
              <HeartIconInActive
                className="h-12 w-12"
                aria-label="찜 아이콘 해제 상태"
              />
            )}
          </button>
        </div>
      </div>
      <div className="w-full border-t-2 border-dashed border-gray-200" />
      <div className="mt-6 flex flex-col gap-[10px] self-stretch px-6">
        <div className="gap-2">
          <div className="gap-3">
            <div className="flex items-end justify-between self-stretch">
              <div className="flex items-center gap-3">
                <div className="flex items-start gap-[6px]">
                  <span className="text-sm font-semibold text-gray-900">
                    모집 정원
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {currentCount}명
                  </span>
                </div>
                <div className="flex items-center -space-x-[10px]">
                  {visibleUsers.map((user, index) =>
                    user?.user?.image ? (
                      <div
                        key={user.user.id || index}
                        className="relative h-[29px] w-[29px] rounded-full bg-gray-300"
                        style={{
                          backgroundImage: `url(${encodeURI(user.user.image)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    ) : null,
                  )}
                  {hiddenCount > 0 && (
                    <div
                      className="relative flex h-[29px] w-[29px] items-center justify-center"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {!isHovered ? (
                        <>
                          <Ellipse className="h-[29px] w-[29px]" />
                          <span className="absolute bottom-1/2 left-1/2 translate-x-[-50%] translate-y-[50%] text-sm font-semibold text-gray-800">
                            +{hiddenCount}
                          </span>
                        </>
                      ) : (
                        <div
                          className="absolute left-1/2 top-8 z-10 max-h-60 w-[180px] -translate-x-1/2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-lg"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {hiddenCount > 0 &&
                              [...visibleUsers, ...hiddenUsers].map((user) =>
                                user?.user?.image ? (
                                  <div
                                    key={user.user.id}
                                    className="flex items-center gap-2"
                                  >
                                    <div
                                      className="h-8 w-8 rounded-full bg-gray-300"
                                      style={{
                                        backgroundImage: `url(${encodeURI(user.user.image)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                    />
                                    <span className="text-xs font-medium text-gray-700">
                                      {user.user.name}
                                    </span>
                                  </div>
                                ) : null,
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {isConfirmed && (
                <div className="flex items-center gap-1">
                  <IconCheck />
                  <span className="text-sm font-medium text-mint-500">
                    개설확정
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="absolute left-0 top-0 h-full bg-mint-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span>최소인원 5명</span>
          <span
            className={`text-xs font-medium ${currentCount === maxCount ? "text-mint-400" : "text-gray-700"}`}
          >
            최대인원 {maxCount}명
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContainerInformation;
