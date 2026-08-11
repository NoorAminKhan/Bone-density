import React from 'react';
import { AccessibilitySettings } from '../types';
import { soundEngine } from '../utils/audio';
import { Eye, X, Check, Volume2, Type, Zap, Sparkles } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: AccessibilitySettings) => void;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  settings,
  onUpdateSettings,
  onClose
}) => {
  if (!isOpen) return null;

  const toggleField = (field: keyof AccessibilitySettings) => {
    soundEngine.playTouchBeep();
    onUpdateSettings({
      ...settings,
      [field]: !settings[field]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-amber-400/50 shadow-[0_0_50px_rgba(255,176,0,0.25)] flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <div className="flex items-center gap-2.5">
            <Eye className="w-6 h-6 text-amber-400" />
            <h2 className="font-orbitron font-bold text-lg text-amber-200 uppercase tracking-wider">
              ADA ACCESSIBILITY CONTROLS
            </h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* HIGH CONTRAST MODE */}
          <div
            onClick={() => toggleField('highContrast')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              settings.highContrast
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-orbitron font-bold text-sm block">HIGH-CONTRAST MODE</span>
                <span className="text-xs text-slate-400">Maximizes visibility for low-vision visitors (Yellow on Black)</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${settings.highContrast ? 'bg-amber-400 text-black border-amber-400' : 'border-slate-600'}`}>
              {settings.highContrast && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* LARGE TEXT FONT */}
          <div
            onClick={() => toggleField('largeText')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              settings.largeText
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-orbitron font-bold text-sm block">LARGE TEXT MODE (150%)</span>
                <span className="text-xs text-slate-400">Enlarges typography and touch buttons</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${settings.largeText ? 'bg-amber-400 text-black border-amber-400' : 'border-slate-600'}`}>
              {settings.largeText && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* SUBTITLES / CAPTIONS */}
          <div
            onClick={() => toggleField('subtitlesEnabled')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              settings.subtitlesEnabled
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-orbitron font-bold text-sm block">CLOSED CAPTIONS</span>
                <span className="text-xs text-slate-400">Displays spoken voice guide as real-time captions</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${settings.subtitlesEnabled ? 'bg-amber-400 text-black border-amber-400' : 'border-slate-600'}`}>
              {settings.subtitlesEnabled && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* REDUCED MOTION */}
          <div
            onClick={() => toggleField('reducedMotion')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              settings.reducedMotion
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <span className="font-orbitron font-bold text-sm block">REDUCED MOTION</span>
                <span className="text-xs text-slate-400">Disables flashing starfield and particle animations</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${settings.reducedMotion ? 'bg-amber-400 text-black border-amber-400' : 'border-slate-600'}`}>
              {settings.reducedMotion && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playTouchBeep();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-orbitron font-bold text-sm uppercase tracking-wider transition-all"
        >
          APPLY ACCESSIBILITY PREFERENCES
        </button>
      </div>
    </div>
  );
};
