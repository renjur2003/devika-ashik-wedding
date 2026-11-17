import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Mail, Heart, Clock, Radio } from 'lucide-react';
import { FloralDivider } from '../common/DecorativeMotifs';

export const LongDistanceChapter: React.FC = () => {
  return (
    <section id="chapter-distance" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 starry-sky text-ivory flex items-center justify-center overflow-hidden">
      {/* Twinkling Constellations & Floating Star Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 3 === 0 ? '3px' : '1.5px',
              height: i % 3 === 0 ? '3px' : '1.5px',
              top: `${(i * 17) % 96}%`,
              left: `${(i * 23) % 96}%`,
              boxShadow: i % 2 === 0 ? '0 0 6px rgba(255, 255, 255, 0.8)' : 'none',
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2.5 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.3) % 3,
            }}
          />
        ))}

        {/* Subtle Constellation Lines connecting stars */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20%" y1="30%" x2="45%" y2="25%" stroke="#B89A62" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="45%" y1="25%" x2="70%" y2="40%" stroke="#B89A62" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="30%" y1="75%" x2="55%" y2="80%" stroke="#B89A62" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="55%" y1="80%" x2="80%" y2="70%" stroke="#B89A62" strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        {/* Chapter Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-xs font-sans tracking-[0.2em] uppercase mb-2 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>Chapter 02 – Miles Apart, Hearts Together</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
            Across The Miles, Ever Closer
          </h2>
          <FloralDivider className="mt-2 opacity-40 text-gold-light" color="#D4BC8B" />
        </motion.div>

        {/* Symbolic Two Connected Glowing Points */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative bg-charcoal-dark/75 border border-gold/30 rounded-2xl p-6 sm:p-9 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Symbolic Golden Arc Connection */}
          <div className="relative py-6 px-4 flex items-center justify-between mb-6">
            {/* Point 1: Heart 1 */}
            <div className="flex flex-col items-center z-10">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-11 h-11 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center shadow-[0_0_15px_rgba(184,154,98,0.5)]"
              >
                <Heart className="w-5 h-5 text-gold-light fill-gold-light" />
              </motion.div>
              <span className="font-sans text-[10px] tracking-widest uppercase text-gold-light mt-1.5 font-medium">
                One Heart
              </span>
            </div>

            {/* Glowing Golden Connection Line & Pulsing Messenger */}
            <div className="relative flex-1 mx-2 sm:mx-4 h-[2px] bg-gradient-to-r from-gold/30 via-gold to-gold/30 overflow-visible flex items-center justify-center">
              <motion.div
                animate={{ x: [-35, 35, -35] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-6 h-6 rounded-full bg-burgundy border border-gold flex items-center justify-center shadow-[0_0_12px_#E5C992]"
              >
                <Mail className="w-3 h-3 text-gold-light" />
              </motion.div>
            </div>

            {/* Point 2: Heart 2 */}
            <div className="flex flex-col items-center z-10">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.25 }}
                className="w-11 h-11 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center shadow-[0_0_15px_rgba(184,154,98,0.5)]"
              >
                <Heart className="w-5 h-5 text-gold-light fill-gold-light" />
              </motion.div>
              <span className="font-sans text-[10px] tracking-widest uppercase text-gold-light mt-1.5 font-medium">
                One Destiny
              </span>
            </div>
          </div>

          {/* Postal Stamp & Airmail Decorative Accent */}
          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-50 pointer-events-none">
            <div className="border border-dashed border-gold/40 px-2 py-0.5 text-[8px] uppercase tracking-widest font-sans rounded text-gold-light">
              AIRMAIL · LOVE
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-3 font-romantic text-base sm:text-xl text-ivory/90 leading-relaxed text-center sm:text-left">
            <p className="italic">
              Life took them across different distances, but their hearts never lost the connection.
            </p>
            <p className="text-ivory/80 text-sm sm:text-lg">
              Through every mile, every conversation, and every moment of waiting, their love continued to grow.
            </p>
            <p className="font-medium text-gold-light text-base sm:text-xl">
              Distance could separate their paths, but never their hearts.
            </p>
          </div>

          {/* Symbolic Long Distance Elements */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-gold/20">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-xs font-sans text-ivory font-medium">Uncounted Hours</p>
                <p className="text-[10px] text-ivory/60">Midnight calls & patience</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-xs font-sans text-ivory font-medium">One Frequency</p>
                <p className="text-[10px] text-ivory/60">Forever synchronized</p>
              </div>
            </div>
          </div>

          {/* Transition Line */}
          <div className="mt-6 text-center pt-2">
            <p className="font-editorial text-base sm:text-lg text-gold-light italic">
              "After all the miles, the wait was worth it."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
