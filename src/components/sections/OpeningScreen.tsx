import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, Volume2 } from 'lucide-react';
import { GaneshaMotif, CornerOrnament, JasmineFlower } from '../common/DecorativeMotifs';
import { JasminePetalsCanvas } from '../common/JasminePetalsCanvas';
import { soundEngine } from '../../utils/audioEngine';
import { triggerRoyalConfetti } from '../../utils/confettiExplosion';

interface OpeningScreenProps {
  onOpenStory: () => void;
}

const GOLD = '#B89A62';
const BURGUNDY = '#702B3D';

const StarField: React.FC = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpenStory }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleOpen = () => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);
    soundEngine.play().catch(() => {});
    triggerRoyalConfetti();
    setTimeout(() => {
      setHasOpened(true);
      onOpenStory();
    }, 1400);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at 30% 20%, #3D101C 0%, #1C050D 40%, #0D0205 100%)' }}
    >
      {/* Layered ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,154,98,0.12) 0%, rgba(112,43,61,0.08) 40%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(112,43,61,0.2) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,154,98,0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      </div>

      {/* Star field */}
      <StarField />

      {/* Jasmine petals */}
      <JasminePetalsCanvas active={!hasOpened} />

      {/* Top decorative bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-0 inset-x-0 flex items-center px-6 sm:px-16 py-4 pointer-events-none"
      >
        <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(184,154,98,0.5), transparent)' }} />
        <div className="flex items-center gap-3 px-4">
          <JasmineFlower size={18} />
          <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-gold-light/70 font-medium">
            From School Days to Forever
          </span>
          <JasmineFlower size={18} />
        </div>
        <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(184,154,98,0.5), transparent)' }} />
      </motion.div>

      {/* Sound pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-14 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-gold-light/80"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <Volume2 className="w-3 h-3 text-gold animate-pulse" />
        <span>Sound On Recommended</span>
      </motion.div>

      {/* Flanking Temple Lamps (lg screens) */}
      <div className="hidden lg:block absolute left-6 xl:left-14 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-8 h-8 rounded-full mx-auto mb-[-16px]"
          style={{ background: 'radial-gradient(circle, rgba(229,201,146,0.9) 0%, transparent 70%)' }}
        />
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="20" rx="12" ry="10" fill="#B89A62" fillOpacity="0.7"/>
          <path d="M14 20 Q20 50 20 70" stroke="#B89A62" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M26 20 Q20 50 20 70" stroke="#B89A62" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="14" y="68" width="12" height="4" rx="2" fill="#B89A62" fillOpacity="0.7"/>
          <rect x="10" y="72" width="20" height="3" rx="1.5" fill="#B89A62" fillOpacity="0.5"/>
        </svg>
        <p className="text-[8px] tracking-[0.3em] text-gold-light/50 uppercase mt-2 font-sans text-center">Guruvayur</p>
      </div>
      <div className="hidden lg:block absolute right-6 xl:right-14 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="w-8 h-8 rounded-full mx-auto mb-[-16px]"
          style={{ background: 'radial-gradient(circle, rgba(229,201,146,0.9) 0%, transparent 70%)' }}
        />
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="20" rx="12" ry="10" fill="#B89A62" fillOpacity="0.7"/>
          <path d="M14 20 Q20 50 20 70" stroke="#B89A62" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M26 20 Q20 50 20 70" stroke="#B89A62" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="14" y="68" width="12" height="4" rx="2" fill="#B89A62" fillOpacity="0.7"/>
          <rect x="10" y="72" width="20" height="3" rx="1.5" fill="#B89A62" fillOpacity="0.5"/>
        </svg>
        <p className="text-[8px] tracking-[0.3em] text-gold-light/50 uppercase mt-2 font-sans text-center">Anthikad</p>
      </div>

      {/* Main card with 3D parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1200px' }}
        className="relative z-20 w-[calc(100%-2rem)] max-w-[420px] mx-auto my-8"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-4 rounded-[32px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(184,154,98,0.2) 0%, transparent 70%)' }}
        />

        {/* Card body */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(184,154,98,0.3)]"
          style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #FAF5EC 50%, #F3E7D5 100%)' }}
        >
          {/* Silk-like inner sheen */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(184,154,98,0.05) 100%)' }} />

          {/* Inner gold border */}
          <div className="absolute inset-[6px] rounded-[22px] pointer-events-none border border-gold/25" />

          {/* Corner ornaments */}
          <div className="absolute top-3 left-3"><CornerOrnament position="top-left" size={32} color={GOLD} /></div>
          <div className="absolute top-3 right-3"><CornerOrnament position="top-right" size={32} color={GOLD} /></div>
          <div className="absolute bottom-3 left-3"><CornerOrnament position="bottom-left" size={32} color={GOLD} /></div>
          <div className="absolute bottom-3 right-3"><CornerOrnament position="bottom-right" size={32} color={GOLD} /></div>

          <div className="relative p-7 sm:p-9 flex flex-col items-center text-center">
            {/* Sacred Ganesha */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9, type: 'spring', stiffness: 100 }}
              className="relative mb-3"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(184,154,98,0.5) 0%, transparent 70%)', filter: 'blur(8px)' }}
              />
              <GaneshaMotif size={60} color={GOLD} className="relative z-10 drop-shadow-lg" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-sans font-semibold text-gold-dark block mb-5"
            >
              With The Blessings of Lord Guruvayurappan
            </motion.span>

            {/* Story teaser */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mb-5 space-y-1.5"
            >
              <p className="font-romantic italic text-sm text-charcoal/60 leading-relaxed">
                "Every beautiful story has a beginning..."
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl text-burgundy font-medium leading-snug">
                Some stories begin in school.
              </h2>
            </motion.div>

            {/* Gold line divider */}
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-5 opacity-60" />

            {/* 3D Envelope with couple photo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="relative mb-5 flex justify-center items-center [perspective:900px] w-full"
            >
              {/* Envelope container */}
              <div
                onClick={handleOpen}
                className="relative w-56 sm:w-64 h-36 sm:h-40 rounded-xl cursor-pointer group overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #FAF4E8 0%, #EFE3CF 60%, #DFCEB6 100%)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)',
                  border: '1px solid rgba(184,154,98,0.5)',
                }}
              >
                {/* Envelope flap */}
                <div className="absolute inset-0 pointer-events-none">
                  <div style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)', background: 'linear-gradient(135deg, #F4E9D8, #E8D9C0)', borderBottom: '1px solid rgba(184,154,98,0.3)' }} className="absolute inset-0" />
                  <div style={{ clipPath: 'polygon(0 0, 0 100%, 50% 60%)', background: 'rgba(232,217,192,0.5)' }} className="absolute inset-0" />
                  <div style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 60%)', background: 'rgba(232,217,192,0.5)' }} className="absolute inset-0" />
                  <div style={{ clipPath: 'polygon(0 100%, 50% 58%, 100% 100%)', background: '#F0E3CE', borderTop: '1px solid rgba(184,154,98,0.3)' }} className="absolute inset-0" />
                </div>

                {/* Gold ribbon */}
                <div className="absolute inset-x-0 h-5 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to right, #937845, #D4BC8B, #E5C992, #D4BC8B, #937845)', opacity: 0.9 }} />

                {/* Parchment card inside */}
                <motion.div
                  animate={
                    isOpening
                      ? { y: -100, opacity: 1, scale: 1.1 }
                      : { y: [0, -6, 0] }
                  }
                  transition={{
                    duration: isOpening ? 0.9 : 3.5,
                    repeat: isOpening ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-44 sm:w-52 h-28 rounded-lg flex items-center p-2 gap-2 overflow-hidden z-20 pointer-events-none"
                  style={{ background: '#FFFDF9', border: '1px solid rgba(184,154,98,0.5)', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
                >
                  {/* Couple photo thumbnail */}
                  <div className="w-14 h-20 rounded-md overflow-hidden shrink-0" style={{ border: '1px solid rgba(184,154,98,0.4)' }}>
                    <img
                      src="/images/couple-01-black-outfits.png"
                      alt="Devika & Ashik"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center flex-1 min-w-0">
                    <span className="font-calligraphy text-lg text-burgundy leading-tight">Devika & Ashik</span>
                    <span className="text-[8px] tracking-[0.15em] font-sans uppercase text-gold-dark mt-0.5 font-semibold leading-tight">Wedding Invitation</span>
                    <span className="text-[8px] font-sans text-charcoal/60 mt-0.5">26 · 12 · 2026</span>
                    <div className="flex items-center gap-0.5 mt-1">
                      <Heart className="w-2 h-2 fill-burgundy text-burgundy" />
                      <span className="text-[8px] text-burgundy font-sans">Forever begins</span>
                    </div>
                  </div>
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  animate={
                    isOpening
                      ? { scale: [1, 1.5, 0], rotate: 60, opacity: 0 }
                      : { scale: [1, 1.07, 1] }
                  }
                  transition={{ duration: isOpening ? 0.5 : 2.5, repeat: isOpening ? 0 : Infinity }}
                  onClick={handleOpen}
                  className="absolute z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, #8B384E, #702B3D, #3A121D)`,
                    border: '2px solid rgba(184,154,98,0.8)',
                    boxShadow: '0 6px 20px rgba(112,43,61,0.6), 0 0 15px rgba(184,154,98,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-gold-light">
                    <span className="font-editorial text-xs font-bold tracking-widest">D & A</span>
                    <Heart className="w-2.5 h-2.5 fill-gold-light text-gold-light mt-[-1px]" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Names & Date */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-center mb-5"
            >
              <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy tracking-wide font-normal leading-tight">
                Devika <span className="font-calligraphy text-3xl sm:text-4xl text-gold-dark px-1 font-normal">&</span> Ashik
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <div className="w-8 h-[1px] bg-gold/40" />
                <p className="text-[10px] tracking-[0.3em] text-charcoal/60 uppercase font-sans font-medium">
                  Saturday · 26 December 2026
                </p>
                <div className="w-8 h-[1px] bg-gold/40" />
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="w-full"
            >
              <AnimatePresence>
                {showPulse && !isOpening && !hasOpened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full"
                  >
                    {/* Pulse rings */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full border-2 border-burgundy/40"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1.6], opacity: [0.4, 0.2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                      className="absolute inset-0 rounded-full border border-gold/30"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(184,154,98,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpen}
                disabled={isOpening || hasOpened}
                className="relative w-full px-8 py-4 rounded-full text-ivory font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase flex items-center justify-center gap-3 overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #702B3D 0%, #8B384E 50%, #702B3D 100%)',
                  border: '2px solid rgba(184,154,98,0.6)',
                  boxShadow: '0 10px 30px rgba(112,43,61,0.5)',
                }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x: ['-120%', '220%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                />

                <Sparkles className="w-4 h-4 text-gold-light" />
                <span>{isOpening ? 'Unfolding Our Forever...' : 'Open Our Story'}</span>
                <ChevronDown className={`w-4 h-4 text-gold-light transition-transform duration-300 ${isOpening ? 'translate-y-1' : ''}`} />
              </motion.button>

              <p className="font-romantic italic text-[11px] text-charcoal/50 mt-2.5 text-center">
                Tap to unveil our journey &amp; wedding invitation
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="relative z-10 mt-2 mb-6 flex flex-col items-center gap-1 text-ivory/40 text-[9px] font-sans tracking-widest uppercase cursor-pointer"
        onClick={handleOpen}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};
