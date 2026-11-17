import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, MessageCircle, Send, CheckCircle2, User, Users } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { FloralDivider } from '../common/DecorativeMotifs';

export const RSVPSection: React.FC = () => {
  const { contact } = weddingData;

  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [attending, setAttending] = useState('yes');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || '';

    if (apiBase) {
      try {
        await fetch(`${apiBase}/api/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guestName: guestName.trim(),
            attending,
            guestCount: parseInt(guestCount, 10) || 1,
            blessingMessage: blessingMessage.trim(),
          }),
        });
      } catch (err) {
        console.warn('API connection notice, continuing with WhatsApp RSVP:', err);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const text = `*Wedding RSVP for Devika & Ashik (26.12.2026)*\n` +
      `👤 Guest Name: ${guestName || 'Well-wisher'}\n` +
      `👥 Attending: ${attending === 'yes' ? 'Joyfully Attending' : 'Sending Blessings from Afar'}\n` +
      `🔢 Number of Guests: ${guestCount}\n` +
      (blessingMessage ? `💌 Message: "${blessingMessage}"` : '');
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp-section" className="relative w-full py-14 sm:py-16 px-4 sm:px-6 bg-wedding-pattern text-charcoal overflow-hidden">
      <div className="max-w-2xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-sans tracking-[0.2em] uppercase mb-2">
            <Heart className="w-3.5 h-3.5 fill-burgundy" />
            <span>Join Our Celebration</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Your Presence Makes Our Day Complete
          </h2>
          <p className="font-romantic italic text-base sm:text-lg text-charcoal/70 mt-1">
            "We would be delighted to celebrate this special moment with you."
          </p>
          <FloralDivider className="mt-2 opacity-60" />
        </motion.div>

        {/* Quick Action Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#FFFDF9] border border-gold/40 hover:border-gold hover:shadow-md transition-all text-burgundy font-medium text-xs sm:text-sm font-sans"
          >
            <Phone className="w-4 h-4 text-gold-dark" />
            <span>Call Family ({contact.phoneFormatted})</span>
          </a>

          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
              "Hello! We are looking forward to attending the wedding of Devika & Ashik on 26 December 2026."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] hover:shadow-md transition-all text-[#128C7E] font-medium text-xs sm:text-sm font-sans"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Message on WhatsApp</span>
          </a>
        </div>

        {/* RSVP Form Card */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-gold/40 p-6 sm:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-charcoal/70 font-semibold mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Anand & Family"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/30 bg-[#FAF6EE] focus:bg-white focus:outline-none focus:border-gold text-base sm:text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-charcoal/70 font-semibold mb-1.5">
                      Will You Attend?
                    </label>
                    <select
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-[#FAF6EE] focus:bg-white focus:outline-none focus:border-gold text-base sm:text-sm transition-all"
                    >
                      <option value="yes">Joyfully Attending</option>
                      <option value="remote">Blessings From Afar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans tracking-wider uppercase text-charcoal/70 font-semibold mb-1.5">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/30 bg-[#FAF6EE] focus:bg-white focus:outline-none focus:border-gold text-base sm:text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-charcoal/70 font-semibold mb-1.5">
                    Warm Blessings / Wishes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Write a warm note for Devika & Ashik..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-[#FAF6EE] focus:bg-white focus:outline-none focus:border-gold text-base sm:text-sm transition-all resize-none"
                  />
                </div>

                <p className="text-[10px] text-charcoal/50 italic text-center">
                  Submitting gives you an instant option to send your RSVP directly via WhatsApp.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory font-sans text-xs tracking-[0.2em] uppercase font-semibold shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-3.5 h-3.5 text-gold-light" />
                  <span>{isSubmitting ? 'Recording RSVP...' : 'Confirm RSVP'}</span>
                </button>
              </motion.form>
            ) : (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-5 space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-gold/15 text-gold-dark border border-gold/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-burgundy" />
                </div>

                <h3 className="font-editorial text-2xl text-burgundy">
                  Thank You, {guestName}!
                </h3>
                <p className="font-romantic italic text-base text-charcoal/80 max-w-md mx-auto">
                  Your warm wishes have been recorded. We eagerly look forward to celebrating with you!
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#1ebd5a] font-sans text-xs tracking-wider uppercase font-medium shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp to Family</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-gold/40 text-charcoal/80 hover:bg-gold/10 font-sans text-xs tracking-wider uppercase transition-all"
                  >
                    Edit RSVP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
