import React from 'react';
import { LanguageCode } from '../types';
import { soundEngine } from '../utils/audio';
import { Globe, X, Check } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onClose: () => void;
}

const LANGUAGES: { code: LanguageCode; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLang,
  onSelectLanguage,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-cyan-400/50 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h2 className="font-orbitron font-bold text-lg text-cyan-200 uppercase tracking-wider">
              SELECT EXHIBIT LANGUAGE
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  soundEngine.playTouchBeep();
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`flex items-center justify-between p-4 rounded-2xl text-left border transition-all duration-200 active:scale-95 min-h-[64px] ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <span className="font-orbitron font-bold text-sm block">{lang.nativeName}</span>
                    <span className="text-xs text-slate-400 font-sans">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs font-sans text-cyan-300/70">
          All exhibit interface elements, biometrics, and voice narration will adjust immediately.
        </p>
      </div>
    </div>
  );
};
