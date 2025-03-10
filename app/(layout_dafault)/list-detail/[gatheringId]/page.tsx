import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { axiosInstance } from "@lib/axios";
import { Gathering } from "@customTypes/gathering";
import ListDetailContent from "@features/list-detail/components/ListDetailContent";

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ gatheringId: string }>;
}): Promise<ReactElement> {
  const { gatheringId } = await params;

  if (!gatheringId) {
    notFound();
  }

  const response = await axiosInstance.get(`/gatherings/${gatheringId}`);
  const gatheringData: Gathering = response.data;

  return (
    <ListDetailContent
      gatheringId={Number(gatheringId)}
      gathering={gatheringData}
    />
  );
}
