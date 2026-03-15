import { motion } from 'framer-motion';
import EcoMap from '../components/EcoMap';
import Leaderboard from '../components/Leaderboard';
import Statistics from '../components/Statistics';

export default function EcoMapPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <section>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Eco Map</h1>
          <p className="text-slate-400">Community impact across cities.</p>
          <div className="mt-6">
            <EcoMap />
          </div>
        </section>
        <Statistics />
        <Leaderboard />
      </div>
    </motion.div>
  );
}
