import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EcoMapPage from './pages/EcoMapPage';
import Profile from './pages/Profile';
import PlantInfo from './pages/PlantInfo';
import Plants from './pages/Plants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './data/mockData';

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.THEME, true);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 eco-gradient-bg">
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/eco-map" element={<EcoMapPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/plant/:plantName" element={<PlantInfo />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
