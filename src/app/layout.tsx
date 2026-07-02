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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
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
