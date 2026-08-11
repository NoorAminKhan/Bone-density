import React, { useState, useEffect } from 'react';
import { BiometricState, ViewMode, LanguageCode, AccessibilitySettings } from './types';
import { TRANSLATIONS } from './data/exhibitData';
import { speakText, stopSpeech, pauseSpeech, resumeSpeech, soundEngine } from './utils/audio';

import { BackgroundStarfield } from './components/BackgroundStarfield';
import { HeaderBar } from './components/HeaderBar';
import { AnatomicalViewer } from './components/AnatomicalViewer';
import { BiometricSlider } from './components/BiometricSlider';
import { SidePanelBiometrics } from './components/SidePanelBiometrics';
import { BottomTouchBar } from './components/BottomTouchBar';

import { LanguageModal } from './components/LanguageModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { QRCodeModal } from './components/QRCodeModal';
import { VoiceGuideOverlay } from './components/VoiceGuideOverlay';
import { KioskFrameWrapper } from './components/KioskFrameWrapper';

export default function App() {
  // Biometric Simulation State
  const [biometricState, setBiometricState] = useState<BiometricState>({
    daysInSpace: 0,
    viewMode: 'femur',
    exerciseCountermeasures: false,
    selectedGravity: 'zeroG',
    isPlaying: false,
    playSpeed: 1,
    inspectedHotspot: null
  });

  // Exhibit Preferences & Accessibility
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    voiceGuideActive: false,
    subtitlesEnabled: false,
    reducedMotion: false,
    screenReaderAnnouncements: true
  });

  // Voice Narration Detailed Controls
  const [isVoicePaused, setIsVoicePaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.92);
  const [isOverlayDismissed, setIsOverlayDismissed] = useState(true);

  // Modal Visibility States
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Auto-timeline simulation loop when isPlaying === true
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (biometricState.isPlaying) {
      interval = setInterval(() => {
        setBiometricState(prev => {
          const nextDays = prev.daysInSpace + 5 * prev.playSpeed;
          if (nextDays >= 730) {
            soundEngine.playWarningChime();
            return { ...prev, daysInSpace: 730, isPlaying: false };
          }
          return { ...prev, daysInSpace: nextDays };
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [biometricState.isPlaying, biometricState.playSpeed]);

  // Start Narration Utility
  const playVoiceNarration = (langCode: LanguageCode, rate: number = speechRate) => {
    stopSpeech();
    setIsVoicePaused(false);
    setIsOverlayDismissed(false);
    setAccessibility(prev => ({ ...prev, voiceGuideActive: true }));

    const script = TRANSLATIONS[langCode].voiceGuideScript;
    speakText(script, langCode, {
      rate,
      onEnd: () => {
        setAccessibility(prev => ({ ...prev, voiceGuideActive: false }));
        setIsVoicePaused(false);
      },
      onError: () => {
        setAccessibility(prev => ({ ...prev, voiceGuideActive: false }));
        setIsVoicePaused(false);
      }
    });
  };

  // Toggle Voice Guide from button
  const handleToggleVoiceGuide = () => {
    soundEngine.playTouchBeep();
    if (accessibility.voiceGuideActive) {
      stopSpeech();
      setAccessibility(prev => ({ ...prev, voiceGuideActive: false }));
      setIsVoicePaused(false);
    } else {
      playVoiceNarration(language, speechRate);
    }
  };

  // Pause / Resume Speech Narration
  const handlePauseResumeVoice = () => {
    soundEngine.playTouchBeep();
    if (isVoicePaused) {
      resumeSpeech();
      setIsVoicePaused(false);
    } else {
      pauseSpeech();
      setIsVoicePaused(true);
    }
  };

  // Replay Narration
  const handleReplayVoice = () => {
    soundEngine.playTouchBeep();
    playVoiceNarration(language, speechRate);
  };

  // Speech Speed Adjustment
  const handleChangeSpeechRate = (newRate: number) => {
    soundEngine.playTouchBeep();
    setSpeechRate(newRate);
    if (accessibility.voiceGuideActive) {
      playVoiceNarration(language, newRate);
    }
  };

  // Reset function
  const handleReset = () => {
    stopSpeech();
    setIsVoicePaused(false);
    setBiometricState({
      daysInSpace: 0,
      viewMode: 'femur',
      exerciseCountermeasures: false,
      selectedGravity: 'zeroG',
      isPlaying: false,
      playSpeed: 1,
      inspectedHotspot: null
    });
    setAccessibility(prev => ({ ...prev, voiceGuideActive: false }));
  };

  // Preset Scenario Applicator
  const handleApplyScenario = (days: number, exercise: boolean) => {
    soundEngine.playTouchBeep();
    setBiometricState(prev => ({
      ...prev,
      daysInSpace: days,
      exerciseCountermeasures: exercise,
      isPlaying: false
    }));
  };

  // Calculate current decay ratio for background and visual tint
  const decayRatio = Math.min(1.0, biometricState.daysInSpace / 730);

  return (
    <KioskFrameWrapper
      highContrast={accessibility.highContrast}
      onApplyScenario={handleApplyScenario}
    >
      <div
        className={`relative w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden ${
          accessibility.largeText ? 'text-lg large-text' : ''
        }`}
      >
        {/* Deep Space Starfield & Bioluminescent Particle Background */}
        <BackgroundStarfield
          decayLevel={decayRatio}
          reducedMotion={accessibility.reducedMotion}
        />

        {/* TOP THIRD: EXHIBIT TITLE & METADATA */}
        <HeaderBar
          language={language}
          onOpenLanguageModal={() => setIsLangModalOpen(true)}
          daysInSpace={biometricState.daysInSpace}
        />

        {/* MAIN EXHIBIT CONTENT BODY (Responsive Portrait Grid) */}
        <main className="relative z-10 flex-1 w-full px-4 sm:px-6 py-2 flex flex-col lg:flex-row gap-4 items-stretch justify-center max-w-7xl mx-auto">
          {/* CENTER: ANATOMICAL VISUALIZATION ENGINE */}
          <div className="flex-1 flex flex-col items-center justify-between min-h-[380px]">
            <AnatomicalViewer
              state={biometricState}
              language={language}
              onSelectViewMode={(mode) => setBiometricState(prev => ({ ...prev, viewMode: mode }))}
              onSelectHotspot={(spot) => setBiometricState(prev => ({ ...prev, inspectedHotspot: spot }))}
            />

            {/* HORIZONTAL BIOMETRIC SLIDER CONTROL */}
            <BiometricSlider
              state={biometricState}
              language={language}
              onChangeDays={(days) => setBiometricState(prev => ({ ...prev, daysInSpace: days }))}
              onTogglePlay={() => setBiometricState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
              onToggleCountermeasures={() => setBiometricState(prev => ({ ...prev, exerciseCountermeasures: !prev.exerciseCountermeasures }))}
              onSelectSpeed={(spd) => setBiometricState(prev => ({ ...prev, playSpeed: spd }))}
            />
          </div>

          {/* RIGHT / SIDE PANEL: REAL-TIME BIOMETRIC READOUTS & CHARTS */}
          <SidePanelBiometrics
            state={biometricState}
            language={language}
          />
        </main>

        {/* BOTTOM ACCESSIBLE TOUCH BAR */}
        <BottomTouchBar
          language={language}
          voiceActive={accessibility.voiceGuideActive}
          subtitlesActive={accessibility.subtitlesEnabled}
          accessibilityActive={accessibility.highContrast || accessibility.largeText}
          onReset={handleReset}
          onToggleVoice={handleToggleVoiceGuide}
          onToggleSubtitles={() => setAccessibility(prev => ({ ...prev, subtitlesEnabled: !prev.subtitlesEnabled }))}
          onOpenAccessibility={() => setIsAccessModalOpen(true)}
          onOpenQR={() => setIsQRModalOpen(true)}
        />

        {/* MODALS & OVERLAYS */}
        <LanguageModal
          isOpen={isLangModalOpen}
          currentLang={language}
          onSelectLanguage={(lang) => {
            setLanguage(lang);
            if (accessibility.voiceGuideActive) {
              playVoiceNarration(lang, speechRate);
            }
          }}
          onClose={() => setIsLangModalOpen(false)}
        />

        <AccessibilityModal
          isOpen={isAccessModalOpen}
          settings={accessibility}
          onUpdateSettings={(newSettings) => setAccessibility(newSettings)}
          onClose={() => setIsAccessModalOpen(false)}
        />

        <QRCodeModal
          isOpen={isQRModalOpen}
          state={biometricState}
          language={language}
          onClose={() => setIsQRModalOpen(false)}
        />

        {!isOverlayDismissed && (
          <VoiceGuideOverlay
            isVoiceActive={accessibility.voiceGuideActive}
            isPaused={isVoicePaused}
            language={language}
            subtitlesActive={accessibility.subtitlesEnabled}
            speechRate={speechRate}
            onToggleVoice={handleToggleVoiceGuide}
            onPauseResume={handlePauseResumeVoice}
            onReplay={handleReplayVoice}
            onChangeRate={handleChangeSpeechRate}
            onClose={() => setIsOverlayDismissed(true)}
          />
        )}
      </div>
    </KioskFrameWrapper>
  );
}
