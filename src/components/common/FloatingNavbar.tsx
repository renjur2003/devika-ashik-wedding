import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Calendar } from 'lucide-react';

export const FloatingNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
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
    { label: 'Invitation', icon: Heart, target: 'hero-section' },
    { label: 'Our Story', icon: BookOpen, target: 'story-section' },
    { label: 'Ceremony & RSVP', icon: Calendar, target: 'ceremony-section' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 py-1.5 rounded-full bg-white/90 border border-[#8FA88B]/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(75,98,71,0.2)] flex items-center justify-center gap-1.5 text-[#2D332C] text-xs font-sans tracking-wider uppercase"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.target)}
                className="px-3.5 py-1.5 rounded-full hover:bg-[#8FA88B]/15 active:bg-[#8FA88B]/25 hover:text-[#364B33] transition-all flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-[#8FA88B] shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
