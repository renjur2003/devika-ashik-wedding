import React, { useRef } from 'react';
import { OpeningScreen } from './components/sections/OpeningScreen';
import { CoupleDetailsIntro } from './components/sections/CoupleDetailsIntro';
import { SchoolDaysChapter } from './components/sections/SchoolDaysChapter';
import { LongDistanceChapter } from './components/sections/LongDistanceChapter';
import { CoupleGallery } from './components/sections/CoupleGallery';
import { InvitationCard } from './components/sections/InvitationCard';
import { WeddingCountdown } from './components/sections/WeddingCountdown';
import { VenueDetails } from './components/sections/VenueDetails';
import { RSVPSection } from './components/sections/RSVPSection';
import { ClosingScreen } from './components/sections/ClosingScreen';
import { MusicController } from './components/common/MusicController';
import { FloatingNavbar } from './components/common/FloatingNavbar';

export function App() {
  const coupleDetailsRef = useRef<HTMLDivElement>(null);
  const storyChapterRef = useRef<HTMLDivElement>(null);

  const handleOpenStory = () => {
    if (coupleDetailsRef.current) {
      coupleDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreStory = () => {
    if (storyChapterRef.current) {
      storyChapterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory text-charcoal selection:bg-gold/30 selection:text-burgundy">
      {/* Floating Audio Controller */}
      <MusicController />

      {/* Floating Bottom Quick-Navigation Bar */}
      <FloatingNavbar />

      {/* Main Single Page Cinematic Flow */}
      <main className="relative">
        {/* Section 01: High-Impact 3D Cinematic Envelope & Opening */}
        <OpeningScreen onOpenStory={handleOpenStory} />

        {/* Section 02: Couple Photo & Wedding Details Reveal (Immediately after Open) */}
        <div ref={coupleDetailsRef}>
          <CoupleDetailsIntro onExploreStory={handleExploreStory} />
        </div>

        {/* Section 03: The Love Story - Chapter 01: School Days */}
        <div ref={storyChapterRef}>
          <SchoolDaysChapter />
        </div>

        {/* Section 04: The Love Story - Chapter 02: Long Distance */}
        <LongDistanceChapter />

        {/* Section 05: The Love Story - Chapter 03: Together Again / Full Couple Gallery */}
        <CoupleGallery />

        {/* Section 06: Official Traditional Wedding Invitation Card */}
        <InvitationCard />

        {/* Section 07: Live Wedding Countdown */}
        <WeddingCountdown />

        {/* Section 08: Event Locations & Navigation */}
        <VenueDetails />

        {/* Section 09: RSVP and Family Contacts */}
        <RSVPSection />

        {/* Section 10: Final Closing Screen & Share */}
        <ClosingScreen />
      </main>
    </div>
  );
}

export default App;
