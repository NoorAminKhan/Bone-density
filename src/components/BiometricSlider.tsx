import React from 'react';
import { BiometricState, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/exhibitData';
import { soundEngine } from '../utils/audio';
import { Play, Pause, RotateCcw, Dumbbell, Zap, Calendar, FastForward } from 'lucide-react';

interface BiometricSliderProps {
  state: BiometricState;
  language: LanguageCode;
  onChangeDays: (days: number) => void;
  onTogglePlay: () => void;
  onToggleCountermeasures: () => void;
  onSelectSpeed: (speed: number) => void;
}

export const BiometricSlider: React.FC<BiometricSliderProps> = ({
  state,
  language,
  onChangeDays,
  onTogglePlay,
  onToggleCountermeasures,
  onSelectSpeed
}) => {
  const t = TRANSLATIONS[language];
  const maxDays = 730; // 24 months
  const monthsVal = (state.daysInSpace / 30.41).toFixed(1);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChangeDays(val);
    if (val % 30 === 0) {
      soundEngine.playTick(400 + (val / maxDays) * 600);
    }
  };

  const timeMarkers = [
    { label: t.timeMarkers.day0, days: 0 },
    { label: t.timeMarkers.month3, days: 90 },
    { label: t.timeMarkers.month6, days: 180 },
    { label: t.timeMarkers.month12, days: 365 },
    { label: t.timeMarkers.month24, days: 730 }
  ];

  return (
    <div className="w-full my-3 p-4 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col gap-3 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
      {/* Slider Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h2 className="font-orbitron font-bold text-sm sm:text-base text-cyan-200 tracking-wider uppercase">
            MICROGRAVITY TIMELINE SLIDER
          </h2>
        </div>

        {/* Playback Controls & Countermeasures */}
        <div className="flex items-center gap-2">
          {/* ARED Exercise Countermeasures Button */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onToggleCountermeasures();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold tracking-wider transition-all duration-200 active:scale-95 ${
              state.exerciseCountermeasures
                ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Dumbbell className={`w-4 h-4 ${state.exerciseCountermeasures ? 'text-emerald-400 animate-bounce' : 'text-slate-400'}`} />
            <span>
              {state.exerciseCountermeasures
                ? t.metrics.countermeasuresActive
                : t.metrics.countermeasuresOff}
            </span>
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onTogglePlay();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-xs tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
            aria-label={state.isPlaying ? t.buttons.pause : t.buttons.play}
          >
            {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{state.isPlaying ? t.buttons.pause : t.buttons.play}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700 p-0.5 text-xs font-mono">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  soundEngine.playTouchBeep();
                  onSelectSpeed(spd);
                }}
                className={`px-2 py-0.5 rounded ${
                  state.playSpeed === spd ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Range Input Slider */}
      <div className="relative w-full pt-1 pb-2 px-1">
        <input
          type="range"
          min="0"
          max={maxDays}
          value={state.daysInSpace}
          onChange={handleSliderChange}
          className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 relative z-10"
          style={{
            background: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${(state.daysInSpace / maxDays) * 100}%, #0f172a ${(state.daysInSpace / maxDays) * 100}%, #0f172a 100%)`
          }}
        />

        {/* Time Marker Step Buttons aligned to exact percentage positions */}
        <div className="relative w-full h-12 mt-2">
          {timeMarkers.map((marker) => {
            const pct = (marker.days / maxDays) * 100;
            const isActive = Math.abs(state.daysInSpace - marker.days) < 15;

            // Positioning class to prevent buttons at 0% or 100% from clipping outside container bounds
            let transformStyle = 'translateX(-50%)';
            if (pct === 0) transformStyle = 'translateX(0%)';
            if (pct === 100) transformStyle = 'translateX(-100%)';

            // Extract primary label before parenthetical description (e.g. "Month 3" or "মাস ৩")
            const timeLabel = marker.label.split(' (')[0];

            return (
              <button
                key={marker.days}
                onClick={() => {
                  soundEngine.playTouchBeep();
                  onChangeDays(marker.days);
                }}
                style={{
                  left: `${pct}%`,
                  transform: transformStyle
                }}
                className={`absolute top-0 flex flex-col items-center px-2 py-1 rounded-lg transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)] z-20'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200 z-10'
                }`}
                aria-label={`Jump to ${marker.days} days (${timeLabel})`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-orbitron font-bold">{marker.days}d</span>
                </div>
                <span className="text-[9px] font-sans text-slate-300 whitespace-nowrap font-semibold">
                  {timeLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Duration Stats Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-xs font-rajdhani">
        <span className="text-slate-400">
          CURRENT SIMULATED DURATION: <strong className="text-cyan-300">{state.daysInSpace} DAYS ({monthsVal} MONTHS)</strong>
        </span>
        <span className="text-cyan-400 font-mono">
          {state.exerciseCountermeasures ? 'ARED RESISTIVE EXERCISE: ACTIVE' : 'UNPROTECTED MICROGRAVITY'}
        </span>
      </div>
    </div>
  );
};
