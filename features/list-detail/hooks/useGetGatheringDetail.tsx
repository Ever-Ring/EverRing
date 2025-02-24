import { useQuery, UseQueryResult } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { Gathering } from "@customTypes/gathering";

export default function useGetGatheringDetail(
  id: number,
): UseQueryResult<Gathering, Error> {
  return useQuery<Gathering, Error>({
    queryKey: ["gatheringDetail", id],
    queryFn: async () => {
      const response = await GatheringApi.getGatheringDetail(id);
      return response.data;
    },
    enabled: !!id,
  });
}
