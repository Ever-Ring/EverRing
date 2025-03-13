"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Button from "@components/common/Button";
import InputForm from "@components/common/InputForm";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import useEditProfile from "@features/mypage/hooks/useEditProfile";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    companyName: string | null;
    image: string | null;
  };
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userInfo,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    handleFileChange,
    onSubmit,
  } = useEditProfile(userInfo, onClose, fileInputRef);

  if (!isOpen || !userInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-96 rounded-lg bg-white p-6">
        <div className="relative flex justify-between">
          <h2 className="mb-6 text-xl font-semibold">프로필 수정하기</h2>
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={onClose}
            aria-label="닫기"
          >
            <Image src="/image/X.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-6">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="프로필 이미지 수정"
            >
              <div className="relative h-14 w-14 rounded-full border-2 border-gray-200 bg-gray-200">
                <Image
                  src={watch("image") ?? DEFAULT_USER_IMAGE}
                  alt="profile image"
                  className="h-full w-full rounded-full object-cover"
                  width={56}
                  height={56}
                />
              </div>
              <div className="absolute bottom-0 left-10 rounded-full border-2 border-white">
                <Image
                  src="/image/edit.svg"
                  alt="edit"
                  width={18}
                  height={18}
                />
              </div>
            </button>
          </div>
          <div className="mb-6">
            <InputForm
              name="companyName"
              id="companyName"
              type="text"
              label="직업 / 소속"
              labelTextSize="sm"
              placeholder="직업 / 소속을 입력해주세요"
              register={register}
              rules={{ required: "직업 / 소속을 입력해주세요" }}
              errors={errors}
              onBlur={() => trigger("companyName")}
            />
          </div>
          <div className="flex justify-end gap-x-2">
            <Button text="취소" variant="outlined" onClick={onClose} />
            <Button type="submit" text="저장" variant="solid" />
          </div>
        </form>
      </div>
    </div>
  );
}
