"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import ReviewSection from "@features/list-detail/components/ReviewSection";
import FloatingBar from "@features/list-detail/components/FloatingBar";
import testImage from "@public/image/dummyImage.png";
import GatheringStatusBadge from "@features/list/GatheringStatusBadge";
import useGetGatheringDetail from "@features/list-detail/hooks/useGetGatheringDetail";
import { formatDateTime } from "@utils/dateFormatter";
import useJoinGathering from "@features/list-detail/hooks/useJoinGathering";
import useCancelGathering from "@features/list-detail/hooks/useCancelGathering";
import { Gathering } from "@customTypes/gathering";

interface ListDetailContentProps {
  gatheringId: number;
  gathering: Gathering;
}

export default function ListDetailContent({
  gatheringId,
  gathering,
}: ListDetailContentProps) {
  const { data, isLoading, isError, error } =
    useGetGatheringDetail(gatheringId);
  const [isJoined, setIsJoined] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const { mutate: joinGathering, status: joinStatus } = useJoinGathering();
  const { mutate: cancelGathering, status: cancelStatus } =
    useCancelGathering();

  useEffect(() => {
    if (data) {
      setIsFull(data.participantCount >= data.capacity);
      setIsJoined(false);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    console.error("Gathering detail loading error:", (error as Error).message);
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  if (!data) return null;

  const formattedDateTime = formatDateTime(data.dateTime);
  const [dateString, timeString] = formattedDateTime.split(" ・ ");

  const handleJoinClick = () => {
    if (!isFull) {
      joinGathering(gatheringId);
      setIsJoined(true);
    }
  };

  const handleCancelClick = () => {
    cancelGathering(gatheringId);
    setIsJoined(false);
  };

  const isJoining = joinStatus === "pending";
  const isCancelling = cancelStatus === "pending";

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-8 pb-20">
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="relative">
          <GatheringStatusBadge registrationEnd={gathering.registrationEnd} />
          <Image
            src={gathering.image || testImage}
            alt="모임 장소 이미지"
            className="h-[270px] w-[468px] rounded-[24px] border-2 border-gray-200 object-cover"
            width={468}
            height={270}
          />
        </div>
        <ContainerInformation
          maxCount={gathering.capacity}
          title={gathering.name}
          location={gathering.location}
          date={dateString}
          time={timeString}
        />
      </div>
      <ReviewSection />
      <FloatingBar
        isTwoButtonMode={false}
        isJoined={isJoined}
        isFull={isFull}
        onJoin={handleJoinClick}
        onCancel={handleCancelClick}
        isJoining={isJoining}
        isCancelling={isCancelling}
      />
    </div>
  );
}
