"use client";

import React from "react";
import Image from "next/image";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import ReviewSection from "@features/list-detail/components/ReviewSection";
import FloatingBar from "@features/list-detail/components/FloatingBar";
import testImage from "@public/image/dummyImage.png";
import GatheringStatusBadge from "@features/list/GatheringStatusBadge";
import useGetGatheringDetail from "@features/list-detail/hooks/useGatheringDetail";
import { formatDateTime } from "@utils/dateFormatter";

interface ListDetailContentProps {
  gatheringId: number;
}

export default function ListDetailContent({
  gatheringId,
}: ListDetailContentProps) {
  const { data, isLoading, isError, error } =
    useGetGatheringDetail(gatheringId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {(error as Error).message}</div>;
  if (!data) return null;

  const formattedDateTime = formatDateTime(data.dateTime);
  const [dateString, timeString] = formattedDateTime.split(" ・ ");

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-8 pb-20">
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="relative">
          <GatheringStatusBadge registrationEnd={data.registrationEnd} />
          <Image
            src={data.image || testImage}
            alt="모임 장소 이미지"
            className="h-[270px] w-[468px] rounded-[24px] border-2 border-gray-200 object-cover"
            width={468}
            height={270}
          />
        </div>
        <ContainerInformation
          maxCount={data.capacity}
          title={data.name}
          location={data.location}
          date={dateString}
          time={timeString}
        />
      </div>
      <ReviewSection />
      <FloatingBar />
    </div>
  );
}
