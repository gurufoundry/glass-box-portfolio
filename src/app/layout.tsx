import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // 1. Import fonts
import "./globals.css";

// 2. Define the fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Glass Box | AI Research & UX Design",
  description: "Interactive portfolio featuring 3D visualization, Local Edge AI search, and Semantic Analysis. Built with Next.js and Transformers.js.",
  keywords: ["AI", "UX Design", "React", "Computer Vision", "Portfolio", "Engineer"],
  openGraph: {
    title: "Glass Box | The AI & Design Portfolio",
    description: "Experience the bridge between User Experience and Artificial Intelligence.",
    url: "https://glass-box-portfolio.vercel.app", 
    siteName: "Glass Box Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font variables to the body */}
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}