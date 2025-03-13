import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import ReviewApi from "@apis/ReviewApi";
import { Review } from "@customTypes/review";
import { ReviewQueryParams } from "@customTypes/reviewApi";

interface ReviewApiResponse {
  data: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

interface ReviewListResponse {
  reviewData: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

interface UseGetReviewListParams extends ReviewQueryParams {
  initialData?: ReviewListResponse;
}

type RawReviewApiResponse = AxiosResponse<ReviewApiResponse>;

export default function useGetReviewList({
  initialData,
  ...params
}: UseGetReviewListParams): UseQueryResult<ReviewListResponse> {
  return useQuery<ReviewListResponse>({
    queryKey: ["reviews", params],
    queryFn: async () => {
      const response = (await ReviewApi.getReviewData(
        params,
      )) as RawReviewApiResponse;

      const { data, totalItemCount, currentPage, totalPages } = response.data;

      return {
        reviewData: data,
        totalItemCount,
        currentPage,
        totalPages,
      };
    },
    placeholderData: initialData ?? {
      reviewData: [],
      totalItemCount: 0,
      currentPage: 1,
      totalPages: 0,
    },
  });
}
