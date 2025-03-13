import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";
import { getDehydratedQuery } from "@lib/reactQueryUtils";
import getServerGatheringQuery from "@features/list-detail/hooks/getServerGatheringQuery";
import getServerReviewQuery from "@features/list-detail/hooks/getServerReviewQuery";

import ListDetailContent from "@features/list-detail/components/ListDetailContent";

interface PageProps {
  params: Promise<{ gatheringId: string }>;
  searchParams: Promise<{ page?: string }>;
}

// 서버 컴포넌트에서 SSR + HydrationBoundary 적용
async function Wrapper({
  params,
  searchParams,
}: PageProps): Promise<ReactElement> {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const { gatheringId } = resolvedParams;
  const currentPage = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;

  const limit = 4;

  if (!gatheringId) {
    notFound();
  }

  const gatheringResponse = await axiosInstance.get(
    `/gatherings/${gatheringId}`,
  );
  const gatheringData: Gathering = gatheringResponse.data;

  const reviewResponse = await axiosInstance.get(`/reviews`, {
    params: { gatheringId, offset: (currentPage - 1) * limit, limit },
  });
  const reviewData = reviewResponse.data;

  const { queryKey: gatheringQueryKey, queryFn: gatheringQueryFn } =
    getServerGatheringQuery(Number(gatheringId));

  const dehydratedGathering = await getDehydratedQuery({
    queryKey: gatheringQueryKey,
    queryFn: gatheringQueryFn,
  });

  const { queryKey: reviewQueryKey, queryFn: reviewQueryFn } =
    getServerReviewQuery({
      gatheringId: Number(gatheringId),
      offset: (currentPage - 1) * limit,
      limit,
    });

  const dehydratedReview = await getDehydratedQuery({
    queryKey: reviewQueryKey,
    queryFn: reviewQueryFn,
  });

  const dehydratedState = {
    queries: [...dehydratedGathering.queries, ...dehydratedReview.queries],
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListDetailContent
        gatheringId={Number(gatheringId)}
        gathering={gatheringData}
        initialReviewData={reviewData}
        initialPage={currentPage}
      />
    </HydrationBoundary>
  );
}

export default function Page({ params, searchParams }: PageProps) {
  return <Wrapper params={params} searchParams={searchParams} />;
}
