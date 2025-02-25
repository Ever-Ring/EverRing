import { AxiosResponse } from "axios";
import { axiosInstance } from "@lib/axios";

// 타입 - 필터 추가 이후 분리 예정
interface GatheringParams {
  limit?: number;
  offset?: number;
}

interface GatheringResponse {
  length: number;
  items: any[];
  nextOffset?: number;
}

class GatheringListApi {
  static async getGatherings(
    params: GatheringParams,
  ): Promise<GatheringResponse> {
    try {
      console.log(" API 요청:", `/gatherings`, "📡 Params:", params);
      const response: AxiosResponse<GatheringResponse> =
        await axiosInstance.get(`/gatherings`, { params });
      return response.data;
    } catch (error) {
      console.error(" API 요청 실패:", error);
      throw error;
    }
  }
}

export default GatheringListApi;
