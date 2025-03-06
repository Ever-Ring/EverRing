"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { getClientReviewQuery } from "@features/review/hooks/useReviewQuery";

export default function useGetReviewData(filter: ReviewQueryParams) {
  const query = useInfiniteQuery(getClientReviewQuery(filter));
  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.data) ?? [],
  };
}
