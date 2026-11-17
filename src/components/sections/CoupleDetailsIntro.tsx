import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart, Sparkles, BookOpen, ChevronDown } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { EditorialImage } from '../common/EditorialImage';
import { FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';

interface CoupleDetailsIntroProps {
  onExploreStory: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export const CoupleDetailsIntro: React.FC<CoupleDetailsIntroProps> = ({ onExploreStory }) => {
  const { bride, groom, date, venues, tagline } = weddingData;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const eventCards = [
    {
      icon: <Calendar className="w-5 h-5 text-burgundy" />,
      label: 'Wedding Date',
      title: `${date.dayOfWeek}`,
      sub1: date.gregorian,
      sub2: date.malayalam,
      bg: 'bg-burgundy/5',
      border: 'border-burgundy/15',
    },
    {
      icon: <Clock className="w-5 h-5 text-burgundy" />,
      label: 'Auspicious Muhurtham',
      title: date.muhurtham,
      sub1: 'Morning Ceremony',
      sub2: 'IST',
      bg: 'bg-burgundy/5',
      border: 'border-burgundy/15',
    },
    {
      icon: <MapPin className="w-5 h-5 text-gold-dark" />,
      label: 'Thalikettu',
      title: venues.thalikettu.name,
      sub1: venues.thalikettu.location,
      sub2: venues.thalikettu.time,
      bg: 'bg-gold/8',
      border: 'border-gold/20',
    },
    {
      icon: <Heart className="w-5 h-5 text-gold-dark" />,
      label: 'Celebration',
      title: venues.celebration.name,
      sub1: venues.celebration.location,
      sub2: 'Wedding Feast',
      bg: 'bg-gold/8',
      border: 'border-gold/20',
    },
  ];

  return (
    <section
      id="couple-details"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF5EB 0%, #FDFBF7 60%, #FAF5EB 100%)' }}
    >
      {/* Soft top transition from dark opening */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(28,5,13,0.08), transparent)' }} />

      {/* Background decorative glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,154,98,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(112,43,61,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-14 sm:py-20 relative z-10">

        {/* Sacred heading area */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(184,154,98,0.12)', border: '1px solid rgba(184,154,98,0.3)' }}>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-dark font-semibold">We Cordially Invite You</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl text-burgundy font-normal tracking-wide leading-tight">
            Devika <span className="font-calligraphy text-5xl sm:text-7xl text-gold-dark font-normal px-2">&</span> Ashik
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-romantic italic text-lg sm:text-xl text-charcoal/60 max-w-lg mx-auto mt-3 leading-relaxed"
          >
            "{tagline}"
          </motion.p>

          <FloralDivider className="mt-4 opacity-50" />
        </motion.div>

        {/* Main content: Photo + Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* LEFT: Couple Portrait */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative frame behind */}
              <div
                className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(184,154,98,0.15), rgba(112,43,61,0.08))', border: '1px solid rgba(184,154,98,0.2)' }}
              />

              {/* Main photo card */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(184,154,98,0.4)', background: '#FFFDF9' }}
              >
                {/* Corner ornaments on photo */}
                <div className="absolute top-2 left-2 z-10"><CornerOrnament position="top-left" size={28} /></div>
                <div className="absolute top-2 right-2 z-10"><CornerOrnament position="top-right" size={28} /></div>

                <EditorialImage
                  src="/images/couple-01-black-outfits.png"
                  alt="Devika & Ashik Romantic Portrait"
                  captionTitle="Devika & Ashik"
                  captionSubtitle="Forever Together"
                  aspectRatio="aspect-[3/4]"
                  objectPosition="object-top"
                  priority={true}
                />
              </div>

              {/* Floating date badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full shadow-lg whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #702B3D 0%, #8B384E 100%)',
                  border: '1px solid rgba(184,154,98,0.5)',
                  boxShadow: '0 8px 25px rgba(112,43,61,0.4)',
                }}
              >
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-gold-light">
                  ✦ Saturday · 26 December 2026 ✦
                </p>
              </motion.div>

              <p className="text-[11px] font-sans text-center text-charcoal/50 mt-7 italic flex items-center justify-center gap-1">
                <span>✨ Tap photo to view full screen</span>
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Wedding Details */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            {/* Headline */}
            <div className="text-center lg:text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold-dark font-bold block mb-2">
                The Auspicious Matrimony
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy font-medium leading-snug">
                Two Hearts. One Journey.<br />A Lifetime of Love.
              </h3>
              <p className="font-romantic text-base text-charcoal/70 italic mt-2 leading-relaxed">
                With the blessings of our parents and elders, we invite you and your family to witness and bless our sacred union.
              </p>
            </div>

            {/* Event details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {eventCards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(184,154,98,0.15)' }}
                  className={`p-4 rounded-2xl ${card.bg} border ${card.border} flex items-start gap-3 text-left transition-all duration-300`}
                  style={{ background: i < 2 ? 'rgba(112,43,61,0.04)' : 'rgba(184,154,98,0.06)' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: i < 2 ? 'rgba(112,43,61,0.1)' : 'rgba(184,154,98,0.15)', border: i < 2 ? '1px solid rgba(112,43,61,0.15)' : '1px solid rgba(184,154,98,0.25)' }}>
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-sans tracking-wider uppercase text-charcoal/55 font-semibold">{card.label}</p>
                    <p className="font-editorial text-sm sm:text-base text-charcoal font-semibold mt-0.5 leading-tight">{card.title}</p>
                    <p className="text-xs text-charcoal/65 mt-0.5">{card.sub1}</p>
                    <p className="text-[10px] text-gold-dark mt-0.5 font-medium">{card.sub2}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Invitation message */}
            <div
              className="p-4 sm:p-5 rounded-2xl text-center lg:text-left"
              style={{ background: 'linear-gradient(135deg, rgba(184,154,98,0.08), rgba(112,43,61,0.05))', border: '1px solid rgba(184,154,98,0.25)' }}
            >
              <p className="font-romantic italic text-base text-charcoal/80 leading-relaxed">
                "With the blessings of our families, we cordially invite you and your family to celebrate the wedding of Devika and Ashik. Your presence and blessings will make our special day even more memorable."
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreStory}
                className="px-6 py-3 rounded-full text-ivory font-sans text-xs tracking-wider uppercase font-semibold shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #702B3D, #8B384E)', border: '1px solid rgba(184,154,98,0.4)', boxShadow: '0 6px 20px rgba(112,43,61,0.35)' }}
              >
                <BookOpen className="w-3.5 h-3.5 text-gold-light" />
                <span>Read Our Love Story</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold-light" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('official-invitation')}
                className="px-5 py-3 rounded-full font-sans text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                style={{ border: '1px solid rgba(184,154,98,0.4)', background: '#FFFDF9', color: '#252222' }}
              >
                <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                <span>Formal Invitation</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('event-venues')}
                className="px-5 py-3 rounded-full font-sans text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                style={{ border: '1px solid rgba(184,154,98,0.4)', background: '#FFFDF9', color: '#252222' }}
              >
                <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                <span>Get Directions</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
