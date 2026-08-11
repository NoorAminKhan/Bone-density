import React from 'react';
import { BiometricState, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/exhibitData';
import { Activity, ShieldAlert, HeartPulse, BarChart3, User, Droplet, Flame } from 'lucide-react';

interface SidePanelBiometricsProps {
  state: BiometricState;
  language: LanguageCode;
}

export const SidePanelBiometrics: React.FC<SidePanelBiometricsProps> = ({ state, language }) => {
  const t = TRANSLATIONS[language];
  const days = state.daysInSpace;

  // Calculate decay factor
  let decayFactor = Math.min(1.0, days / 730);
  if (state.exerciseCountermeasures) {
    decayFactor *= 0.6; // 40% protection
  }

  // Bone Density % (100% down to ~66%)
  const densityPct = (100 - decayFactor * 34).toFixed(1);
  const densityNum = parseFloat(densityPct);

  // BMD g/cm² (1.20 baseline down to ~0.79 g/cm²)
  const bmdVal = (1.20 - decayFactor * 0.41).toFixed(2);

  // Calcium loss mg/day (150 mg Earth baseline up to 380 mg in zero-G)
  const calciumLoss = Math.round(150 + decayFactor * 230);

  // Determine Risk Category
  let riskText = t.riskLevels.normal;
  let riskColor = 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50';
  let gaugeColor = '#10b981';

  if (densityNum < 75) {
    riskText = t.riskLevels.critical;
    riskColor = 'text-rose-400 bg-rose-950/80 border-rose-500/50 animate-pulse';
    gaugeColor = '#ff3366';
  } else if (densityNum < 88) {
    riskText = t.riskLevels.high;
    riskColor = 'text-amber-400 bg-amber-950/80 border-amber-500/50';
    gaugeColor = '#ffb000';
  } else if (densityNum < 95) {
    riskText = t.riskLevels.elevated;
    riskColor = 'text-cyan-300 bg-cyan-950/80 border-cyan-500/50';
    gaugeColor = '#00f0ff';
  }

  // Gravity Comparative Loss Rates (% loss over duration)
  const earthLoss = 0;
  const moonLoss = +(decayFactor * 6.8).toFixed(1); // Moon 0.16G
  const marsLoss = +(decayFactor * 13.6).toFixed(1); // Mars 0.38G
  const zeroGLoss = +(34 * decayFactor).toFixed(1); // Zero-G

  return (
    <aside className="flex flex-col gap-3 w-full lg:w-80 h-full p-4 rounded-2xl glass-panel border border-cyan-500/30">
      {/* 1. REAL-TIME BONE DENSITY % DISPLAY */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex flex-col items-center text-center shadow-[inset_0_0_15px_rgba(0,240,255,0.08)]">
        <span className="text-[11px] font-orbitron text-cyan-400 tracking-wider uppercase mb-1">
          {t.metrics.simulatedDensity}
        </span>
        <div className="flex items-baseline gap-1 my-1">
          <span
            className={`font-orbitron font-black text-4xl sm:text-5xl tracking-tight ${
              densityNum < 75
                ? 'text-rose-400 text-glow-red'
                : densityNum < 88
                ? 'text-amber-400 text-glow-amber'
                : 'text-cyan-300 text-glow-cyan'
            }`}
          >
            {densityPct}%
          </span>
        </div>

        {/* BMD g/cm² Metric */}
        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-slate-300">
          <span>BMD: <strong className="text-white">{bmdVal} g/cm²</strong></span>
          <span className="text-slate-500">|</span>
          <span>LOSS: <strong className="text-rose-400">-{ (100 - densityNum).toFixed(1) }%</strong></span>
        </div>

        {/* Risk Status Badge */}
        <div className={`mt-2.5 px-3 py-1 rounded-full border text-[11px] font-orbitron font-bold tracking-wider ${riskColor}`}>
          {riskText}
        </div>
      </div>

      {/* 2. ASTRONAUT AVATAR SILHOUETTE WITH HEATMAP */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 flex items-center justify-between gap-3">
        <div className="relative w-16 h-28 flex items-center justify-center bg-cyan-950/30 rounded-lg border border-cyan-500/30 p-1">
          {/* Avatar Silhouette */}
          <User className="w-12 h-20 text-slate-600 opacity-60" />

          {/* Bone Loss Heat Map Overlays on Avatar */}
          <div
            className="absolute top-10 w-4 h-4 rounded-full animate-ping"
            style={{ backgroundColor: gaugeColor, opacity: decayFactor * 0.8 }}
          />
          <div
            className="absolute top-16 w-5 h-8 rounded-full blur-xs"
            style={{ backgroundColor: gaugeColor, opacity: decayFactor * 0.6 }}
          />
        </div>

        <div className="flex-1 flex flex-col gap-1.5 text-xs font-rajdhani">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              URINARY CALCIUM:
            </span>
            <strong className="text-cyan-300 font-mono">{calciumLoss} mg/day</strong>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              MUSCLE LOSS:
            </span>
            <strong className="text-rose-400 font-mono">-{(decayFactor * 22).toFixed(0)}% SOLEUS</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              RECOVERY TIME:
            </span>
            <strong className="text-amber-300 font-mono">{(days * 3.5 / 30.4).toFixed(0)} MONTHS</strong>
          </div>
        </div>
      </div>

      {/* 3. COMPARATIVE GRAVITY BAR CHART (Earth vs Zero-G vs Moon vs Mars) */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-orbitron text-cyan-300">
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            GRAVITY COMPARISON
          </span>
          <span className="text-[10px] text-slate-400">TOTAL % DECAY</span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {/* Earth 1.0G */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-rajdhani text-slate-300">
              <span>{t.gravityLabels.earth}</span>
              <span className="font-mono text-emerald-400">0.0% Loss</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[2%]" />
            </div>
          </div>

          {/* Moon 0.16G */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-rajdhani text-slate-300">
              <span>{t.gravityLabels.moon}</span>
              <span className="font-mono text-cyan-300">-{moonLoss}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${Math.max(4, moonLoss)}%` }} />
            </div>
          </div>

          {/* Mars 0.38G */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-rajdhani text-slate-300">
              <span>{t.gravityLabels.mars}</span>
              <span className="font-mono text-amber-300">-{marsLoss}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${Math.max(4, marsLoss)}%` }} />
            </div>
          </div>

          {/* Zero-G ISS */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-rajdhani text-slate-300">
              <span className="font-bold text-rose-300">{t.gravityLabels.zeroG}</span>
              <span className="font-mono text-rose-400 font-bold">-{zeroGLoss}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${Math.max(4, zeroGLoss)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
