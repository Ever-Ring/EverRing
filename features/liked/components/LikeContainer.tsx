"use client";

import Button from "@components/common/Button";
import FavoriteGatheringList from "@features/liked/components/FavoriteGatheringList";
import { GatheringViewModel } from "@features/list/hooks/GatheringViewModel";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";
import ChipFilterGroup from "@components/common/ChipFilterGroup";

export default function LikeContainer() {
  const {
    selectedTabIndex,
    setTabIndex,
    typeFilter,
    setTypeFilter,
    subChips,
    favoriteDate,
    clearFavorites,
  } = GatheringViewModel();

  return (
    <div className="flex w-full flex-col">
      <section className="mb-[14px] flex flex-wrap items-center justify-between">
        <div>
          <TabMenu
            hasIcon
            tabs={TABS}
            selectedIndex={selectedTabIndex}
            onSelect={setTabIndex}
          />
        </div>
        <div className="mt-2">
          <Button text="모두 비우기" size="small" onClick={clearFavorites} />
        </div>
      </section>
      <section className="flex justify-start gap-2">
        <ChipFilterGroup
          subChips={subChips}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </section>
      <hr className="my-4 w-full border-t-2 border-gray-200" />
      <FavoriteGatheringList gatherings={favoriteDate} />
    </div>
  );
}
