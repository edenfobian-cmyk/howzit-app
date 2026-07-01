"use client";


import { HowzitLogo } from "@/components/shared/HowzitLogo";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--warm-200)] bg-white px-6 py-8 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
          <HowzitLogo size="sm" />
          <p className="text-xs text-[var(--warm-500)]">
            Built in Cape Town · © {year} Howzit
          </p>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-[var(--warm-500)] transition-colors hover:text-[var(--orange)]"
        >
          <InstagramIcon size={15} />
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </footer>
  );
}
