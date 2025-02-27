import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";
import { GatheringParams } from "@customTypes/gathering";
import type { CreateGatheringValues } from "types/gathering";

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

  static getGatheringDetail = (id: number): Promise<AxiosResponse> =>
    axiosInstance.get(`/gatherings/${id}`);

  static joinGathering = (gatheringId: number): Promise<AxiosResponse> =>
    axiosInstance.post(`/gatherings/${gatheringId}/join`);

  static cancelGathering = (gatheringId: number): Promise<AxiosResponse> =>
    axiosInstance.put(`/gatherings/${gatheringId}/cancel`);

  static createGathering = (
    data: CreateGatheringValues,
  ): Promise<AxiosResponse> => axiosInstance.post("/gatherings", data);
}

export default GatheringApi;
