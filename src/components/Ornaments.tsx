import React from 'react';
import confetti from 'canvas-confetti';

/**
 * Ornate Golden Filigree Corner for luxury card frames
 */
export const GoldenCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const rotation = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-x-[-1] scale-y-[-1]'
  }[position];

  return (
    <svg
      viewBox="0 0 40 40"
      className={`w-6 h-6 md:w-8 md:h-8 text-amber-400/70 absolute pointer-events-none z-10 ${rotation} ${
        position.includes('top') ? 'top-2' : 'bottom-2'
      } ${position.includes('left') ? 'left-2' : 'right-2'}`}
      fill="currentColor"
    >
      <path d="M2 2 H14 C14 2 6 6 6 14 V26 C6 30 2 30 2 30 V2 Z" opacity="0.3" />
      <path d="M0 0 H20 V2 H4 V18 H2 V4 H0 Z" fill="url(#goldGrad)" />
      <circle cx="8" cy="8" r="2" fill="#E0115F" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE79A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Royal Ornate Divider with Ruby Jewel
 */
export const GoldenDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
        <span className="w-2.5 h-2.5 rotate-45 bg-[#E0115F] shadow-[0_0_10px_#E0115F]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
      </div>
      <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400" />
    </div>
  );
};

/**
 * 4-Point Sparkling Star SVG with Twinkle
 */
export const SparkleStar: React.FC<{
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ className = '', size = 20, color = '#D4AF37', style }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`twinkle-star ${className}`}
      style={{ color, ...style }}
      fill="currentColor"
    >
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
};

/**
 * Ambient Golden & Ruby Floating Dust Particles and Twinkling Lights Field
 */
export const AmbientParticles: React.FC = () => {
  const particles = [
    { top: '8%', left: '6%', size: 5, delay: '0s', dur: '7s', color: '#D4AF37' },
    { top: '15%', left: '92%', size: 7, delay: '1.5s', dur: '9s', color: '#E0115F' },
    { top: '35%', left: '3%', size: 6, delay: '3s', dur: '8s', color: '#F59E0B' },
    { top: '50%', left: '95%', size: 5, delay: '2s', dur: '10s', color: '#D4AF37' },
    { top: '65%', left: '10%', size: 8, delay: '4s', dur: '6s', color: '#E0115F' },
    { top: '80%', left: '88%', size: 6, delay: '0.8s', dur: '7.5s', color: '#F59E0B' },
    { top: '92%', left: '20%', size: 5, delay: '2.5s', dur: '8.5s', color: '#FFE79A' },
  ];

  const stars = [
    { top: '12%', left: '15%', size: 18, color: '#FFE79A', delay: '0s' },
    { top: '22%', left: '82%', size: 24, color: '#E0115F', delay: '1s' },
    { top: '40%', left: '12%', size: 16, color: '#D4AF37', delay: '2.2s' },
    { top: '55%', left: '86%', size: 22, color: '#FBBF24', delay: '0.7s' },
    { top: '70%', left: '8%', size: 20, color: '#E0115F', delay: '1.8s' },
    { top: '88%', left: '80%', size: 18, color: '#D4AF37', delay: '3s' },
    { top: '30%', left: '50%', size: 14, color: '#FFE79A', delay: '2.5s' },
    { top: '78%', left: '45%', size: 16, color: '#F59E0B', delay: '1.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Light Beams / Soft glowing spotlight pools */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-[#E0115F]/8 to-transparent rounded-full blur-[120px] aura-pulse" />
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-gradient-to-tl from-[#E0115F]/12 via-amber-500/8 to-transparent rounded-full blur-[130px] aura-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-amber-400/8 via-[#9B111E]/10 to-transparent rounded-full blur-[100px] aura-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Twinkling 4-point starlight beacons */}
      {stars.map((s, idx) => (
        <div
          key={`star-${idx}`}
          className="absolute"
          style={{ top: s.top, left: s.left }}
        >
          <SparkleStar
            size={s.size}
            color={s.color}
            style={{ animationDelay: s.delay }}
          />
        </div>
      ))}

      {/* Floating glowing dust particles */}
      {particles.map((p, idx) => (
        <div
          key={`particle-${idx}`}
          className="absolute rounded-full float-particle blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 14px ${p.color}, 0 0 28px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Multi-Stage Celebratory Confetti Launcher
 */
export function fireGrandBirthdayConfetti() {
  const colors = ['#D4AF37', '#FFD700', '#FFE79A', '#E0115F', '#9B111E', '#FFFFFF'];

  // Cannon 1: Massive center explosion
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
  });

  // Cannon 2 & 3: Left & Right Crossfire
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 250);

  // Cannon 4: Golden Rain from top
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 90,
      spread: 120,
      origin: { y: 0, x: 0.5 },
      colors: ['#FFE79A', '#D4AF37', '#FFD700', '#FFFFFF'],
      gravity: 0.7,
      scalar: 1.1,
      drift: 0.2,
    });
  }, 500);
}
