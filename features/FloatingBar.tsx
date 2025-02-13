import React from "react";
import Button from "@components/common/Button";

function FloatingBar() {
  return (
    <div className="flex w-full flex-row items-start gap-[10px] border-t-2 border-gray-900 bg-white px-[462px] py-[20px]">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex flex-col items-start gap-1">
          <span className="text-base font-semibold leading-6 text-gray-900">
            더 건강한 나와 팀을 위한 프로그램 🏃‍️️
          </span>
          <span className="text-xs font-medium leading-4 text-gray-700">
            국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을
            회복해봐요
          </span>
        </div>
        <Button text="참여하기" size="small" />
      </div>
    </div>
  );
}

export default FloatingBar;
