import React from "react";
import Button from "@components/common/Button";

interface FloatingBarProps {
  isTwoButtonMode?: boolean;
}

function FloatingBar({ isTwoButtonMode = false }: FloatingBarProps) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center border-t border-gray-900 bg-white">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-5 md:px-6 lg:px-[15%]">
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
          <Button text="참여하기" size="small" />
        </div>
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
              <Button text="참여하기" size="small" />
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-3">
              <div className="text-center">
                <span className="text-base font-semibold text-gray-900">
                  더 건강한 나와 팀을 위한 프로그램 🏃‍️️
                </span>
                <span className="block text-xs font-medium text-gray-700">
                  국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
                  회복해봐요
                </span>
              </div>
              <div className="flex w-full max-w-xs gap-4">
                <Button text="참여하기" size="large" variant="outlined" />
                <Button text="참여하기" size="large" variant="solid" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
