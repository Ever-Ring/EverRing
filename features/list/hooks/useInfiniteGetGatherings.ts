import { useInfiniteQuery } from "@tanstack/react-query";
import GatheringApi from "@apis/GatheringApi";
import { GatheringParams, Gathering } from "@customTypes/gathering";

const LIMIT = 10;

export function useInfiniteGetGatherings(filters: GatheringParams) {
  return useInfiniteQuery({
    queryKey: ["gatherings", filters],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await GatheringApi.getGatherings({
        limit: LIMIT,
        offset: pageParam,
        ...filters,
      });

      const filteredData: Gathering[] =
        response.data?.filter((item: Gathering) => item.canceledAt === null) ||
        [];
      return { data: filteredData, nextOffset: pageParam + LIMIT };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.data || lastPage.data.length < LIMIT) {
        return undefined;
      }

      return lastPage.nextOffset;
    },
  });
}
