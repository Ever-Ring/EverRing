import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";
import { GatheringParams } from "@apis/GatheringListApi";

class GatheringApi {
  static getGatherings = (params?: GatheringParams): Promise<AxiosResponse> =>
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

  static deleteGatheringJoined = (
    gatheringId: number,
  ): Promise<AxiosResponse> =>
    axiosInstance.delete(`/gatherings/${gatheringId}/leave`);
}
export default GatheringApi;
