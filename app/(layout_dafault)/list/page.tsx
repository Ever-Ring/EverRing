"use client";

import { useEffect, useRef } from "react";
import { useGetGatherings } from "@features/list/hooks/useGetGatherings";
import TabMenu from "@components/common/TabMenu";
import HeartImage from "@assets/img-head-class.svg";
import Chip from "@components/common/Chip";
import DateFilter from "@components/common/DateFilter";
import SortFilter from "@components/common/SortFilter";
import LocationFilter from "@components/common/LocationFilter";
import GatheringList from "@components/common/GatheringList";
import { TABS } from "@constants/tab";
import { LOCATION_ITEMS, SORT_ITEMS } from "@constants/filter";
import { useGatheringFilters } from "@features/list/hooks/useGatheringFilters";
import CreateGatheringButton from "@features/list/CreateGatheringButton";

export default function List() {
  const {
    selectedTabIndex,
    setTabIndex,
    typeFilter,
    setTypeFilter,
    setLocationFilter,
    setDateFilter,
    setSortBy,
    filters,
    subChips,
    sortBy,
  } = useGatheringFilters();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useGetGatherings(filters);

  const gatherings = Array.isArray(data?.pages)
    ? data.pages.flatMap((page) =>
        Array.isArray(page.data)
          ? page.data.filter((item) => item.canceledAt === null)
          : [],
      )
    : [];

  useEffect(() => {
    if (!loadMoreRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
      <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
        <HeartImage className="w-18 h-18" />
        <div>
          <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
          <p className="mt-1 text-2xl font-semibold">
            지금 모임에 참여해보세요
          </p>
        </div>
      </section>
      <section className="mb-[14px] flex flex-wrap items-center justify-between">
        <TabMenu
          hasIcon
          tabs={TABS}
          selectedIndex={selectedTabIndex}
          onSelect={setTabIndex}
        />
        <CreateGatheringButton />
      </section>
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
      <section className="mb-4 flex justify-between sm:mb-6">
        <div className="flex gap-2">
          {selectedTabIndex === 0 && (
            <LocationFilter
              selectedLocation={filters.location}
              onLocationChange={setLocationFilter}
              locations={LOCATION_ITEMS}
            />
          )}
          <DateFilter
            onDateSelect={(date) => setDateFilter(date)}
            loadDate={filters.date}
          />
        </div>
        <SortFilter
          selectedSort={sortBy}
          onSortChange={setSortBy}
          sortOptions={SORT_ITEMS.list}
        />
      </section>
      <section>
        <GatheringList gatherings={gatherings} />
      </section>
      <div ref={loadMoreRef} className="bg-red-500 w-30 z-10 h-10 text-center">
        {isFetchingNextPage ? "로딩 중..." : ""}
      </div>
      {error && (
        <div className="text-red-500">❌ API 요청 오류: {error.message}</div>
      )}
    </div>
  );
}
