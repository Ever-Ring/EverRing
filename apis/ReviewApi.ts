import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";
import {
  ReviewQueryParams,
  ReviewScoreQueryParams,
} from "@customTypes/reviewApi";

// TODO: 분리된 파일로 옮길 예정
interface ReviewFormValues {
  gatheringId: number;
  score: number;
  comment: string;
}

export default class ReviewApi {
  static getReviewData = (params: ReviewQueryParams): Promise<AxiosResponse> =>
    axiosInstance.get("/reviews", { params });

  static getReviewScore = (
    params: ReviewScoreQueryParams,
  ): Promise<AxiosResponse> => axiosInstance.get("/reviews/scores", { params });

  static createReview = (data: ReviewFormValues): Promise<AxiosResponse> =>
    axiosInstance.post("/reviews", data);
}
