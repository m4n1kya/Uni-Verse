import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { ContentRail } from "@/components/ui/ContentRail";
import { ContentCard } from "@/components/ui/ContentCard";
import {
  BookMarked,
  BusFront,
  Coffee,
  UsersRound,
  Map,
  Target,
  TrendingUp,
  Star,
  Clock,
  X,
  Zap,
  Shield,
  CheckCircle2,
  Radio,
  Sparkles,
  ArrowUpRight,
  Flame,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/dashboard-new.png";
import cardEbooks from "@/assets/card-ebooks.jpg";
import cardTransport from "@/assets/card-transport.jpg";
import cardFood from "@/assets/card-food-realistic.png";
import cardFaculty from "@/assets/card-faculty-realistic.png";
import cardJourney from "@/assets/card-journey.jpg";
import cardCareer from "@/assets/card-career.jpg";

const quickLinks = [
  { icon: BookMarked, label: "E-Books", desc: "Textbooks & GPA", path: "/ebooks", color: "from-emerald-400 to-teal-500", glow: "hover:shadow-emerald-500/20" },
  { icon: UsersRound, label: "Faculty", desc: "Cabins & Hours", path: "/faculty", color: "from-orange-400 to-red-500", glow: "hover:shadow-orange-500/20" },
  { icon: Coffee, label: "Food Court", desc: "Express Menus", path: "/food", color: "from-pink-400 to-rose-500", glow: "hover:shadow-pink-500/20" },
  { icon: BusFront, label: "Transport", desc: "Bus Telemetry", path: "/transport", color: "from-blue-400 to-indigo-500", glow: "hover:shadow-blue-500/20" },
  { icon: Map, label: "Journey", desc: "Roadmap Milestones", path: "/journey", color: "from-violet-400 to-purple-500", glow: "hover:shadow-violet-500/20" },
  { icon: Target, label: "Career", desc: "Placement Predictor", path: "/career", color: "from-amber-400 to-orange-500", glow: "hover:shadow-amber-500/20" },
];

const featuredModules = [
  { title: "E-Books & Academic Hub", subtitle: "Access study notes & CGPA engine", image: cardEbooks, path: "/ebooks", badge: "GPA Engine" },
  { title: "Faculty Directory", subtitle: "Connect with professors & book slots", image: cardFaculty, path: "/faculty", badge: "Verified" },
  { title: "Campus Food Court", subtitle: "Contactless order tokens & live menus", image: cardFood, path: "/food", badge: "Hot" },
  { title: "Transport Hub", subtitle: "GPS bus telemetry & stops tracking", image: cardTransport, path: "/transport", badge: "Live GPS" },
  { title: "Student Journey", subtitle: "Track four-year academic milestones", image: cardJourney, path: "/journey", badge: "Milestones" },
  { title: "Career Hub", subtitle: "Company cutoffs & eligibility prediction", image: cardCareer, path: "/career", badge: "Super Dream" },
];

const campusBriefs = [
  {
    tag: "Mobility Telemetry",
    title: "Route A Shuttle Approaching Main Gate",
    subtitle: "24 km/h GPS velocity • Next stop at Academic Block 1 in 3 mins.",
    cta: "Track Bus",
    path: "/transport",
    gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
    border: "hover:border-blue-500/40",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    icon: BusFront,
  },
  {
    tag: "Dining Special",
    title: "Today's Chef Specials Ready at Mayuri",
    subtitle: "Crispy Masala Dosa & Hot Filter Coffee available for express counter token issuance.",
    cta: "Order Now",
    path: "/food",
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
    border: "hover:border-amber-500/40",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    icon: Flame,
  },
  {
    tag: "Career Radar",
    title: "Microsoft & Tier-1 Recruitment Drive",
    subtitle: "85 recruiting partners visiting • Test your CGPA eligibility and view interview tracks.",
    cta: "Check Cutoffs",
    path: "/career",
    gradient: "from-purple-500/15 via-purple-500/5 to-transparent",
    border: "hover:border-purple-500/40",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    icon: Target,
  },
];

const trendingTopics = [
  { title: "Data Structures", subtitle: "Most studied this week", icon: TrendingUp, stat: "+45%" },
  { title: "DBMS Notes", subtitle: "Popular in CSE", icon: Star, stat: "4.8 ★" },
  { title: "Machine Learning", subtitle: "Trending course", icon: Clock, stat: "2h ago" },
  { title: "Web Development", subtitle: "Hot topic", icon: TrendingUp, stat: "+32%" },
];

const Index = () => {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <>
      <MainLayout>
        {/* Hero Banner */}
        <HeroBanner
          title="Welcome to Uni-Verse"
          subtitle="Your Academic Super-App"
          description="Access everything you need for university life in one place. Digital academic notes, live GPS bus telemetry, contactless food orders, faculty consultation booking, and career analytics."
          image={heroCampus}
          primaryAction={{ label: "Explore Hubs", onClick: () => navigate("/ebooks") }}
          secondaryAction={{ label: "Platform Overview", onClick: () => setShowLearnMore(true) }}
        />

        {/* Live Campus Pulse Interactive Strip */}
        <section className="px-4 md:px-6 -mt-6 relative z-20">
          <div className="sleek-card p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-background/85 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="status-dot-pulse">
                <span className="bg-emerald-400"></span>
                <span className="bg-emerald-500"></span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Live Campus Telemetry
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs">
              <button
                onClick={() => navigate("/transport")}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer"
              >
                <BusFront className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground">Shuttle:</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Route A in 3m
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
              </button>

              <div className="hidden sm:block w-px h-4 bg-white/10" />

              <button
                onClick={() => navigate("/food")}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground">Dining:</span>
                <span className="font-medium text-foreground group-hover:text-amber-400 transition-colors">
                  4 Outlets Open
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
              </button>

              <div className="hidden sm:block w-px h-4 bg-white/10" />

              <button
                onClick={() => navigate("/ebooks")}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer"
              >
                <BookMarked className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-muted-foreground">Library:</span>
                <span className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                  240+ Seats Ready
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-50 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </section>

        {/* Quick Access Module Hub */}
        <section className="py-10 px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">Quick Portals</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Instant access to unified university services</p>
            </div>
            <span className="glass-pill text-[10px] text-primary font-semibold">6 Services Online</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {quickLinks.map((link, i) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`sleek-card p-4 flex flex-col items-center text-center gap-2.5 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer ${link.glow} animate-slide-up-fade opacity-0 border border-white/5 hover:border-white/20`}
                style={{ animationFillMode: "forwards", animationDelay: `${i * 0.06}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 text-white`}>
                  <link.icon className="w-6 h-6 drop-shadow-sm" />
                </div>
                <div>
                  <span className="text-xs md:text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors block">
                    {link.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-normal block mt-0.5">
                    {link.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Campus Highlights Cards */}
        <section className="px-4 md:px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Live Campus Briefing
            </h2>
            <span className="text-xs text-muted-foreground font-medium">Real-time Dispatch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campusBriefs.map((brief, i) => (
              <div
                key={i}
                onClick={() => navigate(brief.path)}
                className={`sleek-card p-5 bg-gradient-to-br ${brief.gradient} border border-white/10 ${brief.border} cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${brief.badgeColor}`}>
                      {brief.tag}
                    </span>
                    <brief.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                    {brief.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {brief.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{brief.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Modules Horizontal Rail */}
        <ContentRail title="Featured Uni-Verse Hubs" subtitle="Swipe through dedicated interactive tools">
          {featuredModules.map((module) => (
            <ContentCard
              key={module.path}
              title={module.title}
              subtitle={module.subtitle}
              image={module.image}
              badge={module.badge}
              onClick={() => navigate(module.path)}
              className="w-48 md:w-56"
            />
          ))}
        </ContentRail>

        {/* Trending Topics Grid */}
        <section className="py-10 px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl tracking-tight">Trending Across Campus</h2>
            <span className="text-xs text-muted-foreground font-medium">Active Peer Activity</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingTopics.map((topic, i) => (
              <div
                key={topic.title}
                className="sleek-card p-4 flex items-center gap-3.5 cursor-pointer hover:border-primary/40 transition-all duration-300 group animate-slide-up-fade opacity-0 border border-white/5"
                style={{ animationFillMode: "forwards", animationDelay: `${(i + 4) * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <topic.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{topic.subtitle}</p>
                </div>
                <span className="glass-pill text-[11px] font-semibold text-primary shrink-0">{topic.stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Scale & Impact Metrics */}
        <section className="py-8 px-4 md:px-6 mb-16">
          <div className="sleek-card p-8 md:p-12 relative overflow-hidden border border-white/10 bg-gradient-to-b from-card/90 via-card/60 to-card/40 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-center">
                Uni-Verse System Scale & Impact
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {[
                { label: "Academic Textbooks", value: "500+", color: "text-primary" },
                { label: "Faculty Directory", value: "120+", color: "text-secondary" },
                { label: "Curriculum Subjects", value: "80+", color: "text-accent" },
                { label: "Placement Partners", value: "85+", color: "text-emerald-400" },
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="text-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-all animate-slide-up-fade opacity-0 group" 
                  style={{ animationFillMode: "forwards", animationDelay: `${(i + 2) * 0.08}s` }}
                >
                  <p className={`font-display font-bold text-3xl md:text-5xl ${stat.color} tracking-tight group-hover:scale-105 transition-transform duration-300`}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>

      {/* Learn More Modal */}
      {showLearnMore && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl gradient-text">About Uni-Verse</h2>
                  <p className="text-muted-foreground mt-1 text-sm">Unified Campus Living & Learning Operating System</p>
                </div>
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-foreground/90">
                  <p>
                    Uni-Verse eliminates the friction of university life by orchestrating multiple disparate portals—transit tracking, library inventory, academic course notes, food court ordering, and placement statistics—into a unified, real-time super-app.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { icon: Zap, title: "Sub-Second Speed", desc: "Vite 5 bundle code-splitting and edge-cached asset distribution.", color: "text-accent" },
                    { icon: Shield, title: "Telemetry Synced", desc: "Live bus GPS waypoints, order token issuance, and cabin locators.", color: "text-primary" },
                    { icon: CheckCircle2, title: "Complete Lifecycle", desc: "4-year degree milestone tracking and recruitment analytics.", color: "text-emerald-400" },
                  ].map((feature, i) => (
                    <div key={i} className="sleek-card p-4 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors border border-white/5">
                      <feature.icon className={`w-7 h-7 ${feature.color} mb-3`} />
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="sleek-card p-5 bg-gradient-to-br from-primary/10 via-transparent to-transparent mt-6 border-primary/20">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Student-Centric Engineering
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Designed with high-contrast `:focus-visible` accessibility, dark-mode glassmorphic aesthetics, and resilient offline local storage persistence.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button size="lg" className="rounded-xl px-6 text-xs h-10 font-semibold" onClick={() => setShowLearnMore(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
