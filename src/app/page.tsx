"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LearnMore } from "@/components/sections/LearnMore";
import { WaitlistModal } from "@/components/sections/WaitlistModal";
import { Footer } from "@/components/sections/Footer";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [learnMoreVisible, setLearnMoreVisible] = useState(false);
  const learnMoreRef = useRef<HTMLElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleLearnMore = useCallback(() => {
    setLearnMoreVisible(true);
    setTimeout(() => {
      learnMoreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  return (
    <>
      <Navbar onJoinClick={openModal} />

      <main>
        <Hero onJoinClick={openModal} onLearnMoreClick={handleLearnMore} />

        <AnimatePresence>
          {learnMoreVisible && (
            <motion.div
              key="learn-more"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <LearnMore ref={learnMoreRef} onJoinClick={openModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <WaitlistModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
