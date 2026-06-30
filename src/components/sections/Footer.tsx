"use client";

import { HowzitLogo } from "@/components/shared/HowzitLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <HowzitLogo size="sm" />

        <p className="text-sm text-[var(--grey-500)]">
          Built in South Africa 🇿🇦 · © {year} Howzit
        </p>

        <div className="flex items-center gap-5 text-xs text-[var(--grey-500)]">
          <a href="#" className="transition-colors hover:text-[var(--charcoal)]">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-[var(--charcoal)]">
            Terms
          </a>
          <a href="mailto:hello@joinhowzit.com" className="transition-colors hover:text-[var(--orange)]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
