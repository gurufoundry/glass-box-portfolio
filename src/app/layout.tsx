import type { Metadata } from "next";
// 1. THIS IS THE CRITICAL LINE THAT LOADS TAILWIND
import "./globals.css";

// 2. Load the font (optional, but good for the "Code" look)
import { JetBrains_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Gursimran Rajvansh Glass Box | AI Research & UI UX Design",
  description: "Interactive portfolio featuring 3D visualization, Local Edge AI search, and Semantic Analysis. Built with Next.js and Transformers.js.",
  keywords: ["AI", "UX Design", "React", "Computer Vision", "Portfolio", "Engineer"],
  openGraph: {
    title: "Glass Box | The AI & Design Portfolio",
    description: "Experience the bridge between User Experience and Artificial Intelligence.",
    url: "https://glass-box-portfolio-h6tc.vercel.app/", // PUT YOUR ACTUAL VERCEL LINK HERE
    siteName: "Glass Box Portfolio",
    images: [
      {
        url: "/opengraph-image.png", // Next.js automatically looks for this file
        width: 1200,
        height: 630,
        alt: "Glass Box Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass Box | AI Research & UX Design",
    description: "Interactive 3D portfolio featuring Local AI Search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font variables and dark mode base */}
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}