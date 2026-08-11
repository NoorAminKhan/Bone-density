import React from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/exhibitData';
import { soundEngine } from '../utils/audio';
import { RotateCcw, Volume2, Eye, FileText } from 'lucide-react';

interface BottomTouchBarProps {
  language: LanguageCode;
  voiceActive: boolean;
  subtitlesActive: boolean;
  accessibilityActive: boolean;
  onReset: () => void;
  onToggleVoice: () => void;
  onToggleSubtitles: () => void;
  onOpenAccessibility: () => void;
  onOpenQR: () => void;
}

export const BottomTouchBar: React.FC<BottomTouchBarProps> = ({
  language,
  voiceActive,
  subtitlesActive,
  accessibilityActive,
  onReset,
  onToggleVoice,
  onToggleSubtitles,
  onOpenAccessibility,
  onOpenQR
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="relative z-10 w-full p-3 border-t border-cyan-500/30 bg-gradient-to-t from-[#040817] via-[#050b1a]/90 to-transparent backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left Touch Controls: RESET & VOICE GUIDE */}
        <div className="flex items-center gap-2">
          {/* RESET BUTTON */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onReset();
            }}
            className="flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 text-slate-200 font-orbitron font-bold text-xs tracking-wider transition-all duration-200 active:scale-95 shadow-lg"
            aria-label={t.buttons.reset}
          >
            <RotateCcw className="w-5 h-5 text-slate-300" />
            <span>{t.buttons.reset}</span>
          </button>

          {/* VOICE GUIDE BUTTON */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onToggleVoice();
            }}
            className={`flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-wider transition-all duration-200 active:scale-95 shadow-lg ${
              voiceActive
                ? 'bg-cyan-500 text-slate-950 border border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)]'
                : 'bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300'
            }`}
            aria-label={t.buttons.voiceGuide}
          >
            <Volume2 className={`w-5 h-5 ${voiceActive ? 'animate-bounce text-slate-950' : 'text-cyan-400'}`} />
            <span>{t.buttons.voiceGuide}</span>
          </button>
        </div>

        {/* Center / Right Touch Controls: ACCESSIBILITY, QR TAKEAWAY */}
        <div className="flex items-center gap-2">

          {/* ACCESSIBILITY MODE BUTTON */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onOpenAccessibility();
            }}
            className={`flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-wider transition-all duration-200 active:scale-95 shadow-lg ${
              accessibilityActive
                ? 'bg-amber-500 text-slate-950 border border-amber-300 shadow-[0_0_20px_rgba(255,176,0,0.5)]'
                : 'bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300'
            }`}
            aria-label={t.buttons.accessibility}
          >
            <Eye className="w-5 h-5 text-amber-400" />
            <span className="hidden sm:inline">{t.buttons.accessibility}</span>
            <span className="sm:hidden">ADA</span>
          </button>

          {/* SAVE REPORT PDF BUTTON */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onOpenQR();
            }}
            className="flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label={t.buttons.qrTakeaway}
          >
            <FileText className="w-5 h-5 text-white" />
            <span className="hidden md:inline">{t.buttons.qrTakeaway}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
