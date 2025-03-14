import { useMutation } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { AxiosResponse } from "axios";
import useModalStore from "@stores/modalStore";

export default function useCancelGathering() {
  const openModal = useModalStore((state) => state.openModal);

  return useMutation<AxiosResponse, Error, number>({
    mutationFn: (gatheringId: number) =>
      GatheringApi.cancelGathering(gatheringId),
    onError: () => {
      openModal({
        text: "모임 취소에 실패했습니다. 다시 시도해주세요.",
        onConfirm: () => {},
      });
    },
  });
}
