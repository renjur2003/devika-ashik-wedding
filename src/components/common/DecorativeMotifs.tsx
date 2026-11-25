import React from 'react';

// Traditional Auspicious Ganesha Motif
export const GaneshaMotif: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 48,
  color = '#B89A62',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-label="Lord Ganesha Motif"
  >
    {/* Elegant stylised traditional Ganesha line art */}
    <path
      d="M50 12 C 40 12, 32 18, 30 28 C 28 38, 36 44, 45 46 C 40 50, 36 56, 36 64 C 36 76, 44 86, 54 88 C 64 89, 70 82, 70 74 C 70 66, 64 60, 58 58 C 50 56, 46 52, 46 44 C 46 36, 54 26, 62 26 C 68 26, 72 30, 72 36"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Trunk curl & modak */}
    <path
      d="M54 88 C 58 88, 62 86, 64 82 C 66 78, 64 74, 60 74"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Crown / Tilak */}
    <path
      d="M48 6 L52 6 M50 3 L50 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="50" cy="18" r="2.5" fill={color} />
    {/* Sacred Crescent / Chandra Bindu */}
    <path
      d="M60 16 C 63 17, 65 20, 65 23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="66" cy="17" r="1.5" fill={color} />
    {/* Little Modak */}
    <circle cx="34" cy="62" r="3" fill={color} />
  </svg>
);

// Traditional Kerala Nilavilakku (Temple Brass Lamp)
export const TempleLampMotif: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 40,
  color = '#B89A62',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Nilavilakku Motif"
  >
    {/* Flame */}
    <path
      d="M30 6 C28 14 24 20 24 24 C24 27.5 26.5 30 30 30 C33.5 30 36 27.5 36 24 C36 20 32 14 30 6Z"
      fill="#E5C992"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Lamp top ring */}
    <ellipse cx="30" cy="33" rx="14" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
    {/* Lamp stem segments */}
    <path
      d="M30 37 V48 M26 48 H34 M28 48 V65 M24 65 H36 M27 65 V76"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Base tiers */}
    <ellipse cx="30" cy="76" rx="16" ry="5" stroke={color} strokeWidth="1.5" />
    <path d="M18 78 C22 84 38 84 42 78" stroke={color} strokeWidth="1.5" />
    <path d="M14 83 H46" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Delicate Jasmine (Pichakam) Flower
export const JasmineFlower: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 5 graceful star-like petals */}
    <g transform="translate(50, 50)">
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <path
          key={i}
          d="M0 -3 C6 -18 12 -38 0 -46 C-12 -38 -6 -18 0 -3"
          fill="#FFFDF9"
          stroke="#B89A62"
          strokeWidth="1.5"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="5" fill="#E8D9C3" stroke="#B89A62" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="2.5" fill="#B89A62" />
    </g>
  </svg>
);

// Corner Ornament for Luxury Invitation Borders
export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  size?: number;
}> = ({ position, color = '#B89A62', size = 40 }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scale(-1, 1)';
      case 'bottom-left':
        return 'scale(1, -1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'scale(1, 1)';
    }
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: getTransform(),
        transformOrigin: 'center',
      }}
      className="pointer-events-none"
    >
      <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
        <path d="M2 48 V10 C2 5.5 5.5 2 10 2 H48" stroke={color} strokeWidth="1.5" />
        <path d="M7 48 V14 C7 10 10 7 14 7 H48" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" />
        <circle cx="14" cy="14" r="3" fill={color} />
        <path d="M14 22 C14 18 18 14 22 14" stroke={color} strokeWidth="1" />
        <path d="M2 18 C6 18 10 14 10 10" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
};

// Kerala Traditional Kasavu Floral Divider
export const FloralDivider: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#B89A62',
}) => (
  <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B89A62]" />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B89A62]" />
  </div>
);

// High-End Royal D&A Monogram Symbol with Botanical Ring
export const DAMonogram: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 110,
}) => (
  <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Glow Halo */}
      <circle cx="60" cy="60" r="54" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="60" cy="60" r="48" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.8" />
      
      {/* Botanical Jasmine & Vine Laurel Wreath */}
      <path d="M22 60 C22 38 38 22 60 22 C64 22 68 23 72 25" stroke="#8FA88B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M98 60 C98 82 82 98 60 98 C56 98 52 97 48 95" stroke="#8FA88B" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Little Botanical Leaves on wreath */}
      <ellipse cx="25" cy="45" rx="3" ry="1.5" transform="rotate(-30 25 45)" fill="#8FA88B" opacity="0.85" />
      <ellipse cx="32" cy="32" rx="3" ry="1.5" transform="rotate(-50 32 32)" fill="#8FA88B" opacity="0.85" />
      <ellipse cx="46" cy="24" rx="3" ry="1.5" transform="rotate(-70 46 24)" fill="#8FA88B" opacity="0.85" />
      <ellipse cx="95" cy="75" rx="3" ry="1.5" transform="rotate(150 95 75)" fill="#8FA88B" opacity="0.85" />
      <ellipse cx="88" cy="88" rx="3" ry="1.5" transform="rotate(130 88 88)" fill="#8FA88B" opacity="0.85" />
      <ellipse cx="74" cy="96" rx="3" ry="1.5" transform="rotate(110 74 96)" fill="#8FA88B" opacity="0.85" />
      
      {/* Tiny Jasmine Blossoms */}
      <circle cx="60" cy="18" r="2.5" fill="#E8A598" />
      <circle cx="60" cy="102" r="2.5" fill="#E8A598" />
      
      {/* Interlocking Monogram D & A */}
      <text x="44" y="68" fontFamily="'Playfair Display', Georgia, serif" fontSize="28" fontWeight="600" fill="url(#goldGrad)" textAnchor="middle">
        D
      </text>
      <text x="60" y="64" fontFamily="'Great Vibes', cursive" fontSize="20" fill="#E8A598" textAnchor="middle">
        &amp;
      </text>
      <text x="76" y="68" fontFamily="'Playfair Display', Georgia, serif" fontSize="28" fontWeight="600" fill="url(#goldGrad)" textAnchor="middle">
        A
      </text>

      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C5A869" />
          <stop offset="0.5" stopColor="#E5C992" />
          <stop offset="1" stopColor="#A68748" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

