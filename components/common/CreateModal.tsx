"use client";

import React, { useState, useEffect } from "react";
import ModalPortal from "@components/common/ModalPortal";
import Button from "@components/common/Button";
import CreateModalInput from "@components/common/CreateModalInput";
import DateFilter from "@components/common/DateFilter";
import RadioButton from "@components/common/RadioButton";
import useCreateGatheringMutation from "@hooks/useCreateGathering";
import type { CreateGatheringValues } from "types/gathering";
import axios from "axios";
import CloseButton from "@assets/Group 33597.svg";

interface CreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGatheringModal({
  isOpen,
  onClose,
}: CreateGatheringModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [registrationEnd, setRegistrationEnd] = useState("");

  useEffect(() => {
    if (type === "WORKATION") {
      setLocation("온라인");
    }
  }, [type]);

  const { mutate: createGathering } = useCreateGatheringMutation();

  if (!isOpen) return null;

  const isFormValid =
    name.trim() !== "" &&
    location.trim() !== "" &&
    image !== null &&
    capacity.trim() !== "" &&
    type.trim() !== "" &&
    meetingDate.trim() !== "" &&
    registrationEnd.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalLocation = location;
    if (type === "WORKATION") {
      finalLocation = "신림";
    }

    const capacityNum = parseInt(capacity, 10);

    const data: CreateGatheringValues = {
      name,
      location: finalLocation,
      type,
      dateTime: meetingDate,
      registrationEnd,
      capacity: capacityNum,
      image: image!,
    };

    createGathering(data, {
      onSuccess: (res) => {
        console.log("제출 성공:", res.data);
        onClose();
      },
      onError: (err) => {
        console.error("모임 생성 실패:", err);
        if (axios.isAxiosError(err)) {
          console.log("서버 에러 메시지:", err.response?.data);
        }
      },
    });
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">모임 만들기</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <CloseButton className="h-6 w-6" />
            </button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <CreateModalInput
              type="text"
              label="모임 이름"
              placeholder="모임 이름을 작성해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {type === "WORKATION" ? (
              <CreateModalInput
                type="text"
                label="장소"
                value={location}
                readOnly
              />
            ) : (
              <CreateModalInput
                type="select"
                label="장소"
                placeholder="장소를 선택해주세요."
                options={["건대입구", "을지로3가", "신림", "홍대입구"]}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}

            <CreateModalInput
              type="fileupload"
              label="이미지"
              placeholder="이미지를 첨부해주세요."
              onFileChange={(file) => setImage(file)}
            />

            <RadioButton selectedType={type} onChange={setType} />

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  모임 날짜
                </span>
                <DateFilter
                  showTimeSelect
                  onDateSelect={(val) => setMeetingDate(val || "")}
                />
              </div>
              <div className="flex-1">
                <span className="mb-1 block text-sm font-semibold text-gray-900">
                  마감 날짜
                </span>
                <DateFilter
                  showTimeSelect
                  onDateSelect={(val) => setRegistrationEnd(val || "")}
                />
              </div>
            </div>

            <CreateModalInput
              type="number"
              label="모임 정원"
              placeholder="최소 5인 이상 입력해주세요."
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />

            <div className="mt-6 flex justify-end gap-2">
              <Button text="확인" type="submit" disabled={!isFormValid} />
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
