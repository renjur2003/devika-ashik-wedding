import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  flip: number;
  flipSpeed: number;
  type: 'petal' | 'gold_dust' | 'sparkle';
}

export const JasminePetalsCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 35 petals and 45 golden dust motes
    const particles: Petal[] = [];
    const count = window.innerWidth < 768 ? 40 : 70;

    for (let i = 0; i < count; i++) {
      const isDust = i % 2 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isDust ? Math.random() * 3 + 1 : Math.random() * 12 + 8,
        speedY: isDust ? Math.random() * 0.4 + 0.2 : Math.random() * 0.8 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        type: isDust ? 'gold_dust' : 'petal',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.y += p.speedY;
        p.x += Math.sin(p.flip) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Reset if offscreen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, Math.sin(p.flip));

        if (p.type === 'petal') {
          // Delicate Jasmine (Pichakam) petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, `rgba(255, 253, 247, ${p.opacity})`);
          grad.addColorStop(0.7, `rgba(247, 237, 218, ${p.opacity * 0.9})`);
          grad.addColorStop(1, `rgba(224, 196, 142, ${p.opacity * 0.4})`);
          ctx.fillStyle = grad;
          ctx.shadowColor = 'rgba(212, 188, 139, 0.3)';
          ctx.shadowBlur = 4;
          ctx.fill();
        } else {
          // Shimmering Golden Dust
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229, 201, 146, ${p.opacity})`;
          ctx.shadowColor = 'rgba(245, 229, 201, 0.8)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};

