import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Heart, ChevronDown, BookmarkPlus } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { GaneshaMotif, DAMonogram, FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';
import { getGoogleCalendarUrl } from '../../utils/calendarHelper';

interface PageOneHeroProps {
  onExploreStory: () => void;
  onExploreCeremony: () => void;
}

export const PageOneHero: React.FC<PageOneHeroProps> = ({
  onExploreStory,
  onExploreCeremony,
}) => {
  const { bride, groom, date, venues, tagline, secondaryTagline } = weddingData;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start sm:justify-center pt-12 pb-10 sm:py-14 px-3 sm:px-6 bg-wedding-pattern text-[#222921] overflow-hidden select-none">
      {/* Lush Pastel Ambient Glows & Kasavu Side Framing */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#8FA88B]/22 via-[#E8A598]/22 to-[#C5A869]/15 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#E8A598]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#8FA88B]/25 blur-3xl pointer-events-none" />

      {/* Subtle Traditional Kasavu Gold & Sage Framing Lines on Desktop */}
      <div className="hidden md:block absolute inset-y-6 left-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 left-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />

      {/* Delicate Corner Ornaments */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-10 opacity-55 pointer-events-none">
        <CornerOrnament position="top-left" size={44} color="#B89047" />
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-10 opacity-55 pointer-events-none">
        <CornerOrnament position="top-right" size={44} color="#B89047" />
      </div>

      {/* Subtle Mandala Watermark Behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-[#C5A869]/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] h-[660px] rounded-full border border-dashed border-[#8FA88B]/20 pointer-events-none animate-gentle-rotate" />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* REQUIREMENT 14: Highlighted Royal D&A Monogram Symbol */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-1 sm:mb-4 group cursor-pointer scale-[0.72] sm:scale-100 -my-3 sm:my-0"
        >
          {/* Radiant Pulsing Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#E8A598]/35 via-[#C5A869]/25 to-[#8FA88B]/30 blur-xl animate-pulse pointer-events-none" />
          <div className="absolute -inset-1.5 rounded-full border border-[#C5A869]/60 opacity-85 pointer-events-none" />
          
          <div className="p-2 sm:p-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_14px_38px_rgba(90,115,86,0.22)] border-2 border-[#C5A869]/55">
            <DAMonogram size={108} />
          </div>
        </motion.div>

        {/* Auspicious Ganesha Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#8FA88B]/50 shadow-sm mb-2 sm:mb-4 max-w-full"
        >
          <GaneshaMotif size={16} color="#5A7356" />
          <span className="text-[9px] sm:text-xs font-sans tracking-[0.12em] sm:tracking-[0.22em] uppercase text-[#2F442C] font-bold whitespace-nowrap">
            With The Blessings of Lord Guruvayurappan
          </span>
        </motion.div>

        {/* REQUIREMENT 3: Tagline "From Schoolmates to Soulmates" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="space-y-0.5 sm:space-y-1 mb-1.5 sm:mb-3"
        >
          <h2 className="font-editorial text-lg sm:text-3xl text-[#3E583A] font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {tagline}
          </h2>
          <p className="font-romantic italic text-xs sm:text-lg text-[#4A4238] font-medium">
            {secondaryTagline}
          </p>
        </motion.div>

        {/* REQUIREMENT 1: Couple Names - Devika & Ashish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="my-0.5 sm:my-1.5"
        >
          <h1 className="font-editorial text-[34px] sm:text-6xl md:text-7xl text-[#263824] font-semibold tracking-wide whitespace-nowrap drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            Devika <span className="font-calligraphy text-[38px] sm:text-6xl md:text-7xl text-[#B8566B] px-1 sm:px-1.5 font-normal">&amp;</span> Ashish
          </h1>
        </motion.div>

        <FloralDivider className="my-1.5 sm:my-3 opacity-85" color="#6E8A6A" />

        {/* REQUIREMENT 10 & 2: Pink Dress & White T-Shirt Photo with Groom's Face 100% Fully Visible */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="relative my-2 sm:my-4 w-full max-w-[300px] sm:max-w-md"
        >
          {/* Decorative Pastel Frame Halo */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#8FA88B]/35 via-[#E8A598]/30 to-[#C5A869]/35 blur-xl pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden shadow-[0_22px_50px_rgba(54,75,51,0.22)] bg-white border-2 border-[#C5A869]/65 p-1.5 sm:p-2.5">
            {/* The photo container with optimal height and object-position to guarantee Ashish's face is 100% visible */}
            <div className="relative w-full aspect-[4/4.2] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF6EE] ring-1 ring-[#C5A869]/30">
              <img
                src="/images/couple-04-night-candid.jpg"
                alt="Devika & Ashish"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A869]/60 text-xs font-sans tracking-widest uppercase text-[#263824] font-bold flex items-center gap-1.5 shadow-lg">
                  <Heart className="w-3.5 h-3.5 text-[#B8566B] fill-[#B8566B]" />
                  Devika &amp; Ashish
                </span>
              </div>
            </div>
          </div>

          {/* REQUIREMENT 5: Date 26th Dec clearly visible below 1st picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#C5A869]/70 shadow-[0_14px_35px_rgba(90,115,86,0.18)] text-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute inset-1.5 rounded-xl border border-[#C5A869]/25 pointer-events-none" />
            <div className="relative flex items-center justify-center gap-2 text-[#263824]">
              <Calendar className="w-4 h-4 text-[#B89047]" />
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider uppercase text-[#263824]">
                ✦ {date.dayOfWeek}, {date.gregorian} ✦
              </span>
            </div>

            {/* REQUIREMENT 7: Thalikettu time 6:30 am to 7:00 am */}
            <div className="relative flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#3B5237]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B8566B]" />
                Muhurtham: <strong className="font-bold text-[#263824]">6:30 AM – 7:00 AM</strong>
              </span>
              <span className="text-[#B89047]">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B8566B]" />
                {venues.thalikettu.name}, {venues.thalikettu.location}
              </span>
            </div>

            {/* Quick Add to Calendar Button */}
            <div className="relative pt-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF5EE] hover:bg-[#EFE6D5] text-[#263824] border border-[#C5A869]/70 text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow"
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-[#B89047]" />
                <span>Save Date to Google Calendar</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons to explore 3 Pages */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onExploreStory}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#5F7D5B] to-[#749170] hover:from-[#526E4E] hover:to-[#668262] text-white font-sans text-xs tracking-wider uppercase font-bold shadow-[0_8px_22px_rgba(95,125,91,0.35)] hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Our Love Story</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreCeremony}
            className="px-7 py-3 rounded-full bg-white/95 hover:bg-[#FAF5EE] text-[#263824] border-2 border-[#C5A869]/70 font-sans text-xs tracking-wider uppercase font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#B8566B]" />
            <span>Ceremony &amp; Invitation Card</span>
          </button>
        </div>

      </div>
    </section>
  );
};
