import { useMutation, useQueryClient } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";

export function useDeleteGatheringJoined() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringId: number) =>
      GatheringApi.deleteGatheringJoined(gatheringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gatheringsJoined"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
