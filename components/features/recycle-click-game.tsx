"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RECYCLABLE_ITEMS } from "@/lib/constants";

const DURATION = 30;
const COINS_PER_CLICK = 2;

interface RecycleClickGameProps {
  onFinish: (score: number, coins: number) => void;
}

const ITEM_EMOJIS: Record<string, string> = {
  bottle: "🍾",
  can: "🥫",
  paper: "📄",
  cardboard: "📦",
  glass: "🍶",
  plastic: "🧴",
};

export function RecycleClickGame({ onFinish }: RecycleClickGameProps) {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [positions, setPositions] = useState<{ id: number; item: string; x: number; y: number }[]>([]);
  const [nextId, setNextId] = useState(0);

  const spawn = useCallback(() => {
    const item = RECYCLABLE_ITEMS[Math.floor(Math.random() * RECYCLABLE_ITEMS.length)];
    setPositions((prev) => [
      ...prev.slice(-4),
      {
        id: nextId,
        item,
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 60,
      },
    ]);
    setNextId((n) => n + 1);
  }, [nextId]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      const coins = score * COINS_PER_CLICK;
      onFinish(score, coins);
      return;
    }
    const spawnInterval = setInterval(spawn, 800);
    return () => clearInterval(spawnInterval);
  }, [timeLeft, score, onFinish, spawn]);

  function handleClick(id: number) {
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setScore((s) => s + 1);
  }

  if (timeLeft <= 0) return null;

  return (
    <div className="relative h-80 overflow-hidden rounded-xl border border-border bg-muted/30">
      <div className="absolute left-4 top-4 flex gap-4 text-sm font-medium">
        <span>Time: {timeLeft}s</span>
        <span>Score: {score}</span>
      </div>
      {positions.map((pos) => (
        <motion.button
          key={pos.id}
          type="button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl shadow-md hover:bg-green-200 dark:bg-green-900/50"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
          onClick={() => handleClick(pos.id)}
        >
          {ITEM_EMOJIS[pos.item] ?? "♻️"}
        </motion.button>
      ))}
    </div>
  );
}

export { COINS_PER_CLICK };
