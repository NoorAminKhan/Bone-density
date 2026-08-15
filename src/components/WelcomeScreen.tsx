import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Sparkles, Activity, ChevronRight, Zap } from 'lucide-react';
import { LanguageCode } from '../types';
import { soundEngine } from '../utils/audio';

interface WelcomeScreenProps {
  language: LanguageCode;
  onBegin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onBegin
}) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdownText, setCountdownText] = useState<string | null>(null);

  const translations = {
    en: {
      subBadge: "NASA HUMAN RESEARCH PROGRAM • EXHIBIT ZONE 4",
      mainTitle: "BONE DENSITY DECAY",
      subtitle: "Interactive Skeletal Degradation Simulator in Zero Gravity",
      description: "Experience 730 days of deep space microgravity physiology. Explore how weightlessness breaks down the human skeletal structure, simulates osteoporosis, and test NASA countermeasure protocols.",
      touchToBegin: "TOUCH TO BEGIN",
      touchSub: "Tap anywhere or press to initialize mission simulation",
      status: "SYSTEM READY • T-0 SECONDS",
      systemsNominal: "ALL SYSTEMS NOMINAL",
      missionTarget: "DESTINATION: LOW EARTH ORBIT & MARS TRANSIT",
      langSelect: "SELECT LANGUAGE / ভাষা নির্বাচন",
      launchStatus: "IGNITION SEQUENCE STARTED • LAUNCHING INTO ZERO-G"
    },
    bn: {
      subBadge: "নাসা হিউম্যান রিসার্চ প্রোগ্রাম • প্রদর্শনী জোন ৪",
      mainTitle: "অস্থির ঘনত্ব হ্রাসের সিমুলেটর",
      subtitle: "মহাশূন্যের শূন্য মহাকর্ষে মানব কঙ্কালের ক্ষয় পর্যবেক্ষণ প্রদর্শনী",
      description: "মহাকাশের ৭৩০ দিনের শূন্য মাধ্যাকর্ষণে মানবদেহের অস্থি ক্ষয়ের বাস্তব বায়োমেট্রিক সিমুলেশন। জানুন কীভাবে ওজনহীনতায় হাড় দুর্বল হয়ে পড়ে এবং নাসা কীভাবে প্রতিরোধমূলক ব্যবস্থা গ্রহণ করে।",
      touchToBegin: "শুরু করতে স্পর্শ করুন",
      touchSub: "মিশন সিমুলেশন চালু করতে এখানে স্পর্শ করুন",
      status: "সিস্টেম প্রস্তুত • কাউন্টডাউন শুরু",
      systemsNominal: "সকল সিস্টেম সক্রিয় ও স্বাভাবিক",
      missionTarget: "গন্তব্য: আন্তর্জাতিক মহাকাশ স্টেশন ও মঙ্গল মিশন",
      langSelect: "ভাষা নির্বাচন করুন",
      launchStatus: "উৎক্ষেপণ প্রক্রিয়া শুরু হচ্ছে • শূন্য মহাকর্ষে প্রবেশ..."
    },
    es: {
      subBadge: "PROGRAMA DE INVESTIGACIÓN HUMANA DE LA NASA • ZONA 4",
      mainTitle: "DEGRADACIÓN DE LA DENSIDAD ÓSEA",
      subtitle: "Simulador Interactivo de Pérdida Esquelética en Gravedad Cero",
      description: "Experimenta 730 días de fisiología en microgravedad. Descubre cómo la ingravidez degrada los huesos humanos y prueba contramedidas de la NASA.",
      touchToBegin: "TOCAR PARA COMENZAR",
      touchSub: "Presione para iniciar la simulación de la misión",
      status: "SISTEMAS LISTOS • T-0 SEGUNDOS",
      systemsNominal: "SISTEMAS NOMINALES",
      missionTarget: "DESTINO: ÓRBITA TERRESTRE Y TRÁNSITO A MARTE",
      langSelect: "SELECCIONAR IDIOMA",
      launchStatus: "SECUENCIA DE IGNICIÓN INICIADA • DESPEGANDO"
    },
    fr: {
      subBadge: "PROGRAMME DE RECHERCHE HUMAINE DE LA NASA • ZONE 4",
      mainTitle: "DÉGRADATION DE LA DENSITÉ OSSEUSE",
      subtitle: "Simulateur Interactif de Dégradation Squelettique en Impesanteur",
      description: "Vivez 730 jours de physiologie spatiale en microgravité. Découvrez comment l'impesanteur fragilise le squelette humain.",
      touchToBegin: "TOUCHER POUR COMMENCER",
      touchSub: "Touchez pour initialiser la simulation",
      status: "SYSTÈME PRÊT • T-0 SECONDES",
      systemsNominal: "SYSTÈMES NOMINAUX",
      missionTarget: "DESTINATION: ORBITE BASSE ET TRANSIT VERS MARS",
      langSelect: "CHOISIR LA LANGUE",
      launchStatus: "SÉQUENCE D'ALLUMAGE • DÉCOLLAGE EN COURS"
    },
    de: {
      subBadge: "NASA HUMAN RESEARCH PROGRAMM • AUSSTELLUNGSZONE 4",
      mainTitle: "KNOCHENDICHTE-ABBAU",
      subtitle: "Interaktiver Skelettabbau-Simulator in der Schwerelosigkeit",
      description: "Erleben Sie 730 Tage Raumfahrt-Physiologie. Erforschen Sie den Knochendichte-Verlust und Gegenmaßnahmen der NASA.",
      touchToBegin: "ZUM STARTEN BERÜHREN",
      touchSub: "Tippen Sie hier, um die Simulation zu starten",
      status: "SYSTEM BEREIT • T-0 SEKUNDEN",
      systemsNominal: "ALLE SYSTEME BEREIT",
      missionTarget: "ZIEL: ERDORBIT & MARS-TRANSIT",
      langSelect: "SPRACHE WÄHLEN",
      launchStatus: "ZÜNDUNG GESTARTET • START IN DIE SCHWERELOSIGKEIT"
    }
  };

  const t = translations[language] || translations.en;

  const handleStartLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    soundEngine.playRocketLaunch();
    setCountdownText("3... 2... 1... IGNITION!");

    // Smooth transition to exhibit after rocket flies away
    setTimeout(() => {
      onBegin();
    }, 1800);
  };

  return (
    <div
      id="museum-welcome-screen"
      className="relative w-full h-full min-h-screen bg-[#020612] text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* Background Starfield & Deep Space Nebulae */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial Nebula Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-cyan-600/15 via-blue-900/20 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-rose-950/15 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Ambient Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Concentric Radar Grid Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-cyan-500/10 rounded-full pointer-events-none animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-cyan-500/15 border-dashed rounded-full pointer-events-none animate-[spin_80s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-400/20 rounded-full pointer-events-none" />

        {/* Floating Ambient Sparkles */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-300 animate-pulse"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              opacity: (i % 5 + 3) * 0.15,
              animationDuration: `${3 + (i % 4)}s`
            }}
          />
        ))}

        {/* Speed lines when launching */}
        {isLaunching && (
          <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: ['0vh', '120vh'], opacity: [0, 0.9, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: (i % 10) * 0.05,
                  ease: 'linear'
                }}
                className="absolute w-[2px] bg-gradient-to-b from-cyan-400 via-white to-transparent"
                style={{
                  height: `${120 + (i % 5) * 60}px`,
                  left: `${(i * 3.4) % 100}%`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CENTER STAGE: ROCKET LAUNCH GANTRY & CALL TO ACTION */}
      <main className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-6 py-8 flex flex-col items-center justify-center text-center">
        {/* Exhibit Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center max-w-3xl mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-orbitron font-semibold tracking-widest mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE SPACE BIOMEDICAL EXHIBIT</span>
          </div>

          <h1 className="font-orbitron font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-wider leading-tight drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            {t.mainTitle}
          </h1>

          <p className="mt-2 font-mono text-cyan-300 text-sm sm:text-base tracking-wide font-medium">
            {t.subtitle}
          </p>
        </motion.div>

        {/* INTERACTIVE CENTERPIECE: ROCKET WITH LAUNCH ANIMATION */}
        <div className="relative w-full max-w-md h-56 sm:h-64 flex items-center justify-center my-2">
          {/* Launch Pad Crosshair Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-52 h-52 rounded-full border border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="w-40 h-40 rounded-full border border-cyan-400/30" />
            <div className="w-28 h-28 rounded-full bg-cyan-950/30 blur-md" />
          </div>

          {/* THE ROCKET VESSEL */}
          <motion.div
            id="launch-rocket-container"
            animate={
              isLaunching
                ? {
                    y: -900,
                    scale: [1, 1.05, 1.2, 0.8],
                    rotate: [0, -1, 1, 0],
                    transition: {
                      duration: 1.7,
                      ease: [0.45, 0, 0.2, 1]
                    }
                  }
                : {
                    y: [0, -8, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }
            }
            className="relative z-30 cursor-pointer flex flex-col items-center"
            onClick={handleStartLaunch}
          >
            {/* SVG Precision Spacecraft / Heavy Rocket */}
            <svg
              viewBox="0 0 160 260"
              className="w-32 sm:w-40 h-44 sm:h-52 drop-shadow-[0_0_25px_rgba(0,240,255,0.5)]"
            >
              <defs>
                <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="wingShield" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="thrusterFireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Spacecraft Main Fuselage */}
              <path
                d="M 80 15 C 68 45, 55 95, 55 160 L 105 160 C 105 95, 92 45, 80 15 Z"
                fill="url(#rocketBodyGrad)"
                stroke="#00f0ff"
                strokeWidth="1.5"
              />

              {/* Nose Cone Tip */}
              <path d="M 80 15 L 75 40 L 85 40 Z" fill="#0284c7" />

              {/* Command Deck Window Glass */}
              <ellipse cx="80" cy="65" rx="8" ry="12" fill="url(#cockpitGlass)" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="77" y1="58" x2="83" y2="72" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />

              {/* Bio-Med Exhibit Decal / Cross */}
              <circle cx="80" cy="105" r="9" fill="#041226" stroke="#00f0ff" strokeWidth="1" />
              <path d="M 80 99 L 80 111 M 74 105 L 86 105" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />

              {/* Delta Wings Left & Right */}
              <path d="M 55 125 L 20 175 L 55 165 Z" fill="url(#wingShield)" stroke="#38bdf8" strokeWidth="1.2" />
              <path d="M 105 125 L 140 175 L 105 165 Z" fill="url(#wingShield)" stroke="#38bdf8" strokeWidth="1.2" />

              {/* Booster Pods */}
              <rect x="42" y="140" width="12" height="30" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1" />
              <rect x="106" y="140" width="12" height="30" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1" />

              {/* Main Rocket Engine Nozzles */}
              <polygon points="62,160 58,175 74,175 72,160" fill="#1e293b" stroke="#00f0ff" strokeWidth="1" />
              <polygon points="76,160 72,178 88,178 84,160" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
              <polygon points="88,160 86,175 102,175 98,160" fill="#1e293b" stroke="#00f0ff" strokeWidth="1" />

              {/* Engine Exhaust Flame (Animated idle vs ignition blast) */}
              <AnimatePresence>
                {isLaunching ? (
                  // FULL BLAST IGNITION PLUME
                  <motion.g
                    key="blast-flame"
                    initial={{ scaleY: 0.3, opacity: 0 }}
                    animate={{ scaleY: [1, 1.4, 1.2], opacity: [0.9, 1, 0.95] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  >
                    {/* Outer Fire Plume */}
                    <path
                      d="M 60 176 Q 80 260 80 260 Q 80 260 100 176 Z"
                      fill="url(#thrusterFireGrad)"
                      className="filter drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]"
                    />
                    {/* Inner Intense Mach Core */}
                    <path
                      d="M 68 176 Q 80 230 80 230 Q 80 230 92 176 Z"
                      fill="#ffffff"
                    />
                    {/* Side Booster Flames */}
                    <path d="M 44 170 Q 48 205 48 205 Q 48 205 52 170 Z" fill="#38bdf8" />
                    <path d="M 108 170 Q 112 205 112 205 Q 112 205 116 170 Z" fill="#38bdf8" />
                  </motion.g>
                ) : (
                  // IDLE BLUE PLASMA GLOW
                  <motion.g
                    key="idle-flame"
                    animate={{ scaleY: [0.8, 1.1, 0.8], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <polygon points="65,176 80,195 95,176" fill="#00f0ff" opacity="0.8" />
                    <polygon points="72,176 80,188 88,176" fill="#ffffff" />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>

            {/* Launching Smoke Cloud Particles below */}
            {isLaunching && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.4, 0.9, 0], scale: [0.8, 2.5, 4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-24 h-12 bg-gradient-to-t from-amber-500/40 via-cyan-400/50 to-white rounded-full blur-xl -mt-6"
              />
            )}
          </motion.div>
        </div>

        {/* LAUNCH STATUS TEXT WHEN FIRING */}
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-orbitron font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(0,240,255,0.6)] my-2"
          >
            <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
            <span>{t.launchStatus}</span>
          </motion.div>
        )}

        {/* PRIMARY "TOUCH TO BEGIN" INTERACTIVE ACTION BUTTON */}
        {!isLaunching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center mt-2"
          >
            <button
              id="btn-touch-to-begin"
              onClick={() => {
                soundEngine.playTouchBeep();
                handleStartLaunch();
              }}
              className="relative group px-8 sm:px-14 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 text-slate-950 font-orbitron font-extrabold text-lg sm:text-2xl tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_60px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
            >
              {/* Outer Pulsing Aura Ring */}
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60 group-hover:opacity-100 blur-lg transition duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />

              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6 text-slate-950 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                <span>{t.touchToBegin}</span>
                <ChevronRight className="w-6 h-6 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Subtitle helper prompt */}
            <span className="mt-3 text-xs sm:text-sm font-mono text-cyan-300/80 tracking-wide flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>{t.touchSub}</span>
            </span>
          </motion.div>
        )}
      </main>
    </div>
  );
};
