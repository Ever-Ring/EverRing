"use client";

import ReviewApi from "@apis/ReviewApi";
import { useQuery } from "@tanstack/react-query";
import { ReviewScoreQueryParams } from "@customTypes/reviewApi";

export default function useGetReviewScore(params: ReviewScoreQueryParams) {
  // TODO 쿼리키 수정
  return useQuery({
    queryKey: ["reviewScore", params],
    queryFn: async () => {
      const response = await ReviewApi.getReviewScore(params);

      return response.data[0];
    },
  });
}
