"use client";

import React from "react";
import ChipInfo from "@components/common/ChipInfo";
import { useFavoriteStore } from "@stores/favoriteStore";
import HeartIconActive from "@assets/icon-save-large-active.svg";
import HeartIconInActive from "@assets/icon-save-large-inactive.svg";

interface MeetingHeaderProps {
  gatheringId: number;
  title: string;
  location: string;
  date: string;
  time: string;
}

export default function MeetingHeader({
  gatheringId,
  title,
  location,
  date,
  time,
}: MeetingHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const isSaved = isFavorite(gatheringId);

  const handleToggleSave = () => {
    toggleFavorite(gatheringId);
  };

  return (
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
  );
}
