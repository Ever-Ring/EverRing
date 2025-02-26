"use client";

import { useState } from "react";
import Image from "next/image";
import EditProfileModal from "@features/mypage/components/EditProfileModal";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import useUserStore from "@stores/userStore";

export default function MyProfile() {
  const userInfo = useUserStore();
  // TODO 이렇게 객체 형태로 가져와야 할지, 구조 분해 할당을 해야 할지
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUserEmpty = Object.values(userInfo).every((value) => value === null);

  const openModal = () => {
    if (!isUserEmpty) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      <div className="h-16 rounded-t-3xl border-x-2 border-t-2 border-gray-200 bg-mint-400 pt-4">
        <div className="flex items-center justify-between px-6">
          <span className="text-lg font-semibold">내 프로필</span>
          <button type="button" aria-label="프로필 수정" onClick={openModal}>
            <Image src="/image/edit.svg" alt="edit" width={32} height={32} />
          </button>
        </div>
        <hr className="mt-2 border border-mint-600" />
      </div>
      <div className="absolute left-6 top-14 h-14 w-14 rounded-full border-2 border-white bg-gray-200">
        <Image
          src={userInfo.image || DEFAULT_USER_IMAGE}
          alt="profile image"
          className="h-full w-full rounded-full object-cover"
          width={56}
          height={56}
        />
      </div>
      <div className="flex flex-col rounded-b-3xl border-x-2 border-b-2 border-gray-200 bg-white py-3 pl-24">
        <span className="text-base font-semibold">{userInfo.name}</span>
        <div className="flex flex-row gap-x-2 pt-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium">직업 / 소속</span>
            <span className="text-sm font-medium">이메일</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-normal">{userInfo.companyName}</span>
            <span className="text-sm font-normal">{userInfo.email}</span>
          </div>
        </div>
      </div>
      {!isUserEmpty && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentUser={userInfo}
        />
      )}
    </div>
  );
}
