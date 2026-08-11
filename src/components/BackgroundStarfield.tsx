import React, { useEffect, useRef } from 'react';

interface BackgroundStarfieldProps {
  decayLevel: number; // 0 (dense) to 1 (high decay)
  reducedMotion?: boolean;
}

export const BackgroundStarfield: React.FC<BackgroundStarfieldProps> = ({ decayLevel, reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars
    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.15 + 0.05
      });
    }

    // Leached calcium ions floating off in zero-G
    const ions: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 25; i++) {
      ions.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const render = () => {
      // Deep space navy gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.3, 50,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );

      // Shift tint slightly when decay is high (towards subtle red/amber glow)
      if (decayLevel > 0.6) {
        bgGrad.addColorStop(0, '#0a0b1f');
        bgGrad.addColorStop(0.5, '#120a1c');
        bgGrad.addColorStop(1, '#03050d');
      } else {
        bgGrad.addColorStop(0, '#081226');
        bgGrad.addColorStop(0.5, '#050b18');
        bgGrad.addColorStop(1, '#030611');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital grid lines
      ctx.strokeStyle = decayLevel > 0.6 ? 'rgba(255, 176, 0, 0.04)' : 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(225, 245, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion) {
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
        }
      });

      // Draw floating calcium ions leaching out into bloodstream
      const ionColor = decayLevel > 0.5 ? '255, 176, 0' : '0, 240, 255';
      ions.forEach(ion => {
        ctx.fillStyle = `rgba(${ionColor}, ${ion.alpha * (0.3 + decayLevel * 0.7)})`;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, ion.size, 0, Math.PI * 2);
        ctx.fill();

        // Ion outer bioluminescent ring
        ctx.strokeStyle = `rgba(${ionColor}, ${ion.alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!reducedMotion) {
          ion.x += ion.vx * (1 + decayLevel);
          ion.y += ion.vy * (1 + decayLevel);
          if (ion.y < -10 || ion.x < -10 || ion.x > width + 10) {
            ion.y = height + 10;
            ion.x = width * 0.3 + Math.random() * (width * 0.4);
          }
        }
      });

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [decayLevel, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
