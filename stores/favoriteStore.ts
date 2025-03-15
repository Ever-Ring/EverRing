import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface FavoriteStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        set((state) => {
          const isAlreadyFavorite = state.favorites.includes(id);
          return {
            favorites: isAlreadyFavorite
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        });
      },

      isFavorite: (id) => get().favorites.includes(id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorite-gatherings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
