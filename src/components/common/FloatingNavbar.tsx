import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Calendar, MapPin, HeartHandshake, Sparkles } from 'lucide-react';

export const FloatingNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after user has scrolled past the opening hero
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Couple', icon: Heart, target: 'couple-details' },
    { label: 'Story', icon: BookOpen, target: 'chapter-school' },
    { label: 'Photos', icon: Sparkles, target: 'chapter-present' },
    { label: 'Invite', icon: Calendar, target: 'official-invitation' },
    { label: 'Venues', icon: MapPin, target: 'event-venues' },
    { label: 'RSVP', icon: HeartHandshake, target: 'rsvp-section' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-fit px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-charcoal/90 border border-gold/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-center gap-1 sm:gap-1.5 text-ivory text-xs font-sans tracking-wider uppercase overflow-x-auto no-scrollbar"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.target)}
                className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-gold/20 active:bg-gold/30 hover:text-gold-light transition-all flex items-center gap-1 text-[10px] sm:text-[11px] font-medium cursor-pointer shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="hidden sm:inline-block">{item.label}</span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
