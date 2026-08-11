import { jsPDF } from 'jspdf';
import { BiometricState, LanguageCode } from '../types';
import { TRANSLATIONS, EDUCATIONAL_FACTS } from '../data/exhibitData';

export function downloadPDFReport(state: BiometricState, language: LanguageCode) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const days = state.daysInSpace;
  const monthsVal = (days / 30.4).toFixed(1);

  let decayFactor = Math.min(1.0, days / 730);
  if (state.exerciseCountermeasures) decayFactor *= 0.6;

  const densityPct = (100 - decayFactor * 34).toFixed(1);
  const bmdVal = (1.20 - decayFactor * 0.41).toFixed(2);
  const lossRate = (1.0 + decayFactor * 0.5).toFixed(1);

  let riskLevel = t.riskLevels.normal;
  if (decayFactor > 0.7) riskLevel = t.riskLevels.critical;
  else if (decayFactor > 0.4) riskLevel = t.riskLevels.high;
  else if (decayFactor > 0.15) riskLevel = t.riskLevels.elevated;

  // Colors
  const darkNavy = [11, 19, 43];
  const cyanAccent = [0, 180, 216];
  const darkCard = [20, 29, 58];
  const textWhite = [255, 255, 255];
  const textMuted = [160, 174, 192];
  const emeraldGreen = [16, 185, 129];
  const roseRed = [239, 68, 68];

  // Header Banner
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, 210, 45, 'F');

  // Decorative Accent Bar
  doc.setFillColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.rect(0, 43, 210, 2, 'F');

  // Header Titles
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NATIONAL AERONAUTICS AND SPACE ADMINISTRATION • ISS EXHIBIT BIO-904', 14, 15);

  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.setFontSize(20);
  doc.text('SKELETAL DECAY & BIOMETRIC REPORT', 14, 26);

  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Kiosk Zone 4`, 14, 34);

  // Section 1: Flight Mission Parameters
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(14, 52, 182, 38, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('1. MISSION SIMULATION PARAMETERS', 18, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 60, 80);

  doc.text(`• Flight Duration: ${days} Days (${monthsVal} Months in Microgravity)`, 20, 68);
  doc.text(`• Simulated Environment: Zero-G (International Space Station)`, 20, 75);
  doc.text(`• NASA ARED Exercise Protocol: ${state.exerciseCountermeasures ? 'ACTIVE (+40% Bone Protection)' : 'INACTIVE (Unprotected Decay)'}`, 20, 82);

  // Section 2: Biometric & Bone Mineral Density Analysis
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(14, 96, 182, 85, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.text('2. BIOMETRIC & SKELETAL METRICS', 20, 107);

  // Grid box 1: Density
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(20, 114, 82, 28, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('REMAINING BONE DENSITY', 24, 121);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text(`${densityPct}%`, 24, 134);

  // Grid box 2: BMD
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(108, 114, 82, 28, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('BONE MINERAL DENSITY (BMD)', 112, 121);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text(`${bmdVal} g/cm²`, 112, 134);

  // Grid box 3: Monthly Loss Rate
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(20, 147, 82, 28, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('MONTHLY LOSS RATE', 24, 154);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
  doc.text(`-${lossRate}% / Month`, 24, 167);

  // Grid box 4: Risk Level
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(108, 147, 82, 28, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('FRACTURE RISK INDEX', 112, 154);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  if (decayFactor > 0.4) {
    doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
  } else if (decayFactor > 0.15) {
    doc.setTextColor(245, 158, 11);
  } else {
    doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  }
  doc.text(riskLevel.toUpperCase(), 112, 167);

  // Section 3: Educational Scientific Takeaway
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(14, 188, 182, 36, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(6, 78, 59);
  doc.text('3. KEY SPACE PHYSIOLOGY TAKEAWAY', 20, 197);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 118, 110);
  
  const factText = EDUCATIONAL_FACTS[Math.floor(Math.random() * EDUCATIONAL_FACTS.length)];
  const splitFact = doc.splitTextToSize(factText, 170);
  doc.text(splitFact, 20, 204);

  // Footer / Verification Stamp
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 260, 196, 260);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Official Interactive Kiosk Document • Human Spaceflight Physiology Division', 14, 268);
  doc.text('NASA Human Research Program (HRP) • Bone and Mineral Laboratory', 14, 273);

  // Stamp Box
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(145, 262, 50, 16, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text('VERIFIED DIGITAL COPY', 148, 268);
  doc.setFont('helvetica', 'normal');
  doc.text('BIO-904-STAMP-OK', 148, 273);

  // Trigger Save PDF
  doc.save(`NASA_Skeletal_Report_Day_${days}.pdf`);
}
