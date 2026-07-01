"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArcRevealHero } from "@/components/shared/ArcRevealHero";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { InteractiveAppDemo } from "@/components/sections/InteractiveAppDemo";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { FirstWeekTimeline } from "@/components/sections/FirstWeekTimeline";
import { WaitlistSheet } from "@/components/sections/WaitlistSheet";
import { EndingSection } from "@/components/sections/EndingSection";
import { Footer } from "@/components/sections/Footer";

const INTRO_GREETINGS = [
  { text: "People." },
  { text: "Opportunity." },
  { text: "Connection." },
  { text: "Howzit." },
];

function PageContent() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const demoRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("ref") ?? undefined;

  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const scrollToDemo = useCallback(() => {
    demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <ArcRevealHero greetings={INTRO_GREETINGS} storageKey="howzit-v3">
      <Navbar onJoinClick={openSheet} />

      <main>
        <Hero onJoinClick={openSheet} onLearnMoreClick={scrollToDemo} />
        <InteractiveAppDemo ref={demoRef} onJoinClick={openSheet} />
        <ProblemSection />
        <FirstWeekTimeline />
        <EndingSection onJoinClick={openSheet} />
      </main>

      <Footer />
      <WaitlistSheet isOpen={sheetOpen} onClose={closeSheet} referredBy={referredBy} />
    </ArcRevealHero>
  );
}

export default function LandingPage() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
