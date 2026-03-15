import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlantGallery({ images = [], onUpload }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target?.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const item = { id: Date.now(), url: dataUrl, date: new Date().toISOString().slice(0, 10) };
      onUpload?.([...images, item]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
        <span aria-hidden>🌿</span> Plant Gallery & Growth Timeline
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all"
            onClick={() => setPreview(img)}
          >
            <img src={img.url} alt="Plant" className="w-full h-full object-cover" />
            {img.date && (
              <p className="text-xs text-slate-400 bg-slate-900/80 px-2 py-1">{img.date}</p>
            )}
          </motion.div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-2xl border-2 border-dashed border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 flex flex-col items-center justify-center gap-1 transition-colors"
        >
          <span className="text-2xl">➕</span>
          <span className="text-sm">Upload</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-lg w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview.url} alt="Preview" className="w-full h-auto" />
              {preview.date && (
                <p className="p-3 text-slate-400 text-sm">Date: {preview.date}</p>
              )}
              <button
                type="button"
                className="w-full py-2 text-emerald-400 hover:bg-white/5"
                onClick={() => setPreview(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
