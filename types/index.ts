export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  coins: number;
  createdAt: string;
}

export interface EcoPlace {
  id: string;
  name: string;
  location: string;
  region: string;
  description: string;
  pricePerDay: number;
  rating: number;
  imageUrls: string[];
  amenities: string[];
  availableSlots: number;
  coordinates?: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  placeId: string;
  placeName: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  coinsUsed: number;
  discountApplied: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface GameScore {
  gameId: string;
  gameName: string;
  score: number;
  coinsEarned: number;
  playedAt: string;
}

export type ToastType = "success" | "error" | "info" | "default";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

export const COIN_TO_UZS = 1000;
export const MAX_DISCOUNT_PERCENT = 30;
