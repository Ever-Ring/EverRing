/* eslint-disable import/no-duplicates */

"use client";

import { useState } from "react";
import ChipInfo from "@components/common/ChipInfo";
import HeartIconActive from "@assets/icon-save-large-active.svg";
import HeartIconInActive from "@assets/icon-save-large-inactive.svg";
import IconCheck from "@assets/ic-check-variant.svg";

interface ContainerInformationProps {
  currentCount: number;
  maxCount: number;
}

function ContainerInformation({
  currentCount,
  maxCount,
}: ContainerInformationProps) {
  const [isSaved, setIsSaved] = useState(true);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const progress = Math.min((currentCount / maxCount) * 100, 100);

  return (
    <div className="mx-auto flex w-[486px] flex-col items-start rounded-3xl border-2 border-gray-200 bg-white py-6">
      <div className="mb-11 flex w-full px-6">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-[2px]">
              <span className="text-lg font-semibold leading-7 text-gray-900">
                달램핏 오피스 스트레칭
              </span>
              <span className="text-sm font-medium leading-5 text-gray-700">
                을지로 3가 서울시 중구 청계천로 100
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChipInfo info="1월 7일" />
              <ChipInfo info="17:30" variant="mint" />
            </div>
          </div>
          <button
            type="submit"
            onClick={toggleSave}
            className="absolute right-0 top-0 focus:outline-none"
          >
            {isSaved ? (
              <HeartIconInActive className="h-12 w-12" />
            ) : (
              <HeartIconActive className="h-12 w-12" />
            )}
          </button>
        </div>
      </div>
      <div className="w-full border-t-2 border-dashed border-gray-200" />
      <div className="mt-6 flex flex-col gap-[10px] self-stretch px-6">
        <div className="gap-2">
          <div className="gap-3">
            <div className="flex items-end justify-between self-stretch">
              <div className="flex items-center gap-3">
                <div className="flex items-start gap-[6px]">
                  <span className="text-sm font-semibold text-gray-900">
                    모집 정원
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {currentCount}명
                  </span>
                </div>
                <div className="flex items-start -space-x-[10px]">
                  이미지 4개 + 숫자
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconCheck />
                <span className="text-sm font-medium text-mint-500">
                  개설확정
                </span>
              </div>
            </div>
          </div>
          <div />
        </div>
        {/* Progress Bar */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="absolute left-0 top-0 h-full bg-mint-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 최소 & 최대 인원 표시 */}
        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span>최소인원 5명</span>
          <span className="text-mint-500">최대인원 {maxCount}명</span>
        </div>
      </div>
    </div>
  );
}

export default ContainerInformation;
