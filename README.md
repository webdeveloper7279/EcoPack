# Ecopiknik

A modern ecological booking platform where users can book eco recreation places, play mini games, earn coins, and use them for discounts.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **ShadCN-style UI** (Radix primitives + CVA)
- **Zustand** (state management)
- **Axios** (API layer; mock data in this repo)
- **React Hook Form + Zod** (forms & validation)
- **Framer Motion** (animations)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Auth**: Login, register, profile, JWT-style token storage, protected routes, logout, coin balance in navbar
- **Home**: Hero, featured places, “How it works”, eco coin explanation, CTAs
- **Places**: Grid of eco locations with filters (price, location, rating), search, “Book now”
- **Place detail**: Gallery, description, amenities, map placeholder, date picker, guests, dynamic price, coin discount (1 coin = 1000 UZS, max 30%), booking summary modal, confirmation
- **Eco games**: Recycle click game (30s, coins per click), sorting game (drag & drop to bins), coins added to balance
- **Dashboard**: Booking history, total coins earned, games played, stats
- **Admin**: Add/edit/delete places, view all bookings

## Project structure

```
/app          – App Router pages
/components   – Reusable UI and layout
/features     – Feature-specific components (place card, booking modal, games)
/store        – Zustand stores (auth, theme, toast, bookings, places, game stats)
/lib          – API, mock data, utils
/types        – Shared TypeScript types
/hooks        – useAuth, useMount, etc.
```

## Mock API

All data is in-memory (no backend). Auth uses a stored token and mock user; places and bookings are held in `lib/api.ts` and reset on refresh.
