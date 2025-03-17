"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetReviewList from "@features/list-detail/hooks/useGetReviewList";
import Pagination from "@features/list-detail/components/Pagination";
import ReviewList from "@components/common/ReviewList";
import { InitialReviewData } from "@customTypes/review";

interface ReviewSectionProps {
  gatheringId: number;
  initialReviewData?: InitialReviewData;
  initialPage: number;
}

export default function ReviewSection({
  gatheringId,
  initialReviewData,
  initialPage,
}: ReviewSectionProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const limit = 4;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      router.push(`?page=${page}`);
    },
    [router],
  );

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl && Number(pageFromUrl) !== currentPage) {
      setCurrentPage(Number(pageFromUrl));
    }
  }, [searchParams, currentPage]);

  const { data, isLoading, isError } = useGetReviewList({
    gatheringId,
    offset: (currentPage - 1) * limit,
    limit,
    initialData: currentPage === 1 ? initialReviewData : undefined,
  });

  const { reviewData, totalItemCount, totalPages } = data ?? {
    reviewData: [],
    totalItemCount: 0,
    currentPage: 1,
    totalPages: 0,
  };

  const computedTotalPages = totalPages || Math.ceil(totalItemCount / limit);

  useEffect(() => {
    if (computedTotalPages > 0 && currentPage > computedTotalPages) {
      handlePageChange(computedTotalPages);
    }
  }, [computedTotalPages, currentPage, handlePageChange]);

  const renderContent = () => {
    if (isError) return <p>에러가 발생했습니다.</p>;
    if (isLoading) return <p>불러오는 중...</p>;
    if (!reviewData?.length) return <p>아직 리뷰가 없어요.</p>;
    return <ReviewList reviewData={reviewData} />;
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-6 border-t-2 border-gray-200 bg-white p-6">
      <div className="flex w-full flex-col items-start gap-4">
        <span className="text-lg font-semibold text-gray-900">
          이용자들은 이 프로그램을 이렇게 느꼈어요!
        </span>
        <div className="w-full">{renderContent()}</div>
      </div>
      {computedTotalPages > 0 && (
        <div className="flex w-full justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={computedTotalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
