import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorControls } from "@/components/layout/CursorControls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Team Vegavath",
    template: "%s | Team Vegavath",
  },
  description:
    "Team Vegavath is the official student innovation club of PES University, Electronic City Campus — racing toward innovation in automotive, robotics, design, media, and marketing.",
  keywords: ["Vegavath", "PESU ECC", "student club", "robotics", "automotive", "kart"],
  openGraph: {
    title: "Team Vegavath",
    description: "Student innovation club at PES University ECC",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CursorControls />
        {children}
      </body>
    </html>
  );
}