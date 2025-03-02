// TODO: 로딩 처리는 어떻게 할 것 인지. 필요한지 아닌지 고려해야 함.
"use client";

import MypageCard from "@features/mypage/components/MypageCard";
import Chip from "@components/common/Chip";
import { useState } from "react";
import {
  useGetGatheringsCreatedByUser,
  useGetGatheringsJoined,
} from "@features/mypage/hooks/useGetGatheringsJoined";
import useGetUserInfo from "@features/mypage/hooks/useGetUserInfo";
import useGetMyReviews from "@features/mypage/hooks/useGetMyReviews";
import ReviewListwithImage from "@components/common/ReviewListWithImage";

// TODO: Gathering 타입 별도 분리된 파일로 옮길 예정
interface Gathering {
  id: number;
  name: string;
  location: string;
  image: string;
  isReviewed?: boolean;
  isCompleted?: boolean;
  dateTime: string;
  participantCount: number;
  capacity: number;
  createdBy: number;
}

export default function MypageCardList({
  selectedIndex,
}: {
  selectedIndex: number;
}) {
  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();
  const { data: gatheringsJoined, isLoading: isGatheringJoinedLoading } =
    useGetGatheringsJoined({ reviewed: false });
  const {
    data: gatheringsIsNotReviewed,
    isLoading: isGatheringIsNotReviewedLoading,
  } = useGetGatheringsJoined({ completed: true, reviewed: false });
  const {
    data: gatheringsIsReviewed,
    isLoading: isGatheringIsReviewedLoading,
  } = useGetMyReviews({ userId: userInfo?.data?.id });
  const {
    data: gatheringsCreatedByUser,
    isLoading: isGatheringsCreatedByUserLoading,
  } = useGetGatheringsCreatedByUser({ createdBy: userInfo?.data?.id });

  const [selectedReviewTab, setSelectedReviewTab] = useState<
    "writable" | "written"
  >("writable");

  switch (selectedIndex) {
    case 0:
      return gatheringsJoined?.data?.length ? (
        gatheringsJoined.data.map((gathering: Gathering) => (
          <MypageCard
            key={gathering.id}
            gatheringId={gathering.id}
            name={gathering.name}
            location={gathering.location}
            image={gathering.image}
            dateTime={gathering.dateTime}
            participantCount={gathering.participantCount}
            capacity={gathering.capacity}
            isCompleted={gathering.isCompleted}
            isMyGatheringTab
          />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          신청한 모임이 아직 없어요
        </div>
      );
    case 1:
      return (
        <div className="flex flex-1 flex-col">
          <div className="flex gap-x-4 pb-4">
            <Chip
              label="작성 가능한 리뷰"
              selected={selectedReviewTab === "writable"}
              onClick={() => setSelectedReviewTab("writable")}
            />
            <Chip
              label="작성한 리뷰"
              selected={selectedReviewTab === "written"}
              onClick={() => setSelectedReviewTab("written")}
            />
          </div>

          {selectedReviewTab === "writable" ? (
            gatheringsIsNotReviewed?.data?.length ? (
              gatheringsIsNotReviewed.data.map((gathering: Gathering) => (
                <MypageCard
                  key={gathering.id}
                  gatheringId={gathering.id}
                  name={gathering.name}
                  location={gathering.location}
                  image={gathering.image}
                  dateTime={gathering.dateTime}
                  participantCount={gathering.participantCount}
                  capacity={gathering.capacity}
                  isCompleted
                />
              ))
            ) : (
              <div className="flex h-full w-full flex-1 items-center justify-center">
                아직 작성 가능한 리뷰가 없어요
              </div>
            )
          ) : gatheringsIsReviewed?.data?.length ? (
            <ReviewListwithImage reviewData={gatheringsIsReviewed?.data} />
          ) : (
            <div className="flex h-full w-full flex-1 items-center justify-center">
              아직 작성한 리뷰가 없어요
            </div>
          )}
        </div>
      );
    case 2:
      return gatheringsCreatedByUser?.data?.length ? (
        gatheringsCreatedByUser?.data?.map((gathering: Gathering) => (
          <MypageCard
            key={gathering.id}
            gatheringId={gathering.id}
            name={gathering.name}
            location={gathering.location}
            image={gathering.image}
            dateTime={gathering.dateTime}
            isMadeByMe
            participantCount={gathering.participantCount}
            capacity={gathering.capacity}
          />
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          아직 만든 모임이 없어요
        </div>
      );
    default:
      return null;
  }
}
