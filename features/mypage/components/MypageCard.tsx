import Image from "next/image";
import Button from "@components/common/Button";
import StateChip from "@features/mypage/components/StateChip";
import { formatDateTime } from "@utils/dateFormatter";
import { useDeleteGatheringJoined } from "@features/mypage/hooks/useDeleteGatheringJoinded";
import useModalStore from "@stores/modalStore";
import WriteReviewModal from "@features/mypage/components/WriteReviewModal";
import { useState } from "react";

interface MypageCardProps {
  gatheringId: number;
  name: string;
  location: string;
  dateTime: string;
  image: string;
  isCompleted?: boolean;
  participantCount: number;
  capacity: number;
  isMyGatheringTab?: boolean;
  isMadeByMe?: boolean;
}

export default function MypageCard({
  gatheringId,
  name,
  location,
  dateTime,
  image,
  isCompleted,
  isMyGatheringTab,
  isMadeByMe,
  participantCount,
  capacity,
}: MypageCardProps) {
  const formattedDateTime = formatDateTime(dateTime);
  const { mutate: deleteGatheringJoined } = useDeleteGatheringJoined();
  const { openModal } = useModalStore();
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const closeWriteReviewModal = () => {
    setIsWriteReviewModalOpen(false);
  };

  function handleClick() {
    if (isCompleted) {
      setIsWriteReviewModalOpen(true);
    } else {
      openModal({
        text: "정말 모임 참여를 취소하시겠습니까?",
        hasTwoButton: true,
        onConfirm: () => {
          deleteGatheringJoined(gatheringId);
          // TODO 취소 후 알림 표시
          alert("모임 참여가 취소되었습니다.");
        },
      });
    }
  }

  return (
    <div className="mb-6 flex flex-col gap-4 border-b-2 border-dotted pb-6 md:flex-row">
      <div className="relative h-[9.75rem] w-full rounded-3xl md:w-[17.5rem]">
        <Image
          src={image}
          alt="gathering image"
          fill
          sizes="100%"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
      <div className="relative flex w-full flex-1 flex-col gap-y-3">
        {isMyGatheringTab && (
          <StateChip
            isPending={participantCount < capacity}
            isCompleted={isCompleted}
          />
        )}
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row gap-x-2">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-lg font-semibold">|</p>
            <p>{location}</p>
          </div>
          <div className="flex flex-row items-center">
            <p className="mr-3">{formattedDateTime}</p>
            <Image
              src="/image/person.svg"
              alt="participant icon"
              width={16}
              height={16}
              className="mr-1"
            />
            <p>
              {participantCount}/{capacity}
            </p>
          </div>
        </div>
        {!isMadeByMe && (
          <div className="md:absolute md:bottom-0 md:left-0">
            <Button
              text={isCompleted ? "리뷰 작성하기" : "예약 취소하기"}
              size="small"
              disabled={false}
              variant={isCompleted ? "solid" : "outlined"}
              type="button"
              onClick={() => {
                handleClick();
              }}
            />
          </div>
        )}
      </div>
      {isWriteReviewModalOpen && (
        <WriteReviewModal
          isOpen={isWriteReviewModalOpen}
          onClose={closeWriteReviewModal}
          gatheringId={gatheringId}
        />
      )}
    </div>
  );
}
