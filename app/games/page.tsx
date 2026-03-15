"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Coins, Recycle, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecycleClickGame, COINS_PER_CLICK } from "@/components/features/recycle-click-game";
import { SortingGame } from "@/components/features/sorting-game";
import { useAuthStore, useGameStatsStore, useToastStore } from "@/store";

type GameView = "menu" | "recycle" | "sorting" | "result";

export default function GamesPage() {
  const [view, setView] = useState<GameView>("menu");
  const [lastScore, setLastScore] = useState(0);
  const [lastCoins, setLastCoins] = useState(0);
  const addCoins = useAuthStore((s) => s.addCoins);
  const addGamePlayed = useGameStatsStore((s) => s.addGamePlayed);
  const addToast = useToastStore((s) => s.addToast);
  const user = useAuthStore((s) => s.user);

  function handleRecycleFinish(score: number, coins: number) {
    setLastScore(score);
    setLastCoins(coins);
    addCoins(coins);
    addGamePlayed(coins);
    addToast(`You earned ${coins} coins!`, "success");
    setView("result");
  }

  function handleSortingFinish(correct: number, coins: number) {
    setLastScore(correct);
    setLastCoins(coins);
    addCoins(coins);
    addGamePlayed(coins);
    addToast(`You earned ${coins} coins!`, "success");
    setView("result");
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Log in to play eco games and earn coins.</p>
            <Button className="mt-4" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === "result") {
    return (
      <div className="container mx-auto max-w-md px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <Coins className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">Coins earned</h2>
          <p className="mt-2 text-4xl font-bold text-primary">+{lastCoins}</p>
          <p className="mt-4 text-muted-foreground">Added to your balance.</p>
          <Button className="mt-8" variant="eco" onClick={() => setView("menu")}>
            Play another game
          </Button>
        </motion.div>
      </div>
    );
  }

  if (view === "recycle") {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-6 w-6" /> Click recyclable items
            </CardTitle>
            <CardDescription>
              30 seconds. Click each item to collect. {COINS_PER_CLICK} coins per correct click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecycleClickGame onFinish={handleRecycleFinish} />
            <Button className="mt-4" variant="outline" onClick={() => setView("menu")}>
              Back to games
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === "sorting") {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="h-6 w-6" /> Sort trash to correct bin
            </CardTitle>
            <CardDescription>
              Drag each item to the right bin. 5 coins per correct sort.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SortingGame onFinish={handleSortingFinish} />
            <Button className="mt-6" variant="outline" onClick={() => setView("menu")}>
              Back to games
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Eco games</h1>
        <p className="mt-1 text-muted-foreground">Play mini games and earn coins for your bookings.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-eco text-white">
                <Recycle className="h-6 w-6" />
              </div>
              <CardTitle>Recycle click</CardTitle>
              <CardDescription>
                30 seconds. Click recyclable items. Earn {COINS_PER_CLICK} coins per click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="eco" className="w-full" onClick={() => setView("recycle")}>
                Play
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-eco text-white">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <CardTitle>Sorting game</CardTitle>
              <CardDescription>
                Drag trash to the correct bin. 5 coins per correct sort.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="eco" className="w-full" onClick={() => setView("sorting")}>
                Play
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
