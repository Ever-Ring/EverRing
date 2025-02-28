import { Gathering } from "@customTypes/gathering";
import { notFound } from "next/navigation";
import ListDetailContent from "@features/list-detail/components/ListDetailContent";
import { axiosInstance } from "@lib/axios";

interface ListDetailPageParams {
  gatheringId: string;
}

export default async function ListDetailPage({
  params,
}: {
  params: ListDetailPageParams;
}) {
  const { gatheringId } = params;

  if (!gatheringId) {
    notFound();
  }

  try {
    const response = await axiosInstance.get(`/gatherings/${gatheringId}`);

    const gatheringData: Gathering = response.data;
    if (!gatheringData) {
      notFound();
    }

    return (
      <ListDetailContent
        gatheringId={Number(gatheringId)}
        gathering={gatheringData}
      />
    );
  } catch (error) {
    console.error("API fetch error:", error);
    notFound();
  }
}
