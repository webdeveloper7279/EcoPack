"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const BINS = ["plastic", "paper", "glass", "organic"] as const;
const ITEMS: { id: string; name: string; category: (typeof BINS)[number]; emoji: string }[] = [
  { id: "1", name: "Bottle", category: "plastic", emoji: "🍾" },
  { id: "2", name: "Newspaper", category: "paper", emoji: "📰" },
  { id: "3", name: "Jar", category: "glass", emoji: "🫙" },
  { id: "4", name: "Banana peel", category: "organic", emoji: "🍌" },
  { id: "5", name: "Bag", category: "plastic", emoji: "🛍️" },
  { id: "6", name: "Cardboard", category: "paper", emoji: "📦" },
  { id: "7", name: "Wine bottle", category: "glass", emoji: "🍷" },
  { id: "8", name: "Apple core", category: "organic", emoji: "🍎" },
];

const COINS_PER_CORRECT = 5;

interface SortingGameProps {
  onFinish: (correct: number, coins: number) => void;
}

export function SortingGame({ onFinish }: SortingGameProps) {
  const [shuffled] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5));
  const [assignments, setAssignments] = useState<Record<string, (typeof BINS)[number] | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleDrop = useCallback((itemId: string, bin: (typeof BINS)[number]) => {
    setAssignments((prev) => ({ ...prev, [itemId]: bin }));
  }, []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    let correct = 0;
    shuffled.forEach((item) => {
      if (assignments[item.id] === item.category) correct++;
    });
    const coins = correct * COINS_PER_CORRECT;
    onFinish(correct, coins);
  }, [assignments, shuffled, onFinish]);

  const correctCount = submitted
    ? shuffled.filter((item) => assignments[item.id] === item.category).length
    : null;

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">Drag each item to the correct bin. Then click Submit.</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {BINS.map((bin) => (
          <div
            key={bin}
            className="min-h-[120px] rounded-lg border-2 border-dashed border-border bg-muted/30 p-3 capitalize"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("item");
              if (id) handleDrop(id, bin);
            }}
          >
            <p className="mb-2 font-medium text-muted-foreground">{bin}</p>
            {shuffled
              .filter((item) => assignments[item.id] === bin)
              .map((item) => (
                <div
                  key={item.id}
                  className="mb-2 flex items-center gap-2 rounded bg-background px-2 py-1 text-sm"
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {shuffled.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("item", item.id)}
            className="flex cursor-grab items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm active:cursor-grabbing transition-transform hover:scale-[1.02]"
          >
            <span>{item.emoji}</span>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
      {!submitted && (
        <Button onClick={handleSubmit} variant="eco">
          Submit
        </Button>
      )}
      {correctCount !== null && (
        <p className="font-medium text-primary">
          Correct: {correctCount} / {shuffled.length} — Coins earned: {correctCount * COINS_PER_CORRECT}
        </p>
      )}
    </div>
  );
}

export { COINS_PER_CORRECT };
