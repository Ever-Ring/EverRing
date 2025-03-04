"use client";
import { useState } from "react";
import useIsAuthenticated from "@hooks/useIsAuthenticated";
import Button from "@components/common/Button";
import CreateGatheringModal from "@components/common/CreateModal";
import AlertModal from "@components/common/AlertModal";

export default function CreateGatheringButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginCheckModalOpen, setIsLoginCheckModalOpen] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  const handleCreateGatheringClick = () => {
    if (!isAuthenticated) {
      setIsLoginCheckModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="flex items-center">
      <Button
        text="모임 만들기"
        size="small"
        onClick={handleCreateGatheringClick}
      />

      {isModalOpen && (
        <CreateGatheringModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <AlertModal
        text="로그인이 필요해요."
        isOpen={isLoginCheckModalOpen}
        onClose={() => setIsLoginCheckModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}
