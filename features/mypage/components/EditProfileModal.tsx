"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@components/common/Button";
import useUpdateUserInfo from "@features/mypage/hooks/useUpdateUserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import InputForm from "@components/common/InputForm";
import { FormValues } from "@customTypes/form";
import { AxiosError } from "axios";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import useUserStore from "@stores/userStore";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    companyName: string | null;
    image: string | null;
  };
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormValues>();

  useEffect(() => {
    if (currentUser) {
      setValue("companyName", currentUser.companyName ?? "");
      setValue("image", currentUser.image ?? DEFAULT_USER_IMAGE);
    }
  }, [currentUser, setValue]);

  if (!isOpen || !currentUser) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size <= MAX_FILE_SIZE) {
      setValue("image", URL.createObjectURL(file));
    } else {
      alert("파일 크기는 5MB 이하이어야 합니다.");
    }
  };

  const onSubmit = async (data: FormValues) => {
    const file = fileInputRef.current?.files?.[0];
    const formData = new FormData();
    formData.append("companyName", data.companyName ?? "");
    formData.append("image", file || (data.image ?? ""));

    updateUserInfo(formData, {
      onSuccess: () => {
        useUserStore.getState().setUser({
          ...useUserStore.getState(),
          companyName: data.companyName ?? null,
          image: data.image ?? null,
        });
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        onClose();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError;
        let errorMessage = "에러가 발생했습니다.";

        if (axiosError.isAxiosError) {
          errorMessage =
            (axiosError.response?.data as { message?: string })?.message ||
            errorMessage;
        } else {
          errorMessage = axiosError.message;
        }

        alert(errorMessage);
      },
    });
  };

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
