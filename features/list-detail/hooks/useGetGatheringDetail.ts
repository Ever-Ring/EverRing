import { useQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { Gathering } from "@customTypes/gathering";

export default function useGetGatheringDetail(
  gatheringId: number,
  initialData?: Gathering,
) {
  const fetchGathering = async (): Promise<Gathering> => {
    const response = await GatheringApi.getGatheringDetail(gatheringId);
    return response.data;
  };

  return useQuery<Gathering, Error>({
    queryKey: ["gatheringDetail", gatheringId],
    queryFn: fetchGathering,
    initialData,
  });
}
