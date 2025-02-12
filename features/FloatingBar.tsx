import React from "react";
import Button from "@components/common/Button";

function FloatingBar() {
  return (
    <div className="flex w-full flex-row items-start gap-[10px] border-t-2 border-gray-900 bg-white px-[462px] py-[20px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span>더 건강한 나와 팀을 위한 프로그램 🏃‍️️</span>
          <span>
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
