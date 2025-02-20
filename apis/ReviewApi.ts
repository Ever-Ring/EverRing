import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";
import {
  ReviewQueryParams,
  ReviewScoreQueryParams,
} from "@customTypes/reviewApi";

export default class ReviewApi {
  static getReviewData = (params: ReviewQueryParams): Promise<AxiosResponse> =>
    axiosInstance.get("/reviews", { params });

  static getReviewScore = (
    params: ReviewScoreQueryParams,
  ): Promise<AxiosResponse> => axiosInstance.get("/reviews/scores", { params });
}
