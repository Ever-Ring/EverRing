/* eslint-disable import/prefer-default-export */
import { dehydrate, QueryKey } from "@tanstack/react-query";
import { getQueryClient } from "@lib/reactQueryClient";

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
  });

  return dehydrate(queryClient);
}
