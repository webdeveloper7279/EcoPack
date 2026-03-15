import { useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function CertificateDownload({ userName = 'User', growpackCount = 0 }) {
  const certRef = useRef(null);

  const download = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, w, h, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('GrowPack Eco Platform', w / 2, 35, { align: 'center' });
    doc.setFontSize(16);
    doc.setTextColor(52, 211, 153);
    doc.text('Certificate of Environmental Contribution', w / 2, 50, { align: 'center' });
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(14);
    const text = `This certifies that ${userName} planted ${growpackCount} GrowPack eco package(s) and contributed to environmental sustainability.`;
    doc.text(text, w / 2, 80, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Thank you for being part of the green movement.', w / 2, 100, { align: 'center' });
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, w / 2, h - 20, { align: 'center' });
    doc.save(`GrowPack-Certificate-${userName.replace(/\s/g, '-')}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
      ref={certRef}
    >
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
        <span aria-hidden>📜</span> Download Certificate
      </h3>
      <p className="text-slate-300 text-sm mb-4">
        Get a PDF certificate for your contribution. This user planted {growpackCount} GrowPack eco
        packages and contributed to environmental sustainability.
      </p>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={download}
        className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
      >
        Download PDF
      </motion.button>
    </motion.div>
  );
}
