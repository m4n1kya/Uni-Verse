import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GraduationCap, Trophy, BookOpen, Code, Award, CheckCircle, Circle, X, Search, LayoutGrid, Terminal, ExternalLink, Map as MapIcon, Sparkles } from "lucide-react";
import cardJourney from "@/assets/card-journey.jpg";

const roleRoadmaps = [
  { id: "frontend", title: "Frontend", desc: "Step by step guide to becoming a modern frontend engineer" },
  { id: "backend", title: "Backend", desc: "Step by step guide to becoming a scalable backend engineer" },
  { id: "devops", title: "DevOps", desc: "Step by step guide for DevOps, SRE and Cloud Platform engineering" },
  { id: "full-stack", title: "Full Stack", desc: "End-to-end full stack web architecture and systems" },
  { id: "ai-data-scientist", title: "AI & Data Scientist", desc: "Modern machine learning, deep neural nets and data engineering" },
  { id: "data-analyst", title: "Data Analyst", desc: "Statistical modeling, business intelligence and analytical SQL" },
  { id: "android", title: "Android", desc: "Native Android development with Kotlin and Jetpack Compose" },
  { id: "ios", title: "iOS", desc: "Swift, SwiftUI, and iOS application design patterns" },
  { id: "postgresql-dba", title: "PostgreSQL DBA", desc: "High-availability clustering, indexing, partitioning and tuning" },
  { id: "blockchain", title: "Blockchain", desc: "Decentralized applications, Solidity, and smart contract security" },
  { id: "qa", title: "QA Engineer", desc: "Automated regression testing, Playwright, and test frameworks" },
  { id: "software-architect", title: "Software Architect", desc: "System scalability, domain-driven design and microservices" },
  { id: "cyber-security", title: "Cyber Security", desc: "Offensive security, network defense, penetration testing and SIEM" },
  { id: "ux-design", title: "UX Design", desc: "Design systems, interaction physics, and user research heuristics" },
  { id: "game-developer", title: "Game Developer", desc: "Game engines, real-time physics, Unity, and Unreal Engine" },
  { id: "technical-writer", title: "Technical Writer", desc: "API documentation, developer portals, and system specs" },
  { id: "mlops", title: "MLOps", desc: "Automated ML pipelines, model serving, and feature stores" },
  { id: "data-engineer", title: "Data Engineer", desc: "Distributed streaming, Spark, Kafka, and data lakehouses" }
];

const skillRoadmaps = [
  { id: "computer-science", title: "Computer Science", desc: "Foundational computer science curriculum and systems" },
  { id: "react", title: "React", desc: "Modern React 19, server components, hooks, and state management" },
  { id: "angular", title: "Angular", desc: "Enterprise application development with Angular and RxJS" },
  { id: "vue", title: "Vue", desc: "Progressive web applications with Vue 3 and Pinia" },
  { id: "nodejs", title: "Node.js", desc: "Asynchronous I/O, event loops, clustering and microservices" },
  { id: "javascript", title: "JavaScript", desc: "Core ECMAScript, closures, promises, and the V8 engine" },
  { id: "typescript", title: "TypeScript", desc: "Static typing, generics, utility types and type gymnastics" },
  { id: "python", title: "Python", desc: "Data structures, asynchronous coroutines, and scientific Python" },
  { id: "sql", title: "SQL", desc: "Relational query optimization, query planning and transactions" },
  { id: "go", title: "Go", desc: "Goroutines, channels, interfaces and concurrent microservices" },
  { id: "rust", title: "Rust", desc: "Memory safety, borrow checker, concurrency and WebAssembly" },
  { id: "java", title: "Java", desc: "JVM internals, Spring ecosystem and modern concurrent Java" },
  { id: "spring-boot", title: "Spring Boot", desc: "Enterprise cloud services, security and REST APIs" },
  { id: "docker", title: "Docker", desc: "Containerization, multi-stage builds and container runtimes" },
  { id: "kubernetes", title: "Kubernetes", desc: "Container orchestration, ingress controllers and service meshes" },
  { id: "aws", title: "AWS", desc: "Core cloud architecture, serverless, VPCs and IAM policies" },
  { id: "cpp", title: "C++", desc: "Modern C++20, memory management, RAII, and algorithms" },
  { id: "graphql", title: "GraphQL", desc: "Schema stitching, resolvers, subscriptions and Apollo federation" },
  { id: "system-design", title: "System Design", desc: "High-scale architectural patterns, caching, and consensus" },
  { id: "design-systems", title: "Design Systems", desc: "Token architecture, component lifecycles, and a11y standards" },
  { id: "react-native", title: "React Native", desc: "Cross-platform mobile applications with native bridges" },
  { id: "flutter", title: "Flutter", desc: "Dart widgets, animation controllers and reactive UI" },
  { id: "mongodb", title: "MongoDB", desc: "Document schemas, aggregation pipelines and sharding" },
  { id: "linux", title: "Linux", desc: "POSIX shell, system administration, kernel tuning and processes" }
];

