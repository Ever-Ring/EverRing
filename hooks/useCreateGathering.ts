import { useMutation } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import type { CreateGatheringValues } from "types/gathering";
import { AxiosResponse } from "axios";

interface CreateGatheringResponse {
  id: number;
}

export default function useCreateGatheringMutation() {
  return useMutation<
    AxiosResponse<CreateGatheringResponse>,
    unknown,
    CreateGatheringValues
  >({
    mutationFn: (newGatheringData) =>
      GatheringApi.createGathering(newGatheringData),
  });
}
