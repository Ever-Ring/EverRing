// @features/list/hooks/useGetGatherings.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import GatheringListApi from "@apis/GatheringListApi";

const LIMIT = 10;

export function useGetGatherings() {
  return useInfiniteQuery({
    queryKey: ["gatherings"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await GatheringListApi.getGatherings({
        limit: LIMIT,
        offset: pageParam,
      });
      return { data: response, nextOffset: pageParam + LIMIT };
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
