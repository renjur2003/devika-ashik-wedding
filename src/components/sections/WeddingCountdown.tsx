import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { FloralDivider } from '../common/DecorativeMotifs';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const WeddingCountdown: React.FC = () => {
  const { date } = weddingData;

  const targetEpoch = Date.parse(date.isoDateTimeIST);

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const difference = targetEpoch - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPassed: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetEpoch]);

  const timeCards = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="wedding-countdown" className="relative py-12 sm:py-14 px-4 sm:px-6 bg-wedding-pattern text-charcoal overflow-hidden">
      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-sans tracking-[0.2em] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Counting Down To Forever</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl text-burgundy font-normal tracking-wide mt-2">
            Until The Auspicious Moment
          </h2>
          <p className="font-sans text-[11px] tracking-widest text-charcoal/60 uppercase mt-1">
            Saturday, 26 December 2026 • 10:30 AM IST (Guruvayur)
          </p>
          <FloralDivider className="mt-2 opacity-60" />
        </motion.div>

        {timeLeft.isPassed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 sm:p-10 rounded-2xl bg-burgundy text-ivory border border-gold/50 shadow-2xl max-w-xl mx-auto"
          >
            <Sparkles className="w-7 h-7 text-gold mx-auto mb-2" />
            <h3 className="font-editorial text-2xl sm:text-3xl">
              Today, a beautiful forever begins.
            </h3>
            <p className="font-romantic italic text-lg text-gold-light mt-1">
              Devika & Ashik are united in sacred matrimony.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-xl mx-auto my-6">
            {timeCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-gold/40 shadow-md flex flex-col items-center justify-center overflow-hidden group hover:border-gold hover:shadow-lg transition-all"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                
                <span className="font-editorial text-3xl sm:text-4xl font-medium text-burgundy tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {String(card.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-charcoal/60 mt-1.5 font-medium">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add to Google Calendar / iCal button */}
        <div className="mt-6">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Devika+%26+Ashik+Wedding&dates=20261226T050000Z/20261226T060000Z&details=Wedding+of+Devika+and+Ashik.+Thalikettu+at+Sree+Krishna+Temple,+Guruvayur+and+Celebration+at+Celebration+Convention+Centre,+Anthikad.&location=Sree+Krishna+Temple,+Guruvayur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy/10 hover:bg-burgundy text-burgundy hover:text-ivory border border-burgundy/30 text-xs font-sans tracking-wider uppercase transition-all duration-300"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </a>
        </div>
      </div>
    </section>
  );
};
