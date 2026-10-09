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
            </div>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
              Selamat bertambah usia yang ke-27 tahun. Semoga senantiasa diberikan kesehatan, keberkahan, kemudahan dalam berpraktik sebagai dokter gigi, serta kelancaran untuk seluruh rencana dan cita-cita ke depan.
            </p>

            {/* Quick Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-[#181B28]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-amber-300 shadow-sm">
                <Stethoscope className="w-3.5 h-3.5 text-amber-400" /> Dokter Gigi
              </span>
              <span className="flex items-center gap-1.5 bg-[#181B28]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[#E0115F]/40 text-rose-300 shadow-sm">
                <Heart className="w-3.5 h-3.5 text-[#E0115F] fill-[#E0115F]" /> Usia 27 Tahun
              </span>
              <span className="flex items-center gap-1.5 bg-[#181B28]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-amber-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Kuis Dental Selesai
              </span>
            </div>
          </div>

          {/* Right Column: Prestigious 27th Birthday & Dental Royal Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => {
                fireGrandBirthdayConfetti();
                playFanfare();
              }}
              className="relative group cursor-pointer w-full max-w-xs md:max-w-sm rounded-3xl p-5 bg-gradient-to-b from-[#2A170A] via-[#1A1823] to-[#12131D] border-2 border-amber-400/60 shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:border-amber-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] transition-all duration-300 text-center"
            >
              {/* Royal Emblem Inner Frame */}
              <div className="relative rounded-2xl p-6 bg-gradient-to-b from-[#0c0d16] to-[#161826] border border-amber-500/30 flex flex-col items-center justify-center space-y-4">
                
                {/* Grand Golden Seal */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-[0_0_25px_rgba(255,215,0,0.4)] flex items-center justify-center animate-pulse">
                    <div className="w-full h-full rounded-full bg-[#11131c] flex flex-col items-center justify-center border-2 border-amber-400/80">
                      <Stethoscope className="w-7 h-7 text-amber-300 mb-0.5" />
                      <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase">
                        drg.
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-[#3B0712] border border-amber-400 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                      27 TAHUN
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-amber-300 font-serif text-lg font-bold tracking-wide">
                    drg. Amelia Sekar Kinasih
                  </div>
                  <p className="text-slate-300 text-xs font-light leading-relaxed">
                    Dedikasi Mulia Kesehatan Gigi & Senyuman Keluarga
                  </p>
                </div>

                <div className="w-full pt-3 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-black/40 border border-amber-500/20">
                    <div className="text-amber-400 font-bold text-sm">27 Tahun</div>
                    <div className="text-slate-400 text-[10px]">Milestone Usia</div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-amber-500/20">
                    <div className="text-rose-400 font-bold text-sm">Dokter Gigi</div>
                    <div className="text-slate-400 text-[10px]">Profesi Mulia</div>
                  </div>
                </div>

                <div className="w-full pt-1 flex items-center justify-center gap-1.5 text-[11px] text-amber-300/90 font-medium">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>Klik untuk taburkan konfeti selebrasi</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Birthday Cake & Blow Candles Section */}
      <section className="relative overflow-hidden bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-center backdrop-blur-md">
        
        {/* Shimmer Light Ray Sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-300/10 to-transparent light-ray-sweep" style={{ animationDelay: '2.5s' }} />
        </div>

        {/* Ambient Halo behind Cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-amber-500/20 via-[#E0115F]/20 to-transparent rounded-full blur-3xl pointer-events-none aura-pulse" />

        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiup Lilin Virtual</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Lilin Usia 27 Tahun
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Silakan berdoa sebelum meniup lilinnya:
            </p>
          </div>

          {/* Virtual Candle Cake Display */}
          <div className="relative py-6 flex flex-col items-center justify-center">
            
            {/* Ambient Sparkle Stars flanking candles */}
            <div className="absolute top-2 left-1/4 hidden sm:block">
              <SparkleStar size={20} color="#FFE79A" />
            </div>
            <div className="absolute top-2 right-1/4 hidden sm:block">
              <SparkleStar size={22} color="#E0115F" style={{ animationDelay: '1.2s' }} />
            </div>

            {/* Candle Numbers 2 & 7 */}
            <div className="flex items-center gap-7 justify-center">
              {/* Digit 2 */}
              <div className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-8 flex items-end justify-center">
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-5 h-8 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_25px_#f59e0b] flame-animation"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.7, 0], y: -24 }}
                        transition={{ duration: 1.2 }}
                        className="w-1.5 h-6 bg-slate-400/60 rounded-full blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>
                {/* Wick */}
                <div className="w-1 h-3 bg-amber-200" />
                {/* Number 2 Body */}
                <div className="w-16 h-22 md:w-18 md:h-26 bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C6212] rounded-xl flex items-center justify-center text-4xl md:text-5xl font-black text-slate-950 shadow-[0_4px_25px_rgba(212,175,55,0.45)] border-2 border-amber-300">
                  2
                </div>
              </div>

              {/* Digit 7 */}
              <div className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-8 flex items-end justify-center">
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-5 h-8 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_25px_#f59e0b] flame-animation"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.7, 0], y: -24 }}
                        transition={{ duration: 1.2 }}
                        className="w-1.5 h-6 bg-slate-400/60 rounded-full blur-[1px]"
                      />
                    )}
                  </AnimatePresence>
                </div>
                {/* Wick */}
                <div className="w-1 h-3 bg-amber-200" />
                {/* Number 7 Body */}
                <div className="w-16 h-22 md:w-18 md:h-26 bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C6212] rounded-xl flex items-center justify-center text-4xl md:text-5xl font-black text-slate-950 shadow-[0_4px_25px_rgba(212,175,55,0.45)] border-2 border-amber-300">
                  7
                </div>
              </div>
            </div>

            {/* Cake Base */}
            <div className="w-68 md:w-84 mt-3 bg-gradient-to-r from-[#3B0712] via-[#630E1F] to-[#3B0712] rounded-2xl h-14 border border-amber-400/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center justify-around px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0115F] shadow-[0_0_8px_#E0115F]"></span>
              <span className="text-xs italic font-bold gold-text-gradient tracking-wide">
                drg. Amelia Sekar Kinasih
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0115F] shadow-[0_0_8px_#E0115F]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
            </div>
            {/* Cake Golden Tray */}
            <div className="w-76 md:w-98 h-3.5 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 rounded-full mt-1 shadow-md border-t border-amber-200" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Wind className="w-5 h-5 text-slate-950" />
                <span>Tiup Lilin</span>
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-amber-300 font-semibold text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Semoga semua doa dan harapan di usia 27 dikabulkan. Aamiin! ✨
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleManualConfetti}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <PartyPopper className="w-4 h-4 text-slate-950" />
                    <span>Tembak Konfeti Lagi 🎉</span>
                  </button>
                  <button
                    onClick={handleRelightCandles}
                    className="px-5 py-2.5 rounded-xl font-medium text-xs md:text-sm text-amber-200 bg-[#1F2333] hover:bg-[#282C40] border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Nyalakan Lilin Lagi</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pesan Ulang Tahun */}
      <section className="relative bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B0712] border border-[#E0115F]/40 text-rose-300 text-xs font-semibold">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Pesan Ulang Tahun</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Pesan Untuk Amelia Sekar Kinasih, drg.
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Klik amplop untuk membuka pesan ucapan:
          </p>

          {/* Envelope Card */}
          <div className="pt-2">
            {!isLetterOpen ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLetterOpen(true)}
                className="w-full max-w-md mx-auto p-8 rounded-2xl bg-gradient-to-b from-[#181B27] to-[#12141F] border-2 border-dashed border-amber-500/40 shadow-lg hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-3.5 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-[#3B0712] border border-amber-400/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(224,17,95,0.4)]">
                  <Heart className="w-8 h-8 text-[#E0115F] fill-[#E0115F]" />
                </div>
                <div className="text-lg font-bold text-white">
                  Buka Pesan Ulang Tahun
                </div>
                <div className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  ✉️ Tekan untuk membaca
                </div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#151824] rounded-2xl border border-amber-500/40 p-6 md:p-8 text-left shadow-2xl relative"
              >
                {/* Close/Fold toggle */}
                <button
                  onClick={() => setIsLetterOpen(false)}
                  className="absolute top-4 right-4 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md border border-slate-700 bg-slate-800/60 cursor-pointer"
                >
                  Tutup Pesan
                </button>

                <div className="border-b border-amber-500/30 pb-4 mb-6">
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Ulang Tahun Ke-27
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                    Untuk: <span className="gold-text-gradient">drg. Amelia Sekar Kinasih</span>
                  </h3>
                </div>

                <div className="space-y-4 text-slate-200 leading-relaxed text-sm md:text-base font-light">
                  <p>
                    <strong className="text-amber-300 font-semibold">Assalamu’alaikum Wr. Wb. Kak Amelia,</strong>
                  </p>
                  <p>
                    Selamat ulang tahun yang ke-27 ya, Kak. Semoga bertambahnya usia membawa keberkahan, kesehatan, dan kelancaran dalam segala urusan.
                  </p>
                  <p>
                    Melihat perjalanan Kakak sejak masa kuliah preklinik, masa koas, hingga sekarang berpraktik sebagai dokter gigi tentu menjadi kebanggaan dan inspirasi bagi kami sekeluarga. Dedikasi dan ketelitian Kakak dalam merawat pasien patut diapresiasi.
                  </p>
                  <p className="text-amber-300 font-medium">
                    Doa di usia ke-27 ini:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-2 text-slate-200">
                    <li>Senantiasa diberikan kesehatan lahir dan batin.</li>
                    <li>Dilancarkan jalan dalam karir kedokteran gigi serta rencana pendidikan spesialis ke depan.</li>
                    <li>Rezeki yang berkah dan selalu dimudahkan dalam setiap langkah.</li>
                  </ul>
                  <p>
                    Jangan lupa tetap istirahat yang cukup dan menjaga kesehatan di sela jadwal praktek klinik.
                  </p>
                  <p className="pt-2 text-amber-200 font-medium">
                    Selamat ulang tahun ke-27!
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Salam hormat dan doa,</div>
                    <div className="font-handwriting text-2xl md:text-3xl font-bold text-amber-300 mt-0.5">
                      Fahmi & Keluarga
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#3B0712] flex items-center justify-center border border-amber-400/40 shadow-[0_0_12px_rgba(224,17,95,0.4)]">
                    <Heart className="w-6 h-6 text-[#E0115F] fill-[#E0115F]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Resep Dokter Gigi */}
      <section className="relative bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resep Khusus Usia 27</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Resep Kebahagiaan & Kesehatan
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Resep simbolis untuk menyambut usia ke-27:
            </p>
          </div>

          {/* Rx Pad Style Card */}
          <div className="bg-[#161926] rounded-2xl border-2 border-amber-500/40 p-6 md:p-8 font-mono text-xs md:text-sm text-slate-200 relative overflow-hidden shadow-xl">
            {/* Header Clinic */}
            <div className="text-center border-b-2 border-amber-500/30 pb-4 mb-4">
              <div className="font-bold text-base md:text-lg gold-text-gradient font-sans tracking-wide">
                KLINIK DENTAL KINASIH
              </div>
              <div className="font-semibold text-white font-sans mt-0.5">
                drg. AMELIA SEKAR KINASIH
              </div>
              <div className="text-xs text-amber-400/80">
                SIP: 27/ULANG-TAHUN/2026 · Praktek Kedokteran Gigi
              </div>
            </div>

            {/* Date and Patient Details */}
            <div className="flex justify-between border-b border-dashed border-slate-700 pb-3 mb-4 text-xs">
              <div>
                <strong className="text-amber-300">Pro:</strong> drg. Amelia Sekar Kinasih<br />
                <strong className="text-amber-300">Usia:</strong> 27 Tahun
              </div>
              <div className="text-right">
                <strong className="text-amber-300">Tanggal:</strong> Ulang Tahun Ke-27 (2026)<br />
                <strong className="text-amber-300">Status:</strong> Sehat & Bahagia
              </div>
            </div>

            {/* Rx Items */}
            <div className="space-y-4 py-2">
              <div className="flex gap-3">
                <span className="font-serif-display font-bold text-xl text-amber-400 italic">R/</span>
                <div className="flex-1">
                  <div className="font-bold text-white">Tab. Kesehatan & Kebugaran 500mg No. XXVII (27)</div>
                  <div className="text-slate-300 italic">S. 1 dd 1 pagi (Diminum teratur dengan menjaga pola hidup sehat)</div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-serif-display font-bold text-xl text-amber-400 italic">R/</span>
                <div className="flex-1">
                  <div className="font-bold text-white">Sol. Kelancaran Karir Kedokteran Gigi fls No. I</div>
                  <div className="text-slate-300 italic">S. u. e (Semoga sukses dalam praktek dan pendidikan lanjutan)</div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-serif-display font-bold text-xl text-amber-400 italic">R/</span>
                <div className="flex-1">
                  <div className="font-bold text-white">Dukungan & Doa Keluarga q.s.</div>
                  <div className="text-slate-300 italic">S. q. s (Quantum satis - Menemani setiap langkah dengan tulus)</div>
                </div>
              </div>
            </div>

            {/* Stamp and Signature */}
            <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-end">
              <div className="inline-block border-2 border-amber-400 text-amber-300 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider rotate-[-2deg] bg-amber-500/10 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                ✓ USIA 27 TAHUN
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Tanda Tangan,</div>
                <div className="font-handwriting text-xl font-bold text-amber-300 mt-1">
                  drg. Amelia Sekar Kinasih
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dental Tools Exploration */}
      <section className="relative bg-[#11131c]/90 rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Dental Kit Usia 27
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Instrumen Dental Pilihan
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Klik instrumen dental berikut untuk membaca catatan:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tool 1 */}
            <button
              onClick={() => setActiveDentalTool('mirror')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeDentalTool === 'mirror'
                  ? 'bg-gradient-to-br from-[#1C050D] to-[#3B0712] border-amber-400 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]'
                  : 'bg-[#161825] border-slate-800 text-slate-300 hover:border-amber-500/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Smile className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm md:text-base text-white mb-1">Kaca Mulut (Mouth Mirror)</div>
              <div className="text-xs text-amber-300/80">
                Refleksi & Ketelitian
              </div>
            </button>

            {/* Tool 2 */}
            <button
              onClick={() => setActiveDentalTool('lightcure')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeDentalTool === 'lightcure'
                  ? 'bg-gradient-to-br from-[#1C050D] to-[#3B0712] border-amber-400 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]'
                  : 'bg-[#161825] border-slate-800 text-slate-300 hover:border-amber-500/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E0115F]/20 border border-[#E0115F]/40 flex items-center justify-center text-rose-400 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm md:text-base text-white mb-1">Light Cure LED Biru</div>
              <div className="text-xs text-rose-300/80">
                Fokus & Presisi
              </div>
            </button>

            {/* Tool 3 */}
            <button
              onClick={() => setActiveDentalTool('scaler')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeDentalTool === 'scaler'
                  ? 'bg-gradient-to-br from-[#1C050D] to-[#3B0712] border-amber-400 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]'
                  : 'bg-[#161825] border-slate-800 text-slate-300 hover:border-amber-500/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm md:text-base text-white mb-1">Ultrasonic Scaler</div>
              <div className="text-xs text-amber-300/80">
                Pembersihan & Higienitas
              </div>
            </button>
          </div>

          {/* Tool Message Output */}
          <AnimatePresence mode="wait">
            {activeDentalTool && (
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
            )}
          </AnimatePresence>
        </div>
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
      {/* Final Portrait — placed after every other celebration section */}
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

    </div>
  );
};
