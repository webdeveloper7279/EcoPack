"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Coins, Gamepad2, MapPin } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderPage } from "@/components/ui/loader";
import { formatPrice, formatDate } from "@/lib/utils";
import { getBookings } from "@/lib/api";
import { useAuthStore, useBookingStore, useGameStatsStore } from "@/store";
import type { Booking } from "@/types";

function DashboardContent() {
  const user = useAuthStore((s) => s.user);
  const storeBookings = useBookingStore((s) => s.bookings);
  const { gamesPlayed, totalCoinsEarned } = useGameStatsStore();
  const [apiBookings, setApiBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getBookings(user.id).then((list) => {
      setApiBookings(list);
      setLoading(false);
    });
  }, [user]);

  const allBookings = [...storeBookings, ...apiBookings].filter(
    (b, i, arr) => arr.findIndex((x) => x.id === b.id) === i
  );
  const sortedBookings = [...allBookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Your bookings and eco stats</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coin balance</CardTitle>
            <Coins className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.coins}</p>
            <p className="text-muted-foreground text-xs">Eco coins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{sortedBookings.length}</p>
            <p className="text-muted-foreground text-xs">Total reservations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games played</CardTitle>
            <Gamepad2 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{gamesPlayed}</p>
            <p className="text-muted-foreground text-xs">Mini games</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coins earned</CardTitle>
            <Coins className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalCoinsEarned}</p>
            <p className="text-muted-foreground text-xs">From games</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Booking history</CardTitle>
          <CardDescription>Your past and upcoming reservations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoaderPage />
          ) : sortedBookings.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No bookings yet.{" "}
              <Link href="/places" className="text-primary hover:underline">
                Explore places
              </Link>
            </p>
          ) : (
            <ul className="space-y-4">
              {sortedBookings.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-semibold">{b.placeName}</p>
                    <p className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" /> {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {b.guests} guest{b.guests !== 1 ? "s" : ""}
                      {b.coinsUsed > 0 && ` · ${b.coinsUsed} coins used`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(b.totalPrice)}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : b.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
