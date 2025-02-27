import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HiddenGatheringStore {
  hiddenExpiredIds: number[];
  hideExpiredGathering: (id: number) => void;
  isHidden: (id: number) => boolean;
  clearHidden: () => void;
}

export const useHiddenGatheringStore = create<HiddenGatheringStore>()(
  persist(
    (set, get) => ({
      hiddenExpiredIds: [],

      hideExpiredGathering: (id) => {
        set((state) => ({
          hiddenExpiredIds: [...state.hiddenExpiredIds, id],
        }));
      },

      isHidden: (id) => get().hiddenExpiredIds.includes(id),

      clearHidden: () => set({ hiddenExpiredIds: [] }),
    }),
    {
      name: "hidden-gatherings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
