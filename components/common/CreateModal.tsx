"use client";

import React from "react";
import ModalPortal from "@components/common/ModalPortal";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import DateFilter from "@components/common/DateFilter";

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGatheringModal({
  isOpen,
  onClose,
}: CreateGatheringModalProps) {
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
        <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
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
            />

            {/* 이미지 첨부 */}
            <div>
              <span className="mb-1 block text-sm font-semibold text-gray-900">
                이미지
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  className="flex-1 rounded-md border border-gray-300 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {/* 선택 서비스 (라디오 버튼) */}
            <div>
              <span className="mb-1 block text-sm font-semibold text-gray-900">
                선택 서비스
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-700">
                  <input type="radio" name="type" value="오픽 스터디룸" />
                  오픽 스터디룸
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-700">
                  <input type="radio" name="type" value="마인드캠프" />
                  마인드캠프
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-700">
                  <input type="radio" name="type" value="워케이션" />
                  워케이션
                </span>
              </div>
            </div>

            {/* 날짜 (2개를 가로로) */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  모임 날짜
                </span>
                <DateFilter />
              </div>
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  마감 날짜
                </span>
                <DateFilter />
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
              <Button text="취소" variant="outlined" onClick={onClose} />
              <Button text="생성하기" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
