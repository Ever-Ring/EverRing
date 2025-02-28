import { useMutation } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { AxiosResponse } from "axios";

export default function useJoinGathering() {
  return useMutation<AxiosResponse, Error, number>({
    mutationFn: (gatheringId: number) =>
      GatheringApi.joinGathering(gatheringId),
    onSuccess: (data: AxiosResponse) => {
      console.log("모임 참가 성공:", data);
    },
    // 나중에 제거
    onError: (error: Error) => {
      console.error("모임 참가 실패:", error);
    },
  });
}
