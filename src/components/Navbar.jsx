import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ darkMode, onToggleDark }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/eco-map', label: 'Eco Map' },
    { to: '/plants', label: "O‘simliklar" },
    { to: '/profile', label: 'Profile' }
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-emerald-400 font-bold text-lg tracking-tight">
          <span className="text-2xl" aria-hidden>🌱</span>
          GrowPack
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                location.pathname === to
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDark}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10"
            aria-label="Menu"
          >
            <span className="text-xl">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium ${
                    location.pathname === to ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
