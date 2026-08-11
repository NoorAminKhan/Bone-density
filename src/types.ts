export type LanguageCode = 'en' | 'es' | 'bn' | 'fr' | 'de';

export type ViewMode = 'femur' | 'skeleton' | 'vertebrae' | 'cellular';

export type GravityLevel = 'zeroG' | 'mars' | 'moon' | 'earth';

export interface BiometricState {
  daysInSpace: number; // 0 to 730 days (0 to 24 months)
  viewMode: ViewMode;
  exerciseCountermeasures: boolean; // ARED exercise + nutrition active
  selectedGravity: GravityLevel;
  isPlaying: boolean;
  playSpeed: number; // 1x, 2x, 5x
  inspectedHotspot: string | null;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  voiceGuideActive: boolean;
  subtitlesEnabled: boolean;
  reducedMotion: boolean;
  screenReaderAnnouncements: boolean;
}

export interface HotspotInfo {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  normalLossRate: string; // e.g., "-1.4% / month"
  description: string;
  impactAt24m: string;
}

export interface LanguageTranslation {
  title: string;
  subtitle: string;
  timeMarkers: {
    day0: string;
    month3: string;
    month6: string;
    month12: string;
    month24: string;
  };
  metrics: {
    simulatedDensity: string;
    boneMineralDensity: string;
    lossRate: string;
    fractureRisk: string;
    calciumExcretion: string;
    muscleAtrophy: string;
    countermeasures: string;
    countermeasuresActive: string;
    countermeasuresOff: string;
  };
  gravityLabels: {
    zeroG: string;
    mars: string;
    moon: string;
    earth: string;
  };
  views: {
    femur: string;
    skeleton: string;
    vertebrae: string;
    cellular: string;
  };
  riskLevels: {
    normal: string;
    elevated: string;
    high: string;
    critical: string;
  };
  buttons: {
    reset: string;
    voiceGuide: string;
    language: string;
    accessibility: string;
    qrTakeaway: string;
    subtitles: string;
    play: string;
    pause: string;
  };
  voiceGuideScript: string;
}
