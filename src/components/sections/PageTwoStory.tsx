import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, BookOpen, Maximize2, X } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';

interface PageTwoStoryProps {
  onContinueToCeremony: () => void;
}

export const PageTwoStory: React.FC<PageTwoStoryProps> = ({ onContinueToCeremony }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const moments = [
    {
      id: 'moment-01',
      title: 'Devika & Ashish',
      subtitle: 'From Schoolmates to Soulmates',
      note: 'Where innocent beginnings quietly shaped two hearts for a lifetime.',
      image: '/images/couple-04-night-candid.png',
      objectPos: 'object-[center_12%]',
      bgEffect: '',
    },
    {
      id: 'moment-02',
      title: 'Festive Joy',
      subtitle: 'The Warmth of Togetherness',
      note: 'Dressed in festive traditional hues, celebrating the arrival of forever.',
      image: '/images/couple-02-maroon-saree.png',
      objectPos: 'object-top',
      bgEffect: '',
    },
    {
      id: 'moment-03',
      title: 'Timeless Elegance',
      subtitle: 'Side by Side, Hand in Hand',
      note: 'Serene moments adorned in royal blue, surrounded by soft floral grace.',
      image: '/images/couple-03-blue-saree.png',
      objectPos: 'object-[center_15%]',
      // REQUIREMENT 11: Enhanced pastel botanical studio background styling for blue saree
      bgEffect: 'pastel-botanical-artistic',
    },
  ];

  return (
    <section id="story-section" className="relative w-full py-20 px-4 sm:px-6 bg-botanical-pattern text-[#222921] overflow-hidden">
      {/* Decorative Pastel Background Circles & Kasavu Side Framing */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#8FA88B]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-[#E8A598]/22 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 left-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 left-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-6 w-[2px] bg-gradient-to-b from-transparent via-[#C5A869]/45 to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-y-6 right-8 w-[1px] bg-gradient-to-b from-transparent via-[#8FA88B]/35 to-transparent pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-[#8FA88B]/50 shadow-sm text-[#2F442C] text-xs font-sans tracking-[0.2em] uppercase font-bold">
            <BookOpen className="w-3.5 h-3.5 text-[#5A7356]" />
            <span>Chapter 02 • Our Journey</span>
          </div>

          {/* REQUIREMENT 3: "From Schoolmates to Soulmates" */}
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#263824] font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            From Schoolmates to Soulmates
          </h2>

          <p className="font-calligraphy text-3xl sm:text-4xl text-[#B8566B] pt-1">
            Two hearts. One journey. A lifetime of love.
          </p>

          <FloralDivider className="mt-2 opacity-85" color="#6E8A6A" />
        </motion.div>

        {/* Romantic Prose Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-2xl mx-auto p-7 sm:p-9 rounded-3xl bg-[#FFFEFA]/95 backdrop-blur-md border-2 border-[#C5A869]/55 shadow-[0_16px_42px_rgba(62,78,58,0.12)] text-center mb-12 overflow-hidden"
        >
          <div className="absolute top-2.5 left-2.5 opacity-70 pointer-events-none"><CornerOrnament position="top-left" size={24} color="#B89047" /></div>
          <div className="absolute top-2.5 right-2.5 opacity-70 pointer-events-none"><CornerOrnament position="top-right" size={24} color="#B89047" /></div>
          <div className="absolute bottom-2.5 left-2.5 opacity-70 pointer-events-none"><CornerOrnament position="bottom-left" size={24} color="#B89047" /></div>
          <div className="absolute bottom-2.5 right-2.5 opacity-70 pointer-events-none"><CornerOrnament position="bottom-right" size={24} color="#B89047" /></div>

          <p className="font-romantic text-lg sm:text-xl text-[#2A3128] leading-relaxed italic font-medium">
            "Before forever, there was a classroom. Before promises, there were little glances and shared smiles. Somewhere in those school days, our beautiful story quietly began. Life traveled through distances, yet our hearts remained ever close — leading us right to the day we say forever."
          </p>
        </motion.div>

        {/* 3 Authentic Photo Cards (NO black dress picture!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {moments.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="flex flex-col rounded-2xl bg-[#FFFEFA] border-2 border-[#C5A869]/50 shadow-[0_14px_34px_rgba(54,75,51,0.14)] overflow-hidden group hover:shadow-[0_20px_45px_rgba(54,75,51,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo Frame */}
              <div
                onClick={() => setSelectedPhoto({ src: item.image, title: item.title, subtitle: item.subtitle })}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F8F5] cursor-pointer"
              >
                {/* REQUIREMENT 11: Special Pastel Botanical Background Artistic Backdrop for Blue Saree */}
                {item.bgEffect === 'pastel-botanical-artistic' && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Soft dreamy pastel border vignette */}
                    <div className="absolute inset-0 ring-inset ring-8 sm:ring-12 ring-[#FAF5EE]/75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8FA88B]/25 via-transparent to-[#E8A598]/20 mix-blend-soft-light" />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#8FA88B]/40 text-[9px] font-sans text-[#2F442C] uppercase tracking-wider font-bold shadow-sm">
                      Pastel Elegance
                    </div>
                  </div>
                )}

                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover ${item.objectPos} transition-transform duration-700 group-hover:scale-104`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-65 group-hover:opacity-35 transition-opacity" />

                {/* View Fullscreen icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#263824] opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
                  <span className="text-[10px] tracking-widest uppercase font-sans text-white/95 drop-shadow font-semibold">
                    Tap to view photo
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center bg-[#FFFEFA] border-t border-[#C5A869]/25">
                <div>
                  <h3 className="font-editorial text-xl text-[#263824] font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans uppercase tracking-wider text-[#B8566B] font-bold mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="font-romantic text-sm sm:text-base text-[#2D332C]/80 italic mt-2 leading-relaxed">
                    "{item.note}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition Button to Page 3 */}
        <div className="mt-12 text-center">
          <button
            onClick={onContinueToCeremony}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#5F7D5B] to-[#749170] hover:from-[#526E4E] hover:to-[#668262] text-white font-sans text-xs tracking-wider uppercase font-bold shadow-[0_8px_22px_rgba(95,125,91,0.35)] hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Proceed to Ceremony &amp; Invitation</span>
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto rounded-2xl shadow-2xl border-2 border-white/20 object-contain"
              />
              <div className="mt-3 text-center text-white">
                <h4 className="font-editorial text-2xl text-[#E5C992]">{selectedPhoto.title}</h4>
                <p className="font-romantic italic text-sm text-white/80">{selectedPhoto.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
