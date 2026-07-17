import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GraduationCap, Trophy, BookOpen, Code, Award, CheckCircle, Circle, X, Search, LayoutGrid, Terminal, ExternalLink, Map as MapIcon } from "lucide-react";
import cardJourney from "@/assets/card-journey.jpg";

const roleRoadmaps = [
  { id: "frontend", title: "Frontend", desc: "Step by step guide to becoming a frontend developer" },
  { id: "backend", title: "Backend", desc: "Step by step guide to becoming a backend developer" },
  { id: "devops", title: "DevOps", desc: "Step by step guide for DevOps, SRE or Platform" },
  { id: "full-stack", title: "Full Stack", desc: "Step by step guide to becoming a full stack developer" },
  { id: "ai-data-scientist", title: "AI and Data Scientist", desc: "Step by step guide to becoming an AI and Data Scientist" },
  { id: "data-analyst", title: "Data Analyst", desc: "Step by step guide to becoming a Data Analyst" },
  { id: "android", title: "Android", desc: "Step by step guide to becoming an Android developer" },
  { id: "ios", title: "iOS", desc: "Step by step guide to becoming an iOS developer" },
  { id: "postgresql-dba", title: "PostgreSQL DBA", desc: "Step by step guide to becoming a PostgreSQL DBA" },
  { id: "blockchain", title: "Blockchain", desc: "Step by step guide to becoming a Blockchain developer" },
  { id: "qa", title: "QA", desc: "Step by step guide to becoming a QA Engineer" },
  { id: "software-architect", title: "Software Architect", desc: "Step by step guide to becoming a Software Architect" },
  { id: "cyber-security", title: "Cyber Security", desc: "Step by step guide to becoming a Cyber Security Expert" },
  { id: "ux-design", title: "UX Design", desc: "Step by step guide to becoming a UX Designer" },
  { id: "game-developer", title: "Game Developer", desc: "Step by step guide to becoming a Game Developer" },
  { id: "technical-writer", title: "Technical Writer", desc: "Step by step guide to becoming a Technical Writer" },
  { id: "mlops", title: "MLOps", desc: "Step by step guide to becoming an MLOps Engineer" },
  { id: "data-engineer", title: "Data Engineer", desc: "Step by step guide to becoming a Data Engineer" }
];

