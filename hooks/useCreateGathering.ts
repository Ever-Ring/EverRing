import { useMutation } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import type { CreateGatheringValues } from "types/gathering";
import { AxiosResponse } from "axios";

export default function useCreateGatheringMutation() {
  return useMutation<AxiosResponse, unknown, CreateGatheringValues>({
    mutationFn: (newGatheringData) =>
      GatheringApi.createGathering(newGatheringData),
  });
}
