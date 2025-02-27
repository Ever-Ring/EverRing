"use client";

import React, { useState } from "react";
import ModalPortal from "@components/common/ModalPortal";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import DateFilter from "@components/common/DateFilter";
import RadioButton from "@components/common/RadioButton";

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGatheringModal({
  isOpen,
  onClose,
}: CreateGatheringModalProps) {
  // 각 필드를 부모에서 관리
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  if (!isOpen) return null;

  // 모든 필드가 빈 문자열이 아닐 때만 폼 유효
  const isFormValid =
    name.trim() !== "" &&
    location.trim() !== "" &&
    image.trim() !== "" &&
    capacity.trim() !== "" &&
    type.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WORKATION일 경우 실제 전송값은 "신림"
    let finalLocation = location;
    if (type === "WORKATION") {
      finalLocation = "신림";
    }

    console.log("제출:", {
      name,
      location: finalLocation,
      image,
      capacity,
      type,
    });

    // 여기서 실제 API 요청 or 로직 처리
    // ...

    onClose();
  };

  return (
    <ModalPortal>
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
        <div className="w-94 md:w-130 relative z-10 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-gray-900">모임 만들기</h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* 모임 이름 */}
            <InputForm
              id="name"
              name="name"
              type="text"
              label="모임 이름"
              placeholder="모임 이름을 작성해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* 장소 */}
            {type === "WORKATION" ? (
              // 구름링이면 "온라인" 표시, 수정 불가
              <InputForm
                id="location"
                name="location"
                type="text"
                label="장소"
                placeholder=""
                readOnly
                value="온라인"
              />
            ) : (
              // 그 외에는 select
              <InputForm
                id="location"
                name="location"
                type="select"
                label="장소"
                placeholder="장소를 선택해주세요."
                options={["건대입구", "을지로3가", "신림", "홍대입구"]}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}

            {/* 이미지 첨부 */}
            <InputForm
              id="image"
              name="image"
              type="fileupload"
              label="이미지"
              placeholder="이미지를 첨부해주세요."
              // 파일명도 부모가 관리
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
              type="number"
              label="모임 정원"
              placeholder="최소 5인 이상 입력해주세요."
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />

            {/* 버튼들 */}
            <div className="mt-6 flex justify-end gap-2">
              <Button text="확인" type="submit" disabled={!isFormValid} />
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
