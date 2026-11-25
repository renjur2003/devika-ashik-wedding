import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { doorSound } from '../../utils/doorSound';
import { soundEngine } from '../../utils/audioEngine';

interface CinematicWeddingEntranceProps {
  onEntranceComplete: () => void;
}

/* ─────────────────────────────────────────────────────────
   Inline SVG helpers — no external images needed
   ───────────────────────────────────────────────────────── */

// Single rose bloom used as an accent
const RoseBloom = ({ size = 32, opacity = 1, color = '#E8A598' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity }}>
    <circle cx="40" cy="40" r="10" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <ellipse
        key={i}
        cx="40" cy="20"
        rx="7" ry="12"
        fill={color}
        fillOpacity={0.65 + i * 0.03}
        transform={`rotate(${deg} 40 40)`}
      />
    ))}
    <circle cx="40" cy="40" r="6" fill={color} fillOpacity="0.9" />
    <circle cx="40" cy="40" r="3" fill="#fff" fillOpacity="0.4" />
  </svg>
);

// Jasmine single star flower
const Jasmine = ({ size = 20, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <ellipse key={i} cx="30" cy="12" rx="5" ry="11"
        fill="#FFFDE8" fillOpacity="0.95"
        transform={`rotate(${deg} 30 30)`} />
    ))}
    <circle cx="30" cy="30" r="6" fill="#FFF9C4" />
    <circle cx="30" cy="30" r="3" fill="#FFD600" fillOpacity="0.8" />
  </svg>
);

