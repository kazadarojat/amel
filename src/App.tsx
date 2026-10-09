import { useState } from 'react';
import { DentalQuiz } from './components/DentalQuiz';
import { CelebrationStage } from './components/CelebrationStage';
import { Heart, Stethoscope, Cake } from 'lucide-react';
import { AmbientParticles } from './components/Ornaments';
import { stopBirthdayMusic, startBirthdayMusic } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<'quiz' | 'celebration'>('quiz');

  const goToQuiz = () => {
    stopBirthdayMusic();
    setStage('quiz');
  };

  const goToCelebration = () => {
    startBirthdayMusic();
    setStage('celebration');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-poppins selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      
      {/* Ambient Floating Dust Particles (Gold & Ruby) */}
      <AmbientParticles />

      {/* Top Bar Contract: 3 zones in Dark Luxury Aesthetic */}
      <header className="sticky top-0 z-40 bg-[#0e1018]/90 backdrop-blur-md border-b border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button 
            onClick={goToQuiz} 
            className="text-base md:text-lg font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3B0712] border border-amber-400/40 flex items-center justify-center shadow-[0_0_10px_rgba(224,17,95,0.3)]">
              <Stethoscope className="w-4 h-4 text-amber-300" />
            </div>
            <span className="gold-text-gradient group-hover:brightness-110 transition-all font-semibold">
              drg. Amelia Sekar Kinasih
            </span>
          </button>

          {/* Zone 2: Navigation Links (Clean text links) */}
          <nav className="hidden sm:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-300">
            <button
              onClick={goToQuiz}
              className={`transition-colors cursor-pointer ${
                stage === 'quiz' 
                  ? 'text-amber-300 font-semibold underline underline-offset-4 decoration-2 decoration-amber-400' 
                  : 'hover:text-amber-200'
              }`}
            >
              Ujian Dental
            </button>
            <button
              onClick={goToCelebration}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                stage === 'celebration' 
                  ? 'text-[#E0115F] font-semibold underline underline-offset-4 decoration-2 decoration-[#E0115F]' 
                  : 'hover:text-rose-300'
              }`}
            >
              <span>Perayaan Ulang Tahun Ke-27</span>
              <Heart className="w-3.5 h-3.5 text-[#E0115F] fill-[#E0115F]" />
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2">
            {stage === 'quiz' ? (
              <button
                onClick={goToCelebration}
                className="px-3.5 py-1.5 text-xs font-semibold text-rose-200 bg-[#3B0712] hover:bg-[#520919] rounded-lg border border-[#E0115F]/40 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(224,17,95,0.25)]"
              >
                <Cake className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xs:inline">Lihat</span> Ulang Tahun Ke-27
              </button>
            ) : (
              <button
                onClick={goToQuiz}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)] font-bold"
              >
                <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
                <span>Ulang Kuis Dental</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-6 relative z-10">
        {stage === 'quiz' ? (
          <DentalQuiz onQuizComplete={goToCelebration} />
        ) : (
          <CelebrationStage onRestartQuiz={goToQuiz} />
        )}
      </main>

      {/* Quiet Footer in Dark Theme */}
      <footer className="border-t border-amber-500/20 bg-[#0c0d14] py-6 text-center text-xs text-slate-400 relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-amber-300/80">Selamat Ulang Tahun Ke-27 drg. Amelia Sekar Kinasih</span>
          <span className="text-slate-400">
            Dari Fahmi & Keluarga · 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
