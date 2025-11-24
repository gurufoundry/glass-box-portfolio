"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Eye, Layers, Cpu, GitBranch } from "lucide-react";
import clsx from "clsx";

// 1. Updated Interface to match page.tsx perfectly
interface ProjectProps {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[]; // Added this
  image?: string; // Made optional
  techSpecs?: {   // Made optional
    stack: string[];
    latency?: string;
    architecture?: string;
    model?: string; 
  };
  matchScore?: number;
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
  const [mode, setMode] = useState<"experience" | "logic">("experience");
  const isLogic = mode === "logic";

  // Safety check: If no image is provided, use a placeholder
  const imageUrl = project.image || "https://placehold.co/600x400/111/FFF?text=No+Image";

  return (
    <div className="relative group w-full max-w-md mx-auto h-[500px] perspective-1000">
      {/* Container */}
      <motion.div
        layout
        className={clsx(
          "relative w-full h-full border overflow-hidden transition-colors duration-500",
          isLogic
            ? "bg-black border-neon-blue font-mono shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            : "bg-neutral-900 border-neutral-800 font-sans shadow-lg"
        )}
      >
        {/* Header / Toggle */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 z-20 relative bg-opacity-90 backdrop-blur-sm">
            
            {/* AI Confidence Badge */}
            {project.matchScore !== undefined && project.matchScore > 0 && (
                <div className={clsx("text-xs px-2 py-1", isLogic ? "text-neon-blue bg-neon-blue/10" : "text-white/50")}>
                    Match: {(project.matchScore * 100).toFixed(0)}%
                </div>
            )}
            
            {/* Switch */}
            <button
                onClick={() => setMode(isLogic ? "experience" : "logic")}
                className="flex items-center gap-2 text-xs uppercase tracking-wider hover:text-white transition-colors text-white/60 ml-auto"
            >
                {isLogic ? <Eye size={14} /> : <Code size={14} />}
                <span>{isLogic ? "View UI" : "View Code"}</span>
            </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === "experience" ? (
            /* --- MODE A: EXPERIENCE --- */
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col"
            >
              <div className="h-1/2 overflow-hidden relative group-hover:opacity-90 transition-opacity">
                <img 
                    src={imageUrl} 
                    alt={project.title} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="mt-4 flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                        {project.role}
                    </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- MODE B: LOGIC --- */
            <motion.div
              key="logic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-6 text-xs text-neon-blue flex flex-col gap-6 overflow-hidden relative"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />

              {/* Architecture */}
              <div className="z-10 relative">
                <div className="flex items-center gap-2 mb-2 text-white/40 uppercase tracking-widest">
                    <Layers size={12} /> Architecture
                </div>
                <div className="border-l border-white/20 pl-3 font-mono text-white/80">
                    {project.techSpecs?.architecture || "Client-Server Monolith"}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="z-10 relative">
                 <div className="flex items-center gap-2 mb-2 text-white/40 uppercase tracking-widest">
                    <Cpu size={12} /> Tech Stack
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {/* Safety fallback if stack is missing */}
                    {(project.techSpecs?.stack || project.tech).map((tech) => (
                        <div key={tech} className="bg-neon-blue/5 border border-neon-blue/20 p-2 text-center text-neon-blue/80">
                            {tech}
                        </div>
                    ))}
                </div>
              </div>

              {/* Model Config (Only shows if it exists) */}
              {project.techSpecs?.model && (
                  <div className="z-10 relative mt-auto border-t border-dashed border-white/20 pt-4">
                     <div className="flex items-center gap-2 mb-2 text-white/40 uppercase tracking-widest">
                        <GitBranch size={12} /> Model Config
                    </div>
                    <pre className="text-[10px] bg-black/50 p-2 rounded border border-white/10 text-green-400/80 overflow-x-auto">
{`{
  "model": "${project.techSpecs.model}",
  "latency": "${project.techSpecs.latency || "N/A"}"
}`}
                    </pre>
                  </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}