const skillRoadmaps = [
  { id: "computer-science", title: "Computer Science", desc: "Computer Science Curriculum" },
  { id: "react", title: "React", desc: "Step by step guide to learn React" },
  { id: "angular", title: "Angular", desc: "Step by step guide to learn Angular" },
  { id: "vue", title: "Vue", desc: "Step by step guide to learn Vue" },
  { id: "nodejs", title: "Node.js", desc: "Step by step guide to learn Node.js" },
  { id: "javascript", title: "JavaScript", desc: "Step by step guide to learn JavaScript" },
  { id: "typescript", title: "TypeScript", desc: "Step by step guide to learn TypeScript" },
  { id: "python", title: "Python", desc: "Step by step guide to learn Python" },
  { id: "sql", title: "SQL", desc: "Step by step guide to learn SQL" },
  { id: "go", title: "Go", desc: "Step by step guide to learn Go" },
  { id: "rust", title: "Rust", desc: "Step by step guide to learn Rust" },
  { id: "java", title: "Java", desc: "Step by step guide to learn Java" },
  { id: "spring-boot", title: "Spring Boot", desc: "Step by step guide to learn Spring Boot" },
  { id: "docker", title: "Docker", desc: "Step by step guide to learn Docker" },
  { id: "kubernetes", title: "Kubernetes", desc: "Step by step guide to learn Kubernetes" },
  { id: "aws", title: "AWS", desc: "Step by step guide to learn AWS" },
  { id: "cpp", title: "C++", desc: "Step by step guide to learn C++" },
  { id: "graphql", title: "GraphQL", desc: "Step by step guide to learn GraphQL" },
  { id: "system-design", title: "System Design", desc: "Step by step guide to learn System Design" },
  { id: "design-systems", title: "Design Systems", desc: "Step by step guide for Design Systems" },
  { id: "react-native", title: "React Native", desc: "Step by step guide to learn React Native" },
  { id: "flutter", title: "Flutter", desc: "Step by step guide to learn Flutter" },
  { id: "mongodb", title: "MongoDB", desc: "Step by step guide to learn MongoDB" },
  { id: "linux", title: "Linux", desc: "Step by step guide to learn Linux" }
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
    r.title.toLowerCase().includes(roadmapSearchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={cardJourney} alt="Journey" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="font-display font-bold text-3xl md:text-4xl">
            Roadmap & <span className="gradient-text">Student Journey</span>
          </h1>
          <p className="text-muted-foreground mt-1">Follow industry maps and track your academic milestones</p>
        </div>
      </div>

      {/* Learning Roadmaps */}
      <div className="p-4 md:p-6 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl flex items-center gap-2">
              <MapIcon className="w-6 h-6 text-primary" />
              Learning Roadmaps
            </h2>
            <p className="text-muted-foreground mt-1">
              Select a path to follow industry standard guides from roadmap.sh
            </p>
          </div>
          <div className="flex items-center gap-3 bg-muted/50 p-1.5 rounded-xl border border-border shrink-0">
            <button
              onClick={() => setRoadmapType("role")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                roadmapType === "role" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Role Based
            </button>
            <button
              onClick={() => setRoadmapType("skill")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                roadmapType === "skill" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"
              }`}
            >
              <Terminal className="w-4 h-4" /> Skill Based
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${roadmapType} roadmaps...`}
            value={roadmapSearchQuery}
            onChange={(e) => setRoadmapSearchQuery(e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
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
              className="glass-card p-5 hover:glow-orange transition-all duration-300 hover:-translate-y-1 group animate-fade-in flex flex-col h-full bg-background/60"
              style={{ animationDelay: `${(index % 10) * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {roadmapType === "role" ? <LayoutGrid className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                {r.desc}
              </p>
            </a>
          ))}
          {filteredRoadmaps.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl bg-background/30">
              No roadmaps found for "{roadmapSearchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 md:p-6 mt-8">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Student Journey
          </h2>
          <p className="text-muted-foreground mt-1">
            Track your academic milestones and achievements step by step
          </p>
        </div>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {/* Year Cards */}
          <div className="space-y-8">
            {years.map((year, index) => (
              <div
                key={year.year}
                className={`relative flex items-start gap-4 md:gap-8 animate-fade-in ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      year.completed
                        ? "bg-primary text-primary-foreground glow-orange"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {year.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "" : "md:mr-auto"}`}>
                  <div
                    onClick={() => setSelectedYear(year)}
                    className={`glass-card p-6 cursor-pointer transition-all hover:glow-orange ${
                      year.completed ? "border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-display font-bold gradient-text">
                        Year {year.year}
                      </span>
                      {year.completed && (
                        <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{year.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {year.subjects.length} subjects • {year.events.length} events • {year.certifications.length} certifications
                    </p>
                    <div className="flex gap-2 mt-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        {year.subjects.length}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        {year.achievements.length}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="w-4 h-4" />
                        {year.certifications.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year Detail Modal */}
      {selectedYear && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-4xl font-display font-bold gradient-text">
                    Year {selectedYear.year}
                  </span>
                  <h2 className="font-display font-bold text-xl mt-2">{selectedYear.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedYear(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subjects */}
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedYear.subjects.map((subject: string) => (
                    <span
                      key={subject}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  Events & Hackathons
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedYear.events.map((event: string) => (
                    <div key={event} className="glass-card p-3 text-sm">
                      {event}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-2">
                  {selectedYear.achievements.map((achievement: string) => (
                    <div
                      key={achievement}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-primary" />
                  NPTEL & Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedYear.certifications.map((cert: string) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm"
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
