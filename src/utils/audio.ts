/**
 * Web Audio API synthesizer for Birthday & Quiz Sound Effects
 * Completely self-contained, no external network dependencies
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play pleasant chime when answer is correct
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch {
    // Ignore audio errors if blocked by browser
  }
}

/**
 * Play soft boop when answer is wrong
 */
export function playIncorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [329.63, 293.66]; // E4, D4
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      
      gain.gain.setValueAtTime(0.15, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.22);
    });
  } catch {
    // Ignore audio errors
  }
}

/**
 * Fanfare for completing the quiz / birthday reveal
 */
export function playFanfare() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const chords = [
      { notes: [261.63, 329.63, 392.0], time: 0.0, dur: 0.18 }, // C
      { notes: [261.63, 329.63, 392.0], time: 0.2, dur: 0.18 }, // C
      { notes: [261.63, 329.63, 392.0], time: 0.4, dur: 0.18 }, // C
      { notes: [349.23, 440.0, 523.25], time: 0.62, dur: 0.6 }, // F
      { notes: [392.0, 493.88, 587.33], time: 1.25, dur: 0.3 }, // G
      { notes: [523.25, 659.25, 783.99, 1046.5], time: 1.6, dur: 1.2 } // High C major
    ];

    chords.forEach(({ notes, time, dur }) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);
        
        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.12, now + time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    });
  } catch {
    // Ignore audio errors
  }
}

/**
 * Blow candles sound effect
 */
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.7);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.8);
  } catch {
    // Ignore audio errors
  }
}

/**
 * Birthday Melody Synthesizer (Music box / glockenspiel style)
 */
let melodyInterval: number | null = null;
let isMelodyPlaying = false;

// Happy Birthday Notes: [freq, durationInBeats]
const BIRTHDAY_NOTES: Array<[number, number]> = [
  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [293.66, 1.0],  // D4
  [261.63, 1.0],  // C4
  [349.23, 1.0],  // F4
  [329.63, 2.0],  // E4

  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [293.66, 1.0],  // D4
  [261.63, 1.0],  // C4
  [392.00, 1.0],  // G4
  [349.23, 2.0],  // F4

  [261.63, 0.75], // C4
  [261.63, 0.25], // C4
  [523.25, 1.0],  // C5
  [440.00, 1.0],  // A4
  [349.23, 1.0],  // F4
  [329.63, 1.0],  // E4
  [293.66, 2.0],  // D4

  [466.16, 0.75], // Bb4
  [466.16, 0.25], // Bb4
  [440.00, 1.0],  // A4
  [349.23, 1.0],  // F4
  [392.00, 1.0],  // G4
  [349.23, 2.5],  // F4
];

export function toggleBirthdayMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isMelodyPlaying) {
    stopBirthdayMusic();
    onStateChange?.(false);
    return false;
  } else {
    startBirthdayMusic();
    onStateChange?.(true);
    return true;
  }
}

export function startBirthdayMusic() {
  if (isMelodyPlaying) return;
  const ctx = getAudioContext();
  isMelodyPlaying = true;

  let currentNoteIdx = 0;
  const beatDuration = 0.5; // seconds per beat

  function scheduleNext() {
    if (!isMelodyPlaying) return;
    const [freq, beats] = BIRTHDAY_NOTES[currentNoteIdx];
    const durSec = beats * beatDuration;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durSec * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durSec);
    } catch {
      // Ignore
    }

    currentNoteIdx = (currentNoteIdx + 1) % BIRTHDAY_NOTES.length;
    melodyInterval = window.setTimeout(scheduleNext, durSec * 1000);
  }

  scheduleNext();
}

export function stopBirthdayMusic() {
  isMelodyPlaying = false;
  if (melodyInterval) {
    clearTimeout(melodyInterval);
    melodyInterval = null;
  }
}
