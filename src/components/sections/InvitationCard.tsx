import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Home, Heart, Download } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { GaneshaMotif, CornerOrnament, FloralDivider, TempleLampMotif } from '../common/DecorativeMotifs';

export const InvitationCard: React.FC = () => {
  const { bride, groom, date, venues, contact, sharingHappiness, invitationCardNote } = weddingData;

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <section id="official-invitation" className="relative w-full py-14 sm:py-18 px-4 sm:px-6 bg-wedding-pattern text-charcoal flex items-center justify-center overflow-hidden">
      {/* Background Soft Lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10">
        {/* Section Badge */}
        <div className="text-center mb-6">
          <span className="text-xs font-sans tracking-[0.25em] uppercase text-gold-dark font-medium block mb-1">
            Ceremony & Invitation
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Wedding Invitation
          </h2>
          <FloralDivider className="mt-2 opacity-60" />
        </div>

        {/* Master Traditional Invitation Card Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative bg-[#FFFDF9] border-2 border-gold/50 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Inner Inset Gold Border */}
          <div className="absolute inset-2 sm:inset-3 border border-gold/30 rounded-xl pointer-events-none" />

          {/* Ornate Corner Accents */}
          <div className="absolute top-4 left-4">
            <CornerOrnament position="top-left" size={32} />
          </div>
          <div className="absolute top-4 right-4">
            <CornerOrnament position="top-right" size={32} />
          </div>
          <div className="absolute bottom-4 left-4">
            <CornerOrnament position="bottom-left" size={32} />
          </div>
          <div className="absolute bottom-4 right-4">
            <CornerOrnament position="bottom-right" size={32} />
          </div>

          {/* Sacred Ganesha & Nilavilakku Header */}
          <div className="text-center mb-5 pt-1">
            <div className="flex items-center justify-center gap-4 mb-2">
              <TempleLampMotif size={28} />
              <GaneshaMotif size={56} />
              <TempleLampMotif size={28} />
            </div>
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-gold-dark font-semibold">
              WITH THE BLESSINGS OF OUR FAMILIES
            </p>
          </div>

          <FloralDivider className="my-2.5 opacity-60" />

          {/* Couple Announcement with Complete Lineage & Family Names */}
          <div className="text-center space-y-5 my-5">
            {/* Bride Information */}
            <div className="space-y-1.5">
              <h3 className="font-editorial text-3xl sm:text-4xl text-burgundy font-medium tracking-wide">
                {bride.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal/80">
                <span className="font-medium text-charcoal">Daughter of: </span>
                {bride.parents}
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-charcoal/60 max-w-lg mx-auto leading-relaxed">
                {bride.grandparents}
              </p>
            </div>

            {/* WEDS Calligraphy Divider */}
            <div className="flex items-center justify-center gap-4 py-0.5">
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold" />
              <span className="font-calligraphy text-2xl sm:text-3xl text-gold-dark font-semibold px-2">
                weds
              </span>
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold" />
            </div>

            {/* Groom Information */}
            <div className="space-y-1.5">
              <h3 className="font-editorial text-3xl sm:text-4xl text-burgundy font-medium tracking-wide">
                {groom.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal/80">
                <span className="font-medium text-charcoal">Son of: </span>
                {groom.parents}
              </p>
            </div>
          </div>

          <FloralDivider className="my-3 opacity-60" />

          {/* Date & Muhurtham Details */}
          <div className="my-5 p-4 sm:p-5 rounded-xl bg-[#FAF5EC] border border-gold/40 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-burgundy">
              <Calendar className="w-5 h-5 text-gold-dark" />
              <span className="font-editorial text-lg sm:text-xl font-semibold tracking-wide">
                {date.dayOfWeek.toUpperCase()}, {date.gregorian.toUpperCase()}
              </span>
            </div>
            
            <p className="font-sans text-xs text-gold-dark font-medium tracking-widest uppercase">
              Malayalam Date: {date.malayalam}
            </p>

            <div className="pt-1 flex items-center justify-center gap-2 text-charcoal/90">
              <Clock className="w-4 h-4 text-burgundy" />
              <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide">
                MUHURTHAM: {date.muhurtham}
              </span>
            </div>
          </div>

          {/* Venue Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
            {/* Thalikettu Venue */}
            <div className="p-3.5 rounded-xl border border-gold/30 bg-[#FFFDF9] text-left">
              <div className="flex items-center gap-2 text-burgundy mb-1">
                <MapPin className="w-4 h-4 text-gold-dark" />
                <span className="text-[11px] font-sans tracking-widest uppercase font-bold">
                  THALIKETTU
                </span>
              </div>
              <p className="font-editorial text-base text-charcoal font-medium">
                {venues.thalikettu.name}
              </p>
              <p className="font-sans text-xs text-charcoal/70">
                {venues.thalikettu.location}
              </p>
              <p className="font-sans text-[11px] text-gold-dark mt-1">
                Time: {venues.thalikettu.time}
              </p>
            </div>

            {/* Celebration Venue */}
            <div className="p-3.5 rounded-xl border border-gold/30 bg-[#FFFDF9] text-left">
              <div className="flex items-center gap-2 text-burgundy mb-1">
                <Heart className="w-4 h-4 text-gold-dark" />
                <span className="text-[11px] font-sans tracking-widest uppercase font-bold">
                  CELEBRATION
                </span>
              </div>
              <p className="font-editorial text-base text-charcoal font-medium">
                {venues.celebration.name}
              </p>
              <p className="font-sans text-xs text-charcoal/70">
                {venues.celebration.location}
              </p>
              <p className="font-sans text-[11px] text-gold-dark mt-1">
                Wedding Celebration
              </p>
            </div>
          </div>

          {/* Core Invitation Note */}
          <div className="text-center my-4">
            <p className="font-romantic italic text-base sm:text-lg text-burgundy max-w-md mx-auto">
              "{invitationCardNote}"
            </p>
          </div>

          <FloralDivider className="my-3 opacity-60" />

          {/* Family Addresses & Contact Area */}
          <div className="mt-4 pt-3 border-t border-[#E8DEC9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-charcoal/80">
            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">{bride.name}'s Residence:</p>
                <p>{bride.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">{groom.name}'s Residence:</p>
                <p>{groom.address}</p>
              </div>
            </div>
          </div>

          {/* Contact and Sharing The Happiness Footer */}
          <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-charcoal/70 gap-2">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 text-burgundy hover:text-gold-dark transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact: {contact.phoneFormatted}</span>
            </a>
            <span className="font-romantic italic text-sm text-charcoal/90">
              {sharingHappiness}
            </span>
          </div>
        </motion.div>

        {/* Save/Print Invitation Button */}
        <div className="mt-5 text-center">
          <button
            onClick={handlePrintOrSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/50 bg-[#FFFDF9] text-charcoal hover:bg-gold/15 text-xs font-sans tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gold-dark" />
            <span>Save / Print Invitation Card</span>
          </button>
        </div>
      </div>
    </section>
  );
};
