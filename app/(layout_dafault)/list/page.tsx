import { Suspense } from "react";
import ListContainer from "@features/list/components/ListContainer";
import { HydrationBoundary } from "@tanstack/react-query";
import { getServerInfiniteGatheringsQuery } from "@features/list/utills/gatheringsQuery";
import { getDehydratedQuery } from "@lib/reactQueryUtils";
import HeartImage from "@assets/img-head-class.svg";

export default async function List() {
  const { queryKey, queryFn } = getServerInfiniteGatheringsQuery();
  const state = await getDehydratedQuery({ queryKey, queryFn });
  return (
    <HydrationBoundary state={state}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <section className="mb-6 flex items-center justify-start gap-4 sm:mb-8">
          <HeartImage className="w-18 h-18" />
          <div>
            <p className="text-sm font-medium">함께 할 사람이 없나요?</p>
            <p className="mt-1 text-2xl font-semibold">
              지금 모임에 참여해보세요
            </p>
          </div>
        </section>
        <ListContainer />
      </Suspense>
    </HydrationBoundary>
  );
}
