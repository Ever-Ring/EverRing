"use client";

import React from "react";
import Image from "next/image";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import ReviewSection from "@features/list-detail/components/ReviewSection";
import FloatingBar from "@features/list-detail/components/FloatingBar";
import testImage from "@public/image/dummyImage.png";
import useGetGatheringDetail from "@features/list-detail/hooks/useGetGatheringDetail";
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

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex flex-row items-center justify-center">
        <Image
          src={data.image || testImage}
          alt="모임 이미지"
          className="h-[270px] w-[468px]"
          width={468}
          height={270}
        />
        <ContainerInformation
          maxCount={data.capacity}
          title={data.name}
          location={data.location}
          date={formattedDateTime.split(" ・ ")[0]} // "ex) 2월 24일"
          time={formattedDateTime.split(" ・ ")[1]} // "ex) 14:44"
        />
      </div>
      <ReviewSection />
      <FloatingBar />
    </div>
  );
}
