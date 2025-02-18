"use client";

import { useState } from "react";

interface AlertModalOptions {
  hasTwoButton?: boolean;
  text: string;
  onConfirm?: () => void;
}

export default function useAlertModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<AlertModalOptions | null>(
    null,
  );

  const openModal = (options: AlertModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const confirmAction = () => {
    closeModal();
    if (modalOptions?.onConfirm) {
      modalOptions.onConfirm();
    }
  };

  return { isOpen, modalOptions, openModal, closeModal, confirmAction };
}
