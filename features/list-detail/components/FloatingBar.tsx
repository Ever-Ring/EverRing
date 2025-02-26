"use client";

import React, { useState, useCallback } from "react";
import Button from "@components/common/Button";

type FloatingBarType = "default" | "twoButton";

interface FloatingBarProps {
  type?: FloatingBarType;
  isSolidDisabled?: boolean;
  onSolidClick?: () => void;
  onCancelClick?: () => void;
  onShareClick?: () => void;
}

function FloatingBar({
  type = "default",
  isSolidDisabled = false,
  onSolidClick,
  onCancelClick,
  onShareClick,
}: FloatingBarProps) {
  const [isJoined, setIsJoined] = useState(false);

  const handleSingleButtonClick = useCallback(() => {
    setIsJoined((prev) => !prev);
    if (onSolidClick) {
      onSolidClick();
    }
  }, [onSolidClick]);

  const handleCancelClick = useCallback(() => {
    if (onCancelClick) {
      onCancelClick();
    }
  }, [onCancelClick]);

  const handleShareClick = useCallback(() => {
    if (onShareClick) {
      onShareClick();
    }
  }, [onShareClick]);

  function renderByType() {
    switch (type) {
      case "default":
        return (
          <>
            <div className="hidden w-full items-center justify-between sm:flex">
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-gray-900">
                  더 건강한 나와 팀을 위한 프로그램 🏃‍️️
                </span>
                <span className="text-xs font-medium text-gray-700 sm:whitespace-nowrap">
                  국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
                  회복해봐요
                </span>
              </div>
              <Button
                text={isJoined ? "참여 취소하기" : "참여하기"}
                size="small"
                disabled={isSolidDisabled}
                onClick={handleSingleButtonClick}
              />
            </div>

            <div className="w-full sm:hidden">
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
                <Button
                  text={isJoined ? "참여 취소하기" : "참여하기"}
                  size="small"
                  disabled={isSolidDisabled}
                  onClick={handleSingleButtonClick}
                />
              </div>
            </div>
          </>
        );

      case "twoButton":
        return (
          <>
            <div className="hidden w-full items-center justify-between sm:flex">
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-gray-900">
                  더 건강한 나와 팀을 위한 프로그램 🏃‍️️
                </span>
                <span className="text-xs font-medium text-gray-700 sm:whitespace-nowrap">
                  국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
                  회복해봐요
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  text="취소하기"
                  size="small"
                  variant="outlined"
                  onClick={handleCancelClick}
                />
                <Button
                  text="공유하기"
                  size="small"
                  variant="solid"
                  onClick={handleShareClick}
                />
              </div>
            </div>

            <div className="w-full sm:hidden">
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
                <div className="flex w-full max-w-xs gap-4">
                  <Button
                    text="취소하기"
                    size="large"
                    variant="outlined"
                    onClick={handleCancelClick}
                  />
                  <Button
                    text="공유하기"
                    size="large"
                    variant="solid"
                    onClick={handleShareClick}
                  />
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center border-t border-gray-900 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-5 md:px-6 lg:px-[15%]">
        {renderByType()}
      </div>
    </div>
  );
}

export default FloatingBar;
