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
    // 임시 더미 데이터를 사용하여 화면을 테스트합니다.
    initialData: {
      teamId: 8,
      id,
      type: "DALLAEMFIT",
      name: "구름링나무링",
      dateTime: "2025-02-24T14:44:00.000Z",
      registrationEnd: "2025-02-23T23:59:00.000Z",
      location: "나이아가라 폭포링",
      participantCount: 5,
      capacity: 20,
      image: "/image/dummyImage.png", // 로컬 테스트용 더미 이미지 경로
      createdBy: null,
      canceledAt: null,
    },
  });
}
