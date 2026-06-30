"use client";

import { useCallback, useRef, useState } from "react";
import { ArcRevealHero } from "@/components/shared/ArcRevealHero";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WaitlistModal } from "@/components/sections/WaitlistModal";
import { Footer } from "@/components/sections/Footer";

const INTRO_GREETINGS = [
  { text: "Sawubona." },
  { text: "Heita." },
  { text: "Aweh." },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const problemRef = useRef<HTMLElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleLearnMore = useCallback(() => {
    problemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <ArcRevealHero greetings={INTRO_GREETINGS} storageKey="howzit-intro">
      <Navbar onJoinClick={openModal} />

      <main>
        <Hero onJoinClick={openModal} onLearnMoreClick={handleLearnMore} />
        <Problem ref={problemRef} />
        <Solution />
        <FinalCTA onJoinClick={openModal} />
      </main>

      <Footer />
      <WaitlistModal isOpen={modalOpen} onClose={closeModal} />
    </ArcRevealHero>
  );
}
