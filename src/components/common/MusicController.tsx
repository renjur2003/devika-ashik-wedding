import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../../utils/audioEngine';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = async () => {
    await soundEngine.togglePlay();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-auto sm:bottom-5 sm:right-5 z-50 flex items-center gap-2">
      <div className="relative group">
        <button
          onClick={handleToggle}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg transition-all duration-300 border backdrop-blur-md ${
            isPlaying
              ? 'bg-[#8FA88B] text-white border-[#C5A869]/50 shadow-[0_4px_15px_rgba(143,168,139,0.35)]'
              : 'bg-white/95 text-[#2D332C] border-[#8FA88B]/40 hover:bg-[#F6F8F5] shadow-sm'
          }`}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          title={isPlaying ? 'Pause music' : 'Play romantic music'}
        >
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-white" />
              {/* Animated Soundwave bars */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-white h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-white/80 h-2/3 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-white h-4/5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <VolumeX className="w-4 h-4 text-[#2D332C]/70" />
              <Music className="w-3.5 h-3.5 text-[#8FA88B]" />
            </div>
          )}

          <span className="text-xs font-sans tracking-wider uppercase hidden sm:inline-block font-semibold">
            {isPlaying ? 'Melody Playing' : 'Play Music'}
          </span>
        </button>

        {/* Hover Hint */}
        {isExpanded && !isPlaying && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-md bg-[#364B33] text-white text-[11px] whitespace-nowrap shadow-lg animate-fade-in pointer-events-none">
            Click to play romantic melody
          </div>
        )}
      </div>
    </div>
  );
};

