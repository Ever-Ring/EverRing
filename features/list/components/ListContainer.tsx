"use client";

import TabMenu from "@components/common/TabMenu";
import GatheringList from "@components/common/GatheringList";
import { TABS } from "@constants/tab";
import { GatheringViewModel } from "@features/list/hooks/GatheringViewModel";
import CreateGatheringButton from "@features/list/components/CreateGatheringButton";
import ChipFilterGroup from "@components/common/ChipFilterGroup";
import FilterOptions from "@features/list/components/FilterOptions";
import ExpiredFilterCheckbox from "@components/common/ExpiredFilterCheckbox";

export default function ListContainer() {
  const {
    showExpired,
    setShowExpired,
    selectedTabIndex,
    setTabIndex,
    typeFilter,
    setTypeFilter,
    setLocationFilter,
    setDateFilter,
    setSortBy,
    sortBy,
    subChips,
    filters,
    gatherings,
    isFetchingNextPage,
    loadMoreRef,
  } = GatheringViewModel();
  console.log(filters);
  console.log(sortBy);

  return (
    <div className="flex w-full flex-col">
      <section className="mb-[14px] flex flex-wrap items-center justify-between">
        <TabMenu
          hasIcon
          tabs={TABS}
          selectedIndex={selectedTabIndex}
          onSelect={setTabIndex}
        />
        <CreateGatheringButton />
      </section>
      <section className="flex justify-between">
        <ChipFilterGroup
          subChips={subChips}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        <ExpiredFilterCheckbox
          showExpired={showExpired}
          setShowExpired={setShowExpired}
        />
      </section>
      <hr className="my-4 w-full border-t-2 border-gray-200" />

      <section className="mb-4 sm:mb-6">
        <FilterOptions
          selectedTabIndex={selectedTabIndex}
          filters={filters}
          setLocationFilter={setLocationFilter}
          setDateFilter={setDateFilter}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      </section>
      <section>
        <GatheringList gatherings={gatherings} showExpired={showExpired} />
      </section>
      <div ref={loadMoreRef} className="bg-red-500 w-30 z-10 h-10 text-center">
        {isFetchingNextPage ? "로딩 중..." : ""}
      </div>
    </div>
  );
}
