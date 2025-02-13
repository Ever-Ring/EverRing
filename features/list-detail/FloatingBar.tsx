import React from "react";
import Button from "@components/common/Button";

function FloatingBar() {
  return (
    <div className="fixed bottom-0 left-0 flex min-h-[64px] w-full justify-center border-t border-gray-900 bg-white">
      <div className="mx-auto box-border flex w-full min-w-[1024px] max-w-[70%] items-center justify-between px-6 sm:px-12 lg:px-[15%]">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-gray-900">
            더 건강한 나와 팀을 위한 프로그램 🏃‍️️
          </span>
          <span className="text-sm font-medium text-gray-700">
            국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
            회복해봐요
          </span>
        </div>
        <div className="shrink-0">
          <Button text="참여하기" size="small" />
        </div>
      </div>
    </div>
  );
}

export default FloatingBar;
