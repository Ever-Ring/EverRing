"use client";

import TabMenu from "@components/common/TabMenu";
import GatheringList from "@components/common/GatheringList";
import { TABS } from "@constants/tab";
import { GatheringViewModel } from "@features/list/hooks/GatheringViewModel";
import CreateGatheringButton from "@features/list/components/CreateGatheringButton";
import ChipFilterGroup from "@components/common/ChipFilterGroup";
import FilterOptions from "@features/list/components/FilterOptions";

export default function ListContainer() {
  const {
    selectedTabIndex,
    setTabIndex,
    typeFilter,
    setTypeFilter,
    setLocationFilter,
    setDateFilter,
    setSortBy,
    subChips,
    filters,
    gatherings,
    isFetchingNextPage,
    loadMoreRef,
  } = GatheringViewModel();

  return (
    <div className="flex w-full flex-col pt-6 md:pt-8">
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
        <ChipFilterGroup
          subChips={subChips}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </section>
      <hr className="my-4 w-full border-t-2 border-gray-200" />
      <section className="mb-4 flex justify-between sm:mb-6">
        <FilterOptions
          selectedTabIndex={selectedTabIndex}
          filters={filters}
          setLocationFilter={setLocationFilter}
          setDateFilter={setDateFilter}
          setSortBy={setSortBy}
        />
      </section>
      <section>
        <GatheringList gatherings={gatherings} />
      </section>
      <div ref={loadMoreRef} className="bg-red-500 w-30 z-10 h-10 text-center">
        {isFetchingNextPage ? "로딩 중..." : ""}
      </div>
    </div>
  );
}
