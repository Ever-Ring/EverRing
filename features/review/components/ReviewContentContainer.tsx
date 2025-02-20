"use client";

import { useEffect, useState } from "react";
import RatingContainer from "@features/review/components/RatingContainer";
import FilterBar from "@features/review/components/FilterBar";
import ReviewListwithImage from "@components/common/ReviewListWithImage";
import Chip from "@components/common/Chip";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";
import useGetReviewData from "@features/review/hooks/useGetReviewData";
import { Review, Scores } from "@customTypes/review";
import useGetReviewScore from "@features/review/hooks/useGetReviewScore";
import { GATHERING_TYPE, GatheringType } from "@constants/gatheringType";
import { ReviewScoreQueryParams } from "@customTypes/reviewApi";
import { DESC, sortMap, chipOptions } from "@features/review/constants/review";

export default function ReviewContentContainer({
  initialData,
  totalItemCount,
  initialScore,
}: {
  initialData: Review[];
  totalItemCount: number;
  initialScore: Scores;
}) {
  const [filters, setFilters] = useState({
    tabIndex: 0,
    chipIndex: 0,
    type: GATHERING_TYPE.DALLAEMFIT as GatheringType,
    location: "지역전체",
    date: undefined as string | undefined,
    sort: "정렬",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, chipIndex: 0 }));
  }, [filters.tabIndex]);

  useEffect(() => {
    const typeMap: Record<string, GatheringType> = {
      "0-0": GATHERING_TYPE.DALLAEMFIT,
      "0-1": GATHERING_TYPE.OFFICE_STRETCHING,
      "0-2": GATHERING_TYPE.MINDFULNESS,
      "1-0": GATHERING_TYPE.WORKATION,
    };

    const newType =
      typeMap[`${filters.tabIndex}-${filters.chipIndex}`] ||
      GATHERING_TYPE.DALLAEMFIT;

    setFilters((prev) => ({
      ...prev,
      type: newType,
    }));
  }, [filters.tabIndex, filters.chipIndex]);

  const reviewfilter = {
    type: filters.type,
    location: filters.location === "지역전체" ? undefined : filters.location,
    date: filters.date,
    sortBy: sortMap[filters.sort] || undefined,
    sortOrder: DESC,
    limit: 2,
    offset: 0,
  };

  const scoreFilter: ReviewScoreQueryParams = {
    type: filters.type,
  };

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage } =
    useGetReviewData(reviewfilter, { initialData, totalItemCount });

  const {
    data: scoreData,
    // isLoading: isScoreLoading,
    // isError: isScoreError,
  } = useGetReviewScore(scoreFilter);

  // TODO 에러 처리
  if (isError) return <div>Error loading reviews</div>;

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <div className="sticky top-[54px] z-10 bg-gray-50 pt-6 md:top-[60px] md:pt-8">
        <div className="flex flex-col items-start gap-3 border-b-2 border-gray-200 pb-4 lg:gap-4">
          <TabMenu
            hasIcon
            tabs={TABS}
            selectedIndex={filters.tabIndex}
            onSelect={(index) =>
              setFilters((prev) => ({ ...prev, tabIndex: index }))
            }
          />

          <div className="flex items-start gap-2">
            <Chip
              label="전체"
              selected={filters.chipIndex === 0}
              onClick={() => setFilters((prev) => ({ ...prev, chipIndex: 0 }))}
            />
            {filters.tabIndex === 0 &&
              chipOptions.map((chip, index) => (
                <Chip
                  key={chip.label}
                  label={chip.label}
                  selected={filters.chipIndex === index + 1}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, chipIndex: index + 1 }))
                  }
                />
              ))}
          </div>
        </div>
      </div>

      <RatingContainer scoreData={scoreData ?? initialScore} />
      <div className="flex h-full w-full flex-col items-start bg-white">
        <div className="sticky top-[176px] z-10 w-full md:top-[190px] lg:top-[194px]">
          <FilterBar
            onLocationChange={(location) =>
              setFilters((prev) => ({ ...prev, location }))
            }
            onDateChange={(date) => setFilters((prev) => ({ ...prev, date }))}
            onSortChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
          />
        </div>

        <div className="px-4 pb-6 md:px-6">
          <ReviewListwithImage reviewData={data} hasUserInfo />

          {/* // TODO 무한 스크롤 로딩 스피너 - 일단 넣어놓은건데 제거할지말지 고민중.. */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
