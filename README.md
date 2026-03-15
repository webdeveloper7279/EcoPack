# GrowPack Eco Platform

A modern React frontend for the **GrowPack** eco startup – turn every package into a living plant. Built with **Vite**, **React**, **Tailwind CSS**, **Framer Motion**, **Leaflet**, and **Recharts**. No backend; data is simulated with **LocalStorage**.

## Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Features

- **Home**: Hero, plant status card, eco points ball, motivation block, “I planted a GrowPack” with confetti
- **Eco Map**: Leaflet map with city markers (GrowPack counts), leaderboards (users, universities, restaurants), animated statistics and Recharts
- **Profile**: User card, plant gallery (upload images), PDF certificate download, partners section
- Sticky navbar, dark/light toggle, smooth page transitions, mobile-responsive layout

## Tech stack

- React 18 + Vite
- Tailwind CSS (eco theme, glassmorphism)
- Framer Motion (animations)
- React Router DOM
- Leaflet / react-leaflet (map)
- Recharts (charts)
- jsPDF (certificate)

Data is stored in **LocalStorage** (user profile, plants, plant images, theme).
