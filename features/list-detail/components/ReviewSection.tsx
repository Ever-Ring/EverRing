"use client";

import { useState, useEffect } from "react";
import ReviewList from "@components/common/ReviewList";
import Pagination from "@features/list-detail/components/Pagination";
import useGetReviewList from "@features/list-detail/hooks/useGetReviewList";

export default function ReviewSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  const { data, isFetching, isError } = useGetReviewList({
    offset: (currentPage - 1) * limit,
    limit,
  });

  const {
    reviewData: reviews,
    totalItemCount,
    totalPages,
  } = data ?? {
    reviewData: [],
    totalItemCount: 0,
    totalPages: 0,
  };

  const computedTotalPages = (() => {
    if (totalPages > 0) return totalPages;
    if (totalItemCount > 0) return Math.ceil(totalItemCount / limit);
    return 0;
  })();

  const renderContent = () => {
    if (isError) return <p>에러가 발생했습니다.</p>;
    if (isFetching) return <p>불러 오는 중...</p>;
    if (computedTotalPages === 0) return <p>아직 리뷰가 없어요.</p>;
    return <ReviewList reviewData={reviews} />;
  };

  useEffect(() => {
    if (computedTotalPages > 0 && currentPage > computedTotalPages) {
      setCurrentPage(computedTotalPages);
    }
  }, [computedTotalPages, currentPage]);

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-6 border-t-2 border-gray-200 bg-white p-6">
      <div className="flex flex-col items-start gap-4">
        <span className="text-lg font-semibold text-gray-900">
          이용자들은 이 프로그램을 이렇게 느꼈어요!
        </span>
        <div className="flex flex-col items-start gap-4">{renderContent()}</div>
      </div>

      {computedTotalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={computedTotalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
