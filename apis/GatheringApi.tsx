import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";
import type { CreateGatheringValues } from "types/gathering";

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

  static createGathering = (
    data: CreateGatheringValues,
  ): Promise<AxiosResponse> => axiosInstance.post("/gatherings", data);
}
export default GatheringApi;
