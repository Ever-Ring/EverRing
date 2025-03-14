import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";
import { getDehydratedQuery } from "@lib/reactQueryUtils";
import getServerGatheringQuery from "@features/list-detail/hooks/getServerGatheringQuery";

import ListDetailContent from "@features/list-detail/components/ListDetailContent";

interface PageProps {
  params: Promise<{ gatheringId: string }>;
}

async function Wrapper({ params }: PageProps): Promise<ReactElement> {
  const resolvedParams = await Promise.resolve(params);

  const { gatheringId } = resolvedParams;
  const currentPage = 1;
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

  let reviewData = reviewResponse.data;

  if (!reviewData || !reviewData.reviewData) {
    reviewData = {
      reviewData: [],
      totalItemCount: 0,
      currentPage,
      totalPages: 0,
    };
  }

  const { queryKey: gatheringQueryKey, queryFn: gatheringQueryFn } =
    getServerGatheringQuery(Number(gatheringId));
  const dehydratedGathering = await getDehydratedQuery({
    queryKey: gatheringQueryKey,
    queryFn: gatheringQueryFn,
  });

  const dehydratedState = {
    queries: [...dehydratedGathering.queries],
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

export default function Page({ params }: PageProps) {
  return <Wrapper params={params} />;
}
