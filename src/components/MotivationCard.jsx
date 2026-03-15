import { motion } from 'framer-motion';

export default function MotivationCard({ plasticSaved = '0' }) {
  const value = parseFloat(plasticSaved) || 0;
  const max = 10;
  const progress = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="glass-card p-6"
    >
      <p className="text-lg text-slate-200 text-center mb-4">
        You saved <span className="text-emerald-400 font-bold">{plasticSaved}kg</span> plastic from nature 🌍
      </p>
      <div className="flex justify-between text-sm text-slate-400 mb-1">
        <span>Impact progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
