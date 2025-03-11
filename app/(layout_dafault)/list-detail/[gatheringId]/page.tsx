import { Gathering } from "@customTypes/gathering";
import ListDetailContent from "@features/list-detail/components/ListDetailContent";
import { axiosInstance } from "@lib/axios";
import { notFound } from "next/navigation";
import { JSX } from "react";

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ gatheringId: string }>;
}): Promise<JSX.Element> {
  const { gatheringId } = await params;

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
