import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { ContentRail } from "@/components/ui/ContentRail";
import { ContentCard } from "@/components/ui/ContentCard";
import { BookMarked, BusFront, Coffee, UsersRound, Map, Target, TrendingUp, Star, Clock, X, Zap, Shield, CheckCircle2, Radio, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/dashboard-new.png";
import cardEbooks from "@/assets/card-ebooks.jpg";
import cardTransport from "@/assets/card-transport.jpg";
import cardFood from "@/assets/card-food-realistic.png";
import cardFaculty from "@/assets/card-faculty-realistic.png";
import cardJourney from "@/assets/card-journey.jpg";
import cardCareer from "@/assets/card-career.jpg";

const quickLinks = [
  { icon: BookMarked, label: "E-Books", path: "/ebooks", color: "from-emerald-400 to-teal-500", glow: "hover:shadow-emerald-500/20" },
  { icon: UsersRound, label: "Faculty", path: "/faculty", color: "from-orange-400 to-red-500", glow: "hover:shadow-orange-500/20" },
  { icon: Coffee, label: "Food", path: "/food", color: "from-pink-400 to-rose-500", glow: "hover:shadow-pink-500/20" },
  { icon: BusFront, label: "Transport", path: "/transport", color: "from-blue-400 to-indigo-500", glow: "hover:shadow-blue-500/20" },
  { icon: Map, label: "Journey", path: "/journey", color: "from-violet-400 to-purple-500", glow: "hover:shadow-violet-500/20" },
  { icon: Target, label: "Career", path: "/career", color: "from-amber-400 to-orange-500", glow: "hover:shadow-amber-500/20" },
];

const featuredModules = [
  { title: "E-Books & Academic Hub", subtitle: "Access your study materials", image: cardEbooks, path: "/ebooks", badge: "New" },
  { title: "Faculty Directory", subtitle: "Connect with professors", image: cardFaculty, path: "/faculty" },
  { title: "Campus Food Court", subtitle: "Today's specials from vendors", image: cardFood, path: "/food", badge: "Hot" },
  { title: "Transport Hub", subtitle: "Bus schedules & cab booking", image: cardTransport, path: "/transport" },
  { title: "Student Journey", subtitle: "Track your academic milestones", image: cardJourney, path: "/journey" },
  { title: "Career Hub", subtitle: "Placement predictor & analytics", image: cardCareer, path: "/career" },
];

const trendingTopics = [
  { title: "Data Structures", subtitle: "Most studied this week", icon: TrendingUp, stat: "+45%" },
  { title: "DBMS Notes", subtitle: "Popular in CSE", icon: Star, stat: "4.8★" },
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
          subtitle="Your Academic Companion"
          description="Access everything you need for university life in one place. E-books, transport, food, faculty contacts, and career guidance."
          image={heroCampus}
          primaryAction={{ label: "Explore", onClick: () => navigate("/ebooks") }}
          secondaryAction={{ label: "Learn More", onClick: () => setShowLearnMore(true) }}
        />

        {/* Live Campus Pulse Strip */}
        <section className="px-4 md:px-6 -mt-6 relative z-20">
          <div className="sleek-card p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-background/80 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="status-dot-pulse">
                <span className="bg-emerald-400"></span>
                <span className="bg-emerald-500"></span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Live Campus Pulse
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs">
              <div className="flex items-center gap-2">
                <BusFront className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Shuttle:</span>
                <span className="font-medium text-foreground">Route A arriving in 3m</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span className="text-muted-foreground">Dining:</span>
                <span className="font-medium text-foreground">Mayuri & Bistro Open</span>
              </div>
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span className="text-muted-foreground">Library:</span>
                <span className="font-medium text-foreground">240+ seats available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl tracking-tight">Quick Access</h2>
            <span className="text-xs text-muted-foreground font-medium">6 modules ready</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {quickLinks.map((link, i) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`sleek-card p-4 md:p-5 flex flex-col items-center gap-3 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer ${link.glow} animate-slide-up-fade opacity-0`}
                style={{ animationFillMode: "forwards", animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <link.icon className="w-6 h-6 text-foreground drop-shadow-sm" />
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Modules */}
        <ContentRail title="Explore UniVerse" subtitle="Discover all campus features">
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

        {/* Trending Topics */}
        <section className="py-12 px-4 md:px-6">
          <h2 className="font-display font-bold text-2xl tracking-tight mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingTopics.map((topic, i) => (
              <div
                key={topic.title}
                className="sleek-card p-4 flex items-center gap-3.5 cursor-pointer hover:border-primary/40 transition-all duration-300 group animate-slide-up-fade opacity-0"
                style={{ animationFillMode: "forwards", animationDelay: `${(i + 4) * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <topic.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{topic.subtitle}</p>
                </div>
                <span className="glass-pill text-[11px] font-semibold text-primary">{topic.stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 md:px-6 mb-16">
          <div className="sleek-card p-8 md:p-12 relative overflow-hidden border border-white/10 bg-gradient-to-b from-card/80 to-card/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-2xl tracking-tight text-center">UniVerse Impact & Scale</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {[
                { label: "Academic E-Books", value: "500+", color: "text-primary" },
                { label: "Faculty Directory", value: "120+", color: "text-secondary" },
                { label: "Curriculum Subjects", value: "80+", color: "text-accent" },
                { label: "Partner Companies", value: "50+", color: "text-primary/90" },
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-slide-up-fade opacity-0" 
                  style={{ animationFillMode: "forwards", animationDelay: `${(i + 2) * 0.08}s` }}
                >
                  <p className={`font-display font-bold text-3xl md:text-4xl ${stat.color} tracking-tight`}>
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
          <div className="sleek-card w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl gradient-text">About Uni-Verse</h2>
                  <p className="text-muted-foreground mt-1 text-sm">Reimagining the University Experience</p>
                </div>
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-base leading-relaxed text-foreground/90">
                    Uni-Verse was born from a simple observation: student life is fragmented. Between checking bus schedules, finding library books, looking up faculty contacts, and figuring out what's for lunch, students waste valuable time navigating specific, disconnected systems.
                  </p>
                  <p className="text-base leading-relaxed mt-4 text-foreground/90">
                    We built Uni-Verse to be your <strong>Academic Super-App</strong>—a single, sleek interface that brings everything you need onto one screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Zap, title: "Fast & Fluid", desc: "No more clunky portals. Sub-second response times.", color: "text-accent" },
                    { icon: Shield, title: "Reliable", desc: "Real-time data synced directly with campus systems.", color: "text-primary" },
                    { icon: CheckCircle2, title: "All-in-One", desc: "Academics, Dining, Transit & Placement unified.", color: "text-secondary" },
                  ].map((feature, i) => (
                    <div key={i} className="sleek-card p-4 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors border border-white/5">
                      <feature.icon className={`w-7 h-7 ${feature.color} mb-3`} />
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="sleek-card p-6 bg-gradient-to-br from-primary/10 via-transparent to-transparent mt-6 border-primary/20">
                  <h3 className="font-semibold text-base mb-1.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Why we made it
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To empower students with technology that feels as modern and responsive as the best software in the world. We believe university tools should be intuitive, beautiful, and delightful to use everyday.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button size="lg" className="rounded-xl px-6" onClick={() => setShowLearnMore(false)}>
                  Got it!
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
