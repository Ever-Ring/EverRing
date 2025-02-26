"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { Review } from "@customTypes/review";
import { INITIAL_PARAMS } from "@features/review/constants/query";

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
  const isInitialParams =
    JSON.stringify(filter) === JSON.stringify(INITIAL_PARAMS);

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", filter],
    queryFn: async ({ pageParam = filter.offset }) => {
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
    initialData: isInitialParams
      ? {
          pages: [
            {
              data: initialData,
              totalItemCount,
            },
          ],
          pageParams: [0],
        }
      : undefined,
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
