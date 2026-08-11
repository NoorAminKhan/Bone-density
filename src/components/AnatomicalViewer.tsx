import React from 'react';
import { ViewMode, LanguageCode, BiometricState } from '../types';
import { TRANSLATIONS, HOTSPOTS } from '../data/exhibitData';
import { soundEngine } from '../utils/audio';
import { Eye, Info, Crosshair, ZoomIn, AlertTriangle, Layers, Flame } from 'lucide-react';

interface AnatomicalViewerProps {
  state: BiometricState;
  language: LanguageCode;
  onSelectViewMode: (mode: ViewMode) => void;
  onSelectHotspot: (hotspotId: string | null) => void;
}

export const AnatomicalViewer: React.FC<AnatomicalViewerProps> = ({
  state,
  language,
  onSelectViewMode,
  onSelectHotspot
}) => {
  const t = TRANSLATIONS[language];
  const days = state.daysInSpace;
  // Calculate decay factor: 0.0 (day 0) to 1.0 (730 days / 24 months)
  let decayFactor = Math.min(1.0, days / 730);

  // If countermeasures are active, bone loss is reduced by 40%
  if (state.exerciseCountermeasures) {
    decayFactor *= 0.6;
  }

  // Calculate current bone density percentage (100% down to ~66% at 24 months without exercise)
  const boneDensityPct = Math.max(60, +(100 - decayFactor * 34).toFixed(1));

  // Determine glow color theme based on decay level
  const isCritical = boneDensityPct < 75;
  const isWarning = boneDensityPct >= 75 && boneDensityPct < 88;

  const glowClass = isCritical
    ? 'border-rose-500/50 shadow-[0_0_35px_rgba(255,51,102,0.3)]'
    : isWarning
    ? 'border-amber-500/40 shadow-[0_0_30px_rgba(255,176,0,0.25)]'
    : 'border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]';

  const strokePrimary = isCritical ? '#ff3366' : isWarning ? '#ffb000' : '#00f0ff';
  const fillPrimary = isCritical ? '#ff3366' : isWarning ? '#ffb000' : '#00f0ff';

  const handleHotspotClick = (id: string) => {
    soundEngine.playTouchBeep();
    onSelectHotspot(state.inspectedHotspot === id ? null : id);
  };

  return (
    <div className={`relative flex flex-col items-center justify-between w-full h-full p-4 rounded-2xl glass-panel transition-all duration-500 ${glowClass}`}>
      {/* Top View Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 w-full z-10 mb-2">
        {(['femur', 'skeleton', 'vertebrae', 'cellular'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              soundEngine.playTouchBeep();
              onSelectViewMode(mode);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold tracking-wider transition-all duration-200 active:scale-95 ${
              state.viewMode === mode
                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-slate-900/60 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.views[mode]}</span>
          </button>
        ))}
      </div>

      {/* Main Anatomical SVG Canvas Area */}
      <div className="relative w-full flex-1 min-h-[300px] max-h-[520px] flex items-center justify-center overflow-hidden my-2">
        {/* Background Radial Scan Grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke={strokePrimary} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="25%" fill="none" stroke={strokePrimary} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke={strokePrimary} strokeWidth="0.5" strokeDasharray="5 5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke={strokePrimary} strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>

        {/* 1. FEMUR CROSS-SECTION VIEW */}
        {state.viewMode === 'femur' && (
          <svg viewBox="0 0 400 500" className="w-full h-full max-h-[480px] drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <defs>
              <linearGradient id="femurGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={strokePrimary} stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor={strokePrimary} stopOpacity="0.4" />
              </linearGradient>

              <pattern id="trabecularPatternDense" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 Q 10 0 20 10 Q 10 20 0 10 Z" fill="none" stroke={strokePrimary} strokeWidth="1.5" opacity="0.8" />
                <circle cx="10" cy="10" r="2" fill={strokePrimary} opacity="0.6" />
                <line x1="0" y1="0" x2="20" y2="20" stroke={strokePrimary} strokeWidth="1" opacity="0.5" />
              </pattern>
            </defs>

            {/* Femur Outer Cortical Shell Contour */}
            <path
              d="M 180,60 C 130,70 100,120 120,170 C 140,200 160,240 165,330 C 170,390 140,430 160,450 C 180,470 230,460 240,440 C 250,420 230,370 235,310 C 240,240 260,200 280,160 C 300,120 260,60 210,60 Z"
              fill="rgba(5, 15, 35, 0.7)"
              stroke={strokePrimary}
              strokeWidth="4"
              className="transition-colors duration-500"
            />

            {/* Dense Outer Cortical Layer */}
            <path
              d="M 180,60 C 130,70 100,120 120,170 C 140,200 160,240 165,330 C 170,390 140,430 160,450 C 180,470 230,460 240,440 C 250,420 230,370 235,310 C 240,240 260,200 280,160 C 300,120 260,60 210,60 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Trabecular Spongy Lattice Center (Pores enlarge as decay increases) */}
            <g opacity={Math.max(0.15, 1 - decayFactor * 0.85)} className="transition-opacity duration-500">
              <path
                d="M 170,90 C 140,110 130,140 145,170 C 160,195 180,240 182,320 C 185,370 170,410 180,425 C 190,435 210,430 215,420 C 220,405 210,370 212,310 C 215,240 235,200 245,170 C 255,140 230,90 195,90 Z"
                fill="url(#femurGlow)"
                opacity="0.35"
              />

              {/* Procedural Lattice Lines simulating bone trabeculae */}
              {Array.from({ length: 24 }).map((_, i) => {
                const yPos = 100 + i * 14;
                const spread = Math.sin((i / 24) * Math.PI) * 45 + 15;
                const opacityVal = Math.max(0.1, 1 - decayFactor * (i % 3 === 0 ? 0.9 : 0.6));
                return (
                  <g key={i} opacity={opacityVal}>
                    <line
                      x1={200 - spread}
                      y1={yPos}
                      x2={200 + spread}
                      y2={yPos + (i % 2 === 0 ? 6 : -6)}
                      stroke={strokePrimary}
                      strokeWidth={Math.max(0.8, 2.5 - decayFactor * 1.8)}
                    />
                    <line
                      x1={200 - spread * 0.5}
                      y1={yPos - 5}
                      x2={200 + spread * 0.5}
                      y2={yPos + 8}
                      stroke="#ffffff"
                      strokeWidth={Math.max(0.5, 2 - decayFactor * 1.5)}
                      opacity="0.7"
                    />
                  </g>
                );
              })}
            </g>

            {/* Micro-fracture Risk Glow Spots (Appears under high decay) */}
            {decayFactor > 0.4 && (
              <g className="animate-pulse">
                {/* Femoral Neck Vulnerability Zone */}
                <circle cx="160" cy="140" r={12 + decayFactor * 14} fill="rgba(255,51,102,0.25)" stroke="#ff3366" strokeWidth="1.5" />
                <path d="M 152 135 L 168 145 M 160 130 L 160 150" stroke="#ff3366" strokeWidth="2" />
                <text x="175" y="132" fill="#ff3366" fontSize="10" fontFamily="Orbitron" fontWeight="bold">
                  HIGH DECAY ZONE
                </text>
                <text x="175" y="145" fill="#ffffff" fontSize="9" fontFamily="Rajdhani">
                  33.6% Porosity Increase
                </text>
              </g>
            )}

            {/* Dimension Callouts & Anatomical Markers */}
            <line x1="80" y1="120" x2="140" y2="120" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="140" cy="120" r="3" fill="#00f0ff" />
            <text x="25" y="124" fill="#00f0ff" fontSize="10" fontFamily="Orbitron">FEMORAL HEAD</text>

            <line x1="260" y1="300" x2="320" y2="300" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="260" cy="300" r="3" fill="#00f0ff" />
            <text x="325" y="304" fill="#00f0ff" fontSize="10" fontFamily="Orbitron">MEDULLARY CANAL</text>
          </svg>
        )}

        {/* 2. FULL SKELETON HEATMAP VIEW */}
        {state.viewMode === 'skeleton' && (
          <svg viewBox="0 0 300 500" className="w-full h-full max-h-[480px]">
            {/* Stylized Human Skeleton Contour */}
            <g stroke={strokePrimary} fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500">
              {/* Cranium Skull */}
              <ellipse cx="150" cy="50" rx="20" ry="24" strokeWidth="2.5" fill="rgba(0,240,255,0.05)" />
              <path d="M 140 68 L 160 68" strokeWidth="2" />

              {/* Spine */}
              <path d="M 150 74 L 150 220" strokeWidth="4" strokeDasharray="6 3" />

              {/* Ribcage */}
              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${150 - (22 - i * 2)} ${90 + i * 12} C ${120 - i * 3} ${90 + i * 12}, ${120 - i * 3} ${105 + i * 12}, 150 ${105 + i * 12} C ${180 + i * 3} ${105 + i * 12}, ${180 + i * 3} ${90 + i * 12}, ${150 + (22 - i * 2)} ${90 + i * 12}`}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              ))}

              {/* Clavicles & Pelvis */}
              <path d="M 115 85 L 185 85" strokeWidth="3" />
              <path d="M 125 210 Q 150 235 175 210 L 165 240 L 135 240 Z" strokeWidth="2.5" fill="rgba(0,240,255,0.1)" />

              {/* Arms */}
              <path d="M 115 85 L 95 150 L 85 210" strokeWidth="2.5" />
              <path d="M 185 85 L 205 150 L 215 210" strokeWidth="2.5" />

              {/* Legs (Femurs & Tibias) */}
              <path d="M 138 235 L 130 340 L 128 440" strokeWidth="3.5" />
              <path d="M 162 235 L 170 340 L 172 440" strokeWidth="3.5" />

              {/* Feet Calcaneus */}
              <path d="M 128 440 L 115 450" strokeWidth="3" />
              <path d="M 172 440 L 185 450" strokeWidth="3" />
            </g>

            {/* Bone Loss Heatmap Overlays */}
            {HOTSPOTS.map((spot) => {
              const spotDecay = spot.id === 'skull' ? 0 : decayFactor;
              const heatColor = spotDecay > 0.5 ? '#ff3366' : spotDecay > 0.25 ? '#ffb000' : '#00f0ff';
              const isSelected = state.inspectedHotspot === spot.id;

              return (
                <g key={spot.id} className="cursor-pointer" onClick={() => handleHotspotClick(spot.id)}>
                  {/* Glowing Heat Ring */}
                  <circle
                    cx={`${spot.x}%`}
                    cy={`${spot.y}%`}
                    r={isSelected ? 16 : 10 + spotDecay * 8}
                    fill={heatColor}
                    fillOpacity={0.25 + spotDecay * 0.35}
                    stroke={heatColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="animate-pulse"
                  />
                  <circle cx={`${spot.x}%`} cy={`${spot.y}%`} r={3} fill="#ffffff" />

                  {/* Hotspot Label */}
                  <g transform={`translate(${spot.x > 50 ? spot.x * 2.8 + 10 : spot.x * 2.8 - 70}, ${spot.y * 4.6})`}>
                    <rect x="0" y="0" width="65" height="18" rx="4" fill="rgba(5,15,35,0.8)" stroke={heatColor} strokeWidth="1" />
                    <text x="32" y="12" fill={heatColor} fontSize="8" fontFamily="Rajdhani" fontWeight="bold" textAnchor="middle">
                      {spot.id === 'femoral_head' ? 'FEMUR -1.4%' : spot.id === 'lumbar_spine' ? 'LUMBAR -1.2%' : spot.id === 'calcaneus' ? 'HEEL -1.5%' : 'SKULL 0%'}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        )}

        {/* 3. LUMBAR SPINE VERTEBRAE VIEW */}
        {state.viewMode === 'vertebrae' && (
          <div className="relative flex flex-col items-center justify-center w-full h-full px-2 py-1">
            <svg viewBox="0 0 400 360" className="w-full max-w-[380px] h-auto drop-shadow-[0_0_25px_rgba(0,240,255,0.25)]">
              <defs>
                <linearGradient id="vertebraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0a192f" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#0f2b48" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0a192f" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Top Load Vector Banner Badge */}
              <g>
                <rect x="80" y="6" width="240" height="24" rx="6" fill="rgba(3, 10, 24, 0.95)" stroke="#ff3366" strokeWidth="1.5" />
                <text x="200" y="22" fill="#ff3366" fontSize="10" fontFamily="Orbitron" textAnchor="middle" fontWeight="bold" letterSpacing="1">
                  AXIAL UNLOADING (0.0G STRESS)
                </text>
              </g>

              {/* Top Vector Load Arrow (Pointing Down to L2-L3 Disc) */}
              <g className="animate-pulse">
                <path d="M 200 33 L 200 52 M 193 45 L 200 52 L 207 45" stroke="#ff3366" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>

              {/* Superior Intervertebral Disc (L2-L3) */}
              <rect x="110" y="58" width="180" height="14" rx="7" fill="url(#discGrad)" stroke="#00f0ff" strokeWidth="1" opacity="0.8" />
              <text x="200" y="68" fill="#00f0ff" fontSize="8" fontFamily="Rajdhani" textAnchor="middle" fontWeight="bold">
                L2-L3 DISC SPACE
              </text>

              {/* L3 Vertebral Body Main Contour */}
              <path
                d="M 100,80 C 130,76 270,76 300,80 C 312,120 312,200 300,240 C 270,244 130,244 100,240 C 88,200 88,120 100,80 Z"
                fill="url(#vertebraGrad)"
                stroke={strokePrimary}
                strokeWidth="3.5"
                className="transition-colors duration-500"
              />

              {/* Superior & Inferior Cortical Endplates */}
              <path d="M 102,82 C 140,86 260,86 298,82" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" fill="none" />
              <path d="M 102,238 C 140,234 260,234 298,238" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" fill="none" />

              {/* Trabecular Bone Interior Lattice Matrix (Pores expand with decay) */}
              <g opacity={Math.max(0.12, 1 - decayFactor * 0.82)} className="transition-opacity duration-500">
                {Array.from({ length: 9 }).map((_, i) => {
                  const y = 98 + i * 15;
                  const opacityVal = Math.max(0.15, 0.85 - decayFactor * (i % 2 === 0 ? 0.7 : 0.4));
                  return (
                    <g key={i} opacity={opacityVal}>
                      <line
                        x1="115"
                        y1={y}
                        x2="285"
                        y2={y}
                        stroke={strokePrimary}
                        strokeWidth={Math.max(0.8, 2 - decayFactor * 1.4)}
                        strokeDasharray="5 4"
                      />
                      <line
                        x1="125"
                        y1={y - 4}
                        x2="275"
                        y2={y + 4}
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        opacity="0.4"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Callout Indicator Lines */}
              <line x1="70" y1="82" x2="102" y2="82" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="102" cy="82" r="3" fill="#00f0ff" />
              <g>
                <rect x="5" y="72" width="85" height="20" rx="4" fill="rgba(3, 10, 24, 0.92)" stroke="#00f0ff" strokeWidth="1" />
                <text x="47" y="86" fill="#00f0ff" fontSize="8" fontFamily="Orbitron" textAnchor="middle" fontWeight="bold">
                  ENDPLATE
                </text>
              </g>

              <line x1="330" y1="160" x2="298" y2="160" stroke={strokePrimary} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="298" cy="160" r="3" fill={strokePrimary} />
              <g>
                <rect x="310" y="150" width="85" height="20" rx="4" fill="rgba(3, 10, 24, 0.92)" stroke={strokePrimary} strokeWidth="1" />
                <text x="352" y="164" fill={strokePrimary} fontSize="8" fontFamily="Orbitron" textAnchor="middle" fontWeight="bold">
                  TRABECULAR
                </text>
              </g>

              {/* High-Contrast Central Readout Badge (Sits safely over interior lattice) */}
              <g>
                <rect
                  x="110"
                  y="125"
                  width="180"
                  height="70"
                  rx="10"
                  fill="rgba(2, 8, 22, 0.96)"
                  stroke={strokePrimary}
                  strokeWidth="2"
                  className="shadow-2xl"
                />
                <text x="200" y="148" fill="#ffffff" fontSize="13" fontFamily="Orbitron" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">
                  LUMBAR L3 BODY
                </text>
                <text x="200" y="168" fill={strokePrimary} fontSize="13" fontFamily="Rajdhani" textAnchor="middle" fontWeight="bold">
                  {-(decayFactor * 28.8).toFixed(1)}% Density Reduction
                </text>
                <text x="200" y="184" fill="#94a3b8" fontSize="9" fontFamily="Rajdhani" textAnchor="middle">
                  {state.exerciseCountermeasures ? 'ARED Countermeasures Active' : 'Unprotected Microgravity Decay'}
                </text>
              </g>

              {/* Inferior Intervertebral Disc (L3-L4) */}
              <rect x="110" y="248" width="180" height="14" rx="7" fill="url(#discGrad)" stroke="#00f0ff" strokeWidth="1" opacity="0.8" />
              <text x="200" y="258" fill="#00f0ff" fontSize="8" fontFamily="Rajdhani" textAnchor="middle" fontWeight="bold">
                L3-L4 DISC SPACE
              </text>

              {/* Bottom Vector Load Arrow (Pointing Up to L3-L4 Disc) */}
              <g className="animate-pulse">
                <path d="M 200 287 L 200 268 M 193 275 L 200 268 L 207 275" stroke="#ff3366" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>

              {/* Bottom Status / Risk Badge */}
              <g>
                <rect
                  x="80"
                  y="295"
                  width="240"
                  height="24"
                  rx="6"
                  fill="rgba(3, 10, 24, 0.95)"
                  stroke={decayFactor > 0.4 ? '#ff3366' : decayFactor > 0.15 ? '#f59e0b' : '#10b981'}
                  strokeWidth="1.5"
                />
                <text
                  x="200"
                  y="311"
                  fill={decayFactor > 0.4 ? '#ff3366' : decayFactor > 0.15 ? '#f59e0b' : '#10b981'}
                  fontSize="10"
                  fontFamily="Orbitron"
                  textAnchor="middle"
                  fontWeight="bold"
                  letterSpacing="0.5"
                >
                  {decayFactor > 0.4 ? 'HIGH VERTEBRAL COMPRESSION RISK' : decayFactor > 0.15 ? 'ELEVATED TRABECULAR DECAY' : 'NORMAL SKELETAL BASELINE'}
                </text>
              </g>
            </svg>
          </div>
        )}

        {/* 4. OSTEOCLAST CELLULAR VIEW */}
        {state.viewMode === 'cellular' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center">
                <span className="text-xs font-orbitron text-cyan-400 block mb-1">OSTEOBLASTS (BUILDERS)</span>
                <span className="text-2xl font-bold font-mono text-cyan-300">
                  {Math.max(10, Math.round(100 - decayFactor * 75))}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Dormant in Zero-G</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-center">
                <span className="text-xs font-orbitron text-rose-400 block mb-1">OSTEOCLASTS (DESTROYERS)</span>
                <span className="text-2xl font-bold font-mono text-rose-300">
                  {Math.min(220, Math.round(100 + decayFactor * 110))}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Hyperactive Resorption</span>
              </div>
            </div>
            <p className="text-xs font-sans text-cyan-200/80 text-center mt-3 max-w-sm">
              In microgravity, osteoclast cells constantly dissolve bone matrix while osteoblast creation slows, releasing calcium directly into spacefarers&apos; bloodstreams.
            </p>
          </div>
        )}
      </div>

      {/* Selected Hotspot Detailed Popover Banner */}
      {state.inspectedHotspot && (
        <div className="w-full z-20 mt-2 p-3 rounded-xl bg-slate-900/95 border border-cyan-400/50 backdrop-blur-md shadow-2xl animate-fade-in">
          {(() => {
            const spot = HOTSPOTS.find(h => h.id === state.inspectedHotspot);
            if (!spot) return null;
            return (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-orbitron font-bold text-sm text-cyan-200 uppercase">{spot.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[10px] font-mono">
                      {spot.normalLossRate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-sans">{spot.description}</p>
                </div>
                <button
                  onClick={() => onSelectHotspot(null)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono self-end sm:self-center"
                >
                  CLOSE
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* Bottom Visualizer Legend */}
      <div className="flex items-center justify-between w-full pt-2 border-t border-cyan-500/20 text-[11px] font-rajdhani text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> DENSE BONE
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> OSTEOPENIA
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> OSTEOPOROSIS
          </span>
        </div>
        <span className="hidden sm:inline-block text-cyan-400/80 font-mono">
          TOUCH HOTSPOTS FOR BIOMETRICS
        </span>
      </div>
    </div>
  );
};
