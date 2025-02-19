"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { Review } from "@customTypes/review";

export default function useGetReviewData({
  type,
  location,
  date,
  sortBy,
  sortOrder,
  limit = 1, // TODO 아직 데이터가 많이 없어서 임시로 적게 설정
  offset = 0,
  initialData = [],
  totalItemCount,
}: ReviewQueryParams & { initialData: Review[]; totalItemCount: number }) {
  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    // TODO 임시 쿼리키- 수정필요
    queryKey: ["reviews", type, location, date, sortBy, sortOrder, limit],
    queryFn: async ({ pageParam = offset }) => {
      const response = await ReviewApi.getReviewData({
        type,
        location,
        date,
        sortBy,
        sortOrder,
        limit,
        offset: pageParam,
      });

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((page) => page.data).length;
      return loadedItems < lastPage.totalItemCount ? loadedItems : undefined;
    },
    initialData: {
      pages: [
        {
          data: initialData,
          totalItemCount,
        },
      ],
      pageParams: [offset],
    },
    initialPageParam: 0,
  });

  const flatData = data?.pages.flatMap((page) => page.data) || [];

  return {
    data: flatData,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
