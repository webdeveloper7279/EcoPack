import { useState } from 'react';
import { motion } from 'framer-motion';
import PlantStatus from '../components/PlantStatus';
import EcoBall from '../components/EcoBall';
import MotivationCard from '../components/MotivationCard';
import { defaultUser, growthStages } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/mockData';

function EcoConfetti({ onDone }) {
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: ['🌱', '🍃', '🌿', '🌾'][i % 4],
    x: Math.random() * 100 - 50,
    delay: Math.random() * 0.3,
    duration: 1.2 + Math.random() * 0.6
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center overflow-hidden">
      {items.map(({ id, emoji, x, delay, duration }) => (
        <motion.span
          key={id}
          className="absolute text-3xl top-1/2"
          initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: -400,
            x,
            opacity: 0,
            rotate: 360
          }}
          transition={{
            delay,
            duration,
            ease: 'easeOut',
            onComplete: id === 0 ? onDone : undefined
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER, defaultUser);
  const [confetti, setConfetti] = useState(false);
  const currentPlant = user?.plants?.[0] ?? null;

  const handleWater = () => {
    if (!user?.plants?.length) return;
    const updated = {
      ...user,
      plants: user.plants.map((p, i) =>
        i === 0 ? { ...p, lastWatered: new Date().toISOString().slice(0, 10) } : p
      )
    };
    setUser(updated);
  };

  const handlePlantGrowPack = () => {
    setUser({
      ...user,
      growpacks: (user.growpacks ?? 0) + 1,
      points: (user.points ?? 0) + 10,
      plasticSaved: String(parseFloat(user.plasticSaved || '0') + 0.25),
      plants: [
        ...(user.plants ?? []),
        {
          id: String(Date.now()),
          name: 'New Plant',
          plantDate: new Date().toISOString().slice(0, 10),
          growthStage: growthStages[0],
          lastWatered: new Date().toISOString().slice(0, 10),
          imageUrl: null
        }
      ]
    });
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-eco-gradient pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
            GrowPack – Plant the Future
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto">
            Turn every package into a living plant.
          </p>
          <motion.div
            className="mt-8 text-6xl sm:text-7xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            🌱
          </motion.div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlantGrowPack}
            className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-shadow"
          >
            I planted a GrowPack
          </motion.button>
        </motion.div>
      </section>

      {confetti && <EcoConfetti onDone={() => {}} />}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <PlantStatus plant={currentPlant} onWater={handleWater} />
        <EcoBall user={user} />
        <MotivationCard plasticSaved={user?.plasticSaved ?? '0'} />
      </div>
    </>
  );
}
