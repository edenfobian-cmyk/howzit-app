import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Howzit — Find your people. Build your future.",
  description:
    "South Africa's network for ambitious 18–35 year olds. Swipe to connect with jobs, mentors, co-founders, investors, and communities. LinkedIn × Tinder × YC — built for SA.",
  keywords: [
    "South Africa networking",
    "SA jobs",
    "startup co-founder South Africa",
    "mentorship SA",
    "Howzit app",
    "Cape Town networking",
    "Johannesburg careers",
  ],
  openGraph: {
    title: "Howzit — Find your people. Build your future.",
    description:
      "The easiest way for ambitious South Africans to find their people.",
    siteName: "Howzit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Howzit — Find your people. Build your future.",
    description:
      "South Africa's network for ambitious 18–35 year olds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6A00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-white text-[var(--charcoal)] antialiased">{children}</body>
    </html>
  );
}
