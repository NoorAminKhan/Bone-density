import React from 'react';

interface KioskFrameWrapperProps {
  children: React.ReactNode;
  highContrast: boolean;
  onApplyScenario?: (days: number, exercise: boolean) => void;
}

export const KioskFrameWrapper: React.FC<KioskFrameWrapperProps> = ({
  children,
  highContrast
}) => {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start bg-[#02040a] text-slate-100 font-sans ${highContrast ? 'high-contrast' : ''}`}>
      {/* Main Full Display Container */}
      <div className="w-full flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

