import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, Sparkles } from 'lucide-react';
import { weddingData } from '../../data/weddingData';
import { EditorialImage } from '../common/EditorialImage';
import { FloralDivider, CornerOrnament } from '../common/DecorativeMotifs';
import { DigitalWeddingReveal } from './DigitalWeddingReveal';

export const CoupleGallery: React.FC = () => {
  const { photos } = weddingData;

  const getObjectPosition = (id: string) => {
    switch (id) {
      case 'photo-03': return 'object-[center_12%]';
      default: return 'object-top';
    }
  };

  const photoConfig = [
    { cols: 'md:col-span-1', aspect: 'aspect-[3/4]', featured: false },
    { cols: 'md:col-span-1', aspect: 'aspect-[3/4]', featured: false },
    { cols: 'md:col-span-1', aspect: 'aspect-[3/4]', featured: false },
    { cols: 'md:col-span-1', aspect: 'aspect-[3/4]', featured: false },
  ];

  return (
    <section id="chapter-present" className="relative w-full overflow-hidden py-14 sm:py-20">
      {/* Deep cinematic background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #FAF6EE 0%, #F3E9D8 40%, #EDE0CA 80%, #F3E9D8 100%)' }} />

      {/* Decorative gold orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(184,154,98,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(112,43,61,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(112,43,61,0.08)', border: '1px solid rgba(112,43,61,0.2)' }}>
            <Camera className="w-3.5 h-3.5 text-burgundy" />
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-burgundy font-semibold">Chapter 03 – The Beautiful Present</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl text-burgundy font-normal tracking-wide">
            Together Again
          </h2>
          <p className="font-romantic italic text-lg sm:text-xl text-charcoal/60 mt-3 max-w-xl mx-auto leading-relaxed">
            "When the waiting ended, forever stepped into the light."
          </p>
          <FloralDivider className="mt-4 opacity-50" />
        </motion.div>

        {/* Photo gallery – 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`group relative ${photoConfig[index]?.cols || ''} flex flex-col`}
            >
              {/* Frame with glow on hover */}
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                style={{
                  border: '2px solid rgba(184,154,98,0.35)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  background: '#FFFDF9',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 z-10 opacity-70"><CornerOrnament position="top-left" size={20} /></div>
                <div className="absolute top-2 right-2 z-10 opacity-70"><CornerOrnament position="top-right" size={20} /></div>

                {/* Hover gold overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(112,43,61,0.5) 0%, transparent 60%)' }} />

                {/* Hover label */}
                <div className="absolute bottom-0 inset-x-0 z-20 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="font-calligraphy text-xl text-gold-light text-center leading-tight">{photo.title}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-gold-light/80 text-center mt-0.5">{photo.subtitle}</p>
                </div>

                <EditorialImage
                  src={photo.path}
                  alt={photo.description}
                  captionTitle={photo.title}
                  captionSubtitle={photo.subtitle}
                  aspectRatio={photoConfig[index]?.aspect || 'aspect-[3/4]'}
                  objectPosition={getObjectPosition(photo.id)}
                />
              </div>

              {/* Below-frame caption */}
              <div className="mt-2 px-1 flex items-center justify-between text-charcoal/55">
                <span className="text-[10px] font-sans tracking-wider uppercase font-medium text-gold-dark">{photo.chapter}</span>
                <span className="flex items-center gap-1 text-[10px] font-romantic italic">
                  <Heart className="w-2.5 h-2.5 text-burgundy fill-burgundy/40" />
                  Devika & Ashik
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-End Digital Wedding Reveal Card with 3D Parallax & Neon Glow Effects */}
        <DigitalWeddingReveal />
      </div>
    </section>
  );
};
