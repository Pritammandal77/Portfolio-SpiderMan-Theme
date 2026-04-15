import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Header";

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
    default: "Pritam Mandal | Full Stack Developer",
    template: "%s | Pritam Mandal",
  },

  description:
    "Pritam Mandal is a MERN Stack Developer building scalable full-stack applications using React, Node.js, MongoDB, and modern technologies.",

  keywords: [
    "Pritam Mandal",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Portfolio Website",
    "Web Developer India",
    "JavaScript Developer",
  ],

  authors: [{ name: "Pritam Mandal" }],
  creator: "Pritam Mandal",

  metadataBase: new URL("https://your-portfolio-domain.com"), // 🔥 change this

  openGraph: {
    title: "Pritam Mandal | Full Stack Developer",
    description:
      "Explore projects, skills, and experience of Pritam Mandal - MERN Stack Developer.",
    url: "https://your-portfolio-domain.com",
    siteName: "Pritam Portfolio",
    images: [
      {
        url: "/og-image.png", // 🔥 add your OG image
        width: 1200,
        height: 630,
        alt: "Pritam Mandal Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pritam Mandal | Full Stack Developer",
    description:
      "Check out my full-stack projects, skills, and development journey.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}