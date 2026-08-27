import React from 'react';
import { Terminal, Calculator, PenTool, FlaskConical, Globe, Book, Briefcase, Layers, Star } from 'lucide-react';

export interface SubjectProps {
  id: string | number;
  title: string;
  code: string;
  image?: string;
  category: "CS" | "Math" | "Engineering" | "Science" | "Humanities" | string;
}

interface SubjectGridProps {
  subjects: SubjectProps[];
}

const categoryConfig: Record<string, { text: string; borderTop: string; shadowGlow: string; icon: React.ElementType; cardBg: string }> = {
  CS: { 
    text: "text-blue-500", 
    borderTop: "border-t-blue-500",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(59,130,246,0.3)]", 
    icon: Terminal,
    cardBg: "from-primary/20 to-secondary/10"
  },
  Math: { 
    text: "text-violet-500", 
    borderTop: "border-t-violet-500",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(139,92,246,0.3)]", 
    icon: Calculator,
    cardBg: "from-primary/20 to-secondary/10"
  },
  Engineering: { 
    text: "text-emerald-500", 
    borderTop: "border-t-emerald-500",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(16,185,129,0.3)]", 
    icon: PenTool,
    cardBg: "from-primary/20 to-secondary/10"
  },
  Science: { 
    text: "text-cyan-500", 
    borderTop: "border-t-cyan-500",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(6,182,212,0.3)]", 
    icon: FlaskConical,
    cardBg: "from-primary/20 to-secondary/10"
  },
  Humanities: { 
    text: "text-rose-500", 
    borderTop: "border-t-rose-500",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(244,63,94,0.3)]", 
    icon: Globe,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Program Core": { 
    text: "text-blue-400", 
    borderTop: "border-t-blue-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(96,165,250,0.3)]", 
    icon: Book,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Program Elective": { 
    text: "text-violet-400", 
    borderTop: "border-t-violet-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(167,139,250,0.3)]", 
    icon: Book,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Natural Science Core": { 
    text: "text-cyan-400", 
    borderTop: "border-t-cyan-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(34,211,238,0.3)]", 
    icon: FlaskConical,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Basic Engineering Core": { 
    text: "text-emerald-400", 
    borderTop: "border-t-emerald-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(52,211,153,0.3)]", 
    icon: PenTool,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Skill Development": { 
    text: "text-orange-400", 
    borderTop: "border-t-orange-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(251,146,60,0.3)]", 
    icon: Terminal,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Humanities Core": { 
    text: "text-rose-400", 
    borderTop: "border-t-rose-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(251,113,133,0.3)]", 
    icon: Globe,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Project & Internships": { 
    text: "text-yellow-400", 
    borderTop: "border-t-yellow-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(250,204,21,0.3)]", 
    icon: Briefcase,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Natural Science Elective": { 
    text: "text-teal-400", 
    borderTop: "border-t-teal-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(45,212,191,0.3)]", 
    icon: FlaskConical,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Multidisciplinary Elective": { 
    text: "text-sky-400", 
    borderTop: "border-t-sky-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(56,189,248,0.3)]", 
    icon: Layers,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Humanities Elective": { 
    text: "text-pink-400", 
    borderTop: "border-t-pink-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(244,114,182,0.3)]", 
    icon: Globe,
    cardBg: "from-primary/20 to-secondary/10"
  },
  "Open Elective": { 
    text: "text-lime-400", 
    borderTop: "border-t-lime-400",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgb(163,230,53,0.3)]", 
    icon: Star,
    cardBg: "from-primary/20 to-secondary/10"
  },
  Default: { 
    text: "text-white", 
    borderTop: "border-t-white",
    shadowGlow: "group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]", 
    icon: Book,
    cardBg: "from-white/10 to-white/5"
  },
};

interface SubjectCardProps {
  subject: SubjectProps;
  onClick?: () => void;
  className?: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick, className = "" }) => {
  const config = categoryConfig[subject.category] || categoryConfig.Default;

  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${config.cardBg} backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-2xl ${config.shadowGlow} ${className}`}
    >
      {/* Glossy inner top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 pointer-events-none" />
      
      {/* Subtle Category Gradient Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-current to-transparent ${config.text}`} />

      {/* Top Neon Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${config.borderTop}`} />
      
      {/* Radial Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-12">
        <span className="text-lg font-mono font-bold text-white/90 tracking-wider">
          {subject.code}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-white/5 border border-white/10 whitespace-nowrap ${config.text}`}>
            {subject.category}
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
          {subject.title}
        </h3>
      </div>

      {/* Monospaced Watermark - Scaled to fit */}
      <div className="absolute -bottom-2 -right-2 text-5xl font-mono font-black text-white/10 z-0 select-none group-hover:text-white/20 transition-colors duration-300 pointer-events-none">
        {subject.code}
      </div>
    </div>
  );
};

export const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects }) => {
  return (
    <div className="bg-[#0B0B0F] p-4 md:p-8 rounded-[2rem] border border-white/5 my-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">University Subjects</h2>
        <p className="text-white/50 text-sm mt-1">Explore all categories in the midnight portal.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};
