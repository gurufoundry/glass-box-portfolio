"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, Terminal } from "lucide-react";
import clsx from "clsx";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "your.email@example.com"; // UPDATE THIS

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-32 mb-20 font-mono">
      {/* The Terminal Container */}
      <div className="border border-neutral-800 bg-black/50 backdrop-blur-md rounded-lg overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="ml-4 text-xs text-neutral-500 flex items-center gap-2">
            <Terminal size={12} />
            <span>root@glass-box:~</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-8 space-y-8">
          
          {/* Command 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neon-blue">
              <span>{`>`}</span>
              <span className="typing-effect">connect --method="email"</span>
            </div>
            
            <div className="pl-4">
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded flex items-center justify-between group hover:border-neon-blue/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Mail className="text-neutral-400 group-hover:text-neon-blue transition-colors" />
                  <span className="text-neutral-300">{email}</span>
                </div>
                
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Command 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neon-blue">
              <span>{`>`}</span>
              <span>list --socials</span>
            </div>
            
            <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GitHub */}
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noreferrer"
                className="bg-neutral-900/50 border border-neutral-800 p-4 rounded flex items-center gap-4 hover:border-neon-purple/50 group transition-all"
              >
                <Github className="text-neutral-400 group-hover:text-neon-purple transition-colors" />
                <div>
                  <div className="text-neutral-300 group-hover:text-white">GitHub</div>
                  <div className="text-xs text-neutral-500">View Source Code</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noreferrer"
                className="bg-neutral-900/50 border border-neutral-800 p-4 rounded flex items-center gap-4 hover:border-blue-500/50 group transition-all"
              >
                <Linkedin className="text-neutral-400 group-hover:text-blue-500 transition-colors" />
                <div>
                  <div className="text-neutral-300 group-hover:text-white">LinkedIn</div>
                  <div className="text-xs text-neutral-500">Professional Network</div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer System Status */}
      <div className="mt-8 flex justify-between text-[10px] text-neutral-600 uppercase tracking-widest">
        <div>System Status: Online</div>
        <div>Next.js 14 • Tailwind • Three.js</div>
      </div>
    </section>
  );
}