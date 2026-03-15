import { create } from "zustand";
import type { ToastData, ToastType } from "@/types";

interface ToastState {
  toasts: ToastData[];
  addToast: (title: string, type?: ToastType, description?: string) => void;
  removeToast: (id: string) => void;
}

let id = 0;
function nextId() {
  return String(++id);
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (title, type = "default", description) =>
    set((s) => ({
      toasts: [...s.toasts, { id: nextId(), title, description, type }],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
