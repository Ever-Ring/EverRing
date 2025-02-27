"use client";

import { useGetIdGatherings } from "@features/list/hooks/useGetIdGatherings";
import Image from "next/image";
import Button from "@components/common/Button";
import { useFavoriteStore } from "@stores/favoriteStore";
import FavoriteGatheringList from "@features/liked/FavoriteGatheringList";
import { useGatheringFilters } from "@features/list/hooks/useGatheringFilters";
import TabMenu from "@components/common/TabMenu";
import Chip from "@components/common/Chip";
import { TABS } from "@constants/tab";

export default function LikePage() {
  const {
    selectedTabIndex,
    setSelectedTabIndex,
    typeFilter,
    setTypeFilter,
    filters,
    subChips,
  } = useGatheringFilters();

  const { data: favoriteDate = [] } = useGetIdGatherings(filters);
  const { clearFavorites } = useFavoriteStore();

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
      <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
        <Image
          src="image/img-head-saved.svg"
          alt="review head image"
          width={72}
          height={72}
        />
        <div className="flex flex-1 justify-between">
          <div>
            <p className="mt-1 text-2xl font-semibold">찜한 모임</p>
            <p className="text-sm font-medium">
              마감되기 전에 지금 바로 참여해보세요
            </p>
          </div>
        </div>
      </section>
      {/*  카테고리 탭 */}
      <section className="mb-[14px] flex flex-wrap items-center justify-between">
        <div>
          <TabMenu
            hasIcon
            tabs={TABS}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />
        </div>
        <div className="mt-2">
          <Button text="모두 비우기" size="small" onClick={clearFavorites} />
        </div>
      </section>

      {/*  카테고리 필터 */}
      <section className="flex justify-start gap-2">
        {subChips.map((chip) => (
          <Chip
            key={chip.value}
            label={chip.label}
            selected={typeFilter === chip.value}
            onClick={() => setTypeFilter(chip.value)}
          />
        ))}
      </section>

      <hr className="my-4 w-full border-t-2 border-gray-200" />

      {/* 찜하기 목록 */}
      <FavoriteGatheringList gatherings={favoriteDate} />
    </div>
  );
}
