"use client";

import React, { useState } from "react";
import ModalPortal from "@components/common/ModalPortal";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import DateFilter from "@components/common/DateFilter";
import RadioButton from "@components/common/RadioButton";
// import CreateGathering from "@apis/GatheringApi";

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGatheringModal({
  isOpen,
  onClose,
}: CreateGatheringModalProps) {
  const [type, setType] = useState("");

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* 모달 배경 & 중앙정렬 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          role="button"
          tabIndex={0}
          aria-label="Close modal background"
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClose();
          }}
        />

        {/* 모달 컨테이너 */}
        <div className="w-94 md:w-130 relative z-10 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-gray-900">모임 만들기</h2>

          <form className="flex flex-col gap-6">
            {/* 모임 이름 */}
            <InputForm
              id="name"
              name="name"
              label="모임 이름"
              placeholder="모임 이름을 작성해주세요."
              type="text"
            />

            {/* 장소 */}
            <InputForm
              id="location"
              name="location"
              label="장소"
              placeholder="장소를 선택해주세요."
              type="select"
              options={["건대입구", "을지로3가", "신림", "홍대입구"]}
            />

            {/* 이미지 첨부 */}
            <InputForm
              id="image"
              name="image"
              label="이미지"
              placeholder="이미지를 첨부해주세요."
              type="fileupload"
            />

            {/* 선택 서비스 (라디오 버튼) */}
            <RadioButton selectedType={type} onChange={setType} />

            {/* 날짜 (2개를 가로로) */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  모임 날짜
                </span>
                <DateFilter showTimeSelect />
              </div>
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  마감 날짜
                </span>
                <DateFilter showTimeSelect />
              </div>
            </div>

            {/* 모임 정원 */}
            <InputForm
              id="capacity"
              name="capacity"
              label="모임 정원"
              placeholder="최소 5인 이상 입력해주세요."
              type="number"
            />

            {/* 버튼들 */}
            <div className="mt-6 flex justify-end gap-2">
              <Button text="확인" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
