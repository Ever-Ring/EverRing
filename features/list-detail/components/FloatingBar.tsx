import React from "react";
import Button from "@components/common/Button";

type FloatingBarType = "default" | "twoButton";

interface FloatingBarProps {
  type?: FloatingBarType;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  isPrimaryDisabled?: boolean;
  isSecondaryDisabled?: boolean;
}

function FloatingBar({
  type = "default",
  primaryButtonText = "참여하기",
  secondaryButtonText = "참여하기",
  isPrimaryDisabled = false,
  isSecondaryDisabled = false,
}: FloatingBarProps) {
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
                text={primaryButtonText}
                size="small"
                disabled={isPrimaryDisabled}
              />
            </div>
            {/* 모바일 뷰 */}
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
                  text={primaryButtonText}
                  size="small"
                  disabled={isPrimaryDisabled}
                />
              </div>
            </div>
          </>
        );
      case "twoButton":
        return (
          <>
            {/* 데스크톱 뷰 */}
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
                  text={primaryButtonText}
                  size="small"
                  variant="outlined"
                  disabled={isPrimaryDisabled}
                />
                <Button
                  text={secondaryButtonText}
                  size="small"
                  variant="solid"
                  disabled={isSecondaryDisabled}
                />
              </div>
            </div>
            {/* 모바일 뷰 */}
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
                    text={primaryButtonText}
                    size="large"
                    variant="outlined"
                    disabled={isPrimaryDisabled}
                  />
                  <Button
                    text={secondaryButtonText}
                    size="large"
                    variant="solid"
                    disabled={isSecondaryDisabled}
                  />
                </div>
              </div>
            </div>
          </>
        );
      default:
        // ESLint default-case 규칙 준수를 위해 기본 케이스 추가
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
