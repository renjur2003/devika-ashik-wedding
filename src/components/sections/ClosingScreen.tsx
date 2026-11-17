import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Heart, ArrowUp, Check } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { EditorialImage } from '../common/EditorialImage';
import { JasmineFlower, FloralDivider } from '../common/DecorativeMotifs';

export const ClosingScreen: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Devika & Ashik Wedding Invitation',
      text: 'A story that began in school, travelled across the miles, and now begins forever. Celebrate the wedding of Devika & Ashik on Saturday, 26 December 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FAF5EB] via-[#F3E7D5] to-[#E5D5BF] text-charcoal overflow-hidden">
      {/* Floating Jasmine Flower */}
      <div className="absolute top-8 right-8 opacity-60 pointer-events-none">
        <JasmineFlower size={38} />
      </div>
      <div className="absolute bottom-12 left-6 opacity-60 pointer-events-none">
        <JasmineFlower size={32} />
      </div>

      <div className="max-w-xl w-full mx-auto text-center relative z-10">
        {/* Editorial Frame of Photo 04 (Night Candid Portrait) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative max-w-xs sm:max-w-sm mx-auto mb-8"
        >
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-gold/40 shadow-xl">
            <EditorialImage
              src="/images/couple-04-night-candid.png"
              alt="Devika & Ashik Romantic Night Candid Portrait"
              captionTitle="Devika & Ashik"
              captionSubtitle="Forever & Always"
              aspectRatio="aspect-[3/4]"
              objectPosition="object-top"
            />
          </div>
        </motion.div>

        {/* Closing Romantic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2.5"
        >
          <p className="font-romantic italic text-lg sm:text-xl text-gold-dark font-medium">
            "From school days to forever..."
          </p>

          <h2 className="font-editorial text-3xl sm:text-4xl text-burgundy tracking-wider uppercase">
            DEVIKA <span className="font-calligraphy text-3xl sm:text-4xl text-gold font-normal px-1">&</span> ASHIK
          </h2>

          <p className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/70 font-semibold">
            26 . 12 . 2026
          </p>

          <FloralDivider className="my-3 opacity-60" />

          <p className="font-romantic italic text-base sm:text-lg text-charcoal/80 max-w-md mx-auto">
            "With love, we look forward to celebrating with you."
          </p>
        </motion.div>

        {/* Share Invitation & Back to Top Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory font-sans text-xs tracking-wider uppercase font-medium shadow-md hover:shadow-gold/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-gold-light" />
                <span>Invitation Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-gold-light" />
                <span>Share Invitation</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gold/50 bg-[#FFFDF9] hover:bg-gold/15 text-charcoal font-sans text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-gold-dark" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Copyright / Credits */}
        <div className="mt-10 pt-4 border-t border-[#DED4C3] text-center">
          <p className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest font-medium">
            {weddingData.sharingHappiness}
          </p>
          <p className="font-romantic italic text-[11px] text-charcoal/40 mt-0.5">
            Celebrating the sacred bond of Devika & Ashik • Kerala, India
          </p>
        </div>
      </div>
    </footer>
  );
};
