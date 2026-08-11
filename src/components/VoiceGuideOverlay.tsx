import React, { useState, useEffect } from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/exhibitData';
import { Volume2, VolumeX, Pause, Play, RotateCcw, X, Gauge } from 'lucide-react';

interface VoiceGuideOverlayProps {
  isVoiceActive: boolean;
  isPaused: boolean;
  language: LanguageCode;
  subtitlesActive: boolean;
  speechRate: number;
  onToggleVoice: () => void;
  onPauseResume: () => void;
  onReplay: () => void;
  onChangeRate: (newRate: number) => void;
  onClose: () => void;
}

export const VoiceGuideOverlay: React.FC<VoiceGuideOverlayProps> = ({
  isVoiceActive,
  isPaused,
  language,
  subtitlesActive,
  speechRate,
  onToggleVoice,
  onPauseResume,
  onReplay,
  onChangeRate,
  onClose
}) => {
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 18, 24, 16, 20, 10]);

  // Animate waveform while voice is speaking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVoiceActive && !isPaused) {
      interval = setInterval(() => {
        setWaveHeights([
          Math.floor(Math.random() * 20 + 8),
          Math.floor(Math.random() * 24 + 10),
          Math.floor(Math.random() * 28 + 12),
          Math.floor(Math.random() * 22 + 8),
          Math.floor(Math.random() * 26 + 10),
          Math.floor(Math.random() * 18 + 6)
        ]);
      }, 150);
    } else {
      setWaveHeights([8, 8, 8, 8, 8, 8]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVoiceActive, isPaused]);

  if (!isVoiceActive && !subtitlesActive) return null;

  const t = TRANSLATIONS[language];

  const handleNextRate = () => {
    if (speechRate === 0.9) onChangeRate(1.0);
    else if (speechRate === 1.0) onChangeRate(1.15);
    else onChangeRate(0.9);
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 pointer-events-none animate-fade-in">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/95 border border-cyan-400/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,242,255,0.25)] flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
        
        {/* Equalizer Waveform & Status */}
        <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-3 shrink-0">
          <div className="flex items-center gap-1 h-9 px-3 bg-cyan-950/80 rounded-xl border border-cyan-500/40">
            {isVoiceActive && !isPaused ? (
              waveHeights.map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(0,242,255,0.8)]"
                  style={{ height: `${h}px` }}
                />
              ))
            ) : isPaused ? (
              <span className="text-[11px] font-orbitron text-amber-400 uppercase tracking-widest font-semibold px-1">
                PAUSED
              </span>
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </div>

          <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider uppercase font-medium hidden sm:inline-block">
            {isVoiceActive ? (isPaused ? 'Audio Paused' : 'Playing') : 'Captions'}
          </span>
        </div>

        {/* Script & Subtitles */}
        <div className="flex-1 w-full text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-orbitron text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              VOICE GUIDE — EXHIBIT ZONE 4
            </span>

            {/* Speed Badge */}
            <button
              onClick={handleNextRate}
              className="text-[10px] font-orbitron text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              title="Change Speech Speed"
            >
              <Gauge className="w-3 h-3 text-cyan-400" />
              {speechRate}x
            </button>
          </div>

          <p className="font-sans text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-cyan-500/10">
            &quot;{t.voiceGuideScript}&quot;
          </p>
        </div>

        {/* Audio Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-cyan-500/20 pt-2 sm:pt-0">
          {/* Pause / Resume */}
          {isVoiceActive && (
            <button
              onClick={onPauseResume}
              className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/80 text-cyan-300 hover:bg-cyan-500/30 active:scale-95 transition-all cursor-pointer"
              title={isPaused ? 'Resume Narration' : 'Pause Narration'}
              aria-label="Pause or Resume Voice Guide"
            >
              {isPaused ? <Play className="w-4 h-4 text-cyan-300 fill-cyan-300" /> : <Pause className="w-4 h-4 text-cyan-300" />}
            </button>
          )}

          {/* Replay */}
          <button
            onClick={onReplay}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 active:scale-95 transition-all cursor-pointer"
            title="Replay Voice Guide"
            aria-label="Replay Voice Guide"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Toggle / Mute */}
          <button
            onClick={onToggleVoice}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              isVoiceActive
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-bold shadow-[0_0_15px_rgba(0,242,255,0.5)]'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-cyan-300'
            }`}
            title={isVoiceActive ? 'Mute Voice Guide' : 'Start Voice Guide'}
            aria-label="Toggle Voice Guide"
          >
            {isVoiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Close Overlay */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 active:scale-95 transition-all cursor-pointer"
            title="Dismiss Overlay"
            aria-label="Dismiss Voice Guide Overlay"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
