import { useState, useCallback } from "react";

export interface ModalConfig {
  isOpen: boolean;
  text: string;
  hasTwoButton: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const initialModalState: ModalConfig = {
  isOpen: false,
  text: "",
  hasTwoButton: false,
  onConfirm: () => {},
  onClose: () => {},
};

export default function useModalState(
  initialState: ModalConfig = initialModalState,
) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>(initialState);

  const closeModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { modalConfig, setModalConfig, closeModal };
}
