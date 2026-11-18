import { useState, useMemo, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Code,
  Award,
  CheckCircle,
  Circle,
  X,
  Search,
  LayoutGrid,
  Terminal,
  ExternalLink,
  Map as MapIcon,
  Sparkles,
  Pin,
  CheckSquare,
  Square,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import cardJourney from "@/assets/card-journey.jpg";

interface RoadmapItem {
  id: string;
  title: string;
  desc: string;
  category?: string;
}

const roleRoadmaps: RoadmapItem[] = [
  { id: "frontend", title: "Frontend", desc: "Step by step guide to becoming a modern frontend engineer", category: "Web" },
  { id: "backend", title: "Backend", desc: "Step by step guide to becoming a scalable backend engineer", category: "Web" },
  { id: "devops", title: "DevOps", desc: "Step by step guide for DevOps, SRE and Cloud Platform engineering", category: "Cloud" },
  { id: "full-stack", title: "Full Stack", desc: "End-to-end full stack web architecture and systems", category: "Web" },
  { id: "ai-data-scientist", title: "AI & Data Scientist", desc: "Modern machine learning, deep neural nets and data engineering", category: "AI/Data" },
  { id: "data-analyst", title: "Data Analyst", desc: "Statistical modeling, business intelligence and analytical SQL", category: "AI/Data" },
  { id: "android", title: "Android", desc: "Native Android development with Kotlin and Jetpack Compose", category: "Mobile" },
  { id: "ios", title: "iOS", desc: "Swift, SwiftUI, and iOS application design patterns", category: "Mobile" },
  { id: "postgresql-dba", title: "PostgreSQL DBA", desc: "High-availability clustering, indexing, partitioning and tuning", category: "Database" },
  { id: "blockchain", title: "Blockchain", desc: "Decentralized applications, Solidity, and smart contract security", category: "Emerging" },
  { id: "qa", title: "QA Engineer", desc: "Automated regression testing, Playwright, and test frameworks", category: "Testing" },
  { id: "software-architect", title: "Software Architect", desc: "System scalability, domain-driven design and microservices", category: "Architecture" },
  { id: "cyber-security", title: "Cyber Security", desc: "Offensive security, network defense, penetration testing and SIEM", category: "Security" },
  { id: "ux-design", title: "UX Design", desc: "Design systems, interaction physics, and user research heuristics", category: "Design" },
  { id: "game-developer", title: "Game Developer", desc: "Game engines, real-time physics, Unity, and Unreal Engine", category: "Gaming" },
  { id: "technical-writer", title: "Technical Writer", desc: "API documentation, developer portals, and system specs", category: "Writing" },
  { id: "mlops", title: "MLOps", desc: "Automated ML pipelines, model serving, and feature stores", category: "AI/Data" },
  { id: "data-engineer", title: "Data Engineer", desc: "Distributed streaming, Spark, Kafka, and data lakehouses", category: "AI/Data" }
];

const skillRoadmaps: RoadmapItem[] = [
  { id: "computer-science", title: "Computer Science", desc: "Foundational computer science curriculum and systems", category: "Core" },
  { id: "react", title: "React", desc: "Modern React 19, server components, hooks, and state management", category: "Frontend" },
  { id: "angular", title: "Angular", desc: "Enterprise application development with Angular and RxJS", category: "Frontend" },
  { id: "vue", title: "Vue", desc: "Progressive web applications with Vue 3 and Pinia", category: "Frontend" },
  { id: "nodejs", title: "Node.js", desc: "Asynchronous I/O, event loops, clustering and microservices", category: "Backend" },
  { id: "javascript", title: "JavaScript", desc: "Core ECMAScript, closures, promises, and the V8 engine", category: "Core" },
  { id: "typescript", title: "TypeScript", desc: "Static typing, generics, utility types and type gymnastics", category: "Core" },
  { id: "python", title: "Python", desc: "Data structures, asynchronous coroutines, and scientific Python", category: "Core" },
  { id: "sql", title: "SQL", desc: "Relational query optimization, query planning and transactions", category: "Database" },
  { id: "go", title: "Go", desc: "Goroutines, channels, interfaces and concurrent microservices", category: "Backend" },
  { id: "rust", title: "Rust", desc: "Memory safety, borrow checker, concurrency and WebAssembly", category: "Systems" },
  { id: "java", title: "Java", desc: "JVM internals, Spring ecosystem and modern concurrent Java", category: "Backend" },
  { id: "spring-boot", title: "Spring Boot", desc: "Enterprise cloud services, security and REST APIs", category: "Backend" },
  { id: "docker", title: "Docker", desc: "Containerization, multi-stage builds and container runtimes", category: "DevOps" },
  { id: "kubernetes", title: "Kubernetes", desc: "Container orchestration, ingress controllers and service meshes", category: "DevOps" },
  { id: "aws", title: "AWS", desc: "Core cloud architecture, serverless, VPCs and IAM policies", category: "Cloud" },
  { id: "cpp", title: "C++", desc: "Modern C++20, memory management, RAII, and algorithms", category: "Systems" },
  { id: "graphql", title: "GraphQL", desc: "Schema stitching, resolvers, subscriptions and Apollo federation", category: "Backend" },
  { id: "system-design", title: "System Design", desc: "High-scale architectural patterns, caching, and consensus", category: "Architecture" },
  { id: "design-systems", title: "Design Systems", desc: "Token architecture, component lifecycles, and a11y standards", category: "Frontend" },
  { id: "react-native", title: "React Native", desc: "Cross-platform mobile applications with native bridges", category: "Mobile" },
  { id: "flutter", title: "Flutter", desc: "Dart widgets, animation controllers and reactive UI", category: "Mobile" },
  { id: "mongodb", title: "MongoDB", desc: "Document schemas, aggregation pipelines and sharding", category: "Database" },
  { id: "linux", title: "Linux", desc: "POSIX shell, system administration, kernel tuning and processes", category: "Core" }
];

interface YearPlan {
  year: number;
  title: string;
  theme: string;
  subjects: string[];
  events: string[];
  achievements: string[];
  certifications: string[];
  defaultCompleted: boolean;
}

const initialYears: YearPlan[] = [
  {
    year: 1,
    title: "Foundation Year",
    theme: "Engineering Basics & Computational Thinking",
    subjects: ["Math I & Calculus", "Physics & Semiconductors", "Chemistry of Materials", "Technical English", "Programming Basics (C/C++)"],
    events: ["Orientation Week", "Tech Fest Hackathon", "Cultural Night", "Freshers Sports Cup"],
    achievements: ["First Hackathon Participation", "Academic Merit Dean's List"],
    certifications: ["NPTEL: Python Basics", "CodeChef 2-Star"],
    defaultCompleted: true,
  },
  {
    year: 2,
    title: "Core Development",
    theme: "Algorithms, Systems Architecture & Databases",
    subjects: ["Data Structures & Algorithms", "DBMS & SQL", "Object Oriented Programming (Java)", "Computer Networks", "Discrete Mathematics"],
    events: ["Hackathon 2.0", "Industrial Field Visit", "Open Source Workshop", "Project Exhibition"],
    achievements: ["Code Sprint 1st Runner Up", "GitHub Campus Contributor"],
    certifications: ["NPTEL: Data Structures", "AWS Cloud Practitioner"],
    defaultCompleted: true,
  },
  {
    year: 3,
    title: "Specialization & Internships",
    theme: "Cloud Systems, AI & Industry Pre-Placements",
    subjects: ["Machine Learning & Neural Nets", "Full Stack Web Engineering", "Cloud Computing & DevOps", "Cyber Security", "Distributed IoT"],
    events: ["Summer Internship Drive", "National Research Symposium", "Alumni Mentorship Roundtables"],
    achievements: ["Tier-1 Internship Offer", "Peer-Reviewed Research Paper Submission"],
    certifications: ["NPTEL: Machine Learning", "Google Cloud Associate Engineer", "Azure AI Fundamentals"],
    defaultCompleted: false,
  },
  {
    year: 4,
    title: "Capstone & Industry Transition",
    theme: "Final Placements, Thesis & Engineering Defense",
    subjects: ["Deep Learning & LLMs", "Distributed Systems & Scalability", "Capstone Project Phase II", "Professional Ethics & Law"],
    events: ["Super Dream Placement Drive", "Final Project Defense Expo", "Convocation Ceremony"],
    achievements: ["Placed at Dream Enterprise", "Best Capstone Project Award"],
    certifications: ["AWS Solutions Architect Associate", "Certified Kubernetes Application Developer (CKAD)"],
    defaultCompleted: false,
  },
];

const Journey = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<YearPlan | null>(null);
  const [roadmapType, setRoadmapType] = useState<"role" | "skill">("role");
  const [roadmapSearchQuery, setRoadmapSearchQuery] = useState("");
  
  // Pinned Roadmaps
  const [pinnedRoadmaps, setPinnedRoadmaps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("universe_pinned_roadmaps");
      return saved ? JSON.parse(saved) : ["frontend", "devops", "system-design"];
    } catch {
      return ["frontend", "devops", "system-design"];
    }
  });

  // Completed items per year checklist
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("universe_completed_milestones");
      if (saved) return JSON.parse(saved);
    } catch {}
    // default year 1 & 2 items checked
    const defaults: Record<string, boolean> = {};
    initialYears.slice(0, 2).forEach(y => {
      y.subjects.forEach(s => { defaults[`${y.year}-sub-${s}`] = true; });
      y.certifications.forEach(c => { defaults[`${y.year}-cert-${c}`] = true; });
    });
    return defaults;
  });

  useEffect(() => {
    try {
      localStorage.setItem("universe_pinned_roadmaps", JSON.stringify(pinnedRoadmaps));
    } catch {}
  }, [pinnedRoadmaps]);

  useEffect(() => {
    try {
      localStorage.setItem("universe_completed_milestones", JSON.stringify(completedMilestones));
    } catch {}
  }, [completedMilestones]);

  const togglePinRoadmap = (id: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pinnedRoadmaps.includes(id)) {
      setPinnedRoadmaps(prev => prev.filter(item => item !== id));
      toast({
        title: "Roadmap Unpinned",
        description: `${title} removed from pinned guides.`,
      });
    } else {
      setPinnedRoadmaps(prev => [...prev, id]);
      toast({
        title: "Roadmap Pinned! 📌",
        description: `${title} added to quick access.`,
      });
    }
  };

  const toggleMilestone = (key: string, name: string) => {
    const nextState = !completedMilestones[key];
    setCompletedMilestones(prev => ({ ...prev, [key]: nextState }));
    toast({
      title: nextState ? "Milestone Achieved! 🎉" : "Milestone Unchecked",
      description: `${name} marked as ${nextState ? "completed" : "pending"}.`,
    });
  };

  const activeRoadmapList = roadmapType === "role" ? roleRoadmaps : skillRoadmaps;

  const filteredRoadmaps = activeRoadmapList.filter((r) =>
    r.title.toLowerCase().includes(roadmapSearchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(roadmapSearchQuery.toLowerCase()) ||
    (r.category && r.category.toLowerCase().includes(roadmapSearchQuery.toLowerCase()))
  );

  // Calculate overall graduation readiness progress
  const totalTrackableItems = initialYears.reduce(
    (acc, y) => acc + y.subjects.length + y.certifications.length,
    0
  );
  const totalCompletedCount = Object.values(completedMilestones).filter(Boolean).length;
  const overallProgressPercentage = Math.min(100, Math.round((totalCompletedCount / totalTrackableItems) * 100));

  return (
    <MainLayout>
      {/* Sleek Header */}
      <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
        <img src={cardJourney} alt="Journey" className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium text-xs uppercase tracking-wider">Academic Lifecycle & Careers</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Roadmap & <span className="gradient-text">Student Journey</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Explore engineering roadmaps & track four-year undergraduate milestones</p>
        </div>
      </div>

      {/* Graduation Readiness Progress Bar */}
      <div className="mx-4 md:mx-6 -mt-6 relative z-10 sleek-card p-4 md:p-5 border border-white/10 bg-background/85 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shadow-inner">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm md:text-base">Degree Completion Readiness</span>
              <span className="text-xs font-mono font-bold text-primary">{overallProgressPercentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {totalCompletedCount} of {totalTrackableItems} academic course & certification milestones validated
            </p>
          </div>
        </div>
        <div className="w-full md:w-64">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 rounded-full"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Learning Roadmaps Section */}
      <div className="p-4 md:p-6 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl flex items-center gap-2 tracking-tight">
              <MapIcon className="w-5 h-5 text-primary" />
              Industry Engineering Roadmaps
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Curated architectural guides and community tracks powered by roadmap.sh
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setRoadmapType("role")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                roadmapType === "role" ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Role Based ({roleRoadmaps.length})
            </button>
            <button
              onClick={() => setRoadmapType("skill")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                roadmapType === "skill" ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="w-4 h-4" /> Skill Based ({skillRoadmaps.length})
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${roadmapType} roadmaps (e.g., ${roadmapType === "role" ? "Frontend, DevOps, AI" : "React, Docker, Python"})...`}
            value={roadmapSearchQuery}
            onChange={(e) => setRoadmapSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-medium text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRoadmaps.map((r, index) => {
            const isPinned = pinnedRoadmaps.includes(r.id);

            return (
              <a
                key={r.id}
                href={`https://roadmap.sh/${r.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sleek-card p-5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group animate-fade-in flex flex-col justify-between relative"
                style={{ animationDelay: `${(index % 8) * 0.05}s` }}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-sm">
                      {roadmapType === "role" ? <LayoutGrid className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => togglePinRoadmap(r.id, r.title, e)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isPinned
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-white/[0.02] border-white/10 text-muted-foreground hover:text-foreground"
                        }`}
                        title={isPinned ? "Unpin Roadmap" : "Pin Roadmap to Quick Access"}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{r.title}</h3>
                    {r.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium">
                        {r.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">roadmap.sh/{r.id}</span>
                  <span className="text-primary font-semibold text-xs group-hover:underline">Explore Track →</span>
                </div>
              </a>
            );
          })}
          {filteredRoadmaps.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl bg-white/[0.01] text-xs">
              No roadmaps found matching "{roadmapSearchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Student Journey Timeline */}
      <div className="p-4 md:p-6 mt-8 mb-12">
        <div className="mb-8">
          <h2 className="font-display font-bold text-xl md:text-2xl flex items-center gap-2 tracking-tight">
            <GraduationCap className="w-5 h-5 text-primary" />
            Undergraduate Milestone Tracker
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Four-year progressive milestone breakdown across courses, hackathons, and certifications
          </p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-white/10 md:-translate-x-0.5" />

          {/* Year Cards */}
          <div className="space-y-8">
            {initialYears.map((year, index) => {
              const yearItemsCount = year.subjects.length + year.certifications.length;
              const yearCompletedCount =
                year.subjects.filter(s => completedMilestones[`${year.year}-sub-${s}`]).length +
                year.certifications.filter(c => completedMilestones[`${year.year}-cert-${c}`]).length;
              const isYearDone = yearCompletedCount === yearItemsCount && yearItemsCount > 0;

              return (
                <div
                  key={year.year}
                  className={`relative flex items-start gap-4 md:gap-8 animate-fade-in ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                        isYearDone
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                          : "bg-card text-muted-foreground border-white/10"
                      }`}
                    >
                      {isYearDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "" : "md:mr-auto"}`}>
                    <div
                      onClick={() => setSelectedYear(year)}
                      className={`sleek-card p-6 cursor-pointer hover:border-primary/40 transition-all ${
                        isYearDone ? "border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-display font-bold gradient-text">
                          Year {year.year}
                        </span>
                        {isYearDone ? (
                          <span className="glass-pill text-[10px] text-emerald-400 font-semibold">
                            Completed ({yearCompletedCount}/{yearItemsCount})
                          </span>
                        ) : (
                          <span className="glass-pill text-[10px] text-muted-foreground font-semibold">
                            In Progress ({yearCompletedCount}/{yearItemsCount})
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-base">{year.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{year.theme}</p>
                      
                      {/* Year Progress Mini-bar */}
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden my-3">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${Math.round((yearCompletedCount / yearItemsCount) * 100)}%` }}
                        />
                      </div>

                      <div className="flex gap-4 pt-2 border-t border-white/[0.04]">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          <span>{year.subjects.length} Courses</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          <span>{year.events.length} Events</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Award className="w-3.5 h-3.5 text-accent" />
                          <span>{year.certifications.length} Certs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modern Year Detail Modal */}
      {selectedYear && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-2xl max-h-[82vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="glass-pill text-[10px] text-primary font-bold uppercase tracking-wider">
                    Year {selectedYear.year} Milestone Inspector
                  </span>
                  <h2 className="font-display font-bold text-2xl tracking-tight mt-1">
                    {selectedYear.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedYear.theme}</p>
                </div>
                <button
                  onClick={() => setSelectedYear(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subjects Checklist */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Curriculum Subjects & Lab Modules
                  </span>
                  <span className="text-[11px] lowercase font-normal text-muted-foreground">Click to toggle</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedYear.subjects.map((subject: string) => {
                    const key = `${selectedYear.year}-sub-${subject}`;
                    const isChecked = !!completedMilestones[key];

                    return (
                      <div
                        key={subject}
                        onClick={() => toggleMilestone(key, subject)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? "bg-primary/10 border-primary/30 text-foreground"
                            : "bg-white/[0.02] border-white/5 text-muted-foreground hover:border-white/10 hover:text-foreground"
                        }`}
                      >
                        <span className={isChecked ? "line-through decoration-primary/40 text-muted-foreground" : ""}>
                          {subject}
                        </span>
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Events & Competitions */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Campus Competitions & Hackathons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedYear.events.map((event: string) => (
                    <div key={event} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-medium text-foreground">
                      {event}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Checklist */}
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-accent" />
                    Industry & NPTEL Certifications
                  </span>
                  <span className="text-[11px] lowercase font-normal text-muted-foreground">Click to toggle</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedYear.certifications.map((cert: string) => {
                    const key = `${selectedYear.year}-cert-${cert}`;
                    const isChecked = !!completedMilestones[key];

                    return (
                      <div
                        key={cert}
                        onClick={() => toggleMilestone(key, cert)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? "bg-accent/10 border-accent/30 text-foreground"
                            : "bg-white/[0.02] border-white/5 text-muted-foreground hover:border-white/10 hover:text-foreground"
                        }`}
                      >
                        <span>{cert}</span>
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
                <Button
                  onClick={() => setSelectedYear(null)}
                  className="rounded-xl px-5 text-xs h-9 shadow-md shadow-primary/20"
                >
                  Save & Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Journey;
