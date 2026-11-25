import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart, Phone, Navigation, Send, MessageCircle, Home, CheckCircle2, User, Users } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { GaneshaMotif, TempleLampMotif, FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';
import { triggerRoyalConfetti } from '../../utils/confettiExplosion';
import { doorSound } from '../../utils/doorSound';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const PageThreeCeremony: React.FC = () => {
  const { bride, groom, date, venues, contact, sharingHappiness } = weddingData;

  // Countdown timer to 26 Dec 2026 6:30 AM IST
  const targetEpoch = Date.parse(date.isoDateTimeIST);

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const diff = targetEpoch - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetEpoch]);

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [attending, setAttending] = useState('yes');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasSentLove, setHasSentLove] = useState(false);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
    triggerRoyalConfetti();
  };

  const handleSendLove = () => {
    setHasSentLove(true);
    doorSound.playTempleBell();
    triggerRoyalConfetti();
  };

  const generateWhatsAppMessage = () => {
    const text = `*Wedding RSVP for Devika & Ashish (26.12.2026)*\n` +
      `👤 Guest Name: ${guestName || 'Well-wisher'}\n` +
      `👥 Attending: ${attending === 'yes' ? 'Joyfully Attending' : 'Sending Blessings from Afar'}\n` +
      `🔢 Number of Guests: ${guestCount}\n` +
      (blessingMessage ? `💌 Message: "${blessingMessage}"` : '');
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="ceremony-section" className="relative w-full py-20 px-4 sm:px-6 bg-ceremony-pattern text-[#222921] overflow-hidden">
      
      {/* Rich Pastel Background Accents & Kasavu Side Framing */}
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-[#8FA88B]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-[#E8A598]/22 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 left-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 left-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10 space-y-12">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#8FA88B]/50 shadow-sm text-[#2F442C] text-xs font-sans tracking-[0.2em] uppercase font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#5A7356]" />
            <span>Chapter 03 • The Sacred Union</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl text-[#263824] font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Wedding Invitation
          </h2>

          <FloralDivider className="mt-2 opacity-85" color="#6E8A6A" />
        </motion.div>

        {/* THE OFFICIAL TRADITIONAL INVITATION CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl bg-[#FFFEFA]/95 backdrop-blur-md border-2 border-[#C5A869]/70 p-6 sm:p-10 shadow-[0_24px_60px_rgba(62,78,58,0.16)] overflow-hidden"
        >
          {/* Ornate Gold Filigree Corners */}
          <div className="absolute top-3 left-3 opacity-85"><CornerOrnament position="top-left" size={32} color="#B89047" /></div>
          <div className="absolute top-3 right-3 opacity-85"><CornerOrnament position="top-right" size={32} color="#B89047" /></div>
          <div className="absolute bottom-3 left-3 opacity-85"><CornerOrnament position="bottom-left" size={32} color="#B89047" /></div>
          <div className="absolute bottom-3 right-3 opacity-85"><CornerOrnament position="bottom-right" size={32} color="#B89047" /></div>

          {/* Inner hairline border */}
          <div className="absolute inset-2.5 sm:inset-3.5 rounded-2xl border border-[#C5A869]/35 pointer-events-none" />

          {/* Sacred Ganesha & Nilavilakku Header */}
          <div className="text-center pt-2 mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <TempleLampMotif size={28} color="#B89047" />
              <GaneshaMotif size={52} color="#5A7356" />
              <TempleLampMotif size={28} color="#B89047" />
            </div>

            {/* REQUIREMENT 6: "With the blessings of our parents" (elders removed!) */}
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#2F442C] font-bold">
              WITH THE BLESSINGS OF OUR PARENTS
            </p>
          </div>

          <FloralDivider className="my-2.5 opacity-60" color="#6E8A6A" />

          {/* Bride & Groom Lineage */}
          <div className="text-center space-y-4 my-4">
            
            {/* Bride Information */}
            <div className="space-y-1">
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#263824] font-semibold tracking-wide">
                {bride.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#2D332C]/90">
                <span className="font-bold text-[#3B5237]">Daughter of: </span>
                {bride.parents}
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-[#2D332C]/75 max-w-lg mx-auto leading-relaxed">
                {bride.grandparents}
              </p>
            </div>

            {/* WEDS Calligraphy Divider */}
            <div className="flex items-center justify-center gap-3 py-0.5">
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#B89047]" />
              <span className="font-calligraphy text-3xl sm:text-4xl text-[#B8566B] px-2 font-normal">
                weds
              </span>
              <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#B89047]" />
            </div>

            {/* Groom Information (REQUIREMENT 1: Ashish) */}
            <div className="space-y-1">
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#263824] font-semibold tracking-wide">
                {groom.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#2D332C]/90">
                <span className="font-bold text-[#3B5237]">Son of: </span>
                {groom.parents}
              </p>
            </div>
          </div>

          <FloralDivider className="my-3 opacity-60" color="#6E8A6A" />

          {/* Date & Muhurtham Details (REQUIREMENT 7: 6:30 AM to 7:00 AM) */}
          <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F4F7F2] to-[#FAF4EA] border-2 border-[#8FA88B]/50 shadow-inner text-center space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-[#263824]">
              <Calendar className="w-5 h-5 text-[#B89047]" />
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider uppercase">
                {date.dayOfWeek.toUpperCase()}, {date.gregorian.toUpperCase()}
              </span>
            </div>
            
            <p className="font-sans text-xs text-[#3B5237] font-bold tracking-widest uppercase">
              Malayalam Date: {date.malayalam}
            </p>

            <div className="pt-1 flex items-center justify-center gap-2 text-[#263824]">
              <Clock className="w-4 h-4 text-[#B8566B]" />
              <span className="font-sans text-xs sm:text-sm font-bold tracking-wider text-[#B8566B]">
                MUHURTHAM: 6:30 AM – 7:00 AM
              </span>
            </div>
          </div>

          {/* Two Event Venues Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
            {/* Thalikettu Venue */}
            <div className="p-4 sm:p-5 rounded-2xl border border-[#C5A869]/55 bg-[#FAF5EB]/85 shadow-sm text-left">
              <div className="flex items-center gap-2 text-[#263824] mb-1">
                <MapPin className="w-4 h-4 text-[#B8566B]" />
                <span className="text-[11px] font-sans tracking-widest uppercase font-bold text-[#3B5237]">
                  THALIKETTU CEREMONY
                </span>
              </div>
              <p className="font-editorial text-base sm:text-lg text-[#263824] font-semibold">
                {venues.thalikettu.name}
              </p>
              <p className="font-sans text-xs text-[#2D332C]/80">
                {venues.thalikettu.location}
              </p>
              <p className="font-sans text-xs text-[#B8566B] font-semibold mt-1">
                Time: 6:30 AM – 7:00 AM
              </p>
              <a
                href={venues.thalikettu.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans text-[#3B5237] hover:text-[#263824] font-bold underline underline-offset-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

            {/* Celebration Venue */}
            <div className="p-4 sm:p-5 rounded-2xl border border-[#C5A869]/55 bg-[#FAF5EB]/85 shadow-sm text-left">
              <div className="flex items-center gap-2 text-[#263824] mb-1">
                <Heart className="w-4 h-4 text-[#B8566B]" />
                <span className="text-[11px] font-sans tracking-widest uppercase font-bold text-[#3B5237]">
                  WEDDING CELEBRATION
                </span>
              </div>
              <p className="font-editorial text-base sm:text-lg text-[#263824] font-semibold">
                {venues.celebration.name}
              </p>
              <p className="font-sans text-xs text-[#2D332C]/80">
                {venues.celebration.location}
              </p>
              <p className="font-sans text-xs text-[#3B5237] font-semibold mt-1">
                Wedding Feast &amp; Reception
              </p>
              <a
                href={venues.celebration.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans text-[#3B5237] hover:text-[#263824] font-bold underline underline-offset-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Family Addresses & Contact Area */}
          <div className="mt-5 pt-4 border-t border-[#E3D9C6] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#2D332C]/90">
            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 text-[#5A7356] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#263824]">{bride.name}'s Residence:</p>
                <p>{bride.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 text-[#5A7356] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#263824]">{groom.name}'s Residence:</p>
                <p>{groom.address}</p>
              </div>
            </div>
          </div>

          {/* Contact and Sharing The Happiness Footer */}
          <div className="mt-4 pt-3 border-t border-[#E3D9C6] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#2D332C]/85 gap-2">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 text-[#263824] hover:text-[#3B5237] font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#B8566B]" />
              <span>Contact: {contact.phoneFormatted}</span>
            </a>
            <span className="font-romantic italic text-sm text-[#3B5237] font-semibold">
              {sharingHappiness}
            </span>
          </div>
        </motion.div>

        {/* LIVE WEDDING COUNTDOWN TIMER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center p-6 sm:p-8 rounded-3xl bg-[#FFFEFA]/95 backdrop-blur-md border-2 border-[#C5A869]/55 shadow-[0_18px_45px_rgba(62,78,58,0.12)]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FA88B]/20 border border-[#8FA88B]/40 text-[#2F442C] text-xs font-sans tracking-widest uppercase font-bold mb-3">
            <Clock className="w-3.5 h-3.5 text-[#5A7356]" />
            <span>Counting Down To Forever</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl text-[#263824] font-semibold">
            Until The Auspicious Muhurtham
          </h3>
          <p className="text-xs font-sans text-[#3B5237] font-semibold uppercase tracking-wider mt-1">
            Saturday, 26 December 2026 • 6:30 AM IST (Guruvayur)
          </p>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto my-6">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((c) => (
              <div key={c.label} className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#F4F7F2] to-[#FAF4EA] border border-[#C5A869]/50 shadow-sm flex flex-col items-center">
                <span className="font-editorial text-2xl sm:text-4xl font-bold text-[#263824]">
                  {String(c.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-[#3B5237] mt-1 font-bold">
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Devika+%26+Ashish+Wedding&dates=20261226T010000Z/20261226T020000Z&details=Wedding+of+Devika+and+Ashish.+Thalikettu+at+Sree+Krishna+Temple,+Guruvayur+and+Celebration+at+Celebration+Convention+Centre,+Anthikad.&location=Sree+Krishna+Temple,+Guruvayur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8FA88B]/20 hover:bg-[#5F7D5B] text-[#263824] hover:text-white border border-[#5F7D5B]/50 text-xs font-sans tracking-wider uppercase transition-all duration-300 font-bold shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </a>
        </motion.div>

        {/* RSVP & FAMILY CONTACT SECTION (REQUIREMENT 12: No fake 1284 count!) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#FFFEFA]/95 backdrop-blur-md border-2 border-[#C5A869]/55 p-6 sm:p-8 shadow-[0_20px_50px_rgba(62,78,58,0.14)] text-center space-y-6"
        >
          <div>
            <span className="text-xs font-sans tracking-widest uppercase text-[#4B6247] font-semibold block mb-1">
              Join Our Celebration
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#364B33]">
              Your Presence Makes Our Day Complete
            </h3>
            <p className="font-romantic italic text-base text-[#2D332C]/75 mt-1">
              "We would be delighted to celebrate this special moment with you."
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#F6F8F5] border border-[#8FA88B]/40 hover:bg-[#8FA88B]/15 text-[#364B33] text-xs sm:text-sm font-sans font-semibold transition-all"
            >
              <Phone className="w-4 h-4 text-[#C27484]" />
              <span>Call Family ({contact.phoneFormatted})</span>
            </a>

            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                "Hello! We are looking forward to attending the wedding of Devika & Ashish on 26 December 2026."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 text-[#128C7E] text-xs sm:text-sm font-sans font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          {/* RSVP Form */}
          <div className="max-w-lg mx-auto text-left pt-2">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleRSVPSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-[#364B33] font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8FA88B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Anand &amp; Family"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8FA88B]/40 bg-[#F6F8F5] focus:bg-white focus:outline-none focus:border-[#8FA88B] text-base sm:text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans tracking-wider uppercase text-[#364B33] font-semibold mb-1">
                        Will You Attend?
                      </label>
                      <select
                        value={attending}
                        onChange={(e) => setAttending(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#8FA88B]/40 bg-[#F6F8F5] focus:bg-white focus:outline-none focus:border-[#8FA88B] text-base sm:text-sm transition-all"
                      >
                        <option value="yes">Joyfully Attending</option>
                        <option value="remote">Blessings From Afar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans tracking-wider uppercase text-[#364B33] font-semibold mb-1">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-[#8FA88B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8FA88B]/40 bg-[#F6F8F5] focus:bg-white focus:outline-none focus:border-[#8FA88B] text-base sm:text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-[#364B33] font-semibold mb-1">
                      Warm Blessings / Wishes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Write a warm note for Devika &amp; Ashish..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#8FA88B]/40 bg-[#F6F8F5] focus:bg-white focus:outline-none focus:border-[#8FA88B] text-base sm:text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#5F7D5B] to-[#749170] hover:from-[#526E4E] hover:to-[#668262] text-white font-sans text-xs tracking-[0.2em] uppercase font-bold shadow-[0_8px_22px_rgba(95,125,91,0.35)] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm RSVP</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#8FA88B]/15 text-[#4B6247] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6247]" />
                  </div>
                  <h4 className="font-editorial text-2xl text-[#364B33]">
                    Thank You, {guestName}!
                  </h4>
                  <p className="font-romantic italic text-base text-[#2D332C]/80">
                    Your warm RSVP has been recorded. We look forward to celebrating with you!
                  </p>
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-sans text-xs tracking-wider uppercase font-semibold shadow-md transition-all hover:bg-[#1EBE5D]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp to Family</span>
                  </a>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Genuine Clean Send Love Button (NO arbitrary 1284 counter) */}
          <div className="pt-4 border-t border-[#EAE3D6] text-center">
            <button
              onClick={handleSendLove}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#E8A598]/20 hover:bg-[#E8A598]/35 text-[#843C48] border border-[#E8A598]/50 text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
            >
              <Heart className={`w-4 h-4 text-[#C27484] ${hasSentLove ? 'fill-[#C27484]' : ''}`} />
              <span>{hasSentLove ? 'Love & Blessings Sent! ❤️' : 'Send Love to Devika & Ashish'}</span>
            </button>
          </div>
        </motion.div>

        {/* Footer Credits */}
        <footer className="text-center pt-8 pb-4 border-t border-[#EAE3D6]">
          <p className="font-editorial text-xl text-[#364B33]">
            Devika <span className="font-calligraphy text-2xl text-[#C27484]">&amp;</span> Ashish
          </p>
          <p className="font-sans text-[11px] tracking-widest uppercase text-[#4B6247] font-semibold mt-1">
            26 . 12 . 2026 • Guruvayur &amp; Anthikad
          </p>
          <p className="font-romantic italic text-xs text-[#2D332C]/60 mt-2">
            {weddingData.sharingHappiness}
          </p>
        </footer>

      </div>
    </section>
  );
};
