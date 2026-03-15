import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { findPlantBySlug } from '../data/plants';

const stages = [
  { key: 'seed', label: 'Seed', icon: '🫘' },
  { key: 'seedling', label: 'Seedling', icon: '🌱' },
  { key: 'young', label: 'Young Plant', icon: '🌿' },
  { key: 'mature', label: 'Mature Plant', icon: '🌳' }
];

export default function PlantInfo() {
  const { plantName } = useParams();
  const plant = findPlantBySlug(plantName);

  if (!plant) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md text-center space-y-4">
          <p className="text-5xl mb-2">🌱</p>
          <h1 className="text-2xl font-semibold text-slate-100">Plant not found</h1>
          <p className="text-slate-400 text-sm">
            This QR code points to <span className="font-mono text-emerald-400">/plant/{plantName}</span>, but we
            couldn&apos;t find it in our eco database.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            Back to GrowPack
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.round((plant.growth ?? 0.75) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center"
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/40 via-teal-400/30 to-green-500/40 flex items-center justify-center shadow-glass">
            {plant.image ? (
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-6xl" aria-hidden>
                🌱
              </span>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-300/70">
              GrowPack Plant Profile
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">{plant.name}</h1>
            <p className="italic text-emerald-300 text-sm sm:text-base">{plant.latin}</p>
            <p className="text-slate-400 text-sm sm:text-base">
              Every GrowPack you plant is part of a living network of urban gardens.
            </p>
          </div>
        </motion.section>

        {/* Info + Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-3"
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-2">Plant information</h2>
            <p className="text-sm text-slate-400">
              Scan this QR on any GrowPack to see live details about your plant.
            </p>
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-200">
              <div>
                <dt className="text-slate-500">Plant Name</dt>
                <dd className="font-medium">{plant.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Latin Name</dt>
                <dd className="font-medium italic">{plant.latin}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Family</dt>
                <dd className="font-medium">{plant.family}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Type</dt>
                <dd className="font-medium">{plant.type}</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-3">Growth progress</h2>
            <p className="text-sm text-slate-400 mb-2">
              This bar shows a typical growth journey for this plant in ideal conditions.
            </p>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Seed</span>
              <span>Mature</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-xs text-emerald-300">{progress}% estimated growth timeline</p>
          </motion.div>
        </div>

        {/* Growth stages */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">Growth stages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.key}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="rounded-2xl bg-slate-900/40 border border-white/10 px-3 py-4 flex flex-col items-center text-center"
              >
                <span className="text-2xl mb-2">{stage.icon}</span>
                <p className="text-sm font-medium text-slate-100">{stage.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Care instructions + Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6 space-y-3"
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-2">Care instructions</h2>
            <div className="space-y-3 text-sm text-slate-200">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Watering</p>
                <p>{plant.watering}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Sunlight</p>
                <p>{plant.sunlight}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Soil</p>
                <p>{plant.soil}</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 space-y-3"
          >
            <h2 className="text-lg font-semibold text-emerald-400 mb-2">Benefits</h2>
            <p className="text-sm text-slate-400">
              Plants like {plant.name.toLowerCase()} are not only good for you, they&apos;re good for the
              planet too.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {plant.benefits?.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs"
                >
                  <span className="mr-1" aria-hidden>
                    🍃
                  </span>
                  {benefit}
                </span>
              ))}
            </div>
          </motion.section>
        </div>

        <p className="text-center text-xs text-slate-500 pt-4">
          Scanned via GrowPack QR • Designed for smartphones • Keep this tab open to track your plant.
        </p>
      </div>
    </motion.div>
  );
}

