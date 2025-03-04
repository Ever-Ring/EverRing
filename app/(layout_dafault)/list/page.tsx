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
import { useGatheringFilters } from "@features/list/hooks/useGatheringFilters";
import CreateGatheringButton from "@features/list/CreateGatheringButton";

export default function List() {
  const {
    selectedTabIndex,
    setSelectedTabIndex,
    typeFilter,
    setTypeFilter,
    setLocationFilter,
    setDateFilter,
    setSortBy,
    filters,
    subChips,
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

  // 스크롤 부분 디벨롭 예정
  useEffect(() => {
    if (!loadMoreRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("스크롤 감지됨:", entries[0]);
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("추가 데이터 요청 중");
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
      {/* 헤더 */}
      <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
        <HeartImage className="w-18 h-18" />
        <div>
          <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
          <p className="mt-1 text-2xl font-semibold">
            지금 모임에 참여해보세요
          </p>
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
        <CreateGatheringButton />
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

      {/* 정렬 & 필터링 섹션 */}
      <section className="mb-4 flex justify-between sm:mb-6">
        <div className="flex gap-2">
          {selectedTabIndex === 0 && (
            <LocationFilter
              onLocationChange={(selected) =>
                setLocationFilter(selected === "지역전체" ? null : selected)
              }
            />
          )}
          <DateFilter onDateSelect={(date) => setDateFilter(date)} />
        </div>
        <SortFilter variant="list" onSortChange={setSortBy} />
      </section>

      {/*  모임 리스트 */}
      <section>
        <GatheringList gatherings={gatherings} />
      </section>

      {/*  무한 스크롤 트리거 */}
      <div ref={loadMoreRef} className="bg-red-500 w-30 z-10 h-10 text-center">
        {isFetchingNextPage ? "로딩 중..." : ""}
      </div>

      {/*  API 요청 오류 표시 */}
      {error && (
        <div className="text-red-500">❌ API 요청 오류: {error.message}</div>
      )}
    </div>
  );
}
