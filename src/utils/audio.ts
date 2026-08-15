// Web Audio API Synthesizer for Exhibit Touch Interactions & Enhanced Web Speech API Narrator

class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sci-fi touch click
  playTouchBeep() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context silenced or blocked
    }
  }

  // Slider scrub tick
  playTick(frequency: number = 440) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Audio fallback
    }
  }

  // Warning chime for critical decay state
  playWarningChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.setValueAtTime(240, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Fallback
    }
  }

  // Rocket Ignition and Launch Sound Synthesizer
  playRocketLaunch() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Initial Ignition Click & Charging Tone
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(440, now);
      chime.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
      chimeGain.gain.setValueAtTime(0.2, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start(now);
      chime.stop(now + 0.3);

      // 2. Heavy Rocket Thruster Rumble (Low Frequency Noise Buffer + Filter)
      const bufferSize = this.ctx.sampleRate * 2.0; // 2 seconds of sound
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(200, now + 2.0);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.3, now + 0.4);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 1.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 2.0);

      // 3. Ascending High-Velocity Whoosh & Sonic Warp
      const whooshOsc = this.ctx.createOscillator();
      const whooshGain = this.ctx.createGain();
      whooshOsc.type = 'sawtooth';
      whooshOsc.frequency.setValueAtTime(60, now + 0.1);
      whooshOsc.frequency.exponentialRampToValueAtTime(480, now + 1.5);

      whooshGain.gain.setValueAtTime(0.02, now + 0.1);
      whooshGain.gain.linearRampToValueAtTime(0.15, now + 0.8);
      whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      whooshOsc.connect(whooshGain);
      whooshGain.connect(this.ctx.destination);

      whooshOsc.start(now + 0.1);
      whooshOsc.stop(now + 1.9);
    } catch {
      // Audio fallback
    }
  }
}

export const soundEngine = new SoundEngine();

// Enhanced Speech Synthesis Voice Engine
let cachedVoices: SpeechSynthesisVoice[] = [];
let currentUtterance: SpeechSynthesisUtterance | null = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

const LANG_MAP: Record<string, string[]> = {
  en: ['en-US', 'en-GB', 'en-AU', 'en'],
  es: ['es-ES', 'es-MX', 'es-US', 'es'],
  bn: ['bn-BD', 'bn-IN', 'bn'],
  fr: ['fr-FR', 'fr-CA', 'fr'],
  de: ['de-DE', 'de-AT', 'de']
};

function selectBestVoice(langCode: string): SpeechSynthesisVoice | null {
  if (!cachedVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  if (!cachedVoices.length) return null;

  const targetPrefixes = LANG_MAP[langCode] || [langCode];

  // Try finding voice matching language prefixes in priority order
  for (const targetLang of targetPrefixes) {
    const matchingVoices = cachedVoices.filter(v => 
      v.lang.toLowerCase().startsWith(targetLang.toLowerCase()) ||
      v.lang.toLowerCase().replace('_', '-').startsWith(targetLang.toLowerCase())
    );

    if (matchingVoices.length > 0) {
      // Prioritize natural / Google / Microsoft / premium voices
      const premiumVoice = matchingVoices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('google') || name.includes('natural') || name.includes('enhanced') || name.includes('premium');
      });

      if (premiumVoice) return premiumVoice;
      return matchingVoices[0];
    }
  }

  // Default fallback to first available voice or null
  return cachedVoices[0] || null;
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakText(
  text: string, 
  lang: string = 'en', 
  options: SpeakOptions | (() => void) = {}
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  // Stop any ongoing speech and release reference
  stopSpeech();

  const opts: SpeakOptions = typeof options === 'function' ? { onEnd: options } : options;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = opts.rate ?? 0.92; // Slightly slower, museum narrator pace
  utterance.pitch = opts.pitch ?? 1.0;
  utterance.volume = 1.0;

  const targetLang = LANG_MAP[lang]?.[0] || 'en-US';
  utterance.lang = targetLang;

  const bestVoice = selectBestVoice(lang);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  if (opts.onStart) {
    utterance.onstart = opts.onStart;
  }

  const handleEnd = () => {
    currentUtterance = null;
    if (opts.onEnd) opts.onEnd();
  };

  utterance.onend = handleEnd;
  utterance.onerror = () => {
    currentUtterance = null;
    if (opts.onError) opts.onError();
    else handleEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function pauseSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
}

export function stopSpeech() {
  currentUtterance = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechSpeaking(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

export function isSpeechPaused(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.paused;
  }
  return false;
}
