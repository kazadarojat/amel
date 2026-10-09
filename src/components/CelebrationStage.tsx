import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Wind, Flame, Gift, FileText, 
  RotateCcw, Send, Music, VolumeX, CheckCircle, 
  Smile, ShieldCheck, Stethoscope, PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCorrectSound, playBlowSound, playFanfare, startBirthdayMusic, stopBirthdayMusic, toggleBirthdayMusic } from '../utils/audio';
import { GoldenCorner, GoldenDivider, SparkleStar, fireGrandBirthdayConfetti } from './Ornaments';
import { PhotoMemorialSection } from './PhotoMemorialSection';

interface Wish {
  id: string;
  sender: string;
  relation: string;
  text: string;
  time: string;
  likes: number;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    sender: 'Fahmi',
    relation: 'Keluarga',
    text: 'Selamat ulang tahun ke-27 Kak Amelia. Semoga selalu diberikan kesehatan, kelancaran dalam karir dokter gigi, dan sukses untuk semua rencana ke depannya.',
    time: 'Hari ini',
    likes: 27
  },
  {
    id: '2',
    sender: 'Mama & Papa',
    relation: 'Orang Tua',
    text: 'Selamat ulang tahun ke-27 untuk drg. Amelia Sekar Kinasih. Semoga senantiasa sehat, berkah usianya, dan dimudahkan segala urusan serta cita-citanya.',
    time: 'Hari ini',
    likes: 27
  },
  {
    id: '3',
    sender: 'Keluarga Besar',
    relation: 'Keluarga',
    text: 'Selamat bertambah usia yang ke-27 drg. Amelia. Semoga sukses selalu dalam melayani pasien dan meraih impian.',
    time: 'Hari ini',
    likes: 19
  }
];

