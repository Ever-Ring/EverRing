import { useMutation, useQueryClient } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { AxiosResponse } from "axios";
import useModalStore from "@stores/modalStore";

export default function useJoinGathering() {
  const queryClient = useQueryClient();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation<AxiosResponse, Error, number>({
    mutationFn: (gatheringId: number) =>
      GatheringApi.joinGathering(gatheringId),
    onSuccess: (data: AxiosResponse, variables: number) => {
      queryClient.invalidateQueries({ queryKey: ["participants", variables] });
    },
    onError: () => {
      openModal({
        text: "모임 참여에 실패했습니다. 다시 시도해주세요.",
        onConfirm: () => {},
      });
    },
  });
}
