import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { plants } from '../data/plants';

export default function Plants() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-100">O‘simliklar katalogi</h1>
          <p className="text-slate-400 text-sm sm:text-base">
            GrowPack orqali ekishingiz mumkin bo‘lgan o‘simliklarni tanlang va har birining batafsil
            ma’lumot sahifasiga o‘ting.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
            >
              <Link
                to={`/plant/${plant.id}`}
                className="block glass-card p-4 h-full hover:-translate-y-1 hover:ring-2 hover:ring-emerald-500/40 transition-transform"
              >
                <div className="w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/30 via-teal-400/20 to-green-500/30 flex items-center justify-center mb-4">
                  {plant.image ? (
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-5xl" aria-hidden>
                      🌱
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-100">{plant.name}</h2>
                  <p className="text-xs text-emerald-300 italic">{plant.latin}</p>
                  <p className="text-xs text-slate-400">{plant.type}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

