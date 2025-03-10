"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AlertModal from "@components/common/AlertModal";
import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import ReviewSection from "@features/list-detail/components/ReviewSection";
import FloatingBar from "@features/list-detail/components/FloatingBar";
import GatheringStatusBadge from "@features/list/GatheringStatusBadge";
import useGetUserInfo from "@features/mypage/hooks/useGetUserInfo";
import useGetParticipants from "@features/list-detail/hooks/useGetParticipants";
import useGetGatheringDetail from "@features/list-detail/hooks/useGetGatheringDetail";
import useJoinGathering from "@features/list-detail/hooks/useJoinGathering";
import useCancelGathering from "@features/list-detail/hooks/useCancelGathering";
import useClickHandlers from "@features/list-detail/hooks/useClickHandlers";
import { useDeleteGatheringJoined } from "@features/mypage/hooks/useDeleteGatheringJoinded";
import { Gathering } from "@customTypes/gathering";
import { formatDateTime } from "@utils/dateFormatter";

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
  const { data: participants } = useGetParticipants(gatheringId);

  const [isJoined, setIsJoined] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    text: string;
    hasTwoButton: boolean;
    onConfirm: () => void;
    onClose: () => void;
  }>({
    isOpen: false,
    text: "",
    hasTwoButton: false,
    onConfirm: () => {},
    onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
  });

  const { mutate: joinGathering, status: joinStatus } = useJoinGathering();
  const { mutate: cancelGathering, status: cancelStatus } =
    useCancelGathering();
  const { mutate: deleteJoined } = useDeleteGatheringJoined();

  const {
    handleJoinClick,
    handleDeleteJoinedClick,
    handleCancelClick,
    handleShareClick,
  } = useClickHandlers({
    userData,
    isFull,
    joinStatus,
    cancelStatus,
    gatheringId,
    joinGathering,
    cancelGathering,
    deleteJoined,
    setIsJoined,
    setModalConfig,
  });

  useEffect(() => {
    if (data) {
      setIsFull(data.participantCount >= data.capacity);
    }

    if (participants && userData?.data?.id) {
      const joined = participants.some((p) => p.userId === userData.data!.id);
      setIsJoined(joined);
    }
  }, [data, participants, userData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생: {(error as Error).message}</div>;
  }

  if (!data) {
    return null;
  }

  const isCreator = userData?.data?.id === gathering.createdBy;

  const formattedDateTime = formatDateTime(data.dateTime);
  const { date: dateString, time: timeString } = formattedDateTime;

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
          isJoining={joinStatus === "pending"}
          isCancelling={cancelStatus === "pending"}
          onShare={handleShareClick}
        />
      </div>

      <AlertModal
        text={modalConfig.text}
        isOpen={modalConfig.isOpen}
        hasTwoButton={modalConfig.hasTwoButton}
        onConfirm={modalConfig.onConfirm}
        onClose={modalConfig.onClose}
      />
    </>
  );
}
