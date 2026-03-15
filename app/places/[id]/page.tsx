"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BookingSummaryModal } from "@/components/features/booking-summary-modal";
import { LoaderPage } from "@/components/ui/loader";
import { getPlaceById } from "@/lib/api";
import { getDaysBetween } from "@/lib/utils";
import { COIN_TO_UZS, MAX_DISCOUNT_PERCENT } from "@/types";
import { useAuthStore, useBookingStore, useToastStore } from "@/store";
import { createBooking } from "@/lib/api";
import type { EcoPlace } from "@/types";

function usePlace(id: string | undefined) {
  const [place, setPlace] = useState<EcoPlace | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getPlaceById(id).then(setPlace).finally(() => setLoading(false));
  }, [id]);
  return { place, loading };
}

export default function PlaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { place, loading } = usePlace(id);
  const user = useAuthStore((s) => s.user);
  const addCoins = useAuthStore((s) => s.addCoins);
  const addBooking = useBookingStore((s) => s.addBooking);
  const addToast = useToastStore((s) => s.addToast);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = place && checkIn && checkOut ? getDaysBetween(checkIn, checkOut) : 0;
  const subtotal = place ? place.pricePerDay * days : 0;
  const maxDiscountByPercent = Math.floor((subtotal * MAX_DISCOUNT_PERCENT) / 100);
  const maxCoinsByPercent = Math.floor(maxDiscountByPercent / COIN_TO_UZS);
  const userCoins = user?.coins ?? 0;
  const maxCoins = Math.min(maxCoinsByPercent, userCoins);
  const actualCoins = Math.min(coinsToUse, maxCoins);
  const discountApplied = actualCoins * COIN_TO_UZS;
  const totalPrice = Math.max(0, subtotal - discountApplied);

  const canBook = place && checkIn && checkOut && guests >= 1 && new Date(checkIn) < new Date(checkOut);

  function openSummary() {
    if (!canBook || !user) {
      if (!user) router.push("/login");
      return;
    }
    setModalOpen(true);
  }

  async function handleConfirmBooking() {
    if (!place || !user) return;
    setConfirming(true);
    try {
      const booking = await createBooking({
        placeId: place.id,
        placeName: place.name,
        userId: user.id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        coinsUsed: actualCoins,
        discountApplied,
      });
      addBooking(booking);
      addCoins(-actualCoins);
      setModalOpen(false);
      setConfirmed(true);
      addToast("Booking confirmed!", "success");
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Booking failed", "error");
    } finally {
      setConfirming(false);
    }
  }

  if (loading || !place) {
    return loading ? <LoaderPage /> : (
      <div className="container py-16 text-center">
        <p>Place not found.</p>
        <Button className="mt-4" asChild><Link href="/places">Back to places</Link></Button>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-full bg-green-100 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400 mx-auto w-fit mb-6">
          <Check className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold">Booking confirmed</h2>
        <p className="mt-2 text-muted-foreground">Your reservation has been saved.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild><Link href="/dashboard">View my bookings</Link></Button>
          <Button variant="outline" asChild><Link href="/places">Book another</Link></Button>
        </div>
      </div>
    );
  }

  const images = place.imageUrls.length ? place.imageUrls : ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/places"><ChevronLeft className="h-4 w-4 mr-1" /> Back to places</Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <img
              src={images[galleryIndex]}
              alt={place.name}
              className="h-full w-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  onClick={() => setGalleryIndex((i) => (i - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  onClick={() => setGalleryIndex((i) => (i + 1) % images.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{place.name}</h1>
            <p className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" /> {place.location}, {place.region}
            </p>
            <p className="mt-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {place.rating}
            </p>
          </div>
          <p className="text-muted-foreground">{place.description}</p>
          <div>
            <h3 className="font-semibold">Amenities</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {place.amenities.map((a) => (
                <li key={a} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex h-48 items-center justify-center bg-muted text-muted-foreground">
                Map placeholder (e.g. {place.coordinates ? `${place.coordinates.lat}, ${place.coordinates.lng}` : "location"})
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div className="text-2xl font-bold text-primary">
                {place.pricePerDay.toLocaleString()} UZS <span className="text-base font-normal text-muted-foreground">/ day</span>
              </div>

              <div className="space-y-2">
                <Label>Check-in</Label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="space-y-2">
                <Label>Check-out</Label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="space-y-2">
                <Label>Guests</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value) || 1)}
                />
              </div>

              {user && userCoins > 0 && (
                <div className="space-y-2">
                  <Label>Use eco coins (max {maxCoins})</Label>
                  <Input
                    type="number"
                    min={0}
                    max={maxCoins}
                    value={coinsToUse || ""}
                    onChange={(e) => setCoinsToUse(Number(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-muted-foreground text-xs">1 coin = 1,000 UZS. Max 30% discount.</p>
                </div>
              )}

              {days > 0 && (
                <div className="rounded-lg border border-border p-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{place.pricePerDay.toLocaleString()} × {days} nights</span>
                    <span>{subtotal.toLocaleString()} UZS</span>
                  </div>
                  {actualCoins > 0 && (
                    <div className="flex justify-between text-amber-600">
                      <span>Coin discount ({actualCoins})</span>
                      <span>-{discountApplied.toLocaleString()} UZS</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{totalPrice.toLocaleString()} UZS</span>
                  </div>
                </div>
              )}

              {user ? (
                <Button
                  className="w-full gradient-eco"
                  size="lg"
                  disabled={!canBook}
                  onClick={openSummary}
                >
                  Book now
                </Button>
              ) : (
                <Button className="w-full" variant="eco" size="lg" asChild>
                  <Link href="/login">Login to book</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingSummaryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        placeName={place.name}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        subtotal={subtotal}
        coinsUsed={actualCoins}
        discountApplied={discountApplied}
        totalPrice={totalPrice}
        onConfirm={handleConfirmBooking}
        loading={confirming}
      />
    </div>
  );
}
