import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Upload, Maximize2, Trash2, X, Sparkles, 
  CheckCircle, Image as ImageIcon, ZoomIn, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { GoldenCorner, fireGrandBirthdayConfetti } from './Ornaments';

interface PhotoSlot {
  id: string;
  title: string;
  subtitle: string;
  defaultDescription: string;
}

const DEFAULT_SLOTS: PhotoSlot[] = [
  {
    id: 'drg-amelia-main',
    title: 'drg. Amelia Sekar Kinasih',
    subtitle: 'Potret Dokter Gigi',
    defaultDescription: 'Foto asli dalam jas sneli dokter gigi di ruang praktik & klinik'
  },
  {
    id: 'amelia-childhood',
    title: 'Kenangan Masa Kecil',
    subtitle: 'Bersama Saudara di Teras Rumah',
    defaultDescription: 'Momen nostalgia masa kecil bersama saudara di teras'
  },
  {
    id: 'amelia-special-moments',
    title: 'Dokumentasi Spesial',
    subtitle: 'Momen Indah Bertambah Usia',
    defaultDescription: 'Foto kenangan berharga perjalanan usia 27 tahun'
  }
];

const STORAGE_KEY = 'drg_amelia_celebration_photos_v2';

export const PhotoMemorialSection: React.FC = () => {
  const [photos, setPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeSlotForModal, setActiveSlotForModal] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const [activeImageTitle, setActiveImageTitle] = useState<string>('');
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      console.warn('Unable to persist photo to localStorage', e);
    }
  }, [photos]);

  const handleFileChange = (slotId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotos(prev => ({
          ...prev,
          [slotId]: result
        }));
        fireGrandBirthdayConfetti();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (slotId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverSlot(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(slotId, e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
  };

  const openLightbox = (src: string, title: string) => {
    setActiveImageSrc(src);
    setActiveImageTitle(title);
    setIsLightboxOpen(true);
  };

  // Keyboard shortcut to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalUploaded = Object.keys(photos).length;

  return (
    <section className="relative bg-[#11131c]/95 rounded-3xl border border-amber-500/35 p-6 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-8 backdrop-blur-md">
      <GoldenCorner position="top-left" />
      <GoldenCorner position="top-right" />
      <GoldenCorner position="bottom-left" />
      <GoldenCorner position="bottom-right" />

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>Dokumentasi Foto di Akhir Halaman</span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
          Galeri Foto Spesial drg. Amelia Sekar Kinasih
        </h2>

        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Foto asli tanpa penyuntingan atau modifikasi kecerdasan buatan apa pun. Menampilkan keaslian momen berharga dalam resolusi penuh dan rasio foto asli.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-amber-300/80">
          <span className="flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Foto Asli Tanpa Diedit
          </span>
          <span className="flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-400" /> Kualitas Penuh & Rasio Utuh
          </span>
          <span className="flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <CheckCircle className="w-3 h-3 text-rose-400" /> Tersimpan Otomatis di Halaman
          </span>
        </div>
      </div>

      {/* Photo Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEFAULT_SLOTS.map((slot, index) => {
          const photoData = photos[slot.id];
          const isDragActive = dragOverSlot === slot.id;

          return (
            <div
              key={slot.id}
              className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 bg-[#151726]/80 p-4 ${
                photoData
                  ? 'border-amber-500/40 shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:border-amber-400'
                  : isDragActive
                  ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'border-dashed border-amber-500/30 hover:border-amber-400/60'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverSlot(slot.id);
              }}
              onDragLeave={() => setDragOverSlot(null)}
              onDrop={(e) => handleDrop(slot.id, e)}
            >
              {/* Card Header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400/90 tracking-wider uppercase">
                    Slot {index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    {slot.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {slot.subtitle}
                  </p>
                </div>

                {photoData && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> Asli
                  </span>
                )}
              </div>

              {/* Photo Display or Upload Area */}
              <div className="flex-1 min-h-[300px] flex items-center justify-center rounded-xl overflow-hidden bg-[#0c0d14] relative border border-slate-800 group">
                {photoData ? (
                  <>
                    <img
                      src={photoData}
                      alt={slot.title}
                      className="w-full h-full max-h-[380px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Actions Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(photoData, slot.title)}
                          className="flex-1 py-2 px-3 rounded-lg bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Perbesar (HD)</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleRemovePhoto(slot.id, e)}
                          title="Hapus Foto"
                          className="p-2 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div 
                    onClick={() => fileInputRefs.current[slot.id]?.click()}
                    className="flex flex-col items-center justify-center p-6 text-center cursor-pointer h-full w-full hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      <Upload className="w-6 h-6 text-amber-400" />
                    </div>

                    <span className="text-xs font-bold text-amber-200 mb-1">
                      Pasang Foto Asli
                    </span>
                    <span className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                      Klik atau seret & lepas file foto asli di sini
                    </span>

                    <span className="mt-3 text-[10px] text-amber-400/80 px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/20">
                      Format JPG / PNG / WEBP
                    </span>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={(el) => { fileInputRefs.current[slot.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(slot.id, e.target.files[0]);
                    }
                  }}
                />
              </div>

              {/* Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 italic truncate max-w-[200px]">
                  {slot.defaultDescription}
                </span>

                {photoData ? (
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[slot.id]?.click()}
                    className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Ganti
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[slot.id]?.click()}
                    className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                  >
                    + Tambah
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Hint */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-center max-w-xl mx-auto space-y-1">
        <p className="text-xs text-amber-200/90 font-medium">
          💡 Catatan Keaslian Foto
        </p>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Foto yang Anda pilih akan langsung ditampilkan secara murni (rasio asli, resolusi tajam, tanpa pemotongan dan tanpa editan apa pun). Foto akan tetap tersimpan saat membuka halaman kembali.
        </p>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && activeImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Header bar */}
            <div 
              className="w-full max-w-4xl flex items-center justify-between py-3 px-4 mb-2 bg-[#171A27]/90 rounded-2xl border border-amber-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-amber-200">{activeImageTitle}</span>
                <span className="text-xs text-slate-400">(Tampilan Penuh 100% Asli)</span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-200 hover:text-white cursor-pointer transition-colors"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with Original Uncropped Dimensions */}
            <div 
              className="relative max-w-5xl max-h-[80vh] flex items-center justify-center overflow-auto p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImageSrc}
                alt={activeImageTitle}
                className="max-h-[80vh] max-w-full object-contain rounded-xl border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Klik di luar gambar atau tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300">Esc</kbd> untuk menutup.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
