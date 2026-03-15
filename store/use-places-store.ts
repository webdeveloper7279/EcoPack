import { create } from "zustand";
import type { EcoPlace } from "@/types";

interface PlacesState {
  places: EcoPlace[];
  setPlaces: (places: EcoPlace[]) => void;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [],
  setPlaces: (places) => set({ places }),
}));
