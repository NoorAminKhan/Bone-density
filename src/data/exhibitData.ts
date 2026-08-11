import { LanguageCode, LanguageTranslation, HotspotInfo } from '../types';

export const TRANSLATIONS: Record<LanguageCode, LanguageTranslation> = {
  en: {
    title: "BONE DENSITY DECAY",
    subtitle: "Simulate Skeletal Degradation in Zero Gravity",
    timeMarkers: {
      day0: "Day 0 (Launch)",
      month3: "Month 3 (ISS Orbit)",
      month6: "Month 6 (Standard Mission)",
      month12: "Month 12 (Deep Space)",
      month24: "Month 24 (Mars Mission)"
    },
    metrics: {
      simulatedDensity: "SIMULATED BONE DENSITY",
      boneMineralDensity: "BONE MINERAL DENSITY",
      lossRate: "MONTHLY LOSS RATE",
      fractureRisk: "FRACTURE RISK INDEX",
      calciumExcretion: "URINARY CALCIUM LOSS",
      muscleAtrophy: "MUSCLE ATROPHY LINK",
      countermeasures: "NASA ARED EXERCISE PROTOCOL",
      countermeasuresActive: "RESISTIVE EXERCISE ACTIVE (+40% BONE RETENTION)",
      countermeasuresOff: "UNPROTECTED ZERO-G DECAY"
    },
    gravityLabels: {
      zeroG: "Zero-G (ISS)",
      mars: "Mars (0.38G)",
      moon: "Moon (0.16G)",
      earth: "Earth (1.00G)"
    },
    views: {
      femur: "Femur Cross-Section",
      skeleton: "Full Skeleton Heatmap",
      vertebrae: "Lumbar Vertebra L3",
      cellular: "Micro-CT Osteoclast Lattice"
    },
    riskLevels: {
      normal: "OPTIMAL (EARTH BASELINE)",
      elevated: "ELEVATED (OSTEOPENIA)",
      high: "HIGH RISK (OSTEOPOROSIS)",
      critical: "CRITICAL STRUCTURAL FAILURE"
    },
    buttons: {
      reset: "RESET",
      voiceGuide: "VOICE GUIDE",
      language: "LANGUAGE",
      accessibility: "ACCESSIBILITY MODE",
      qrTakeaway: "SAVE REPORT (PDF)",
      subtitles: "CAPTIONS ON",
      play: "SIMULATE",
      pause: "PAUSE"
    },
    voiceGuideScript: "Welcome to Exhibit Zone 4. In microgravity, the human body no longer feels the continuous pull of Earth's gravity. Without mechanical loading, osteoclast cells breakdown bone tissue faster than osteoblast cells can rebuild it. An astronaut loses 1 to 1.5 percent of bone density every single month in space — equivalent to decades of terrestrial aging in just one year. Drag the timeline slider to observe trabecular degradation."
  },
  es: {
    title: "DEGRADACIÓN DE LA DENSIDAD ÓSEA",
    subtitle: "Simular la Degradación Esquelética en Gravedad Cero",
    timeMarkers: {
      day0: "Día 0 (Lanzamiento)",
      month3: "Mes 3 (Órbita EEI)",
      month6: "Mes 6 (Misión Estándar)",
      month12: "Mes 12 (Espacio Profundo)",
      month24: "Mes 24 (Misión a Marte)"
    },
    metrics: {
      simulatedDensity: "DENSIDAD ÓSEA SIMULADA",
      boneMineralDensity: "DENSIDAD MINERAL ÓSEA",
      lossRate: "TASA DE PÉRDIDA MENSUAL",
      fractureRisk: "ÍNDICE DE RIESGO DE FRACTURA",
      calciumExcretion: "PÉRDIDA DE CALCIO URINARIO",
      muscleAtrophy: "ENLACE ATROFIA MUSCULAR",
      countermeasures: "PROTOCOLO DE EJERCICIO ARED NASA",
      countermeasuresActive: "EJERCICIO RESISTIVO ACTIVO (+40% RETENCIÓN ÓSEA)",
      countermeasuresOff: "DEGRADACIÓN SIN PROTECCIÓN"
    },
    gravityLabels: {
      zeroG: "Gravedad Cero (EEI)",
      mars: "Marte (0.38G)",
      moon: "Luna (0.16G)",
      earth: "Tierra (1.00G)"
    },
    views: {
      femur: "Corte Transversal del Fémur",
      skeleton: "Mapa de Calor Esquelético",
      vertebrae: "Vértebra Lumbar L3",
      cellular: "Malla Osteoclástica Micro-CT"
    },
    riskLevels: {
      normal: "ÓPTIMO (LÍNEA DE BASE)",
      elevated: "ELEVADO (OSTEOPENIA)",
      high: "ALTO RIESGO (OSTEOPOROSIS)",
      critical: "FALLO ESTRUCTURAL CRÍTICO"
    },
    buttons: {
      reset: "REINICIAR",
      voiceGuide: "GUÍA DE VOZ",
      language: "IDIOMA",
      accessibility: "MODO ACCESIBILIDAD",
      qrTakeaway: "GUARDAR (QR)",
      subtitles: "SUBTÍTULOS",
      play: "SIMULAR",
      pause: "PAUSAR"
    },
    voiceGuideScript: "Bienvenido a la Zona de Exhibición 4. En microgravedad, el cuerpo humano ya no siente la atracción constante de la Tierra. Sin carga mecánica, las células osteoclásticas destruyen tejido óseo más rápido de lo que las células osteoblásticas pueden reconstruirlo."
  },
  bn: {
    title: "অস্থির ঘনত্ব হ্রাসের সিমুলেশন",
    subtitle: "মহাশূন্যের শূন্য মহাকর্ষে কঙ্কালের ক্ষয় সিমুলেট করুন",
    timeMarkers: {
      day0: "দিন ০ (উৎক্ষেপণ)",
      month3: "মাস ৩ (আইএসএস কক্ষপথ)",
      month6: "মাস ৬ (মানক মিশন)",
      month12: "মাস ১২ (গভীর মহাকাশ)",
      month24: "মাস ২৪ (মঙ্গল মিশন)"
    },
    metrics: {
      simulatedDensity: "সিমুলেটেড অস্থির ঘনত্ব",
      boneMineralDensity: "অস্থি খনিজ ঘনত্ব (বিএমডি)",
      lossRate: "মাসিক হ্রাসের হার",
      fractureRisk: "অস্থি ভাঙার ঝুঁকি সূচক",
      calciumExcretion: "মূত্রে ক্যালসিয়াম ক্ষয়",
      muscleAtrophy: "পেশী ক্ষয় সংযোগ",
      countermeasures: "নাফা এআরইডি ব্যায়াম প্রোটোকল",
      countermeasuresActive: "প্রতিরোধী ব্যায়াম সক্রিয় (+৪০% অস্থি রক্ষা)",
      countermeasuresOff: "সুরক্ষাহীন শূন্য-জি ক্ষয়"
    },
    gravityLabels: {
      zeroG: "শূন্য-জি (আইএসএস)",
      mars: "মঙ্গল গ্রহ (০.৩৮G)",
      moon: "চাঁদ (০.১৬G)",
      earth: "পৃথিবী (১.০০G)"
    },
    views: {
      femur: "ফিমার প্রস্থচ্ছেদ",
      skeleton: "পূর্ণ কঙ্কাল হিটম্যাপ",
      vertebrae: "কটিদেশীয় কশেরুকা L3",
      cellular: "মাইক্রো-সিটি অস্টিওক্ল্যাস্ট ল্যাটিস"
    },
    riskLevels: {
      normal: "সর্বোত্তম (পৃথিবীর মানদণ্ড)",
      elevated: "উচ্চ ঝুঁকি (অস্টিওপেনিয়া)",
      high: "অত্যধিক ঝুঁকি (অস্টিওপোরোসিস)",
      critical: "গুরুতর কাঠামোগত ব্যর্থতা"
    },
    buttons: {
      reset: "পুনরায় সেট করুন",
      voiceGuide: "ভয়েস গাইড",
      language: "ভাষা নির্বাচন",
      accessibility: "অ্যাক্সেসিবিলিটি মোড",
      qrTakeaway: "রিপোর্ট ডাউনলোড (PDF)",
      subtitles: "ক্যাপশন চালু",
      play: "সিমুলেট করুন",
      pause: "থামান"
    },
    voiceGuideScript: "প্রদর্শনী জোন ৪-এ স্বাগতম। শূন্য মহাকর্ষে মানবদেহে পৃথিবীর মাধ্যাকর্ষণ বলের অনুভূতি থাকে না। যান্ত্রিক চাপ না থাকায় অস্টিওক্ল্যাস্ট কোষগুলো অস্টিওব্লাস্ট কোষের পুনর্গঠনের চেয়ে দ্রুত হাড়ের টিস্যু ক্ষয় করে। মহাকাশচারীরা প্রতি মাসে ১ থেকে ১.৫ শতাংশ অস্থি খনিজ ঘনত্ব হারান।"
  },
  fr: {
    title: "DÉGRADATION DE LA DENSITÉ OSSEUSE",
    subtitle: "Simulez la Dégradation Squelettique en Impesanteur",
    timeMarkers: {
      day0: "Jour 0 (Lancement)",
      month3: "Mois 3 (In Orbit ISS)",
      month6: "Mois 6 (Mission Standard)",
      month12: "Mois 12 (Espace Profond)",
      month24: "Mois 24 (Mission Mars)"
    },
    metrics: {
      simulatedDensity: "DENSITÉ OSSEUSE SIMULÉE",
      boneMineralDensity: "DENSITÉ MINÉRALE OSSEUSE",
      lossRate: "TAUX DE PERTE MENSUEL",
      fractureRisk: "INDICE DE RISQUE DE FRACTURE",
      calciumExcretion: "PERTE DE CALCIUM URINAIRE",
      muscleAtrophy: "LIEN ATROPHIE MUSCULAIRE",
      countermeasures: "PROTOCOLE D'EXERCICE ARED NASA",
      countermeasuresActive: "EXERCICE RESISTIF ACTIF (+40% RÉTENTION)",
      countermeasuresOff: "DÉGRADATION SANS PROTECTION"
    },
    gravityLabels: {
      zeroG: "Impesanteur (ISS)",
      mars: "Mars (0.38G)",
      moon: "Lune (0.16G)",
      earth: "Terre (1.00G)"
    },
    views: {
      femur: "Coupe Transversale du Fémur",
      skeleton: "Carte Thermique du Squelette",
      vertebrae: "Vertèbre Lumbaire L3",
      cellular: "Réseau Micro-CT Ostéoclastique"
    },
    riskLevels: {
      normal: "OPTIMAL (BASE TERRESTRE)",
      elevated: "ÉLEVÉ (OSTÉOPÉNIE)",
      high: "RISQUE ÉLEVÉ (OSTÉOPOROSE)",
      critical: "DÉFAILLANCE STRUCTURELLE"
    },
    buttons: {
      reset: "RÉINITIALISER",
      voiceGuide: "GUIDE VOCAL",
      language: "LANGUE",
      accessibility: "MODE ACCESSIBILITÉ",
      qrTakeaway: "SAUVEGARDER (QR)",
      subtitles: "SOUS-TITRES",
      play: "SIMULER",
      pause: "PAUSE"
    },
    voiceGuideScript: "Bienvenue dans la zone d'exposition 4. En microgravité, le corps humain ne ressent plus l'attraction gravitationnelle constante de la Terre. Sans charge mécanique, les ostéoclastes détruisent le tissu osseux plus rapidement que les ostéoblastes ne peuvent le reconstruire."
  },
  de: {
    title: "KNOCHENDICHTE-ABBAU",
    subtitle: "Simulation des Skelettabbaus in der Schwerelosigkeit",
    timeMarkers: {
      day0: "Tag 0 (Start)",
      month3: "Monat 3 (ISS Orbit)",
      month6: "Monat 6 (Standardmission)",
      month12: "Monat 12 (Deep Space)",
      month24: "Monat 24 (Marsmission)"
    },
    metrics: {
      simulatedDensity: "SIMULIERTE KNOCHENDICHTE",
      boneMineralDensity: "KNOCHENMINERALDICHTE",
      lossRate: "MONATLICHER VERLUST",
      fractureRisk: "FRAKTURRISIKO-INDEX",
      calciumExcretion: "URINÄRER KALZIUMVERLUST",
      muscleAtrophy: "MUSKELATROPHIE-LINK",
      countermeasures: "NASA ARED TRAININGSPROTOKOLL",
      countermeasuresActive: "WIDERSTANDSTRAINING AKTIV (+40% SCHUTZ)",
      countermeasuresOff: "UNGESCHÜTZTER SCHWERELOSER ABBAU"
    },
    gravityLabels: {
      zeroG: "Schwerelos (ISS)",
      mars: "Mars (0.38G)",
      moon: "Mond (0.16G)",
      earth: "Erde (1.00G)"
    },
    views: {
      femur: "Oberschenkelknochen-Querschnitt",
      skeleton: "Skelett-Heatmap",
      vertebrae: "Lendenwirbel L3",
      cellular: "Micro-CT Osteoklasten-Gitter"
    },
    riskLevels: {
      normal: "OPTIMAL (ERDBASELINE)",
      elevated: "ERHÖHT (OSTEOPENIE)",
      high: "HOCHES RISIKO (OSTEOPOROSE)",
      critical: "KRITISCHES STRUKTURVERSAGEN"
    },
    buttons: {
      reset: "ZURÜCKSETZEN",
      voiceGuide: "SPRACHAGUIDE",
      language: "SPRACHE",
      accessibility: "BARRIEREFREIHEIT",
      qrTakeaway: "REPORT SPEICHERN (QR)",
      subtitles: "UNTERTITEL EIN",
      play: "SIMULIEREN",
      pause: "PAUSE"
    },
    voiceGuideScript: "Willkommen in Ausstellungszone 4. In der Mikrogravitation spürt der menschliche Körper nicht mehr die kontinuierliche Anziehungskraft der Erde. Ohne mechanische Belastung bauen Osteoklasten Knochengewebe schneller ab, als Osteoblasten es wieder aufbauen können."
  }
};

