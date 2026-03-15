import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameStatsState {
  gamesPlayed: number;
  totalCoinsEarned: number;
  addGamePlayed: (coinsEarned: number) => void;
}

export const useGameStatsStore = create<GameStatsState>()(
  persist(
    (set) => ({
      gamesPlayed: 0,
      totalCoinsEarned: 0,
      addGamePlayed: (coinsEarned) =>
        set((s) => ({
          gamesPlayed: s.gamesPlayed + 1,
          totalCoinsEarned: s.totalCoinsEarned + coinsEarned,
        })),
    }),
    { name: "ecopiknik-game-stats" }
  )
);
