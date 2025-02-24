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

  // data의 구조: { reviewData: Review[], totalItemCount: number, totalPages: number }
  const {
    reviewData: reviews,
    totalItemCount,
    totalPages,
  } = data ?? {
    reviewData: [],
    totalItemCount: 0,
    totalPages: 0,
  };

  // 서버에서 내려준 totalPages를 우선 사용하고, 없으면 totalItemCount로 계산
  const computedTotalPages = (() => {
    if (totalPages > 0) return totalPages;
    if (totalItemCount > 0) return Math.ceil(totalItemCount / limit);
    return 0;
  })();

  // totalPages가 변경될 때 currentPage 조정 (불필요한 리렌더 방지)
  useEffect(() => {
    setCurrentPage((prevPage) => {
      if (computedTotalPages === 0) return 1;
      if (prevPage > computedTotalPages) return computedTotalPages;
      return prevPage;
    });
  }, [computedTotalPages]);

  // 컨텐츠 렌더링 로직
  const renderContent = () => {
    if (isError) return <p>에러가 발생했습니다.</p>;
    if (isFetching) return <p>불러 오는 중...</p>;
    if (computedTotalPages === 0) return <p>리뷰가 없습니다.</p>;
    return <ReviewList reviewData={reviews} />;
  };

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
