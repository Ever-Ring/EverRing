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

  static deleteGatheringJoined = (
    gatheringId: number,
  ): Promise<AxiosResponse> =>
    axiosInstance.delete(`/gatherings/${gatheringId}/leave`);

  static getGatheringDetail = (id: number): Promise<AxiosResponse> =>
    axiosInstance.get(`/gatherings/${id}`);
}
export default GatheringApi;
