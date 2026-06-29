"use client";

import { cn } from "@/lib/utils";

interface HowzitLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
};

export function HowzitLogo({ className, size = "md" }: HowzitLogoProps) {
  return (
    <span className={cn("font-black tracking-tight select-none", sizes[size], className)}>
      <span style={{ color: "#FF5500" }}>Howz</span>
      <span style={{ color: "#0A0A0A" }}>it</span>
    </span>
  );
}
