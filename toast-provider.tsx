"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useToastStore } from "@/store";
import type { ToastType } from "@/types";
import { cn } from "@/lib/utils";

const variantClasses: Record<ToastType, string> = {
  default: "border-border bg-card",
  success: "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100",
  error: "border-red-500/50 bg-red-50 dark:bg-red-950/80 text-red-900 dark:text-red-100",
  info: "border-sky-500/50 bg-sky-50 dark:bg-sky-950/80 text-sky-900 dark:text-sky-100",
};

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();
  const ref = useRef<Record<string, number>>({});

  useEffect(() => {
    toasts.forEach((t) => {
      if (ref.current[t.id]) return;
      ref.current[t.id] = window.setTimeout(() => {
        removeToast(t.id);
        delete ref.current[t.id];
      }, 5000);
    });
    return () => {
      Object.values(ref.current).forEach(clearTimeout);
      ref.current = {};
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 right-4 z-[100] flex max-w-[420px] flex-col gap-2 p-4 sm:bottom-auto sm:left-auto">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={cn(
              "flex items-start justify-between gap-4 rounded-lg border p-4 shadow-lg",
              variantClasses[t.type]
            )}
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              {t.description && (
                <p className="mt-1 text-sm opacity-90">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              className="shrink-0 rounded p-1 opacity-70 hover:opacity-100"
              onClick={() => removeToast(t.id)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
