import { UserStore } from "@customTypes/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState extends UserStore {
  setUser: (user: UserStore) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      id: null,
      name: null,
      image: null,
      companyName: null,
      email: null,
      setUser: (user: UserStore) =>
        set(() => ({
          id: user.id ?? null,
          name: user.name ?? null,
          image: user.image ?? null,
          companyName: user.companyName ?? null,
          email: user.email ?? null,
        })),
    }),
    {
      name: "userIdStorage",
    },
  ),
);

export default useUserStore;
