import { notFound } from "next/navigation";
import ListDetailContent from "@features/list-detail/components/ListDetailContent";
import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";

interface PageProps {
  params: { gatheringId: string };
  searchParams: { page?: string };
}

export default async function ListDetailPage(props: Promise<PageProps>) {
  const { params, searchParams } = await props;
  const { gatheringId } = params;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
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
