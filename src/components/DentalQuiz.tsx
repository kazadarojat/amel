import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, Award, Stethoscope, HelpCircle, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DENTAL_QUIZ_QUESTIONS, Question } from '../data/quizQuestions';
import { playCorrectSound, playIncorrectSound, playFanfare, startBirthdayMusic } from '../utils/audio';
import { GoldenCorner, GoldenDivider, SparkleStar, fireGrandBirthdayConfetti } from './Ornaments';

interface DentalQuizProps {
  onQuizComplete: () => void;
}

export const DentalQuiz: React.FC<DentalQuizProps> = ({ onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ: Question = DENTAL_QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = DENTAL_QUIZ_QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);
    setShowExplanation(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
      playCorrectSound();
      confetti({
        particleCount: 35,
        spread: 50,
        colors: ['#D4AF37', '#E0115F', '#FFE79A', '#FFFFFF'],
        origin: { y: 0.7 }
      });
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      playFanfare();
      fireGrandBirthdayConfetti();
      startBirthdayMusic();
      setTimeout(() => {
        onQuizComplete();
      }, 700);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setShowExplanation(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10 font-poppins relative z-10">
      {/* Quiz Card Container with Luxury Dark Frame & Shimmer Light Ray */}
      <div className="relative bg-[#11131c]/90 rounded-2xl border border-amber-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
        
        {/* Shimmer Light Ray Sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-300/10 to-transparent light-ray-sweep" />
        </div>

        {/* Golden Ornamental Corners */}
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        <GoldenCorner position="bottom-left" />
        <GoldenCorner position="bottom-right" />

        {/* Header Ribbon - Ruby & Gold Royal Gradient */}
        <div className="relative bg-gradient-to-r from-[#4A0A14] via-[#780F22] to-[#A0142D] px-6 py-5.5 text-white border-b border-amber-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs tracking-wider uppercase font-semibold">
                <Stethoscope className="w-4 h-4 text-amber-300" />
                <span>Ujian Kompetensi Klinis · Edisi Spesial</span>
                <SparkleStar size={16} color="#FFE79A" className="ml-1 hidden sm:inline-block" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mt-1 text-white flex items-center gap-2">
                <span>Spesial Ulang Tahun Ke-27</span>
                <span className="gold-text-gradient">drg. Amelia Sekar Kinasih</span>
              </h2>
            </div>
            
            {/* Progress Counter */}
            <div className="flex items-center gap-2.5 bg-[#180509]/70 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-amber-500/30 self-start sm:self-auto shadow-inner">
              <span className="text-xs text-amber-300/80">Soal</span>
              <span className="text-sm font-bold tabular-nums text-amber-300">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Golden Shimmer Progress Bar */}
          <div className="w-full bg-black/40 h-1.5 rounded-full mt-4 overflow-hidden border border-amber-500/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Body */}
        <div className="p-6 md:p-8">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="font-semibold text-amber-400">{currentQ.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{currentQ.badge}</span>
            {currentIndex === 4 && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-[#E0115F] font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#E0115F] text-[#E0115F]" /> Kasus Spesial Ulang Tahun
                </span>
              </>
            )}
          </div>

          {/* Clinical Context Note with Ruby Accent border */}
          <div className="bg-[#181B28] border-l-3 border-[#E0115F] px-4 py-2.5 rounded-r-lg text-xs md:text-sm text-slate-300 mb-5 font-mono">
            {currentQ.context}
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug mb-6">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyles = "border-slate-800 bg-[#161824] hover:border-amber-500/50 hover:bg-[#1D2132] text-slate-200";
              
              if (isAnswered) {
                if (option.isCorrect) {
                  optionStyles = "border-amber-400 bg-amber-950/40 text-amber-100 ring-1 ring-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.25)]";
                } else if (isSelected && !option.isCorrect) {
                  optionStyles = "border-[#E0115F] bg-[#3B0712]/50 text-rose-200 ring-1 ring-[#E0115F]/60";
                } else {
                  optionStyles = "border-slate-800/60 bg-[#12141F]/40 text-slate-500 opacity-40";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id, option.isCorrect)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer disabled:cursor-default ${optionStyles}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isAnswered && option.isCorrect
                      ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-extrabold shadow-[0_0_10px_#f59e0b]"
                      : isAnswered && isSelected && !option.isCorrect
                      ? "bg-[#E0115F] text-white"
                      : "bg-[#222638] text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950"
                  }`}>
                    {option.id}
                  </div>
                  
                  <div className="flex-1 text-sm md:text-base leading-relaxed">
                    {option.text}
                  </div>

                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-[#E0115F] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout - Ruby & Gold Accent */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 p-4 md:p-5 rounded-xl bg-[#260B12]/80 border border-[#E0115F]/40 text-slate-200 text-sm space-y-2 shadow-[0_0_20px_rgba(224,17,95,0.15)]"
              >
                <div className="flex items-center gap-2 font-bold text-amber-300 text-xs tracking-wider uppercase">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Clinical Pearls & Pembahasan</span>
                </div>
                <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
                <p className="text-xs font-medium text-amber-200 italic bg-[#17050A] px-3 py-2 rounded-lg border border-amber-500/20">
                  {currentQ.clinicalTip}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <GoldenDivider className="mt-8 mb-4" />

          {/* Footer Navigation */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Skor Sementara:</span>
              <span className="font-bold tabular-nums text-amber-300">{score} dari {currentIndex + (isAnswered ? 1 : 0)}</span>
            </div>

            {isAnswered ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{isLastQuestion ? "Buka Kejutan Ulang Tahun!" : "Soal Berikutnya"}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            ) : (
              <span className="text-xs text-slate-400 italic flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400/60" />
                Pilih jawaban untuk melanjutkan
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Encouragement Footer */}
      <div className="text-center mt-5 text-xs text-slate-400">
        drg. Amelia Sekar Kinasih · Kuis penyegar materi seputar prosedur kedokteran gigi
      </div>
    </div>
  );
};

