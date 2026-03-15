import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  addCoins: (amount: number) => void;
  logout: () => void;
  hydrateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") localStorage.setItem("ecopiknik_token", token);
        set({ user, token });
      },
      addCoins: (amount) =>
        set((s) =>
          s.user ? { user: { ...s.user, coins: s.user.coins + amount } } : s
        ),
      logout: () => {
        if (typeof window !== "undefined") localStorage.removeItem("ecopiknik_token");
        set({ user: null, token: null });
      },
      hydrateUser: (user) => set((s) => (s.user ? { user: { ...s.user, ...user } } : s)),
    }),
    { name: "ecopiknik-auth" }
  )
);
