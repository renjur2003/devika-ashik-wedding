import React, { useState } from 'react';
import { Camera, Maximize2, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  captionTitle?: string;
  captionSubtitle?: string;
  priority?: boolean;
  objectPosition?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  captionTitle,
  captionSubtitle,
  priority = false,
  objectPosition = 'object-top',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => !hasError && isLoaded && setIsLightboxOpen(true)}
        className={`relative overflow-hidden group bg-[#EFE8DC] rounded-2xl shadow-xl border border-gold/40 cursor-pointer ${aspectRatio} ${className}`}
        title="Click to view full photo"
      >
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-gold/70 pointer-events-none z-20" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-gold/70 pointer-events-none z-20" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-gold/70 pointer-events-none z-20" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-gold/70 pointer-events-none z-20" />

        {/* Hover Fullscreen Hint Icon */}
        <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded-full bg-charcoal/60 backdrop-blur-md text-gold-light">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Main Image with Smooth Reveal & Face Protection (object-top) */}
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover ${objectPosition} transition-all duration-700 ease-out group-hover:scale-105 ${
              isLoaded ? 'opacity-100 filter-none' : 'opacity-0 scale-98 blur-sm'
            }`}
          />
        ) : (
          /* Editorial Frame fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF5EE] via-[#F3EAD9] to-[#E9DEC9] text-burgundy">
            <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-4 bg-white/40 shadow-inner">
              <Camera className="w-7 h-7 text-gold" />
            </div>
            <span className="font-editorial text-lg text-burgundy font-medium tracking-wide">
              {captionTitle || 'Devika & Ashish'}
            </span>
            <p className="font-romantic italic text-sm text-charcoal/70 mt-1 max-w-[200px]">
              {captionSubtitle || 'A treasured memory in the making'}
            </p>
          </div>
        )}

        {/* Subtle Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Editorial Captions */}
        {(captionTitle || captionSubtitle) && (
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent text-white z-10">
            {captionSubtitle && (
              <span className="text-[11px] font-sans tracking-widest uppercase text-gold-light block mb-1">
                {captionSubtitle}
              </span>
            )}
            {captionTitle && (
              <h4 className="font-editorial text-lg sm:text-xl font-normal tracking-wide text-ivory">
                {captionTitle}
              </h4>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-3xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-gold/40"
              />

              {captionTitle && (
                <div className="mt-4 text-center text-ivory">
                  <h3 className="font-editorial text-2xl text-gold-light font-normal">
                    {captionTitle}
                  </h3>
                  <p className="font-romantic italic text-sm text-ivory/80 mt-1 flex items-center justify-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-gold fill-gold/40" />
                    <span>Devika &amp; Ashish • {captionSubtitle || 'Forever Together'}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
