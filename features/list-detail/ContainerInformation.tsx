/* eslint-disable import/no-duplicates */

"use client";

import { useState } from "react";
import ChipInfo from "@components/common/ChipInfo";
import HeartIconActive from "@assets/icon-save-large-active.svg";
import HeartIconInActive from "@assets/icon-save-large-inactive.svg";
import IconCheckDefault from "@assets/ic-check-variant.svg";
import IconCheckVariant from "@assets/ic-check-variant.svg";

interface ContainerInformationProps {
  variant?: "default" | "variant";
}

function ContainerInformation({
  variant = "default",
}: ContainerInformationProps) {
  const [isSaved, setIsSaved] = useState(true);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="mx-auto flex w-[486px] flex-col items-start gap-2 rounded-3xl border-2 border-gray-200 bg-white p-6">
      <div className="flex w-full items-start justify-between">
        <div>
          <span className="text-lg font-semibold leading-7 text-gray-900">
            달램핏 오피스 스트레칭
          </span>
          <div className="text-sm font-medium leading-5 text-gray-700">
            을지로 3가 서울시 중구 청계천로 100
          </div>
        </div>

        <button
          type="submit"
          onClick={toggleSave}
          className="focus:outline-none"
        >
          {isSaved ? (
            <HeartIconActive className="h-12 w-12" />
          ) : (
            <HeartIconInActive className="h-12 w-12" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <ChipInfo info="1월 7일" />
        <ChipInfo info="17:30" variant="mint" />
      </div>
      <div className="mt-4 w-full border-t-2 border-dashed border-gray-200" />
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <span>모집 정원</span>
                  <span>명</span>
                </div>
                <div>이미지 4개 + 숫자</div>
              </div>
              <div>
                {variant === "variant" ? (
                  <IconCheckVariant />
                ) : (
                  <IconCheckDefault />
                )}
                <span>개설 확정</span>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}

export default ContainerInformation;
