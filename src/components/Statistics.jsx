import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { globalStats } from '../data/mockData';

function AnimatedCounter({ end, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function Statistics() {
  const { totalGrowpacks, treesGrown, plasticReducedPercent, monthlyData } = globalStats;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-slate-100">Community Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-emerald-400">
            <AnimatedCounter end={totalGrowpacks} />
          </p>
          <p className="text-slate-400 mt-1">Total GrowPacks planted</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-teal-400">
            <AnimatedCounter end={treesGrown} />
          </p>
          <p className="text-slate-400 mt-1">Trees grown</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-green-400">
            <AnimatedCounter end={plasticReducedPercent} suffix="%" />
          </p>
          <p className="text-slate-400 mt-1">Plastic reduced</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-emerald-400 font-semibold mb-4">Monthly impact</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="growpacks" fill="#34d399" radius={[4, 4, 0, 0]} name="GrowPacks" />
              <Bar dataKey="trees" fill="#2dd4bf" radius={[4, 4, 0, 0]} name="Trees" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
