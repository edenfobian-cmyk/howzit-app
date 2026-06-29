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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(229,229,229,0.8)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <HowzitLogo />
        <button
          onClick={onJoinClick}
          className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ backgroundColor: "#FF5500" }}
        >
          Join the waitlist
        </button>
      </div>
    </motion.nav>
  );
}
