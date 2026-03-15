import { motion } from 'framer-motion';
import { growthStages } from '../data/mockData';

export default function PlantStatus({ plant, onWater }) {
  const currentStage = plant?.growthStage || growthStages[0];
  const stageIndex = Math.max(0, growthStages.indexOf(currentStage));
  const progress = ((stageIndex + 1) / growthStages.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
        <span aria-hidden>🌿</span> Plant Status
      </h3>
      {plant ? (
        <>
          <div className="space-y-2 text-slate-300">
            <p><span className="text-slate-400">Name:</span> {plant.name}</p>
            <p><span className="text-slate-400">Plant date:</span> {plant.plantDate}</p>
            <p><span className="text-slate-400">Stage:</span> {plant.growthStage}</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Growth</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-amber-400/90 flex items-center gap-1">
            <span aria-hidden>💧</span>
            {plant.wateringReminder
              ? `Sugʻorish eslatmasi: ${plant.wateringReminder}`
              : 'Sugʻorish eslatmasi: haftasiga 2–3 marta sugʻoring'}
          </p>
          {onWater && (
            <button
              type="button"
              onClick={onWater}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors text-sm font-medium"
            >
              I watered it
            </button>
          )}
        </>
      ) : (
        <p className="text-slate-400">No plant selected. Plant a GrowPack to see status here.</p>
      )}
    </motion.div>
  );
}