const years = [
  {
    year: 1,
    title: "Foundation Year",
    subjects: ["Math I", "Physics", "Chemistry", "English", "Programming Basics"],
    events: ["Orientation Week", "Tech Fest", "Cultural Night"],
    achievements: ["First Hackathon", "Sports Day"],
    certifications: ["NPTEL: Python Basics"],
    completed: true,
  },
  {
    year: 2,
    title: "Core Development",
    subjects: ["Data Structures", "DBMS", "OOPs", "Computer Networks", "Math II"],
    events: ["Hackathon 2.0", "Industry Visit", "Workshop Series"],
    achievements: ["Code Sprint Winner", "Project Exhibition"],
    certifications: ["NPTEL: Data Structures", "AWS Fundamentals"],
    completed: true,
  },
  {
    year: 3,
    title: "Specialization",
    subjects: ["Machine Learning", "Web Dev", "Cloud Computing", "Cyber Security", "IoT"],
    events: ["Internship Drive", "Research Symposium", "Alumni Meet"],
    achievements: ["Research Paper", "Internship at Tech Corp"],
    certifications: ["NPTEL: Machine Learning", "Google Cloud", "Azure Basics"],
    completed: false,
  },
  {
    year: 4,
    title: "Industry Ready",
    subjects: ["Deep Learning", "Big Data", "Capstone Project", "Professional Ethics"],
    events: ["Placement Season", "Final Presentations", "Convocation"],
    achievements: ["Placed at Dream Company", "Best Project Award"],
    certifications: ["NPTEL: Deep Learning", "Industry Certification"],
    completed: false,
  },
];

const Journey = () => {
  const [selectedYear, setSelectedYear] = useState<any>(null);
  const [roadmapType, setRoadmapType] = useState<"role" | "skill">("role");
  const [roadmapSearchQuery, setRoadmapSearchQuery] = useState("");

  const filteredRoadmaps = (roadmapType === "role" ? roleRoadmaps : skillRoadmaps).filter((r) =>
    r.title.toLowerCase().includes(roadmapSearchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(roadmapSearchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Sleek Header */}
      <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
        <img src={cardJourney} alt="Journey" className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium text-xs uppercase tracking-wider">Academic Lifecycle</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Roadmap & <span className="gradient-text">Student Journey</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Explore engineering roadmaps & track four-year undergraduate milestones</p>
        </div>
      </div>

      {/* Learning Roadmaps Section */}
      <div className="p-4 md:p-6 mt-2">
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
              <LayoutGrid className="w-4 h-4" /> Role Based
            </button>
            <button
              onClick={() => setRoadmapType("skill")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                roadmapType === "skill" ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="w-4 h-4" /> Skill Based
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
          {filteredRoadmaps.map((r, index) => (
            <a
              key={r.id}
              href={`https://roadmap.sh/${r.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sleek-card p-5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group animate-fade-in flex flex-col justify-between"
              style={{ animationDelay: `${(index % 8) * 0.05}s` }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    {roadmapType === "role" ? <LayoutGrid className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[11px] text-muted-foreground">roadmap.sh/{r.id}</span>
                <span className="text-primary font-semibold text-xs group-hover:underline">Explore →</span>
              </div>
            </a>
          ))}
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
            {years.map((year, index) => (
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
                      year.completed
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                        : "bg-card text-muted-foreground border-white/10"
                    }`}
                  >
                    {year.completed ? (
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
                      year.completed ? "border-l-4 border-l-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-display font-bold gradient-text">
                        Year {year.year}
                      </span>
                      {year.completed ? (
                        <span className="glass-pill text-[10px] text-emerald-400 font-semibold">
                          Completed
                        </span>
                      ) : (
                        <span className="glass-pill text-[10px] text-muted-foreground font-semibold">
                          In Progress
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-base">{year.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {year.subjects.length} subjects • {year.events.length} campus events • {year.certifications.length} certifications
                    </p>
                    <div className="flex gap-4 mt-4 pt-3 border-t border-white/[0.04]">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        <span>{year.subjects.length} Subjects</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{year.achievements.length} Awards</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Award className="w-3.5 h-3.5 text-accent" />
                        <span>{year.certifications.length} Certs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  <span className="text-3xl font-display font-bold gradient-text">
                    Year {selectedYear.year}
                  </span>
                  <h2 className="font-display font-bold text-xl tracking-tight mt-1">{selectedYear.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedYear(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subjects */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Prescribed Curriculum
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedYear.subjects.map((subject: string) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-medium text-foreground"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Events */}
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

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Key Achievements
                </h3>
                <div className="space-y-2">
                  {selectedYear.achievements.map((achievement: string) => (
                    <div
                      key={achievement}
                      className="flex items-center gap-2 text-xs font-medium text-foreground p-2 rounded-lg bg-white/[0.01]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <Code className="w-4 h-4 text-accent" />
                  Industry & NPTEL Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedYear.certifications.map((cert: string) => (
                    <span
                      key={cert}
                      className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-xl text-xs font-semibold"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Journey;
