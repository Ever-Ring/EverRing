"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@components/common/Button";
import useUpdateUserInfo from "@features/mypage/hooks/useUpdateUserInfo";
import Input from "@components/common/Input";
import { useQueryClient } from "@tanstack/react-query";
const DEFAULT_PROFILE_IMAGE_SRC = "/image/img-profile-large-default.svg";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    companyName: string;
    image: string;
  } | null;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
}: EditProfileModalProps) {
  const [companyName, setCompanyName] = useState(
    currentUser?.companyName ?? "",
  );
  const [image, setImage] = useState(currentUser?.image ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentUser) {
      setCompanyName(currentUser.companyName);
      setImage(currentUser.image ?? DEFAULT_PROFILE_IMAGE_SRC);
    }
  }, [currentUser]);

  if (!isOpen || !currentUser) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size <= 5 * 1024 * 1024) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("파일 크기는 5MB 이하이어야 합니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    const formData = new FormData();
    formData.append("companyName", companyName);

    if (file) {
      // 파일이 있는 경우
      formData.append("image", file); // 파일 자체를 추가
    } else {
      formData.append("image", image);
    }
    await updateUserInfo(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <div className="relative flex justify-between">
          <h2 className="mb-6 text-xl font-semibold">프로필 수정하기</h2>
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <Image src="/image/icon-x.svg" alt="close" width={13} height={13} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              <div className="relative h-14 w-14 rounded-full border-2 border-gray-200 bg-gray-200">
                <Image
                  src={image}
                  alt="profile image"
                  className="h-full w-full rounded-full object-cover"
                  width={56}
                  height={56}
                />
              </div>
              <div
                className="absolute bottom-0 left-10 rounded-full border-2 border-white"
                onClick={() => fileInputRef.current?.click()}
              >
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
            <Input
              id="companyName"
              name="companyName"
              label="직업 / 소속"
              type="text"
              placeholder="직업 / 소속"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              value={companyName as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
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
