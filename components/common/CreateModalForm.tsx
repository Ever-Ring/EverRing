"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/common/Button";
import AlertModal from "@components/common/AlertModal";
import CreateModalInput from "@components/common/CreateModalInput";
import DateFilter from "@components/common/DateFilter";
import RadioButton from "@components/common/RadioButton";
import useCreateGatheringMutation from "@hooks/useCreateGathering";
import type { CreateGatheringValues } from "types/gathering";
import CloseButton from "@assets/Group 33597.svg";

function parseDate(val: string): Date | null {
  if (!val) return null;
  return new Date(val);
}

function getDeadlineMaxDate(meetingDateObj: Date | null): Date | undefined {
  if (meetingDateObj) {
    return new Date(meetingDateObj.getTime() - 60 * 1000);
  }
  return undefined;
}

interface CreateModalFormProps {
  onClose: () => void;
}

export default function CreateModalForm({ onClose }: CreateModalFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [registrationEnd, setRegistrationEnd] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [createdGatheringId, setCreatedGatheringId] = useState<number | null>(
    null,
  );

  const meetingDateObj = parseDate(meetingDate);
  const meetingMinDate = new Date();
  const now = new Date();
  const deadlineMinDate = now;
  const deadlineMaxDate = getDeadlineMaxDate(meetingDateObj);

  useEffect(() => {
    if (type === "WORKATION") {
      setLocation("온라인");
    } else {
      setLocation("");
    }
  }, [type]);

  const { mutate: createGathering } = useCreateGatheringMutation();

  const capacityNum = parseInt(capacity, 10);
  const isValidCapacity = !Number.isNaN(capacityNum) && capacityNum >= 5;

  const isFormValid =
    name.trim() !== "" &&
    location.trim() !== "" &&
    image !== null &&
    isValidCapacity &&
    type.trim() !== "" &&
    meetingDate.trim() !== "" &&
    registrationEnd.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalLocation = location;
    if (type === "WORKATION") {
      finalLocation = "신림";
    }

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
      onSuccess: (resData) => {
        setCreatedGatheringId(resData.data.id);
        setShowSuccess(true);
      },
      onError: () => {
        setShowError(true);
      },
    });
  };

  if (showSuccess) {
    return (
      <AlertModal
        text="모임이 생성되었습니다!"
        isOpen
        hasTwoButton={false}
        onConfirm={() => {
          setShowSuccess(false);
          if (createdGatheringId !== null) {
            router.push(`/list-detail/${createdGatheringId}`);
          }
        }}
        onClose={() => {
          setShowSuccess(false);
          if (createdGatheringId !== null) {
            router.push(`/list-detail/${createdGatheringId}`);
          }
        }}
      />
    );
  }

  if (showError) {
    return (
      <AlertModal
        text="모임 생성에 실패했습니다. 다시 시도해주세요."
        isOpen
        hasTwoButton={false}
        onConfirm={() => {
          setShowError(false);
        }}
        onClose={() => {
          setShowError(false);
        }}
      />
    );
  }

  return (
    <>
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

        <RadioButton selectedType={type} onChange={setType} />

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

        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
          <div className="flex-1">
            <span className="mb-1 block text-sm font-semibold text-gray-900">
              마감 날짜
            </span>
            <DateFilter
              showTimeSelect
              minDate={deadlineMinDate}
              maxDate={deadlineMaxDate}
              onDateSelect={(val) => setRegistrationEnd(val || "")}
            />
          </div>
          <div className="flex-1">
            <span className="mb-1 block text-sm font-semibold text-gray-900">
              모임 날짜
            </span>
            <DateFilter
              showTimeSelect
              minDate={meetingMinDate}
              onDateSelect={(val) => setMeetingDate(val || "")}
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
    </>
  );
}
