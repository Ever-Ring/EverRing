"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { Review } from "@customTypes/review";

export default function useGetReviewData(
  filter: ReviewQueryParams,
  {
    initialData = [],
    totalItemCount,
  }: {
    initialData: Review[];
    totalItemCount: number;
  },
) {
  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", filter],
    queryFn: async ({ pageParam }) => {
      const response = await ReviewApi.getReviewData({
        ...filter,
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
      pageParams: [filter.offset],
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
