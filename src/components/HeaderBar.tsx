import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/exhibitData';
import { LanguageCode } from '../types';
import { Activity, Radio, ShieldCheck, Clock, Layers } from 'lucide-react';

interface HeaderBarProps {
  language: LanguageCode;
  onOpenLanguageModal: () => void;
  daysInSpace: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  language,
  onOpenLanguageModal,
  daysInSpace
}) => {
  const t = TRANSLATIONS[language];
  const [missionSeconds, setMissionSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMissionTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `MET 004:${h}:${m}:${s}`;
  };

  const monthsInSpace = (daysInSpace / 30.4).toFixed(1);

  return (
    <header className="relative z-10 w-full pt-4 px-6 pb-3 border-b border-cyan-500/20 bg-gradient-to-b from-[#050b18]/90 via-[#060e22]/70 to-transparent backdrop-blur-md">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-rajdhani tracking-wider text-cyan-300/80 mb-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-semibold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            NASA / ISS HUMAN RESEARCH PROGRAM
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            EXHIBIT ID: BIO-904
          </span>
          <span className="hidden md:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {formatMissionTime(missionSeconds)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Simulation Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>55&quot; TOUCH KIOSK ACTIVE</span>
          </div>

          {/* Quick Language Indicator Button */}
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-500/30 text-cyan-200 text-xs font-semibold tracking-wider transition-all duration-200 active:scale-95"
            aria-label="Change Exhibit Language"
          >
            <span className="uppercase text-cyan-400 font-bold">{language}</span>
            <span className="text-[10px] text-slate-400">(CHANGE)</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle Banner */}
      <div className="flex flex-col items-center text-center my-1">
        <div className="inline-flex items-center justify-center gap-2 mb-1">
          <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 text-glow-cyan animate-pulse" />
          <h1 className="font-orbitron font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            {t.title}
          </h1>
        </div>

        <p className="font-sans text-xs sm:text-base md:text-lg text-cyan-200/90 font-medium tracking-wide max-w-2xl">
          {t.subtitle}
        </p>

        {/* Live Space Duration Header Indicator */}
        <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-rajdhani font-bold tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SIMULATED FLIGHT DURATION:</span>
          <span className="text-white text-base font-orbitron">{daysInSpace} DAYS</span>
          <span className="text-cyan-400 font-normal">({monthsInSpace} MO)</span>
        </div>
      </div>

      {/* Decorative Sci-Fi Corner Lines */}
      <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
      <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent" />
    </header>
  );
};
