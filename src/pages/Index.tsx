import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/ui/HeroBanner";
import { ContentRail } from "@/components/ui/ContentRail";
import { ContentCard } from "@/components/ui/ContentCard";
import { BookMarked, BusFront, Coffee, UsersRound, Map, Target, TrendingUp, Star, Clock, X, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCampus from "@/assets/dashboard-new.png";
import cardEbooks from "@/assets/card-ebooks.jpg";
import cardTransport from "@/assets/card-transport.jpg";
import cardFood from "@/assets/card-food-realistic.png";
import cardFaculty from "@/assets/card-faculty-realistic.png";
import cardJourney from "@/assets/card-journey.jpg";
import cardCareer from "@/assets/card-career.jpg";

const quickLinks = [
  { icon: BookMarked, label: "E-Books", path: "/ebooks", color: "from-emerald-400 to-teal-500" },
  { icon: UsersRound, label: "Faculty", path: "/faculty", color: "from-orange-400 to-red-500" },
  { icon: Coffee, label: "Food", path: "/food", color: "from-pink-400 to-rose-500" },
  { icon: BusFront, label: "Transport", path: "/transport", color: "from-blue-400 to-indigo-500" },
  { icon: Map, label: "Journey", path: "/journey", color: "from-violet-400 to-purple-500" },
  { icon: Target, label: "Career", path: "/career", color: "from-amber-400 to-orange-500" },
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

        {/* Quick Links */}
        <section className="py-16 px-4 md:px-6">
          <h2 className="font-display font-bold text-2xl mb-8">Quick Access</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickLinks.map((link, i) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="glass-card p-4 flex flex-col items-center gap-2 hover:-translate-y-1 transition-all duration-300 animate-slide-up-fade opacity-0"
                style={{ animationFillMode: "forwards", animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center`}>
                  <link.icon className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Modules */}
        <ContentRail title="Explore UniVerse" subtitle="Discover all features">
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
        <section className="py-16 px-4 md:px-6">
          <h2 className="font-display font-bold text-2xl mb-8">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingTopics.map((topic, i) => (
              <div
                key={topic.title}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:glow-primary transition-all duration-300 animate-slide-up-fade opacity-0"
                style={{ animationFillMode: "forwards", animationDelay: `${(i + 4) * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <topic.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{topic.subtitle}</p>
                </div>
                <span className="text-xs font-medium text-primary">{topic.stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-6 mb-16">
          <div className="glass-card p-10 md:p-14">
            <h2 className="font-display font-bold text-xl mb-6 text-center">UniVerse Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "E-Books", value: "500+", color: "text-primary" },
                { label: "Faculty", value: "120+", color: "text-secondary" },
                { label: "Subjects", value: "80+", color: "text-accent" },
                { label: "Companies", value: "50+", color: "text-primary/80" },
              ].map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="text-center animate-slide-up-fade opacity-0" 
                  style={{ animationFillMode: "forwards", animationDelay: `${(i + 2) * 0.1}s` }}
                >
                  <p className={`font-display font-bold text-3xl md:text-4xl ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>

      {/* Learn More Modal */}
      {showLearnMore && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl gradient-text">About Uni-Verse</h2>
                  <p className="text-muted-foreground mt-1">Reimagining the University Experience</p>
                </div>
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    Uni-Verse was born from a simple observation: student life is fragmented. Between checking bus schedules, finding library books, looking up faculty contacts, and figuring out what's for lunch, students waste valuable time navigating specific, disconnected systems.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    We built Uni-Verse to be your <strong>Academic Super-App</strong>—a single, beautiful interface that brings everything you need onto one screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Zap, title: "Fast & Fluid", desc: "No more clunky portals. Experience speed.", color: "text-accent" },
                    { icon: Shield, title: "Reliable", desc: "Real-time data you can trust everyday.", color: "text-primary" },
                    { icon: CheckCircle2, title: "All-in-One", desc: "Academics, Food, Travel. Unified.", color: "text-secondary" },
                  ].map((feature, i) => (
                    <div key={i} className="glass-card p-4 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                      <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent mt-6 border-primary/20">
                  <h3 className="font-semibold text-lg mb-2">Why we made it?</h3>
                  <p className="text-muted-foreground">
                    To empower students with technology that feels as modern as the rest of their lives. We believe your university tools should be as intuitive and delightful to use as your favorite social media apps.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={() => setShowLearnMore(false)}>
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
