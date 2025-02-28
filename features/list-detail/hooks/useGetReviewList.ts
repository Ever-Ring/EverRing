import { useQuery } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";
import { ReviewQueryParams } from "@customTypes/reviewApi";
import { Review } from "@customTypes/review";

interface ReviewListResponse {
  reviewData: Review[];
  totalItemCount: number;
  totalPages: number;
}

export default function useGetReviewList(params: ReviewQueryParams) {
  return useQuery<ReviewListResponse>({
    queryKey: ["reviews", params],
    queryFn: async () => {
      const response = await ReviewApi.getReviewData(params);
      const { data: reviews, totalItemCount, totalPages } = response.data;
      return { reviewData: reviews, totalItemCount, totalPages };
    },
    placeholderData: {
      reviewData: [],
      totalItemCount: 0,
      totalPages: 0,
    },
  });
}
