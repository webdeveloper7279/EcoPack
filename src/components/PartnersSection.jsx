import { motion } from 'framer-motion';
import { partners } from '../data/mockData';

export default function PartnersSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-slate-100">Eco Partners & Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="text-4xl mb-3">{partner.logo}</div>
            <h3 className="text-lg font-semibold text-slate-100">{partner.name}</h3>
            <p className="text-emerald-400 font-medium mt-1">{partner.discount}</p>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-1">
              <span aria-hidden>📍</span> {partner.location}
            </p>
            <p className="text-slate-500 text-xs mt-2">{partner.growpacks} GrowPacks</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
