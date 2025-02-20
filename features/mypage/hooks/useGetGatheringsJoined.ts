import { useQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";

export function useGetGatheringsCreatedByUser(params: { createdBy: number }) {
  return useQuery({
    queryKey: ["gatheringsCreatedByUser", params.createdBy],
    queryFn: () => GatheringApi.getGatherings(params),
    enabled: !!params,
  });
}

export function useGetGatheringsJoined(params?: {
  completed?: boolean;
  reviewed?: boolean;
}) {
  return useQuery({
    queryKey: ["gatheringsJoined", params],
    queryFn: () => GatheringApi.getGatheringsJoined(params || {}),
  });
}