export const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'femoral_head',
    name: 'Femoral Neck & Head',
    x: 48,
    y: 35,
    normalLossRate: '-1.4% / month',
    description: 'Bear weight bearing hip junction. Trabecular struts thin rapidly, creating high vulnerability to impact upon planetary return.',
    impactAt24m: '33.6% total mineral mass reduction. High risk of avascular necrosis and spontaneous neck fracture.'
  },
  {
    id: 'lumbar_spine',
    name: 'Lumbar Vertebrae (L1-L5)',
    x: 50,
    y: 48,
    normalLossRate: '-1.2% / month',
    description: 'Intervertebral spinal discs expand in zero-G causing height increases (1-3 inches), but cancellous vertebral bodies suffer severe density loss.',
    impactAt24m: '28.8% density loss. Significant compression fracture vulnerability under 1G deceleration forces.'
  },
  {
    id: 'calcaneus',
    name: 'Calcaneus (Heel Bone)',
    x: 54,
    y: 88,
    normalLossRate: '-1.5% / month',
    description: 'The primary weight-bearing heel bone loses up to 1.8% per month without ground reaction impact forces.',
    impactAt24m: '36.0% mass reduction. Severe heel spur & trabecular porous breakdown.'
  },
  {
    id: 'skull',
    name: 'Cranial Vault (Skull)',
    x: 50,
    y: 12,
    normalLossRate: '0.0% / month (Protected)',
    description: 'Cephalad fluid shift increases intracranial pressure, keeping head and upper facial bones paradoxically dense or slightly hypertrophied.',
    impactAt24m: '0% density loss (Fluid shift retains mineral density, but risks space-flight associated neuro-ocular syndrome SANS).'
  }
];

export const EDUCATIONAL_FACTS = [
  "In space, astronauts excrete over 250 mg of calcium daily into their bloodstream and urine, raising kidney stone risk.",
  "Without gravity, osteoclasts (bone destroyers) remain active while osteoblasts (bone builders) go dormant.",
  "12 months in zero-G causes bone loss equivalent to 30 years of post-menopausal osteoporosis on Earth.",
  "NASA's ARED (Advanced Resistive Exercise Device) delivers up to 600 lbs of load to simulate Earth gravity forces.",
  "Upon returning to Earth, recovering lost space bone mass takes up to 3 to 4 times as long as the duration spent in space."
];
