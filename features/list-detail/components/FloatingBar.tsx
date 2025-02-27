import React from "react";
import Button from "@components/common/Button";

interface FloatingBarProps {
  isTwoButtonMode?: boolean;
  isJoined: boolean;
  isFull: boolean;
  onJoin: () => void;
  onCancel: () => void;
  isJoining: boolean;
  isCancelling: boolean;
}

function FloatingBar({
  isTwoButtonMode = false,
  isJoined,
  isFull,
  onJoin,
  onCancel,
  isJoining,
  isCancelling,
}: FloatingBarProps) {
  let buttonElement = null;

  // 모집 정원이 찬 경우
  if (isFull) {
    buttonElement = <Button text="참여하기" size="small" disabled />;
  } else if (isJoined) {
    buttonElement = isCancelling ? (
      <Button text="취소 중..." size="small" disabled />
    ) : (
      <Button
        text="참여 취소하기"
        size="small"
        onClick={onCancel}
        variant="outlined"
      />
    );
  } else {
    // 아직 참여하지 않은 경우, 참여하기 버튼
    buttonElement = isJoining ? (
      <Button text="참여 중..." size="small" disabled />
    ) : (
      <Button text="참여하기" size="small" onClick={onJoin} variant="solid" />
    );
  }

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center border-t border-gray-900 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-5 md:px-6 lg:px-[15%]">
        <div className="w-full sm:hidden">
          {!isTwoButtonMode ? (
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <span className="text-base font-semibold text-gray-900">
                  더 건강한 나와 팀을 위한 프로그램 🏃‍️️
                </span>
                <span className="block text-xs font-medium text-gray-700">
                  국내 최고 웰니스 전문가와 프로그램을
                  <br />
                  통해 지친 몸과 마음을 회복해봐요
                </span>
              </div>
              {buttonElement}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-3">
              <div>
                <span className="text-base font-semibold text-gray-900">
                  더 건강한 나와 팀을 위한 프로그램 🏃‍️️
                </span>
                <span className="block text-xs font-medium text-gray-700">
                  국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
                  회복해봐요
                </span>
              </div>
              <div className="flex w-full max-w-xs gap-4">{buttonElement}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
