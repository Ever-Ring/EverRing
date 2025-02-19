"use client";

import { useState } from "react";
import RatingContainer from "@features/review/components/RatingContainer";
import FilterBar from "@features/review/components/FilterBar";
import ReviewListwithImage from "@components/common/ReviewListWithImage";
import Chip from "@components/common/Chip";
import TabMenu from "@components/common/TabMenu";
import { TABS } from "@constants/tab";
import useGetReviewData from "@features/review/hooks/useGetReviewData";
import { Review, Scores } from "@customTypes/review";
import useGetReviewScore from "@features/review/hooks/useGetReviewScore";

export default function ReviewContentContainer({
  initialData,
  totalItemCount,
  initialScore,
}: {
  initialData: Review[];
  totalItemCount: number;
  initialScore: Scores;
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const filter = {
    //     type: "DALLAEMFIT", // 예시: 리뷰 종류
    //     location: "홍대입구", // 예시: 지역
    //     date: "2025-02-18", // 예시: 날짜
    //     sortBy: "createdAt", // 예시: 최신순 정렬
    //     sortOrder: "desc", // 예시: 내림차순
    //     limit: 10,
    //     offset: 0,
  };

  const scoreFilter = {
    // gatheringId?
    //   type?
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
  } = useGetReviewData({ ...filter, initialData, totalItemCount });

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
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />
          <div className="flex items-start gap-2">
            <Chip label="전체" />
            <Chip label="오피스 스트레칭" />
            <Chip label="마인드풀니스" />
          </div>
        </div>
      </div>

      <RatingContainer scoreData={scoreData ?? initialScore} />
      <div className="flex h-full w-full flex-col items-start bg-white">
        <div className="sticky top-[176px] z-10 w-full md:top-[190px] lg:top-[194px]">
          <FilterBar />
        </div>

        <div className="px-4 pb-6 md:px-6">
          {/* ✅ // TODO 필터 변경 중 기존 데이터 유지하면서 로딩 표시 */}
          {isFetching && !isFetchingNextPage && (
            <div className="text-gray-500">필터 변경 중...</div>
          )}

          <ReviewListwithImage reviewData={data} hasUserInfo />

          {/* ✅ // TODO 무한 스크롤 로딩 스피너 */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            </div>
          )}

          {/* //TODO: Intersection Observer 적용 예정 */}
          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {!isFetchingNextPage && "더불러오기"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
