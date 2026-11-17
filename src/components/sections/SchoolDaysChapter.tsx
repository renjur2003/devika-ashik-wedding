import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Send, Sparkles, Feather } from 'lucide-react';
import { FloralDivider } from '../common/DecorativeMotifs';
import { weddingData } from '../../data/weddingData';

export const SchoolDaysChapter: React.FC = () => {
  return (
    <section
      id="chapter-school"
      className="relative w-full pt-10 pb-16 px-4 sm:px-6 bg-wedding-pattern text-charcoal overflow-hidden"
    >
      {/* Background Subtle Floral & Gold Accents */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#16040A]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-burgundy/5 blur-3xl pointer-events-none" />

      {/* Floating Paper Airplane Animation */}
      <motion.div
        animate={{
          x: [-30, 50, -30],
          y: [-15, 20, -15],
          rotate: [-5, 10, -5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-6 sm:right-20 text-gold/50 pointer-events-none"
      >
        <Send className="w-8 h-8 sm:w-10 sm:h-10 -rotate-45" />
      </motion.div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        {/* Prologue: The Sacred Taglines (Tight & Elegant) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-gold-dark text-[11px] font-sans tracking-[0.25em] uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Our Sacred Journey</span>
            <Sparkles className="w-3 h-3 text-gold" />
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-burgundy font-normal leading-snug max-w-xl mx-auto">
            "{weddingData.tagline}"
          </h2>

          <p className="font-calligraphy text-2xl sm:text-3xl text-gold-dark pt-1">
            {weddingData.secondaryTagline}
          </p>

          <FloralDivider className="my-2 opacity-50" />
        </motion.div>

        {/* Chapter 01 Badge & Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-sans tracking-[0.2em] uppercase font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chapter 01 – The Beginning</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy font-normal tracking-wide mt-2">
            Where Forever Found Its Spark
          </h3>
        </motion.div>

        {/* Vintage School Notebook Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#FFFDF9] rounded-2xl shadow-xl border-2 border-[#E3D4C0] p-6 sm:p-9 overflow-hidden"
        >
          {/* Notebook Spiral Binding Rings on Left */}
          <div className="absolute left-2.5 top-0 bottom-0 flex flex-col justify-around py-3 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-3.5 rounded-full border border-charcoal/25 bg-[#E8D9C3] shadow-inner" />
            ))}
          </div>

          <div className="pl-5 sm:pl-7">
            {/* Red Margin Line */}
            <div className="absolute left-9 sm:left-12 top-0 bottom-0 w-[1.5px] bg-[#E8A87C]/70 pointer-events-none" />

            {/* Note Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EADFCF]">
              <span className="font-sans text-[11px] tracking-wider uppercase text-charcoal/50 font-medium">
                School Notebook Memory
              </span>
              <span className="font-romantic italic text-xs sm:text-sm text-gold-dark">
                Once upon a classroom bench...
              </span>
            </div>

            {/* Notebook Ruled Content Area */}
            <div className="notebook-ruled-lines p-4 rounded-xl border border-[#EDE3D4] space-y-3 font-romantic text-lg sm:text-xl text-charcoal/90 leading-relaxed">
              <p className="font-medium text-charcoal">
                Before forever, there was a classroom.
              </p>
              <p className="italic text-charcoal/80">
                Before promises, there were little moments.
              </p>
              <p className="font-normal text-burgundy font-medium">
                And somewhere in those school days, a beautiful story began.
              </p>
            </div>

            {/* Illustrated Love Note */}
            <div className="mt-5 p-4 rounded-xl bg-[#FAF5EB] border border-gold/30 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-burgundy/10 border border-burgundy/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-burgundy" />
              </div>
              <div>
                <p className="font-calligraphy text-xl sm:text-2xl text-burgundy">
                  "Two desks, shared glances, and a lifetime promise."
                </p>
                <p className="font-sans text-[10px] text-charcoal/55 uppercase tracking-widest mt-0.5">
                  The innocent beginnings that shaped two lives
                </p>
              </div>
            </div>

            {/* Transition Line */}
            <div className="mt-5 pt-4 border-t border-[#EADFCF] text-center">
              <p className="font-editorial text-sm sm:text-base text-gold-dark italic">
                "Little did they know, this was the beginning of forever."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
