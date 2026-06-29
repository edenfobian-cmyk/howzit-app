"use client";

import { HowzitLogo } from "@/components/shared/HowzitLogo";
import { Link2 } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <HowzitLogo size="sm" />

        <p className="text-sm text-[#A0A0A0]">
          Built with 🧡 in South Africa · © {year} Howzit
        </p>

        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-xs text-[#A0A0A0] hover:text-[#0A0A0A] transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-[#A0A0A0] hover:text-[#0A0A0A] transition-colors"
          >
            Terms
          </a>
          <a
            href="mailto:hello@howzit.app"
            className="flex items-center gap-1 text-xs text-[#A0A0A0] hover:text-[#FF5500] transition-colors"
            aria-label="Contact Howzit"
          >
            <Link2 size={13} />
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
