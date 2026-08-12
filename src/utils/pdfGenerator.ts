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
  const tScoreVal = (0.0 - decayFactor * 3.2).toFixed(1);
  const calciumLossMg = Math.round(150 + decayFactor * 250);
  const muscleLossPct = (decayFactor * 22).toFixed(1);

  let riskLevel = t.riskLevels.normal;
  if (decayFactor > 0.7) riskLevel = t.riskLevels.critical;
  else if (decayFactor > 0.4) riskLevel = t.riskLevels.high;
  else if (decayFactor > 0.15) riskLevel = t.riskLevels.elevated;

  // Colors
  const darkNavy = [11, 19, 43];
  const cyanAccent = [0, 180, 216];
  const darkCard = [20, 29, 58];
  const lightBg = [245, 247, 250];
  const textWhite = [255, 255, 255];
  const textDark = [15, 23, 42];
  const textMuted = [100, 116, 139];
  const emeraldGreen = [16, 185, 129];
  const amberYellow = [245, 158, 11];
  const roseRed = [239, 68, 68];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const reportID = `NASA-BIO-904-${Math.floor(100000 + Math.random() * 900000)}`;

  // ==================== PAGE 1 ====================

  // Header Banner
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Decorative Accent Bar
  doc.setFillColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.rect(0, 40, 210, 2, 'F');

  // Header Titles
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('NATIONAL AERONAUTICS AND SPACE ADMINISTRATION • HUMAN RESEARCH PROGRAM', 14, 12);

  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.setFontSize(16);
  doc.text('COMPREHENSIVE SKELETAL & BIOMETRIC REPORT', 14, 22);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 210, 225);
  doc.text(`Document ID: ${reportID} | Date: ${dateStr} ${timeStr} | Kiosk Zone 4`, 14, 30);
  doc.text(`Subject Mission: ISS / Deep Space Simulation | Target: Femur & Spine Micro-CT Analysis`, 14, 35);

  // Section 1: Mission Simulation Profile
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, 46, 182, 38, 3, 3, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(14, 46, 182, 38, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('1. MISSION PROFILE & COUNTERMEASURE PARAMETERS', 18, 53);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 65, 85);

  doc.text(`• Simulation Duration: ${days} Days (${monthsVal} Months in Microgravity)`, 20, 60);
  doc.text(`• Gravitational Environment: 0.00G (Microgravity Low Earth Orbit)`, 20, 66);
  doc.text(`• NASA ARED Exercise Protocol: ${state.exerciseCountermeasures ? 'ACTIVE (+40% Trabecular Bone Retention)' : 'INACTIVE (Unprotected Rapid Degradation)'}`, 20, 72);
  doc.text(`• Dietary Fortification: Standard ISS Calcium (1200mg/day) & Vitamin D3 (800 IU)`, 20, 78);

  // Section 2: Biometric & Bone Mineral Density Analysis
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(14, 88, 182, 82, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.text('2. CORE SKELETAL & BIOMETRIC METRICS', 20, 97);

  // Grid box 1: Remaining Bone Density
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(20, 102, 82, 28, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('REMAINING TOTAL BONE DENSITY', 24, 108);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  if (parseFloat(densityPct) > 85) doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  else if (parseFloat(densityPct) > 70) doc.setTextColor(amberYellow[0], amberYellow[1], amberYellow[2]);
  else doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
  doc.text(`${densityPct}%`, 24, 122);

  // Grid box 2: Bone Mineral Density (BMD)
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(108, 102, 82, 28, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('FEMORAL BMD (g/cm²)', 112, 108);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text(`${bmdVal} g/cm²`, 112, 122);

  // Grid box 3: Monthly Loss Rate
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(20, 134, 82, 28, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('MONTHLY LOSS RATE', 24, 140);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
  doc.text(`-${lossRate}% / Month`, 24, 154);

  // Grid box 4: Fracture Risk & T-Score
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.roundedRect(108, 134, 82, 28, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('T-SCORE & FRACTURE RISK INDEX', 112, 140);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  if (decayFactor > 0.4) doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
  else if (decayFactor > 0.15) doc.setTextColor(amberYellow[0], amberYellow[1], amberYellow[2]);
  else doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
  doc.text(`T: ${tScoreVal} (${riskLevel})`, 112, 154);

  // Section 3: Anatomical Region Analysis Breakdown
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, 175, 182, 54, 3, 3, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(14, 175, 182, 54, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('3. ANATOMICAL REGION DECAY BREAKDOWN', 18, 183);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  // Row 1: Femur Neck
  doc.setFont('helvetica', 'bold');
  doc.text('• Proximal Femur (Thigh Bone):', 20, 191);
  doc.setFont('helvetica', 'normal');
  doc.text(`Trabecular density reduced by ${(decayFactor * 36).toFixed(1)}%. Femoral neck fracture risk elevated.`, 72, 191);

  // Row 2: Lumbar Spine L3
  doc.setFont('helvetica', 'bold');
  doc.text('• Lumbar Spine L3:', 20, 198);
  doc.setFont('helvetica', 'normal');
  doc.text(`Trabecular thinning ${(decayFactor * 28).toFixed(1)}%. Disuse decompression height change: +${(decayFactor * 2.4).toFixed(1)} cm.`, 72, 198);

  // Row 3: Calcaneus
  doc.setFont('helvetica', 'bold');
  doc.text('• Calcaneus (Heel Bone):', 20, 205);
  doc.setFont('helvetica', 'normal');
  doc.text(`Load-bearing heel loss rate: -${(decayFactor * 32).toFixed(1)}%. Rapid unweighting impact.`, 72, 205);

  // Row 4: Cellular Remodeling
  doc.setFont('helvetica', 'bold');
  doc.text('• Cellular Remodeling Ratio:', 20, 212);
  doc.setFont('helvetica', 'normal');
  doc.text(`Osteoclasts +${Math.round(decayFactor * 130)}% activity | Osteoblasts -${Math.round(decayFactor * 40)}% formation.`, 72, 212);

  // Row 5: Urinary Calcium & Kidney Stone Index
  doc.setFont('helvetica', 'bold');
  doc.text('• Urinary Calcium Excretion:', 20, 219);
  doc.setFont('helvetica', 'normal');
  doc.text(`${calciumLossMg} mg/day (Elevated hypercalciuria & renal stone formation risk).`, 72, 219);

  // Section 4: Key Science Takeaway Box
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(14, 234, 182, 28, 3, 3, 'F');
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(14, 234, 182, 28, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(6, 78, 59);
  doc.text('4. KEY SPACE PHYSIOLOGY SCIENCE TAKEAWAY', 20, 242);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 110);

  const factText = EDUCATIONAL_FACTS[Math.floor(Math.random() * EDUCATIONAL_FACTS.length)];
  const splitFact = doc.splitTextToSize(factText, 170);
  doc.text(splitFact, 20, 249);

  // Page 1 Footer Line
  doc.setDrawColor(210, 215, 225);
  doc.line(14, 268, 196, 268);

  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Page 1 of 2 • NASA Human Research Program • Official Space Biomedical Document', 14, 274);
  doc.text('CONFIDENTIAL MEDICAL SIMULATION DATA', 14, 278);

  // Page 1 Stamp Box
  doc.setFillColor(240, 243, 248);
  doc.roundedRect(145, 270, 51, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('VERIFIED DIGITAL COPY', 148, 275);
  doc.setFont('helvetica', 'normal');
  doc.text('NASA-HRP-VERIFIED-OK', 148, 280);

  // ==================== PAGE 2 ====================
  doc.addPage();

  // Page 2 Header Banner
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setFillColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.rect(0, 26, 210, 2, 'F');

  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('HUMAN RESEARCH PROGRAM • REHABILITATION & MEDICAL PROTOCOLS', 14, 11);

  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.setFontSize(13);
  doc.text('POST-FLIGHT RECOVERY & CLINICAL RECOMMENDATIONS', 14, 20);

  // Section 5: Post-Landing Terrestrial Rehabilitation Protocol
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, 34, 182, 60, 3, 3, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(14, 34, 182, 60, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('5. EARTH 1G RE-ADAPTATION & REHABILITATION TIMELINE', 18, 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 65, 85);

  const recoveryMonths = Math.max(6, Math.round((days / 30.4) * 2.5));

  doc.text(`• Projected Full Recovery Time: ~${recoveryMonths} Months of Terrestrial 1G Re-weighting`, 20, 50);
  doc.text(`• Immediate Post-Landing Hazard: High risk of calcaneal & femoral neck fractures upon 1G impact`, 20, 57);
  doc.text(`• Phase 1 (Months 1-3): Non-impact aqua therapy, gradual axial loading, resistive leg presses`, 20, 64);
  doc.text(`• Phase 2 (Months 4-12): Progressive weight-bearing exercise, DEXA scan monitoring every 90 days`, 20, 71);
  doc.text(`• Pharmacological Countermeasures: Bisphosphonate therapy (Zoledronic Acid) & Teriparatide if T-score < -2.0`, 20, 78);
  doc.text(`• Muscle Atrophy Recovery: Parallel muscle mass loss (${muscleLossPct}%) requires active electromyostimulation`, 20, 85);

  // Section 6: Recovery Projection Table
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(14, 100, 182, 68, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.text('6. PROJECTED POST-FLIGHT BONE DENSITY RECOVERY TABLE', 20, 109);

  // Table Header Row
  doc.setFillColor(darkCard[0], darkCard[1], darkCard[2]);
  doc.rect(20, 114, 170, 8, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('TIME POST-LANDING', 24, 119.5);
  doc.text('ESTIMATED DENSITY', 75, 119.5);
  doc.text('ESTIMATED BMD', 122, 119.5);
  doc.text('CLINICAL STATUS', 158, 119.5);

  // Table Rows Data
  const tableData = [
    { time: 'Touchdown (Day 0)', pct: `${densityPct}%`, bmd: `${bmdVal} g/cm²`, status: riskLevel },
    { time: 'Month 3 Post-Flight', pct: `${(parseFloat(densityPct) + (100 - parseFloat(densityPct)) * 0.25).toFixed(1)}%`, bmd: `${(parseFloat(bmdVal) + 0.08).toFixed(2)} g/cm²`, status: 'Re-adapting' },
    { time: 'Month 12 Post-Flight', pct: `${(parseFloat(densityPct) + (100 - parseFloat(densityPct)) * 0.65).toFixed(1)}%`, bmd: `${(parseFloat(bmdVal) + 0.22).toFixed(2)} g/cm²`, status: 'Moderate Gain' },
    { time: 'Month 24 Post-Flight', pct: `${Math.min(98.5, parseFloat(densityPct) + (100 - parseFloat(densityPct)) * 0.90).toFixed(1)}%`, bmd: `1.16 g/cm²`, status: 'Near Baseline' }
  ];

  tableData.forEach((row, idx) => {
    const yPos = 128 + idx * 9;
    doc.setFillColor(idx % 2 === 0 ? 28 : 22, 38, 70);
    doc.rect(20, yPos - 5, 170, 8, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(220, 230, 245);

    doc.text(row.time, 24, yPos);
    doc.text(row.pct, 75, yPos);
    doc.text(row.bmd, 122, yPos);

    doc.setFont('helvetica', 'bold');
    if (row.status === riskLevel && decayFactor > 0.4) doc.setTextColor(roseRed[0], roseRed[1], roseRed[2]);
    else doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
    doc.text(row.status, 158, yPos);
  });

  // Section 7: Scientific Reference & Summary
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, 175, 182, 58, 3, 3, 'F');
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(14, 175, 182, 58, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('7. SPACE PHYSIOLOGY MECHANISMS & RESEARCH SUMMARY', 18, 184);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 65, 85);

  const summaryParagraph = `Microgravity removes the normal gravity vector (1G), inhibiting mechanotransduction signals in osteocytes. Without physical strain, bone remodeling becomes heavily skewed toward resorption. ARED (Advanced Resistive Exercise Device) delivers up to 600 lbs of artificial load to imitate Earth gravity, significantly slowing but not completely stopping bone loss. Research continues on the International Space Station to develop artificial gravity centrifuges and targeted pharmacological therapies for future crewed missions to Mars.`;

  const splitSummary = doc.splitTextToSize(summaryParagraph, 172);
  doc.text(splitSummary, 20, 192);

  // Certification Sign-off
  doc.setDrawColor(200, 205, 215);
  doc.line(20, 246, 90, 246);
  doc.line(110, 246, 180, 246);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('NASA Human Research Program Officer', 20, 251);
  doc.text('Chief Space Biomedical Officer', 110, 251);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Digital Signature Verified: HRP-SEC-889', 20, 255);
  doc.text('Exhibit Zone 4 Interactive System', 110, 255);

  // Page 2 Footer
  doc.setDrawColor(210, 215, 225);
  doc.line(14, 268, 196, 268);

  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Page 2 of 2 • NASA Human Research Program • Spaceflight Skeletal Degradation Report', 14, 274);
  doc.text(`Generated for Visitor Astronaut | Document Hash: ${reportID}`, 14, 278);

  // Save File Trigger
  doc.save(`NASA_Skeletal_Biometric_Report_${days}_Days.pdf`);
}
