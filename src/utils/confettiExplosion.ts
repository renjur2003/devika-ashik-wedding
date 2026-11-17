import confetti from 'canvas-confetti';

export const triggerRoyalConfetti = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 80,
    zIndex: 100,
    shapes: ['circle', 'square'] as confetti.Shape[],
    colors: ['#B89A62', '#E5C992', '#702B3D', '#FAF5EC', '#D4BC8B', '#FFFFFF'],
  };

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Blast from center left and center right
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.5, y: 0.5 },
      scalar: 1.2,
    });
  }, 250);
};

