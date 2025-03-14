"use client";

import React from "react";
import ModalPortal from "@components/common/ModalPortal";
import CreateModalForm from "@components/common/CreateModalForm";
import useLockBodyScroll from "@hooks/useLockBodyScroll";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose }: CreateModalProps) {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

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
        <div className="w-94 h-209 md:w-130 relative z-10 max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-xl bg-white p-4 shadow-lg md:h-auto md:p-6">
          <CreateModalForm onClose={onClose} />
        </div>
      </div>
    </ModalPortal>
  );
}
