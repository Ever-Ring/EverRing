import { useQuery } from "@tanstack/react-query";
import { Participant } from "@customTypes/gathering";
import GatheringApi from "@apis/GatheringApi";

export default function useGetParticipants(gatheringId: number) {
  return useQuery<Participant[], Error>({
    queryKey: ["participants", gatheringId],
    queryFn: async () => {
      const response = await GatheringApi.getParticipants(gatheringId, 100); // 임의로 limit 100 설정
      return response.data;
    },
  });
}
