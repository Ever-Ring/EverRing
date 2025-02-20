import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";

class GatheringApi {
  static getGatherings = (params?: {
    createdBy?: number;
  }): Promise<AxiosResponse> =>
    axiosInstance.get("/gatherings", {
      params: params || {},
    });

  static getGatheringsJoined = (params?: {
    completed?: boolean;
    reviewed?: boolean;
  }): Promise<AxiosResponse> =>
    axiosInstance.get("/gatherings/joined", {
      params: params || {},
    });
}
export default GatheringApi;
