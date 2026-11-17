import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { FloralDivider } from '../common/DecorativeMotifs';

export const StoryIntroduction: React.FC = () => {
  return (
    <section id="story-intro" className="relative py-20 px-4 sm:px-6 bg-[#FAF6EE] text-center overflow-hidden">
      <div className="max-w-2xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs font-sans tracking-[0.25em] uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Sacred Journey</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-editorial text-2xl sm:text-4xl text-burgundy font-normal leading-snug">
            "{weddingData.tagline}"
          </h2>

          <FloralDivider className="my-3 opacity-60" />

          <p className="font-calligraphy text-3xl sm:text-4xl text-gold-dark">
            {weddingData.secondaryTagline}
          </p>

          <p className="font-sans text-xs tracking-widest uppercase text-charcoal/50 pt-2">
            A three-chapter celebration of love, perseverance, and destiny
          </p>
        </motion.div>
      </div>
    </section>
  );
};

