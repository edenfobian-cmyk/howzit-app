"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HowzitLogo } from "@/components/shared/HowzitLogo";

interface NavbarProps {
  onJoinClick: () => void;
}

export function Navbar({ onJoinClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-20 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--background)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <HowzitLogo />
        <button
          onClick={onJoinClick}
          className="rounded-full bg-[var(--orange)] px-5 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Join the waitlist
        </button>
      </div>
    </motion.nav>
  );
}
