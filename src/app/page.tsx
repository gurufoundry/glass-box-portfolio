"use client";

import { useState } from "react";
// We use the named import now (with curly braces)
import { HeroScene } from "@/components/canvas/HeroScene";
import SemanticSearch from "@/components/features/SemanticSearch";
import ProjectCard from "@/components/features/ProjectCard";
import initialData from "@/data/embeddings.json";
import ContactSection from "@/components/features/ContactSection";

// 1. DEFINE THE SHAPE OF YOUR DATA
// This tells TypeScript exactly what fields to expect
type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  image?: string;
  techSpecs?: {
    stack: string[];
    architecture?: string;
    model?: string;
    latency?: string;
  };
  embedding?: number[];
  matchScore?: number; // This is the optional field causing the issue
};

export default function Home() {
  // 2. FORCE THE TYPE HERE
  // We tell React: "This state holds an array of Project objects"
  // We use 'as unknown as Project[]' to force the JSON to fit our type
  const [projects, setProjects] = useState<Project[]>(initialData as unknown as Project[]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative selection:bg-neon-blue selection:text-black">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
         <HeroScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            GLASS BOX
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto font-mono text-sm">
            Interactive Portfolio <span className="text-neon-blue">v2.0</span>
            <br/>
            Bridging User Experience & Artificial Intelligence
          </p>
        </header>

        {/* Search Brain */}
        {/* The error should be gone now because both sides speak 'Project' */}
        <SemanticSearch onResults={(results) => setProjects(results)} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {/* 5. The Contact Terminal */}
        <ContactSection />
      </div>
    </main>
  );
}