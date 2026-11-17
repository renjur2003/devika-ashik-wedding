import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Church, PartyPopper, ExternalLink } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { FloralDivider } from '../common/DecorativeMotifs';

export const VenueDetails: React.FC = () => {
  const { venues } = weddingData;

  return (
    <section id="event-venues" className="relative w-full py-14 sm:py-16 px-4 sm:px-6 bg-botanical-pattern text-charcoal overflow-hidden">
      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-sans tracking-[0.2em] uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Event Locations</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Where We Celebrate
          </h2>
          <p className="font-romantic italic text-base sm:text-xl text-charcoal/70 mt-1 max-w-lg mx-auto">
            "Join our sacred vows at the temple and rejoice with us at the celebration centre."
          </p>
          <FloralDivider className="mt-2 opacity-60" />
        </motion.div>

        {/* Two Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Thalikettu Venue */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FFFDF9] rounded-2xl border-2 border-gold/40 p-6 sm:p-7 shadow-xl flex flex-col justify-between group hover:border-gold transition-all duration-300"
          >
            {/* Top Accent Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[11px] font-sans tracking-widest uppercase font-semibold">
                Thalikettu Ceremony
              </span>
              <Church className="w-5 h-5 text-gold-dark" />
            </div>

            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy font-medium tracking-wide">
                {venues.thalikettu.name}
              </h3>
              <p className="font-sans text-sm text-charcoal/80 font-medium mt-1">
                {venues.thalikettu.location}
              </p>

              <div className="my-4 p-3 rounded-xl bg-[#FAF5EC] border border-gold/30 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-burgundy shrink-0" />
                <span className="font-sans text-xs text-charcoal font-medium">
                  Muhurtham: {venues.thalikettu.time}
                </span>
              </div>

              <p className="font-romantic text-sm sm:text-base text-charcoal/70 italic leading-relaxed">
                The sacred ceremony where the vows of love and auspicious mangalya thali are bestowed with divine blessings.
              </p>
            </div>

            {/* Navigation Button */}
            <div className="mt-6 pt-5 border-t border-[#EAE0D0]">
              <a
                href={venues.thalikettu.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-burgundy text-ivory hover:bg-burgundy-light font-sans text-xs tracking-[0.2em] uppercase font-medium shadow-md flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-gold/20"
              >
                <Navigation className="w-4 h-4 text-gold-light" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Celebration Venue */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FFFDF9] rounded-2xl border-2 border-gold/40 p-6 sm:p-7 shadow-xl flex flex-col justify-between group hover:border-gold transition-all duration-300"
          >
            {/* Top Accent Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[11px] font-sans tracking-widest uppercase font-semibold">
                Wedding Celebration
              </span>
              <PartyPopper className="w-5 h-5 text-burgundy" />
            </div>

            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy font-medium tracking-wide">
                {venues.celebration.name}
              </h3>
              <p className="font-sans text-sm text-charcoal/80 font-medium mt-1">
                {venues.celebration.location}
              </p>

              <div className="my-4 p-3 rounded-xl bg-[#FAF5EC] border border-gold/30 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-burgundy shrink-0" />
                <span className="font-sans text-xs text-charcoal font-medium">
                  Anthikad, Thrissur District
                </span>
              </div>

              <p className="font-romantic text-sm sm:text-base text-charcoal/70 italic leading-relaxed">
                Join our families and friends in sharing fellowship, joyous laughter, felicitations, and wedding feast.
              </p>
            </div>

            {/* Navigation Button */}
            <div className="mt-6 pt-5 border-t border-[#EAE0D0]">
              <a
                href={venues.celebration.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-burgundy text-ivory hover:bg-burgundy-light font-sans text-xs tracking-[0.2em] uppercase font-medium shadow-md flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-gold/20"
              >
                <Navigation className="w-4 h-4 text-gold-light" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
