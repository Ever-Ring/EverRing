import { useQuery } from "@tanstack/react-query";
import { Participant } from "@customTypes/gathering";
import GatheringApi from "@apis/GatheringApi";

export default function useGetParticipants(
  gatheringId: number,
  limit: number = 5,
  offset: number = 0,
) {
  return useQuery<Participant[], Error>({
    queryKey: ["participants", gatheringId, limit, offset],
    queryFn: async () => {
      const response = await GatheringApi.getParticipants(
        gatheringId,
        limit,
        offset,
      );
      return response.data;
    },
  });
}
