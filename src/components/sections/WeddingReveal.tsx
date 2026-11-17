import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { JasmineFlower, FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';

export const WeddingReveal: React.FC = () => {
  return (
    <section id="wedding-reveal" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-burgundy-deep via-burgundy to-burgundy-dark text-ivory flex items-center justify-center overflow-hidden">
      {/* Golden Glowing Particles / Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Jasmine Flower motifs */}
        {[
          { top: '10%', left: '8%', delay: 0 },
          { top: '18%', right: '10%', delay: 1 },
          { bottom: '15%', left: '12%', delay: 2 },
          { bottom: '22%', right: '8%', delay: 1.5 },
        ].map((pos, idx) => (
          <motion.div
            key={idx}
            style={{ position: 'absolute', ...pos }}
            animate={{
              y: [-10, 15, -10],
              rotate: [0, 15, -15, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 6 + idx, repeat: Infinity, delay: pos.delay }}
            className="pointer-events-none"
          >
            <JasmineFlower size={36} />
          </motion.div>
        ))}

        {/* Shimmering Golden Dust */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-light"
            style={{
              width: i % 2 === 0 ? '3px' : '2px',
              height: i % 2 === 0 ? '3px' : '2px',
              top: `${(i * 19) % 94}%`,
              left: `${(i * 23) % 94}%`,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.3) % 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        {/* Luxury Frame Container */}
        <div className="relative p-6 sm:p-12 border border-gold/40 rounded-3xl bg-burgundy-deep/60 backdrop-blur-xl shadow-2xl">
          {/* Ornate Gold Corners */}
          <div className="absolute top-3 left-3">
            <CornerOrnament position="top-left" color="#E5C992" size={32} />
          </div>
          <div className="absolute top-3 right-3">
            <CornerOrnament position="top-right" color="#E5C992" size={32} />
          </div>
          <div className="absolute bottom-3 left-3">
            <CornerOrnament position="bottom-left" color="#E5C992" size={32} />
          </div>
          <div className="absolute bottom-3 right-3">
            <CornerOrnament position="bottom-right" color="#E5C992" size={32} />
          </div>

          {/* Reveal Intro */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-2"
          >
            <span className="text-xs sm:text-sm font-sans tracking-[0.4em] uppercase text-gold-light block font-light">
              AND NOW...
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-romantic italic text-2xl sm:text-3xl text-ivory/90 mb-3 font-light"
          >
            THE FOREVER BEGINS
          </motion.h3>

          {/* Arched Temple Cameo of Couple Portrait with Gold Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-36 h-48 sm:w-44 sm:h-56 mx-auto my-4 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-gold shadow-[0_0_25px_rgba(184,154,98,0.45)] bg-burgundy-deep group"
          >
            <img
              src="/images/couple-01-black-outfits.png"
              alt="Devika & Ashik"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/70 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-3 py-0.5 rounded-full bg-burgundy/80 backdrop-blur-sm border border-gold/40 text-[10px] tracking-widest uppercase text-gold-light font-sans flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-gold-light text-gold-light" />
                Devika & Ashik
              </span>
            </div>
          </motion.div>

          <FloralDivider className="my-3 opacity-70" color="#E5C992" />

          {/* Grand Couple Name Announcement */}
          <div className="py-2 space-y-1">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl tracking-wider text-ivory font-normal uppercase drop-shadow-md"
            >
              DEVIKA
            </motion.h1>

            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="my-1 flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-12 sm:w-20 bg-gold/50" />
              <span className="font-calligraphy text-3xl sm:text-4xl text-gold-glow">
                &
              </span>
              <div className="h-[1px] w-12 sm:w-20 bg-gold/50" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl tracking-wider text-ivory font-normal uppercase drop-shadow-md"
            >
              ASHIK
            </motion.h1>
          </div>

          <FloralDivider className="my-3 opacity-70" color="#E5C992" />

          {/* Invitation Invitation Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xl mx-auto"
          >
            <p className="font-romantic text-lg sm:text-xl text-ivory/90 leading-relaxed italic">
              "With our families, we invite you to celebrate the beginning of our forever."
            </p>
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold-light mt-3 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span>Saturday, 26 December 2026</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
