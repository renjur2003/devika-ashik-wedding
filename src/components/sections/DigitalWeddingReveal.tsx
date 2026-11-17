import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Crown, Calendar, MapPin, Share2 } from 'lucide-react';
import { JasmineFlower, CornerOrnament, GaneshaMotif } from '../common/DecorativeMotifs';
import { triggerRoyalConfetti } from '../../utils/confettiExplosion';

export const DigitalWeddingReveal: React.FC = () => {
  const [blessingCount, setBlessingCount] = useState(1284);
  const [hasBlessed, setHasBlessed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // 3D Parallax tilt tracking
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleBlessClick = (e: React.MouseEvent) => {
    setBlessingCount((prev) => prev + 1);
    setHasBlessed(true);
    triggerRoyalConfetti();

    // Spawn 6 floating hearts at random coordinates
    const rect = cardRef.current?.getBoundingClientRect();
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 80,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 2000);
  };

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto px-2 sm:px-4 select-none">
      {/* 3D Tilted Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[32px] p-[2px] transition-shadow duration-500 group"
      >
        {/* DIGITAL EFFECT 1: Animated Conic Gradient Glowing Border Beam */}
        <div
          className="absolute -inset-[3px] rounded-[34px] opacity-75 group-hover:opacity-100 transition-opacity duration-700 blur-[6px] pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #B89A62 0deg, #E5C992 60deg, #702B3D 120deg, #B89A62 180deg, #E5C992 240deg, #702B3D 300deg, #B89A62 360deg)',
            animation: 'spinBorder 10s linear infinite',
          }}
        />

        {/* Digital crisp border outline */}
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #B89A62 0deg, #FAF5EC 60deg, #702B3D 120deg, #B89A62 180deg, #FAF5EC 240deg, #702B3D 300deg, #B89A62 360deg)',
            animation: 'spinBorder 10s linear infinite',
          }}
        />

        {/* Outer ambient glow cushion */}
        <div className="absolute -inset-8 bg-gradient-to-r from-burgundy/40 via-gold/30 to-burgundy/40 rounded-[48px] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

        {/* MAIN CARD BODY: Deep Royal Velvet Burgundy with Glassmorphism */}
        <div
          className="relative rounded-[30px] overflow-hidden text-ivory text-center py-12 sm:py-16 px-5 sm:px-12 backdrop-blur-2xl shadow-[0_35px_90px_rgba(30,5,15,0.7)]"
          style={{
            background: 'radial-gradient(ellipse at 50% 25%, #4F1626 0%, #2A0913 50%, #150308 100%)',
          }}
        >
          {/* DIGITAL EFFECT 2: Floating Golden Bokeh & Light Dust */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft pulsing sunburst glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(229,201,146,0.35) 0%, rgba(184,154,98,0.15) 35%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Floating bokeh orbs */}
            <div className="absolute top-10 left-12 w-32 h-32 rounded-full bg-gold/15 blur-2xl animate-bokeh" />
            <div className="absolute bottom-12 right-14 w-40 h-40 rounded-full bg-burgundy/40 blur-2xl animate-bokeh" style={{ animationDelay: '3s' }} />

            {/* Starlight sparkles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gold-light pointer-events-none"
                style={{
                  width: i % 3 === 0 ? '3px' : '2px',
                  height: i % 3 === 0 ? '3px' : '2px',
                  top: `${(i * 17 + 5) % 90}%`,
                  left: `${(i * 23 + 7) % 92}%`,
                }}
                animate={{
                  opacity: [0.15, 0.9, 0.15],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: 2.2 + (i % 3),
                  repeat: Infinity,
                  delay: (i * 0.4) % 2,
                }}
              />
            ))}

            {/* Traditional Kasavu geometric watermark */}
            <div
              className="absolute inset-0 opacity-[0.045] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0 L50 25 L25 50 L0 25 Z' fill='%23B89A62' fill-opacity='0.8'/%3E%3Ccircle cx='25' cy='25' r='5' fill='%23FAF5EC'/%3E%3C/svg%3E")`,
                backgroundSize: '50px 50px',
              }}
            />

            {/* Laser Shimmer Sweep over card */}
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-laser-sweep" />
          </div>

          {/* Golden Filigree Corner Ornaments */}
          <div className="absolute top-4 left-4 opacity-60 group-hover:opacity-90 transition-opacity">
            <CornerOrnament position="top-left" size={32} color="#E5C992" />
          </div>
          <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-90 transition-opacity">
            <CornerOrnament position="top-right" size={32} color="#E5C992" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-60 group-hover:opacity-90 transition-opacity">
            <CornerOrnament position="bottom-left" size={32} color="#E5C992" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-60 group-hover:opacity-90 transition-opacity">
            <CornerOrnament position="bottom-right" size={32} color="#E5C992" />
          </div>

          {/* Inner hairline border */}
          <div className="absolute inset-3 sm:inset-4 rounded-[24px] border border-gold/25 pointer-events-none" />

          {/* CONTENT LAYER */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Sparkles Trio */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-2"
            >
              <Sparkles className="w-4 h-4 text-gold-glow animate-twinkle" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.45em] uppercase text-gold-light/90 font-medium">
                AND NOW...
              </span>
              <Sparkles className="w-4 h-4 text-gold-glow animate-twinkle" style={{ animationDelay: '0.8s' }} />
            </motion.div>

            {/* THE FOREVER BEGINS with Shimmering Gold Foil Gradient */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[0.18em] uppercase my-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
              style={{
                background: 'linear-gradient(135deg, #FFF9ED 0%, #F5E5C9 30%, #D4BC8B 60%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              The Forever Begins
            </motion.h2>

            {/* DIGITAL EFFECT 3: Arched Cameo Portrait with Animated Gold Halo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-5 group/cameo"
            >
              {/* Pulsing Aura Rings behind portrait */}
              <div
                className="absolute -inset-3 rounded-t-full rounded-b-3xl opacity-70 pointer-events-none animate-ripple"
                style={{
                  background: 'radial-gradient(circle, rgba(229,201,146,0.5) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute -inset-1 rounded-t-full rounded-b-3xl border border-gold/60 opacity-80 pointer-events-none"
              />

              {/* Arch frame */}
              <div
                className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-gold/80 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(184,154,98,0.4)]"
                style={{ background: '#1C050D' }}
              >
                <img
                  src="/images/couple-02-maroon-saree.png"
                  alt="Devika & Ashik in Festive Maroon Saree"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/cameo:scale-108"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#150308]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Shimmer reflection across photo */}
                <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cameo:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Couple pill badge at the bottom of portrait */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/50 text-[10px] font-sans tracking-widest uppercase text-gold-light flex items-center gap-1.5 shadow-lg">
                    <Heart className="w-2.5 h-2.5 fill-gold text-gold animate-heartbeat" />
                    Devika & Ashik
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Glowing Golden Divider */}
            <div className="flex items-center justify-center gap-3 my-2 w-full max-w-xs">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold to-gold/20" />
              <Crown className="w-4 h-4 text-gold-glow drop-shadow" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold to-gold/20" />
            </div>

            {/* DIGITAL EFFECT 4: COUPLE NAMES with Pulsing Beating Heart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 my-2"
            >
              <h3
                className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-normal tracking-wider uppercase text-ivory drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
              >
                Devika
              </h3>

              {/* Pulsing Golden Heart Monogram */}
              <div className="relative flex items-center justify-center mx-1 sm:mx-2">
                {/* Heart pulse ripple */}
                <div className="absolute w-12 h-12 rounded-full bg-gold/20 animate-ping opacity-60 pointer-events-none" />

                <div
                  className="relative z-10 w-10 h-10 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border border-gold/70 shadow-[0_0_20px_rgba(229,201,146,0.6)]"
                  style={{
                    background: 'radial-gradient(circle, #702B3D 0%, #3D101C 100%)',
                  }}
                >
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-gold fill-gold animate-heartbeat drop-shadow" />
                </div>
              </div>

              <h3
                className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-normal tracking-wider uppercase text-ivory drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
              >
                Ashik
              </h3>
            </motion.div>

            {/* Sacred Invitation Line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-romantic italic text-base sm:text-xl text-gold-light/90 max-w-lg mx-auto mt-3 leading-relaxed"
            >
              "With our families, we invite you to celebrate the beginning of our forever."
            </motion.p>

            {/* Auspicious Date Pill with Live Pulse Dot */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/40 backdrop-blur-md mt-5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(112,43,61,0.3) 100%)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
              }}
            >
              {/* Green/Gold Live Pulse Dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-glow" />
              </span>

              <Calendar className="w-3.5 h-3.5 text-gold-light" />
              <span className="text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase text-ivory font-semibold">
                Saturday, 26 December 2026
              </span>
              <span className="text-[10px] font-sans text-gold-light/75 hidden sm:inline">
                • Guruvayur Ceremony
              </span>
            </motion.div>

            {/* DIGITAL EFFECT 5: Interactive "Shower Blessings" Heart Burst Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="relative mt-7"
            >
              {/* Floating Heart Particles when clicked */}
              <AnimatePresence>
                {floatingHearts.map((h) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 1, y: 0, x: h.x, scale: 1 }}
                    animate={{ opacity: 0, y: -120, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className="absolute pointer-events-none z-30 left-1/2 top-0"
                  >
                    <Heart className="w-5 h-5 text-gold fill-gold drop-shadow-lg" />
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={handleBlessClick}
                className="group/btn relative px-6 py-2.5 rounded-full overflow-hidden flex items-center gap-2.5 font-sans text-xs tracking-wider uppercase font-semibold text-ivory cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_6px_25px_rgba(184,154,98,0.35)] border border-gold/60"
                style={{
                  background: 'linear-gradient(135deg, #702B3D 0%, #8B384E 50%, #702B3D 100%)',
                }}
              >
                {/* Button shimmer sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

                <Heart className={`w-4 h-4 text-gold fill-gold transition-transform duration-300 ${hasBlessed ? 'scale-125' : 'group-hover/btn:scale-115'}`} />
                <span>{hasBlessed ? 'Blessings Showered! ❤️' : 'Shower Love & Blessings'}</span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-gold-light border border-gold/30">
                  {blessingCount.toLocaleString()}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* DIGITAL EFFECT 6: Upgraded Bottom Glassmorphism Tagline Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 relative max-w-2xl mx-auto rounded-2xl p-6 sm:p-7 text-center overflow-hidden border border-gold/40 shadow-xl group hover:border-gold transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, #FFFDF9 0%, #FAF5EC 50%, #F5EBDD 100%)',
        }}
      >
        {/* Top gold shimmer bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Ambient backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5 opacity-60">
            <span className="text-gold text-lg">“</span>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-dark font-semibold">
              The Journey of Destiny
            </span>
            <span className="text-gold text-lg">”</span>
          </div>

          <p className="font-editorial text-xl sm:text-2xl text-burgundy font-normal leading-snug">
            "Two hearts. One journey. A lifetime of love."
          </p>

          <div className="w-16 h-[1px] bg-gold/40 my-2.5" />

          <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-charcoal/70 font-medium">
            Every step led us here — to the day we say forever.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

