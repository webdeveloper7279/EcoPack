import { motion } from 'framer-motion';
import {
  leaderboardUsers,
  leaderboardUniversities,
  leaderboardRestaurants
} from '../data/mockData';

const listVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.05 }
  })
};

function Table({ title, items, columns }) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-emerald-400 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              {columns.map((col) => (
                <th key={col.key} className="pb-2 pr-4">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <motion.tr
                key={row.rank ?? i}
                custom={i}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="border-b border-white/5 text-slate-300"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 pr-4">
                    {col.key === 'rank' && (
                      <span className="inline-flex w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-medium items-center justify-center text-xs">
                        {row[col.key]}
                      </span>
                    )}
                    {col.key !== 'rank' && row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-slate-100">Leaderboards</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Table
          title="Top Users"
          items={leaderboardUsers}
          columns={[
            { key: 'rank', label: '#' },
            { key: 'name', label: 'Name' },
            { key: 'points', label: 'Points' },
            { key: 'growpacks', label: 'GrowPacks' }
          ]}
        />
        <Table
          title="Top Universities"
          items={leaderboardUniversities}
          columns={[
            { key: 'rank', label: '#' },
            { key: 'name', label: 'University' },
            { key: 'growpacks', label: 'GrowPacks' }
          ]}
        />
        <Table
          title="Top Restaurants"
          items={leaderboardRestaurants}
          columns={[
            { key: 'rank', label: '#' },
            { key: 'name', label: 'Restaurant' },
            { key: 'growpacks', label: 'GrowPacks' },
            { key: 'discount', label: 'Discount' }
          ]}
        />
      </div>
    </section>
  );
}
