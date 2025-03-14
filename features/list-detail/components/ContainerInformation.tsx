"use client";

import React from "react";
import useGetParticipants from "@features/list-detail/hooks/useGetParticipants";
import MeetingHeader from "@features/list-detail/components/MeetingHeader";
import ParticipantList from "@features/list-detail/components/ParticipantList";
import ProgressBar from "@features/list-detail/components/ProgressBar";
import IconCheck from "@assets/ic-check-variant.svg";

interface ContainerInformationProps {
  maxCount: number;
  gatheringId: number;
  title: string;
  location: string;
  date: string;
  time: string;
}

export default function ContainerInformation({
  maxCount,
  gatheringId,
  title,
  location,
  date,
  time,
}: ContainerInformationProps) {
  const { data: participants = [] } = useGetParticipants(gatheringId);
  const currentCount = participants.length;
  const isConfirmed = currentCount >= 5;
  const progress = Math.min((currentCount / maxCount) * 100, 100);

  return (
    <div className="flex w-[343px] flex-col items-start rounded-3xl border-2 border-gray-200 bg-white py-6 lg:h-[270px] lg:w-[468px]">
      <MeetingHeader
        gatheringId={gatheringId}
        title={title}
        location={location}
        date={date}
        time={time}
      />
      <div className="w-full border-t-2 border-dashed border-gray-200" />
      <div className="mt-6 flex flex-col gap-[10px] self-stretch px-6">
        <div className="flex items-end justify-between self-stretch">
          <ParticipantList participants={participants} />
          {isConfirmed && (
            <div className="flex items-center gap-1">
              <IconCheck />
              <span className="text-sm font-medium text-mint-500">
                개설확정
              </span>
            </div>
          )}
        </div>
        <ProgressBar
          progress={progress}
          currentCount={currentCount}
          maxCount={maxCount}
        />
      </div>
    </div>
  );
}
