"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import ReviewSection from "@features/list-detail/components/ReviewSection";
import FloatingBar from "@features/list-detail/components/FloatingBar";
import GatheringStatusBadge from "@features/list/GatheringStatusBadge";
import useGetGatheringDetail from "@features/list-detail/hooks/useGetGatheringDetail";
import useJoinGathering from "@features/list-detail/hooks/useJoinGathering";
import useCancelGathering from "@features/list-detail/hooks/useCancelGathering";
import { useDeleteGatheringJoined } from "@features/mypage/hooks/useDeleteGatheringJoinded";
import useGetUserInfo from "@features/mypage/hooks/useGetUserInfo";
import { Gathering } from "@customTypes/gathering";
import { formatDateTime } from "@utils/dateFormatter";
import AlertModal from "@components/common/AlertModal";

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
  const { data: userData } = useGetUserInfo();
  const [isJoined, setIsJoined] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: joinGathering, status: joinStatus } = useJoinGathering();
  const { mutate: cancelGathering, status: cancelStatus } =
    useCancelGathering();
  const { mutate: deleteJoined } = useDeleteGatheringJoined();

  useEffect(() => {
    if (data) {
      setIsFull(data.participantCount >= data.capacity);
      setIsJoined(false);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  if (!data) return null;

  const isCreator = userData?.data?.id === gathering.createdBy;

  const formattedDateTime = formatDateTime(data.dateTime);
  const [dateString, timeString] = formattedDateTime.split(" ・ ");

  const handleJoinClick = () => {
    if (userData?.data?.id) {
      if (!isFull) {
        joinGathering(gatheringId);
        setIsJoined(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancelClick = () => {
    cancelGathering(gatheringId);
    setIsJoined(false);
  };

  const handleDeleteJoinedClick = () => {
    deleteJoined(gatheringId);
    setIsJoined(false);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const isJoining = joinStatus === "pending";
  const isCancelling = cancelStatus === "pending";

  const handleModalConfirm = () => {
    window.location.href = "/signin";
  };

  return (
    <>
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 pb-20">
        <div className="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row lg:mt-10">
          <div className="relative">
            <GatheringStatusBadge registrationEnd={gathering.registrationEnd} />
            <Image
              src={gathering.image}
              alt="모임 장소 이미지"
              className="h-[180px] w-[343px] rounded-[24px] border-2 border-gray-200 object-cover md:h-[270px] lg:w-[468px]"
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
            gatheringId={gatheringId}
          />
        </div>
        <ReviewSection gatheringId={gatheringId} />
        <FloatingBar
          isTwoButtonMode={isCreator}
          isJoined={isJoined}
          isFull={isFull}
          onJoin={handleJoinClick}
          onCancel={handleCancelClick}
          onDeleteJoined={handleDeleteJoinedClick}
          isJoining={isJoining}
          isCancelling={isCancelling}
          onShare={handleShareClick}
        />
      </div>

      <AlertModal
        text="로그인이 필요해요."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