interface CelebrationStageProps {
  onRestartQuiz: () => void;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({ onRestartQuiz }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [activeDentalTool, setActiveDentalTool] = useState<string | null>('mirror');

  // Wishes state
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [newSender, setNewSender] = useState('');
  const [newWishText, setNewWishText] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  useEffect(() => {
    // Grand celebratory confetti burst on entering celebration stage
    fireGrandBirthdayConfetti();

    // Pastikan lagu ulang tahun otomatis berputar
    startBirthdayMusic();
    setIsMusicPlaying(true);

    const extraConfettiTimer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#D4AF37', '#FFE79A', '#E0115F'],
        origin: { y: 0.6 }
      });
    }, 1200);

    return () => {
      clearTimeout(extraConfettiTimer);
      stopBirthdayMusic();
    };
  }, []);

  const handleRestartQuiz = () => {
    stopBirthdayMusic();
    setIsMusicPlaying(false);
    onRestartQuiz();
  };

  const handleBlowCandles = () => {
    playBlowSound();
    setCandlesLit(false);

    setTimeout(() => {
      playFanfare();
      fireGrandBirthdayConfetti();
    }, 350);
  };

  const handleManualConfetti = () => {
    playCorrectSound();
    fireGrandBirthdayConfetti();
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
  };

  const handleToggleMusic = () => {
    const newState = toggleBirthdayMusic((playing) => setIsMusicPlaying(playing));
    setIsMusicPlaying(newState);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishText.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      sender: newSender.trim() || 'Keluarga & Sahabat',
      relation: 'Teman & Kerabat',
      text: newWishText.trim(),
      time: 'Baru saja',
      likes: 1
    };

    setWishes([newWish, ...wishes]);
    setNewSender('');
    setNewWishText('');
    setWishSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 70,
      colors: ['#D4AF37', '#E0115F', '#FFE79A'],
      origin: { y: 0.8 }
    });

    setTimeout(() => setWishSubmitted(false), 3000);
  };

  const handleLikeWish = (id: string) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 font-poppins relative z-10 text-slate-100">
      
      {/* Floating Celebration Controls */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2">
        <button
          onClick={handleManualConfetti}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] border border-amber-400 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-xs md:text-sm cursor-pointer hover:scale-105 active:scale-95 transition-all"
          title="Tembakkan Konfeti Emas & Merah Delima"
        >
          <PartyPopper className="w-4 h-4 text-slate-950 animate-bounce" />
          <span>Tembak Konfeti 🎉</span>
        </button>

        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)] border transition-all text-xs md:text-sm font-semibold cursor-pointer ${
            isMusicPlaying 
              ? 'bg-gradient-to-r from-[#9B111E] to-[#E0115F] text-amber-200 border-amber-400 ring-2 ring-amber-400/40' 
              : 'bg-[#151722]/90 backdrop-blur-md text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
          title="Putar / Hentikan Musik Ulang Tahun"
        >
          {isMusicPlaying ? (
            <>
              <Music className="w-4 h-4 animate-bounce text-amber-300" />
              <span>Musik Mengalun 🎶</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-amber-400/70" />
              <span>Putar Musik Ulang Tahun</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Celebration Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C050D] via-[#12141F] to-[#1A150A] border border-amber-500/40 p-6 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
        
        {/* Shimmer Light Ray Sweep Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-300/10 to-transparent light-ray-sweep" />
        </div>

        {/* Golden Corners */}
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        {/* Decorative Ambient Radial Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E0115F]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0712] border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_12px_rgba(224,17,95,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Selamat Ulang Tahun Ke-27</span>
            </div>

            <div className="relative">
              <SparkleStar className="absolute -top-4 -left-6 hidden sm:block" size={24} color="#FFE79A" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Selamat Ulang Tahun, <br />
                <span className="gold-text-gradient drop-shadow-md">
                  Amelia Sekar Kinasih, drg.
                </span>
              </h1>
              <p className="text-slate-300 mt-4 text-sm md:text-base leading-relaxed">
                Semoga di usia ke-27 ini, Kak Amelia senantiasa diberi kesehatan, kebahagiaan, dan keberkahan dalam setiap langkah.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={handleBlowCandles}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] transition-transform"
              >
                <Wind className="w-4 h-4" />
                Tiup Lilin 🎂
              </button>
              <button
                onClick={handleRelightCandles}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/30 bg-[#161825] text-amber-300 font-semibold text-sm hover:bg-[#1E2235] transition-colors"
              >
                <Flame className="w-4 h-4" />
                Nyalakan Lilin
              </button>
              <button
                onClick={() => setIsLetterOpen(prev => !prev)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-rose-500/30 bg-[#2A0A15] text-rose-200 font-semibold text-sm hover:bg-[#3A0D1E] transition-colors"
              >
                <Gift className="w-4 h-4" />
                {isLetterOpen ? 'Tutup Surat' : 'Buka Surat Spesial'}
              </button>
            </div>
          </div>

          {/* Right / Illustration and birthday cake */}
          <div className="lg:col-span-5 relative min-h-[320px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 rounded-3xl blur-2xl" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative text-8xl md:text-9xl animate-float">
                🎂
                <div className="absolute -top-5 -right-5 text-3xl animate-bounce">✨</div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-amber-300 text-xs tracking-[0.3em] uppercase font-bold">Make A Wish</div>
                <p className="text-slate-300 text-sm mt-2">27 tahun penuh senyuman dan pencapaian</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Dental Tools */}
      <section className="relative bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-8 backdrop-blur-md">
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-widest">Kenangan & Harapan</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Untuk Dokter Gigi Favorit Keluarga</h2>
          <p className="text-xs md:text-sm text-slate-300">Setiap alat punya cerita dan doa baik untuk perjalanan Kak Amelia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => setActiveDentalTool('mirror')} className={`p-4 rounded-2xl border text-center transition-all ${activeDentalTool === 'mirror' ? 'bg-amber-500/10 border-amber-400 text-amber-200' : 'bg-[#161825] border-slate-800 text-slate-300'}`}>
            <span className="text-3xl">🪞</span>
            <span className="block text-sm font-semibold mt-2">Kaca Mulut</span>
          </button>
          <button onClick={() => setActiveDentalTool('lightcure')} className={`p-4 rounded-2xl border text-center transition-all ${activeDentalTool === 'lightcure' ? 'bg-rose-500/10 border-rose-400 text-rose-200' : 'bg-[#161825] border-slate-800 text-slate-300'}`}>
            <span className="text-3xl">💡</span>
            <span className="block text-sm font-semibold mt-2">Light Cure</span>
          </button>
          <button onClick={() => setActiveDentalTool('scaler')} className={`p-4 rounded-2xl border text-center transition-all ${activeDentalTool === 'scaler' ? 'bg-amber-500/10 border-amber-400 text-amber-200' : 'bg-[#161825] border-slate-800 text-slate-300'}`}>
            <span className="text-3xl">🦷</span>
            <span className="block text-sm font-semibold mt-2">Ultrasonic Scaler</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDentalTool}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl bg-[#181B28] border border-amber-500/30 shadow-md text-left"
          >
            {activeDentalTool === 'mirror' && (
              <div>
                <h4 className="font-bold text-amber-300 flex items-center gap-2">
                  <Smile className="w-4 h-4 text-amber-400" /> Kaca Mulut:
                </h4>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
                  "drg. Amelia di usia 27 tahun: dokter gigi yang berdedikasi, teliti, dan selalu memberikan pelayanan terbaik bagi pasien."
                </p>
              </div>
            )}
            {activeDentalTool === 'lightcure' && (
              <div>
                <h4 className="font-bold text-rose-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E0115F]" /> Penyinaran Light Cure:
                </h4>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
                  "Semoga seluruh rencana karir dan pendidikan lanjutan dapat terwujud dengan baik dan kokoh."
                </p>
              </div>
            )}
            {activeDentalTool === 'scaler' && (
              <div>
                <h4 className="font-bold text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Ultrasonic Scaler:
                </h4>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
                  "Semoga setiap ikhtiar dalam menangani pasien senantiasa membuahkan hasil yang bermanfaat dan berkah."
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Wall of Wishes */}
      <section className="relative bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-8 backdrop-blur-md">
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
            Doa & Ucapan
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ucapan Ulang Tahun Untuk Amelia
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Tinggalkan pesan atau doa untuk menyambut usia ke-27:
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddWish} className="max-w-xl mx-auto bg-[#171A27] p-4 md:p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-inner">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nama pengirim (misal: Teman Sejawat, dll)"
              value={newSender}
              onChange={(e) => setNewSender(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-[#11131C] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
          <textarea
            placeholder="Tuliskan doa atau ucapan untuk drg. Amelia Sekar Kinasih..."
            rows={3}
            value={newWishText}
            onChange={(e) => setNewWishText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#11131C] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            required
          />
          <div className="flex items-center justify-between pt-1">
            {wishSubmitted ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Pesan berhasil dikirimkan!
              </span>
            ) : <span />}
            
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirimkan Ucapan</span>
            </button>
          </div>
        </form>

        {/* Wishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#161825] border border-amber-500/20 shadow-md flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-amber-300">{item.sender}</span>
                  <span>{item.time}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-light">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-rose-400 font-medium">{item.relation}</span>
                <button
                  onClick={() => handleLikeWish(item.id)}
                  className="flex items-center gap-1 text-[#E0115F] hover:text-rose-400 cursor-pointer font-medium"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#E0115F] text-[#E0115F]" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Memorial Photo Section at the End */}
      <PhotoMemorialSection />

      {/* Replay Quiz / Reset Navigation */}
      <div className="text-center pt-4">
        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/30 bg-[#161825] hover:bg-[#1E2235] text-amber-300 text-xs md:text-sm font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Ulangi Kuis Dental</span>
        </button>
        <p className="text-xs text-slate-400 mt-2">
          Selamat ulang tahun ke-27 untuk drg. Amelia Sekar Kinasih · Sehat dan sukses selalu.
        </p>
      </div>

      {/* Final Portrait — the very last section of the celebration page */}
      <section className="relative mt-8 overflow-hidden rounded-3xl border border-sky-300/30 bg-gradient-to-br from-[#111b27] via-[#121622] to-[#0b0d14] p-5 md:p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="mx-auto mb-5 max-w-2xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            A Little Smile for You
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Untuk Kak Amelia, Sang Dokter Gigi 🌷
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Semoga setiap hari selalu dipenuhi senyum, kebahagiaan, dan hal-hal indah.
          </p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}amelia-dentist.webp`}
          alt="Potret dokter gigi berhijab dengan jas putih dan ilustrasi bertema kedokteran gigi"
          width={240}
          height={397}
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto w-full max-w-[360px] rounded-2xl border border-sky-200/30 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        />
      </section>

    </div>
  );
};
