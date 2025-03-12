import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getGatherings,
  getGatheringsQueryKey,
} from "@features/list/utills/gatheringsQuery";
import { GatheringParams } from "@customTypes/gathering";
import { LIMIT } from "@constants/filter";

export function useInfiniteGetGatherings(filters: GatheringParams) {
  return useInfiniteQuery({
    queryKey: getGatheringsQueryKey(filters),
    queryFn: ({ pageParam = 0 }) => getGatherings(filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (
        !lastPage ||
        !Array.isArray(lastPage.data) ||
        lastPage.data.length < LIMIT
      ) {
        return undefined;
      }
      return lastPage.nextOffset;
    },
  });
}
