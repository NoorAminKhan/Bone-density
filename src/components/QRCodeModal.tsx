import React, { useState } from 'react';
import { BiometricState, LanguageCode } from '../types';
import { TRANSLATIONS, EDUCATIONAL_FACTS } from '../data/exhibitData';
import { soundEngine } from '../utils/audio';
import { downloadPDFReport } from '../utils/pdfGenerator';
import { FileText, X, Download, Award, Check } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  state: BiometricState;
  language: LanguageCode;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  state,
  language,
  onClose
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const days = state.daysInSpace;
  let decayFactor = Math.min(1.0, days / 730);
  if (state.exerciseCountermeasures) decayFactor *= 0.6;

  const densityPct = (100 - decayFactor * 34).toFixed(1);
  const bmdVal = (1.20 - decayFactor * 0.41).toFixed(2);
  const monthsVal = (days / 30.4).toFixed(1);

  const handleDownloadPDF = () => {
    soundEngine.playTouchBeep();
    downloadPDFReport(state, language);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-6 rounded-3xl glass-panel border border-cyan-400/50 shadow-[0_0_50px_rgba(0,240,255,0.3)] flex flex-col gap-4 text-slate-100">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <h2 className="font-orbitron font-bold text-base text-cyan-200 uppercase tracking-wider">
              VISITOR ASTRONAUT REPORT
            </h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playTouchBeep();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Card Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-orbitron text-cyan-400 block">NASA ISS EXHIBIT BIO-904</span>
              <h3 className="font-orbitron font-bold text-sm text-white">SKELETAL DECAY REPORT</h3>
            </div>
            <Award className="w-6 h-6 text-amber-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">FLIGHT DURATION</span>
              <strong className="text-cyan-300">{days} DAYS ({monthsVal} MO)</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">FINAL BONE DENSITY</span>
              <strong className="text-emerald-400">{densityPct}%</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">MINERAL DENSITY</span>
              <strong className="text-white">{bmdVal} g/cm²</strong>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">ARED EXERCISE</span>
              <strong className={state.exerciseCountermeasures ? 'text-emerald-400' : 'text-rose-400'}>
                {state.exerciseCountermeasures ? 'ACTIVE (+40%)' : 'OFF (-34%)'}
              </strong>
            </div>
          </div>

          {/* Educational Takeaway Fact */}
          <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
            <strong>Key Science Takeaway:</strong> {EDUCATIONAL_FACTS[Math.floor(Math.random() * EDUCATIONAL_FACTS.length)]}
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleDownloadPDF}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_25px_rgba(0,242,255,0.4)] active:scale-95 cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-5 h-5 text-slate-950" />
              <span>PDF REPORT DOWNLOADED!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-slate-950" />
              <span>DOWNLOAD PDF REPORT</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            soundEngine.playTouchBeep();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-orbitron font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

