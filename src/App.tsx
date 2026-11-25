import React, { useRef, useState, useEffect } from 'react';
import { PageOneHero } from './components/sections/PageOneHero';
import { PageTwoStory } from './components/sections/PageTwoStory';
import { PageThreeCeremony } from './components/sections/PageThreeCeremony';
import { MusicController } from './components/common/MusicController';
import { FloatingNavbar } from './components/common/FloatingNavbar';
import { CinematicWeddingEntrance } from './components/entrance/CinematicWeddingEntrance';
import { Sparkles } from 'lucide-react';

export function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const storyRef = useRef<HTMLDivElement>(null);
  const ceremonyRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling while entrance doors are closed
  useEffect(() => {
    if (showEntrance) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEntrance]);

  const handleExploreStory = () => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCeremony = () => {
    if (ceremonyRef.current) {
      ceremonyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2D332C] selection:bg-[#8FA88B]/30 selection:text-[#364B33]">
      {/* Cinematic Grand Wedding Entrance Gate */}
      {showEntrance && (
        <CinematicWeddingEntrance
          onEntranceComplete={() => setShowEntrance(false)}
        />
      )}

      {/* Floating Audio Controller */}
      <MusicController />

      {/* Floating Quick Navigation Bar (3 Sections) */}
      <FloatingNavbar />

      {/* Replay Grand Entrance Floating Button */}
      {!showEntrance && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowEntrance(true);
          }}
          className="fixed top-4 left-4 z-40 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-[#FAF6EE] text-[#364B33] border border-[#8FA88B]/40 shadow-sm backdrop-blur-md text-[10px] sm:text-xs font-sans tracking-wider uppercase font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          title="Watch the grand 3D wedding entrance again"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
          <span>Rewatch Entrance</span>
        </button>
      )}

      {/* Main Clean 3-Page Flow (Completely preserved) */}
      <main className="relative">
        {/* Page 1: Grand Opening, D&A Monogram, Devika & Ashish, Pink Dress/White T-shirt Photo & Date */}
        <div id="hero-section">
          <PageOneHero
            onExploreStory={handleExploreStory}
            onExploreCeremony={handleExploreCeremony}
          />
        </div>

        {/* Page 2: From Schoolmates to Soulmates, Story Narrative & 3 Curated Photos */}
        <div id="story-section" ref={storyRef}>
          <PageTwoStory onContinueToCeremony={handleExploreCeremony} />
        </div>

        {/* Page 3: Official Wedding Invitation, Muhurtham (6:30-7:00 AM), Venues & RSVP */}
        <div id="ceremony-section" ref={ceremonyRef}>
          <PageThreeCeremony />
        </div>
      </main>
    </div>
  );
}

export default App;
