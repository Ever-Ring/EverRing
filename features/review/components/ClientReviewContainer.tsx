"use client";

import { useInView } from "react-intersection-observer";
import RatingContainer from "@features/review/components/RatingContainer";
import FilterBar from "@features/review/components/FilterBar";
import ReviewListwithImage from "@components/common/ReviewListWithImage";
import Chip from "@components/common/Chip";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";
import { chipOptions } from "@features/review/constants/review";
import useReviewListViewModel from "@features/review/hooks/useReviewListViewModel";
import { memo } from "react";

function ClientReviewContainer() {
  const {
    filters,
    reviews = [],
    scoreData,
    hasNextPage,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    updateTabIndex,
    updateChipIndex,
    updateLocation,
    updateDate,
    updateSort,
  } = useReviewListViewModel();

  const { ref: loadMoreRef } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isError) return <div>Error loading reviews</div>;

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <div className="sticky top-[56px] z-10 bg-gray-50 pt-6 md:top-[60px] md:pt-8">
        <div className="flex flex-col items-start gap-3 border-b-2 border-gray-200 pb-4 lg:gap-4">
          <TabMenu
            hasIcon
            tabs={TABS}
            selectedIndex={filters.tabIndex}
            onSelect={updateTabIndex}
          />
          <div className="flex items-start gap-2">
            <Chip
              label="전체"
              selected={filters.chipIndex === 0}
              onClick={() => updateChipIndex(0)}
            />
            {filters.tabIndex === 0 &&
              chipOptions.map((chip, index) => (
                <Chip
                  key={chip.label}
                  label={chip.label}
                  selected={filters.chipIndex === index + 1}
                  onClick={() => updateChipIndex(index + 1)}
                />
              ))}
          </div>
        </div>
      </div>

      <RatingContainer scoreData={scoreData} />

      <div className="flex h-full w-full flex-col items-start bg-white">
        <div className="sticky top-[174px] z-10 w-full md:top-[190px] lg:top-[194px]">
          <FilterBar
            filters={filters}
            onLocationChange={updateLocation}
            onDateChange={updateDate}
            onSortChange={updateSort}
          />
        </div>

        <div className="w-full px-4 pb-6 md:px-6">
          {reviews?.length ? (
            <>
              <ReviewListwithImage reviewData={reviews} hasUserInfo />
              <div ref={loadMoreRef} className="h-1" />
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full py-28 md:py-48">
              <div className="text-center text-sm font-medium text-gray-500">
                아직 리뷰가 없어요
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(ClientReviewContainer);
