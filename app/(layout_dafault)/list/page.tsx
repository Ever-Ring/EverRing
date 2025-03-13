import { Suspense } from "react";
import ListContent from "@features/list/components/ListContent";
import { HydrationBoundary } from "@tanstack/react-query";
import { getServerInfiniteGatheringsQuery } from "@features/list/utills/gatheringsQuery";
import { getDehydratedQuery } from "@lib/reactQueryUtils";

export default async function List() {
  const { queryKey, queryFn } = getServerInfiniteGatheringsQuery();
  const state = await getDehydratedQuery({ queryKey, queryFn });
  return (
    <HydrationBoundary state={state}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ListContent />
      </Suspense>
    </HydrationBoundary>
  );
}