// Leaf sprig
const Leaf = ({ size = 24, color = '#6B9A6B', opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 40 60" fill="none" style={{ opacity }}>
    <path d="M20 55 C20 55 5 40 5 20 C5 5 20 2 20 2 C20 2 35 5 35 20 C35 40 20 55 20 55Z"
      fill={color} fillOpacity="0.75" />
    <path d="M20 55 L20 2" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
  </svg>
);

// Gold D&A monogram (door seal version — text only, no extra "A")
const DoorMonogram = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
    <circle cx="48" cy="48" r="44" stroke="url(#mGold)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
    <circle cx="48" cy="48" r="37" stroke="url(#mGold)" strokeWidth="0.8" opacity="0.5" />
    {/* Leaves at top & bottom */}
    <ellipse cx="48" cy="10" rx="3" ry="5" fill="#8FA88B" opacity="0.8" />
    <ellipse cx="48" cy="86" rx="3" ry="5" fill="#8FA88B" opacity="0.8" />
    <ellipse cx="10" cy="48" rx="5" ry="3" fill="#8FA88B" opacity="0.6" />
    <ellipse cx="86" cy="48" rx="5" ry="3" fill="#8FA88B" opacity="0.6" />
    {/* Only the stylised ampersand — no extra letter */}
    <text x="48" y="58" fontFamily="'Playfair Display',Georgia,serif" fontSize="30"
      fontWeight="600" fill="url(#mGold)" textAnchor="middle">D&amp;A</text>
    <defs>
      <linearGradient id="mGold" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E5C992" />
        <stop offset="0.5" stopColor="#C5A869" />
        <stop offset="1" stopColor="#A68748" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────── */
export const CinematicWeddingEntrance: React.FC<CinematicWeddingEntranceProps> = ({
  onEntranceComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Open sequence ── */
  const handleOpenDoors = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    setIsOpen(true);
    doorSound.playGrandOpening();
    soundEngine.play();
    triggerPetalShower();
    setTimeout(() => setIsRevealed(true), 1800);
    setTimeout(() => onEntranceComplete(), 2800);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.play();
    onEntranceComplete();
  };

  /* ── Petal shower ── */
  const triggerPetalShower = () => {
    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#E8A598', '#F4D8D2', '#FFFFFF', '#FFF8DC', '#C5A869', '#D4E8D0'],
      scalar: 1.4,
      gravity: 0.65,
      ticks: 300,
      shapes: ['circle'],
    });
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 55, spread: 65, origin: { x: 0, y: 0.4 },
        colors: ['#E8A598','#FFFDE8','#8FA88B'], scalar: 1.1, gravity: 0.5, ticks: 280 });
      confetti({ particleCount: 50, angle: 125, spread: 65, origin: { x: 1, y: 0.4 },
        colors: ['#E8A598','#FFFDE8','#C5A869'], scalar: 1.1, gravity: 0.5, ticks: 280 });
    }, 350);
    setTimeout(() => {
      confetti({ particleCount: 70, spread: 140, origin: { y: 0.25, x: 0.5 },
        colors: ['#FFD700','#F5E5C9','#E8A598','#8FA88B'],
        scalar: 0.85, gravity: 0.4, drift: 0.12, ticks: 350 });
    }, 850);
  };

  /* ── Ambient floating petals (before door opens) ── */
  const ambientItems = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 6.1 + 2) % 96}%`,
    delay: (i * 0.38) % 6,
    duration: 9 + (i % 6) * 1.5,
    size: 10 + (i % 4) * 7,
    type: i % 3 === 0 ? 'jasmine' : i % 3 === 1 ? 'rose' : 'leaf',
    rotate: (i * 53) % 360,
  }));

  /* ── Door panel woodgrain gradient — richer honey-amber tones ── */
  const woodStyle = (reverse = false) => ({
    background: reverse
      ? 'linear-gradient(to left, #FBF0DC 0%, #EDD9B0 12%, #D9C49A 28%, #C4A97A 45%, #BFA070 55%, #C4A97A 65%, #D9C49A 78%, #EDD9B0 90%, #FBF0DC 100%)'
      : 'linear-gradient(to right, #FBF0DC 0%, #EDD9B0 12%, #D9C49A 28%, #C4A97A 45%, #BFA070 55%, #C4A97A 65%, #D9C49A 78%, #EDD9B0 90%, #FBF0DC 100%)',
  });

  /* ── Door reveal transform ── */
  const doorTiming = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      ref={containerRef}
      onClick={handleOpenDoors}
      className={`fixed inset-0 z-[100] w-screen h-screen overflow-hidden select-none
        transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ perspective: '1800px', background: 'linear-gradient(160deg,#FDFAF4 0%,#F5EFE2 50%,#EDE3D2 100%)' }}
    >

      {/* ────────────────────────────────────────────────────
          BEHIND-THE-DOORS: Soft golden garden light reveal
          ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        {/* Warm light bloom */}
        <div
          className={`absolute rounded-full transition-all duration-1200 ease-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-30 opacity-0'
          }`}
          style={{
            width: '160vw', height: '160vw', maxWidth: 1200, maxHeight: 1200,
            background: 'radial-gradient(circle, rgba(255,250,235,1) 0%, rgba(255,235,180,0.75) 30%, rgba(220,180,130,0.3) 60%, transparent 80%)',
          }}
        />
        {/* Sun rays */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isOpen ? 'opacity-50 animate-gentle-rotate' : 'opacity-0'}`}
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,230,160,0.25) 12deg, transparent 24deg, rgba(245,215,140,0.2) 36deg, transparent 48deg, rgba(255,230,160,0.25) 60deg, transparent 72deg, rgba(245,215,140,0.2) 84deg, transparent 96deg, rgba(255,230,160,0.25) 108deg, transparent 120deg, rgba(245,215,140,0.2) 132deg, transparent 144deg, rgba(255,230,160,0.25) 156deg, transparent 168deg, rgba(245,215,140,0.2) 180deg, transparent 192deg, rgba(255,230,160,0.25) 204deg, transparent 216deg, rgba(245,215,140,0.2) 228deg, transparent 240deg, rgba(255,230,160,0.25) 252deg, transparent 264deg, rgba(245,215,140,0.2) 276deg, transparent 288deg, rgba(255,230,160,0.25) 300deg, transparent 312deg, rgba(245,215,140,0.2) 324deg, transparent 336deg, rgba(255,230,160,0.25) 348deg, transparent 360deg)',
          }}
        />
        {/* Revealed welcome monogram */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-1000 ${isOpen ? 'scale-100 opacity-100' : 'scale-80 opacity-0'}`}>
          <DoorMonogram />
          <p className="font-editorial text-base sm:text-xl text-[#5A3E1B] tracking-[0.25em] uppercase font-semibold drop-shadow">
            Welcome to Our Celebration
          </p>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          FLORAL ARCH — top toran with roses & leaves
          ──────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        {/* Carved natural wood lintel beam */}
        <div
          className="w-full h-10 sm:h-14 shadow-[0_8px_30px_rgba(90,62,27,0.35)] flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #F5E8D0 0%, #DEC9A0 40%, #C9A96E 70%, #B08840 100%)' }}
        >
          {/* Fine wood grain lines */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(100,70,20,0.15) 8px, rgba(100,70,20,0.15) 9px)',
          }} />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px)',
          }} />
          {/* Top & bottom gold leaf trim strips */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

          {/* Centre auspicious caption */}
          <div className="relative z-10 flex items-center gap-2 px-5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-[#C5A869]/50 shadow-sm">
            <span className="text-[#E8A598] text-sm">✿</span>
            <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-[#5A3E1B] font-bold">
              Auspicious Union &nbsp;•&nbsp; Guruvayur &nbsp;•&nbsp; 26 Dec 2026
            </span>
            <span className="text-[#E8A598] text-sm">✿</span>
          </div>
        </div>

        {/* SVG floral garland swag */}
        <div className="relative w-full overflow-hidden h-20 sm:h-28 -mt-1">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 110"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Main garland rope (green stems) */}
            <path d="M-20 10 Q 300 90, 600 20 Q 900 90, 1220 10"
              stroke="#7BAE7F" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.6" />
            {/* Secondary layered rope */}
            <path d="M-20 18 Q 300 98, 600 28 Q 900 98, 1220 18"
              stroke="#A8C5A0" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
            {/* Gold highlight thread */}
            <path d="M-20 10 Q 300 90, 600 20 Q 900 90, 1220 10"
              stroke="#D4AF37" strokeWidth="2" strokeDasharray="10 18" strokeLinecap="round" fill="none" opacity="0.5" />
            {/* Leaves scattered along garland */}
            {[80,180,280,380,480,580,680,780,880,980,1080,1140].map((x, i) => {
              const ySwag = i < 6 ? 50 + (i % 2 === 0 ? 1 : -1) * 20 : 50 + (i % 2 === 0 ? 1 : -1) * 20;
              const y = i < 6
                ? 10 + 80 * Math.sin((x / 600) * Math.PI)
                : 10 + 80 * Math.sin((x / 600) * Math.PI);
              return (
                <ellipse key={i} cx={x} cy={Math.max(5, y - 5)} rx="9" ry="5"
                  fill="#6B9A6B" fillOpacity="0.7"
                  transform={`rotate(${-30 + i * 15} ${x} ${y})`} />
              );
            })}
            {/* Rose clusters at the two sag-dips */}
            {[300, 900].map((x, i) => (
              <g key={i}>
                <circle cx={x - 12} cy={80} r="10" fill="#E8A598" fillOpacity="0.9" />
                <circle cx={x}       cy={87} r="13" fill="#C27484" fillOpacity="0.85" />
                <circle cx={x + 13}  cy={80} r="10" fill="#E8A598" fillOpacity="0.9" />
                <circle cx={x - 12}  cy={80} r="5"  fill="#D4607A" fillOpacity="0.6" />
                <circle cx={x}       cy={87} r="6"  fill="#B84060" fillOpacity="0.6" />
                <circle cx={x + 13}  cy={80} r="5"  fill="#D4607A" fillOpacity="0.6" />
              </g>
            ))}
            {/* Jasmine star-flowers scattered */}
            {[150, 450, 750, 1050].map((x, i) => {
              const y = 15 + 65 * Math.sin((x / 600) * Math.PI);
              return [0,72,144,216,288].map((deg, j) => (
                <ellipse key={`${i}-${j}`}
                  cx={x + 9 * Math.cos(deg * Math.PI / 180)}
                  cy={y + 9 * Math.sin(deg * Math.PI / 180)}
                  rx="4" ry="8"
                  fill="#FFFDE8" fillOpacity="0.9"
                  transform={`rotate(${deg} ${x + 9 * Math.cos(deg * Math.PI / 180)} ${y + 9 * Math.sin(deg * Math.PI / 180)})`}
                />
              ));
            })}
            {/* Hanging temple brass bells */}
            {[200, 400, 600, 800, 1000].map((x, i) => {
              const y = 15 + 72 * Math.sin((x / 600) * Math.PI);
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x} y2={y + 20} stroke="#C5A869" strokeWidth="1.5" />
                  <ellipse cx={x} cy={y + 24} rx="6" ry="4" fill="#E5C992" stroke="#B8960C" strokeWidth="1" />
                  <path d={`M${x - 6} ${y + 24} Q${x} ${y + 35} ${x + 6} ${y + 24}`}
                    fill="#C5A869" opacity="0.8" />
                  <circle cx={x} cy={y + 35} r="2.5" fill="#D4AF37" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          SIDE PILLARS: carved sandstone natural columns
          ──────────────────────────────────────────────────── */}
      {/* Left pillar */}
      <div className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center w-14 sm:w-20"
        style={{ background: 'linear-gradient(to right, #EDE0CB, #D6C09A, #C4A978, #D6C09A, #EDE0CB)' }}>
        {/* Carved flute lines */}
        {[25, 45, 65].map(pct => (
          <div key={pct} className="absolute top-0 bottom-0 w-[1px] bg-[#B08840]/30"
            style={{ left: `${pct}%` }} />
        ))}
        {/* Capital & base decorative bands */}
        <div className="w-full h-12 sm:h-16 bg-gradient-to-b from-[#D4AF37]/40 to-transparent flex items-center justify-center">
          <div className="w-3/4 h-1 bg-[#C5A869]/60 rounded" />
        </div>
        <div className="flex-1" />
        <div className="w-full h-12 sm:h-16 bg-gradient-to-t from-[#D4AF37]/40 to-transparent" />
        {/* Nilavilakku lamp at base */}
        <div className="absolute bottom-6 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-[#FFB347]/30 blur-md animate-pulse" />
            <div className="w-3 h-5 rounded-full bg-gradient-to-t from-[#FF6600] via-[#FFD000] to-white shadow-[0_0_12px_#FFA726] animate-pulse" />
          </div>
          <div className="w-6 h-14 mt-0.5 bg-gradient-to-b from-[#E5C992] via-[#C5A869] to-[#8C6B26] rounded-t-full" />
          <div className="w-10 h-3 rounded-full bg-[#C5A869] shadow-md" />
          <div className="w-12 h-3 rounded-full bg-[#8C6B26]/80 mt-0.5 flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8A598]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDE8]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8A598]" />
          </div>
        </div>
      </div>

      {/* Right pillar */}
      <div className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center w-14 sm:w-20"
        style={{ background: 'linear-gradient(to left, #EDE0CB, #D6C09A, #C4A978, #D6C09A, #EDE0CB)' }}>
        {[25, 45, 65].map(pct => (
          <div key={pct} className="absolute top-0 bottom-0 w-[1px] bg-[#B08840]/30"
            style={{ left: `${pct}%` }} />
        ))}
        <div className="w-full h-12 sm:h-16 bg-gradient-to-b from-[#D4AF37]/40 to-transparent flex items-center justify-center">
          <div className="w-3/4 h-1 bg-[#C5A869]/60 rounded" />
        </div>
        <div className="flex-1" />
        <div className="w-full h-12 sm:h-16 bg-gradient-to-t from-[#D4AF37]/40 to-transparent" />
        <div className="absolute bottom-6 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-[#FFB347]/30 blur-md animate-pulse" />
            <div className="w-3 h-5 rounded-full bg-gradient-to-t from-[#FF6600] via-[#FFD000] to-white shadow-[0_0_12px_#FFA726] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="w-6 h-14 mt-0.5 bg-gradient-to-b from-[#E5C992] via-[#C5A869] to-[#8C6B26] rounded-t-full" />
          <div className="w-10 h-3 rounded-full bg-[#C5A869] shadow-md" />
          <div className="w-12 h-3 rounded-full bg-[#8C6B26]/80 mt-0.5 flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8A598]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDE8]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8A598]" />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          THE DOUBLE DOORS — Natural cream/wood tones
          ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-full flex" style={{ transformStyle: 'preserve-3d' }}>

        {/* ── LEFT DOOR ── */}
        <div
          className="relative w-1/2 h-full overflow-hidden transition-transform duration-[2400ms]"
          style={{
            transformOrigin: 'left center',
            transform: isOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)',
            transitionTimingFunction: doorTiming,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Door face */}
          <div
            className="absolute inset-0 shadow-[inset_-15px_0_40px_rgba(90,62,27,0.3)]"
            style={woodStyle(false)}
          >
            {/* Subtle vertical grain lines */}
            {[15, 28, 42, 58, 72, 86].map(p => (
              <div key={p} className="absolute top-0 bottom-0 w-[0.5px] bg-[#B08840]/15"
                style={{ left: `${p}%` }} />
            ))}

            {/* Triple carved recessed border frame */}
            <div className="absolute inset-2 sm:inset-4 border-2 border-[#C5A869]/50 rounded-xl shadow-inner" />
            <div className="absolute inset-4 sm:inset-7 border border-[#D4AF37]/35 rounded-lg" />
            <div className="absolute inset-6 sm:inset-10 border border-[#C5A869]/20 rounded" />

            {/* Inner door face content */}
            <div className="absolute inset-6 sm:inset-10 flex flex-col justify-between gap-3 sm:gap-4">

              {/* TOP PANEL: Carved lotus mandala — left door shows D&A */}
              <div className="h-[32%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/60 to-[#F5E8C8]/40 backdrop-blur-[2px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.18)]">
                {/* Paisley lattice carved bg */}
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(ellipse 6px 10px at 50% 50%, #A87C30 60%, transparent 100%), radial-gradient(circle, #C5A869 1px, transparent 1px)', backgroundSize: '18px 22px, 9px 9px' }} />
                {/* Inner gold vine border */}
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/35 opacity-80" />
                {/* SVG Lotus Mandala */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="drop-shadow-sm">
                  {/* Outer petal ring */}
                  {[0,45,90,135,180,225,270,315].map((deg,i) => (
                    <ellipse key={i} cx="36" cy="14" rx="4.5" ry="10"
                      fill={i%2===0?"#E5C992":"#C5A869"} fillOpacity="0.6"
                      transform={`rotate(${deg} 36 36)`} />
                  ))}
                  {/* Inner petal ring */}
                  {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg,i) => (
                    <ellipse key={i} cx="36" cy="22" rx="3" ry="7"
                      fill="#D4AF37" fillOpacity="0.5"
                      transform={`rotate(${deg} 36 36)`} />
                  ))}
                  {/* Centre circle with D&A */}
                  <circle cx="36" cy="36" r="12" fill="url(#lpGold)" />
                  <circle cx="36" cy="36" r="10" fill="none" stroke="#FFEDB8" strokeWidth="0.8" />
                  <text x="36" y="40" fontFamily="'Playfair Display',Georgia,serif" fontSize="9"
                    fontWeight="700" fill="#3E2211" textAnchor="middle">D&amp;A</text>
                  {/* Corner dot accents */}
                  {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i) => (
                    <circle key={i} cx={36+sx*20} cy={36+sy*20} r="2.2" fill="#C5A869" fillOpacity="0.7" />
                  ))}
                  <defs>
                    <radialGradient id="lpGold" cx="40%" cy="35%" r="65%">
                      <stop stopColor="#FFF5C0" />
                      <stop offset="0.5" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#8C6826" />
                    </radialGradient>
                  </defs>
                </svg>
                {/* Corner gold nails */}
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>

              {/* MIDDLE PANEL: Rich Kashmir jaali + ornate brass pull — RIGHT side */}
              <div className="h-[36%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/50 to-[#F0E0C0]/35 backdrop-blur-[2px] flex items-center justify-end pr-3 sm:pr-5 relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.15)]">
                {/* Jaali lattice pattern */}
                <div className="absolute inset-0 opacity-[0.09]"
                  style={{ backgroundImage: 'radial-gradient(circle 3px at 50% 50%, #A87C30 100%, transparent 100%)', backgroundSize: '14px 14px' }} />
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="jaaliL" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M10 0 L20 10 L10 20 L0 10Z" fill="none" stroke="#A87C30" strokeWidth="0.8"/>
                      <circle cx="10" cy="10" r="2" fill="#A87C30"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#jaaliL)"/>
                </svg>
                {/* Inner gold vine border */}
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/30 opacity-70" />
                {/* Ornate brass door pull — left door pulls RIGHT */}
                <div className="relative flex flex-col items-center z-10">
                  <div className="w-8 sm:w-11 h-28 sm:h-36 rounded-[40%] bg-gradient-to-b from-[#FFF5A0] via-[#E5C140] via-[#C5A040] to-[#7A5820]
                    shadow-[0_6px_20px_rgba(90,62,27,0.5),inset_0_2px_6px_rgba(255,255,200,0.6),inset_0_-2px_6px_rgba(0,0,0,0.25)]
                    border border-[#FFEDB8]/60 flex flex-col items-center justify-between py-2">
                    {/* Top lotus emblem */}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEDB8] to-[#C5A869] shadow-md border border-[#FFD700]/50 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 20 20"><ellipse cx="10" cy="5" rx="2.5" ry="4.5" fill="#8C6826" fillOpacity="0.8"/>{[72,144,216,288].map((d,i)=><ellipse key={i} cx="10" cy="5" rx="2.5" ry="4.5" fill="#8C6826" fillOpacity="0.5" transform={`rotate(${d} 10 10)`}/>)}<circle cx="10" cy="10" r="2.5" fill="#D4AF37"/></svg>
                    </div>
                    {/* Ring pull */}
                    <div className="w-6 sm:w-8 h-9 sm:h-12 rounded-full border-[3.5px] border-[#C5A869]
                      shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_3px_rgba(255,255,200,0.5)]
                      bg-gradient-to-b from-[#E5C992]/20 to-transparent flex items-center justify-center">
                      <div className="w-[60%] h-[60%] rounded-full border border-[#FFD700]/30" />
                    </div>
                    {/* Bottom peg */}
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFF0A0] to-[#8C6826] shadow-md border border-[#FFEDB8]/40" />
                  </div>
                </div>
                {/* Corner nails */}
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>

              {/* BOTTOM PANEL: SVG lotus bud temple frieze */}
              <div className="h-[28%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/50 to-[#F0E0C0]/35 backdrop-blur-[2px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.15)]">
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(circle, #C5A869 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/30 opacity-70" />
                {/* SVG Lotus frieze row */}
                <svg width="90%" height="80%" viewBox="0 0 120 48" fill="none" className="drop-shadow-sm">
                  {[12, 36, 60, 84, 108].map((x,i) => (
                    <g key={i} transform={`translate(${x},24)`}>
                      {/* Stem */}
                      <line x1="0" y1="4" x2="0" y2="16" stroke="#B08840" strokeWidth="1.2" strokeLinecap="round"/>
                      {/* Leaves */}
                      <ellipse cx="-4" cy="10" rx="3" ry="6" fill="#8FA88B" fillOpacity="0.7" transform="rotate(-30 -4 10)"/>
                      <ellipse cx="4" cy="10" rx="3" ry="6" fill="#8FA88B" fillOpacity="0.7" transform="rotate(30 4 10)"/>
                      {/* Lotus petals */}
                      {[-24,-12,0,12,24].map((deg,j)=>(
                        <ellipse key={j} cx="0" cy="-2" rx="3.5" ry="8"
                          fill={j===2?"#E8A598":j%2===0?"#EDD9B0":"#C5A869"}
                          fillOpacity="0.85"
                          transform={`rotate(${deg} 0 6)`}/>
                      ))}
                      {/* Centre */}
                      <circle cx="0" cy="-4" r="3" fill="#D4AF37" fillOpacity="0.9"/>
                      <circle cx="0" cy="-4" r="1.5" fill="#FFF5C0"/>
                    </g>
                  ))}
                  {/* Decorative base line */}
                  <line x1="0" y1="40" x2="120" y2="40" stroke="#C5A869" strokeWidth="1" strokeOpacity="0.5"/>
                  <line x1="2" y1="43" x2="118" y2="43" stroke="#C5A869" strokeWidth="0.5" strokeOpacity="0.3"/>
                </svg>
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>
            </div>

            {/* Right-edge door shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#5A3E1B]/40 to-transparent pointer-events-none" />
          </div>

          {/* Shadow when swinging open */}
          <div className={`absolute inset-0 bg-[#2D1A08] pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-70' : 'opacity-0'}`} />
        </div>

        {/* ── RIGHT DOOR ── */}
        <div
          className="relative w-1/2 h-full overflow-hidden transition-transform duration-[2400ms]"
          style={{
            transformOrigin: 'right center',
            transform: isOpen ? 'rotateY(115deg)' : 'rotateY(0deg)',
            transitionTimingFunction: doorTiming,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Door face */}
          <div
            className="absolute inset-0 shadow-[inset_15px_0_40px_rgba(90,62,27,0.3)]"
            style={woodStyle(true)}
          >
            {[15, 28, 42, 58, 72, 86].map(p => (
              <div key={p} className="absolute top-0 bottom-0 w-[0.5px] bg-[#B08840]/15"
                style={{ left: `${p}%` }} />
            ))}
            {/* Triple carved recessed border frame */}
            <div className="absolute inset-2 sm:inset-4 border-2 border-[#C5A869]/50 rounded-xl shadow-inner" />
            <div className="absolute inset-4 sm:inset-7 border border-[#D4AF37]/35 rounded-lg" />
            <div className="absolute inset-6 sm:inset-10 border border-[#C5A869]/20 rounded" />

            <div className="absolute inset-6 sm:inset-10 flex flex-col justify-between gap-3 sm:gap-4">
              {/* TOP PANEL */}
              <div className="h-[32%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/60 to-[#F5E8C8]/40 backdrop-blur-[2px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.18)]">
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(ellipse 6px 10px at 50% 50%, #A87C30 60%, transparent 100%), radial-gradient(circle, #C5A869 1px, transparent 1px)', backgroundSize: '18px 22px, 9px 9px' }} />
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/35 opacity-80" />
                {/* SVG Lotus Mandala — right door same design */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="drop-shadow-sm">
                  {[0,45,90,135,180,225,270,315].map((deg,i) => (
                    <ellipse key={i} cx="36" cy="14" rx="4.5" ry="10"
                      fill={i%2===0?"#E5C992":"#C5A869"} fillOpacity="0.6"
                      transform={`rotate(${deg} 36 36)`} />
                  ))}
                  {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg,i) => (
                    <ellipse key={i} cx="36" cy="22" rx="3" ry="7"
                      fill="#D4AF37" fillOpacity="0.5"
                      transform={`rotate(${deg} 36 36)`} />
                  ))}
                  <circle cx="36" cy="36" r="12" fill="url(#rpGold)" />
                  <circle cx="36" cy="36" r="10" fill="none" stroke="#FFEDB8" strokeWidth="0.8" />
                  <text x="36" y="40" fontFamily="'Playfair Display',Georgia,serif" fontSize="9"
                    fontWeight="700" fill="#3E2211" textAnchor="middle">D&amp;A</text>
                  {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i) => (
                    <circle key={i} cx={36+sx*20} cy={36+sy*20} r="2.2" fill="#C5A869" fillOpacity="0.7" />
                  ))}
                  <defs>
                    <radialGradient id="rpGold" cx="40%" cy="35%" r="65%">
                      <stop stopColor="#FFF5C0" />
                      <stop offset="0.5" stopColor="#D4AF37" />
                      <stop offset="1" stopColor="#8C6826" />
                    </radialGradient>
                  </defs>
                </svg>
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>

              {/* MIDDLE PANEL — right door pull on LEFT side */}
              <div className="h-[36%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/50 to-[#F0E0C0]/35 backdrop-blur-[2px] flex items-center justify-start pl-3 sm:pl-5 relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.15)]">
                <div className="absolute inset-0 opacity-[0.09]"
                  style={{ backgroundImage: 'radial-gradient(circle 3px at 50% 50%, #A87C30 100%, transparent 100%)', backgroundSize: '14px 14px' }} />
                <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="jaaliR" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M10 0 L20 10 L10 20 L0 10Z" fill="none" stroke="#A87C30" strokeWidth="0.8"/>
                      <circle cx="10" cy="10" r="2" fill="#A87C30"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#jaaliR)"/>
                </svg>
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/30 opacity-70" />
                <div className="relative flex flex-col items-center z-10">
                  <div className="w-8 sm:w-11 h-28 sm:h-36 rounded-[40%] bg-gradient-to-b from-[#FFF5A0] via-[#E5C140] via-[#C5A040] to-[#7A5820]
                    shadow-[0_6px_20px_rgba(90,62,27,0.5),inset_0_2px_6px_rgba(255,255,200,0.6),inset_0_-2px_6px_rgba(0,0,0,0.25)]
                    border border-[#FFEDB8]/60 flex flex-col items-center justify-between py-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEDB8] to-[#C5A869] shadow-md border border-[#FFD700]/50 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 20 20"><ellipse cx="10" cy="5" rx="2.5" ry="4.5" fill="#8C6826" fillOpacity="0.8"/>{[72,144,216,288].map((d,i)=><ellipse key={i} cx="10" cy="5" rx="2.5" ry="4.5" fill="#8C6826" fillOpacity="0.5" transform={`rotate(${d} 10 10)`}/>)}<circle cx="10" cy="10" r="2.5" fill="#D4AF37"/></svg>
                    </div>
                    <div className="w-6 sm:w-8 h-9 sm:h-12 rounded-full border-[3.5px] border-[#C5A869]
                      shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_3px_rgba(255,255,200,0.5)]
                      bg-gradient-to-b from-[#E5C992]/20 to-transparent flex items-center justify-center">
                      <div className="w-[60%] h-[60%] rounded-full border border-[#FFD700]/30" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFF0A0] to-[#8C6826] shadow-md border border-[#FFEDB8]/40" />
                  </div>
                </div>
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>

              {/* BOTTOM PANEL — mirrored lotus frieze */}
              <div className="h-[28%] rounded-xl border-2 border-[#C5A869]/50 bg-gradient-to-br from-[#FFFDF5]/50 to-[#F0E0C0]/35 backdrop-blur-[2px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(90,62,27,0.15)]">
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: 'radial-gradient(circle, #C5A869 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                <div className="absolute inset-[6px] rounded-lg border border-[#D4AF37]/30 opacity-70" />
                <svg width="90%" height="80%" viewBox="0 0 120 48" fill="none" className="drop-shadow-sm">
                  {[12, 36, 60, 84, 108].map((x,i) => (
                    <g key={i} transform={`translate(${x},24)`}>
                      <line x1="0" y1="4" x2="0" y2="16" stroke="#B08840" strokeWidth="1.2" strokeLinecap="round"/>
                      <ellipse cx="-4" cy="10" rx="3" ry="6" fill="#8FA88B" fillOpacity="0.7" transform="rotate(-30 -4 10)"/>
                      <ellipse cx="4" cy="10" rx="3" ry="6" fill="#8FA88B" fillOpacity="0.7" transform="rotate(30 4 10)"/>
                      {[-24,-12,0,12,24].map((deg,j)=>(
                        <ellipse key={j} cx="0" cy="-2" rx="3.5" ry="8"
                          fill={j===2?"#E8A598":j%2===0?"#EDD9B0":"#C5A869"}
                          fillOpacity="0.85"
                          transform={`rotate(${deg} 0 6)`}/>
                      ))}
                      <circle cx="0" cy="-4" r="3" fill="#D4AF37" fillOpacity="0.9"/>
                      <circle cx="0" cy="-4" r="1.5" fill="#FFF5C0"/>
                    </g>
                  ))}
                  <line x1="0" y1="40" x2="120" y2="40" stroke="#C5A869" strokeWidth="1" strokeOpacity="0.5"/>
                  <line x1="2" y1="43" x2="118" y2="43" stroke="#C5A869" strokeWidth="0.5" strokeOpacity="0.3"/>
                </svg>
                {['top-1.5 left-1.5','top-1.5 right-1.5','bottom-1.5 left-1.5','bottom-1.5 right-1.5'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8C6826] shadow-md border border-[#FFEDB8]/60`} />
                ))}
              </div>
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#5A3E1B]/40 to-transparent pointer-events-none" />
          </div>

          <div className={`absolute inset-0 bg-[#2D1A08] pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-70' : 'opacity-0'}`} />
        </div>

        {/* ── CENTRE SEAM DIVIDER ── thin brass strip, NO extra letter ── */}
        {!isOpen && (
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] z-25 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent, #C5A869 10%, #E5C992 50%, #C5A869 90%, transparent)' }} />
        )}
      </div>

      {/* ────────────────────────────────────────────────────
          OVERLAY TEXT: Tagline, Names, CTA
          ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.35 } }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-between pointer-events-none"
            style={{ paddingTop: '10vh', paddingBottom: '8vh' }}
          >
            {/* Top poetic line */}
            <div className="text-center px-4">
              <motion.p
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="font-romantic italic text-base sm:text-xl text-[#5A3E1B] drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)] tracking-wide"
              >
                "A Beautiful Story Is About To Unfold..."
              </motion.p>
              <div className="flex items-center justify-center gap-2 mt-2 opacity-70">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A869]" />
                <span className="text-[#C27484] text-sm">❀</span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A869]" />
              </div>
            </div>

            {/* Centre names — absolutely NO rogue letter */}
            <div className="text-center px-4 drop-shadow-[0_4px_20px_rgba(255,255,255,0.95)]">
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#3B2510] font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase leading-tight">
                DEVIKA
              </h1>
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="h-[1px] w-8 sm:w-14 bg-[#C5A869]/70" />
                <span className="font-calligraphy text-3xl sm:text-4xl text-[#C27484]">&amp;</span>
                <div className="h-[1px] w-8 sm:w-14 bg-[#C5A869]/70" />
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#3B2510] font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase leading-tight">
                ASHISH
              </h1>
              <p className="font-romantic italic text-sm sm:text-base text-[#7A5C3A] mt-2 tracking-widest drop-shadow">
                From Schoolmates to Soulmates
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col items-center gap-3 px-4 pointer-events-auto">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-[#C5A869]/25 blur-lg animate-pulse" />
                <div className="absolute -inset-1 rounded-full border border-[#D4AF37]/50 animate-ping opacity-50" />
                <button
                  onClick={handleOpenDoors}
                  className="relative flex items-center gap-3 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#5A3E1B] via-[#7A5C3A] to-[#5A3E1B] text-[#FFF8DC] border-2 border-[#D4AF37] shadow-[0_8px_30px_rgba(90,62,27,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5C992] animate-ping opacity-80" />
                  <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#FFFDE8]">
                    Tap To Open Our Wedding Invitation
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#E5C992]" />
                </button>
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A869] animate-bounce" />
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-[#7A5C3A] uppercase">
                  Tap anywhere on the doors to enter
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A869] animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────────────────────────────────────────────
          SKIP INTRO button
          ──────────────────────────────────────────────────── */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50">
        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full bg-white/70 hover:bg-white/90 text-[#5A3E1B] border border-[#C5A869]/50 text-[10px] sm:text-xs font-sans tracking-widest uppercase font-semibold transition-all shadow-sm backdrop-blur-sm flex items-center gap-1.5"
        >
          Skip Intro
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* ────────────────────────────────────────────────────
          AMBIENT FLOATING PETALS (pre-open)
          ──────────────────────────────────────────────────── */}
      {!isOpen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {ambientItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -40, opacity: 0, rotate: item.rotate }}
              animate={{ y: '110vh', opacity: [0, 0.85, 0.85, 0], rotate: item.rotate + 300, x: [0, 18, -12, 0] }}
              transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: 'linear' }}
              className="absolute pointer-events-none"
              style={{ left: item.left, width: item.size, height: item.size }}
            >
              {item.type === 'jasmine' ? (
                <Jasmine size={item.size} opacity={0.8} />
              ) : item.type === 'rose' ? (
                <RoseBloom size={item.size} color={item.id % 2 === 0 ? '#E8A598' : '#C27484'} opacity={0.75} />
              ) : (
                <Leaf size={item.size} color="#7BAE7F" opacity={0.65} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
