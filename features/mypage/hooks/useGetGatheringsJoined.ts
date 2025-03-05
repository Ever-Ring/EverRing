import { useQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";

export function useGetGatheringsCreatedByUser(params: {
  createdBy: number | null;
}) {
  return useQuery({
    queryKey: ["gatheringsCreatedByUser", params.createdBy],
    queryFn: () => GatheringApi.getGatherings(params),
    enabled: !!params.createdBy,
  });
}

export function useGetGatheringsJoined(params?: {
  completed?: boolean;
  reviewed?: boolean;
  sortBy?: string;
  sortOrder?: string;
}) {
  return useQuery({
    queryKey: ["gatheringsJoined", params],
    queryFn: () => {
      const updatedParams = {
        ...params,
        sortBy: params?.sortBy || "registrationEnd",
        sortOrder: params?.sortOrder || "desc",
      };

      return GatheringApi.getGatheringsJoined(updatedParams);
    },
  });
}
