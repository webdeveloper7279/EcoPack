import { motion } from 'framer-motion';

export default function MyPlants({ plants }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-400 mb-4">O‘simliklaringiz</h2>
      {plants.length === 0 ? (
        <p className="text-sm text-slate-400">Hozircha ekilgan o‘simliklar yo‘q.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-200">
            <thead>
              <tr className="text-slate-400 border-b border-white/10">
                <th className="py-2 pr-4">O‘simlik nomi</th>
                <th className="py-2 pr-4">Ekilgan sana</th>
                <th className="py-2 pr-4">O‘sish bosqichi</th>
                <th className="py-2 pr-4">Sug‘orish eslatmasi</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant.id} className="border-b border-white/5">
                  <td className="py-2 pr-4">{plant.name}</td>
                  <td className="py-2 pr-4">{plant.plantDate}</td>
                  <td className="py-2 pr-4">{plant.growthStage}</td>
                  <td className="py-2 pr-4 text-slate-300">
                    {plant.wateringReminder || "Sugʻorish eslatmasi yoʻq"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

