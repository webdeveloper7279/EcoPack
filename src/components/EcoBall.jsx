import { motion } from 'framer-motion';

export default function EcoBall({ user }) {
  const { points = 0, growpacks = 0, plasticSaved = '0', level = 'Eco Beginner' } = user ?? {};

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
        <span aria-hidden>🌍</span> Your Eco Impact
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <motion.p
            className="text-2xl sm:text-3xl font-bold text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {points}
          </motion.p>
          <p className="text-sm text-slate-400 mt-1">Eco points</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <motion.p
            className="text-2xl sm:text-3xl font-bold text-teal-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {growpacks}
          </motion.p>
          <p className="text-sm text-slate-400 mt-1">GrowPacks planted</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
          <motion.p
            className="text-2xl sm:text-3xl font-bold text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {plasticSaved}kg
          </motion.p>
          <p className="text-sm text-slate-400 mt-1">Plastic saved</p>
        </div>
      </div>
      <p className="mt-4 text-center text-slate-400 text-sm">Level: <span className="text-emerald-400 font-medium">{level}</span></p>
    </motion.section>
  );
}
