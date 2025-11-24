"use client";

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import rawData from '@/data/embeddings.json'; 

// 1. Define the Shape of your Data (To make TypeScript happy)
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
  matchScore?: number;
};

// Cast the JSON import to our Type
const projectData = rawData as Project[];

// The Math: Cosine Similarity
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

interface SearchProps {
  onResults: (results: Project[]) => void;
}

export default function SemanticSearch({ onResults }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsThinking(true);

    try {
      const response = await fetch('/api/vectorize', {
        method: 'POST',
        body: JSON.stringify({ text: query }),
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      const queryVector = data.vector;

      const scoredProjects = projectData.map((project) => {
        if (!project.embedding) return { ...project, matchScore: 0 };
        
        const score = cosineSimilarity(queryVector, project.embedding);
        return { ...project, matchScore: score };
      });

      const sorted = scoredProjects
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .filter((p) => (p.matchScore || 0) > 0.15); 

      onResults(sorted);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 font-mono z-50 relative">
      <form onSubmit={handleSearch} className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-blue font-bold text-lg">{`>`}</span>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "Show me computer vision work"...'
          className="w-full bg-black/80 backdrop-blur-md border-2 border-neutral-800 p-4 pl-10 text-white focus:border-neon-blue outline-none transition-all rounded-none placeholder:text-neutral-600"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isThinking ? (
                <div className="flex items-center gap-2 text-neon-blue text-xs animate-pulse">
                    <Loader2 className="animate-spin" size={14} />
                    COMPUTING...
                </div>
            ) : (
                <button type="submit">
                    <Search className="text-neutral-500 hover:text-white transition-colors" size={20} />
                </button>
            )}
        </div>
      </form>
    </div>
  );
}