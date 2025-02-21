import { create } from "zustand";
import { AlertModalOptions } from "@customTypes/modal";

interface ModalState {
  isOpen: boolean;
  modalOptions: AlertModalOptions | null;
  openModal: (options: AlertModalOptions) => void;
  closeModal: () => void;
  confirmAction: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalOptions: null,
  openModal: (options) => set({ isOpen: true, modalOptions: options }),
  closeModal: () => set({ isOpen: false, modalOptions: null }),
  confirmAction: () => {
    set((state) => {
      const newState = { isOpen: false, modalOptions: null };

      if (state.modalOptions?.onConfirm) {
        state.modalOptions.onConfirm();
      }

      return newState;
    });
  },
}));

export default useModalStore;
