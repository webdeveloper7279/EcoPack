import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../data/mockData';
import { defaultUser } from '../data/mockData';
import PlantGallery from '../components/PlantGallery';
import CertificateDownload from '../components/CertificateDownload';
import PartnersSection from '../components/PartnersSection';
import MyPlants from '../components/MyPlants';

const levels = ['Eco Beginner', 'Eco Hero', 'Eco Leader'];

export default function Profile() {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER, defaultUser);
  const [plantImages, setPlantImages] = useLocalStorage(STORAGE_KEYS.PLANT_IMAGES, []);

  const plants = user?.plants ?? [];
  const name = user?.name ?? 'User';
  const level = user?.level ?? levels[0];
  const growpacks = user?.growpacks ?? 0;
  const points = user?.points ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <h1 className="text-3xl font-bold text-slate-100">Profile / Eco Club</h1>

        {/* User card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
            <div>
              <label className="text-slate-500 text-sm">Name</label>
              <p className="font-medium">Madinabonu</p>
            </div>
            <div>
              <label className="text-slate-500 text-sm">Eco Level</label>
              <p className="font-medium text-emerald-400">{level}</p>
            </div>
            <div>
              <label className="text-slate-500 text-sm">Total GrowPacks</label>
              <p className="font-medium">{growpacks}</p>
            </div>
            <div>
              <label className="text-slate-500 text-sm">Eco Points</label>
              <p className="font-medium">{points}</p>
            </div>
          </div>
        </motion.div>

        <MyPlants plants={plants} />
        <PlantGallery images={plantImages} onUpload={setPlantImages} />
        <CertificateDownload userName={name} growpackCount={growpacks} />
        <PartnersSection />
      </div>
    </motion.div>
  );
}
