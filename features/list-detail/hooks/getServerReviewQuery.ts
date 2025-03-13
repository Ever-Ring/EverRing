import { axiosInstance } from "@lib/axios";
import { QueryKey } from "@tanstack/react-query";
import { Review } from "@customTypes/review";

export interface ReviewResponse {
  reviewData: Review[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

export default function getServerReviewQuery({
  gatheringId,
  offset,
  limit,
}: {
  gatheringId: number;
  offset: number;
  limit: number;
}) {
  const queryKey: QueryKey = ["reviews", gatheringId, offset, limit];
  const queryFn = async (): Promise<ReviewResponse> => {
    const response = await axiosInstance.get(`/reviews`, {
      params: { gatheringId, offset, limit },
    });
    return response.data;
  };

  return { queryKey, queryFn };
}
