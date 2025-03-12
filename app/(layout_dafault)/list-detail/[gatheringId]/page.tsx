import { notFound } from "next/navigation";
import ListDetailContent from "@features/list-detail/components/ListDetailContent";
import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";

interface PageProps {
  params: { gatheringId: string };
  searchParams: { page?: string };
}

async function Wrapper({ params, searchParams }: PageProps) {
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

  return (
    <ListDetailContent
      gatheringId={Number(gatheringId)}
      gathering={gatheringData}
      initialReviewData={reviewData}
      initialPage={currentPage}
    />
  );
}

export default function Page({ params, searchParams }: PageProps) {
  return <Wrapper params={params} searchParams={searchParams} />;
}
