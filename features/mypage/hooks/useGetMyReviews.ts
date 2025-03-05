import { useQuery } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";

export default function useGetMyReviews(params: { userId: number | null }) {
  return useQuery({
    queryKey: ["myReviews", params],
    queryFn: async () => {
      const response = await ReviewApi.getReviewData(params);
      return response.data;
    },
    enabled: !!params.userId,
  });
}
