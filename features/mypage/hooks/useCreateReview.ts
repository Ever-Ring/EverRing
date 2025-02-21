import { useMutation } from "@tanstack/react-query";
import ReviewApi from "@apis/ReviewApi";

export default function useCreateReview() {
  return useMutation({
    mutationFn: (data: {
      gatheringId: number;
      score: number;
      comment: string;
    }) => ReviewApi.createReview(data),
  });
}
