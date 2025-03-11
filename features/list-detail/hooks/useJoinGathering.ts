import { useMutation, useQueryClient } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { AxiosResponse } from "axios";

export default function useJoinGathering() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, number>({
    mutationFn: (gatheringId: number) =>
      GatheringApi.joinGathering(gatheringId),
    onSuccess: (data: AxiosResponse, variables: number) => {
      queryClient.invalidateQueries({ queryKey: ["participants", variables] });
    },
    onError: (error: Error) => {
      console.error("모임 참가 실패:", error);
    },
  });
}
