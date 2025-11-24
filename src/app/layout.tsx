import type { Metadata } from "next";
// 1. THIS IS THE CRITICAL LINE THAT LOADS TAILWIND
import "./globals.css";

// 2. Load the font (optional, but good for the "Code" look)
import { JetBrains_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Glass Box Portfolio",
  description: "Interactive AI Portfolio",
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