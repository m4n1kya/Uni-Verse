import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Briefcase, TrendingUp, Code, DollarSign, Users, Star, X, BookOpen, ExternalLink, Youtube, FileText, Lightbulb, Search, ChevronLeft, ChevronRight, MessageSquare, Sparkles, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import cardCareer from "@/assets/card-career.jpg";
import { companiesData, Company } from "@/data/companies";

const placementStats = {
  totalOffers: 450,
  avgPackage: 12.5,
  highestPackage: 45,
  companiesVisited: 85,
};

const prepTypeConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  leetcode: { icon: Code, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", label: "LeetCode" },
  ambitionbox: { icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", label: "AmbitionBox" },
  article:  { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "Article" },
  youtube:  { icon: Youtube, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "YouTube" },
  guide:    { icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Guide" },
};

const Career = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [userGPA, setUserGPA] = useState(8.0);
  const [activeTab, setActiveTab] = useState<"overview" | "prep">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 8;

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  
  const displayedCompanies = useMemo(() => {
    if (showAll) return filteredCompanies;
    return filteredCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredCompanies, currentPage, showAll, itemsPerPage]);

  const groupedCompanies = useMemo(() => {
    const groups: Record<string, typeof displayedCompanies> = {};
    displayedCompanies.forEach(c => {
      (groups[c.category] = groups[c.category] || []).push(c);
    });
    return groups;
  }, [displayedCompanies]);

  const eligibleCount = filteredCompanies.filter(c => userGPA >= c.gpaCutoff).length;

  const handleSelect = (company: Company) => {
    setSelectedCompany(company);
    setActiveTab("overview");
  };

  return (
    <>
      <MainLayout>
        {/* Sleek Header */}
        <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
          <img src={cardCareer} alt="Career" className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium text-xs uppercase tracking-wider">Placement Cell</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Career & <span className="gradient-text">Placement Hub</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">Real-time placement statistics, company cutoffs & eligibility prediction</p>
          </div>
        </div>

        {/* Placement Stats Grid */}
        <div className="p-4 md:p-6 mt-2">
          <div className="sleek-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Placement Benchmark 2024–25
              </h2>
              <span className="glass-pill text-[10px] text-primary">Live Records</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-3 text-primary shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-3xl font-display font-bold text-foreground tracking-tight">{placementStats.totalOffers}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Total Offers Extended</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center group hover:border-secondary/30 transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/15 border border-secondary/25 flex items-center justify-center mb-3 text-secondary shadow-sm">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-3xl font-display font-bold text-secondary tracking-tight">{placementStats.avgPackage} LPA</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Average CTC</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center group hover:border-accent/30 transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center mb-3 text-accent shadow-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-3xl font-display font-bold text-accent tracking-tight">{placementStats.highestPackage} LPA</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Highest Package</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-3 text-primary shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-3xl font-display font-bold text-foreground tracking-tight">{placementStats.companiesVisited}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Recruiting Partners</p>
              </div>
            </div>
          </div>
        </div>

        {/* GPA Predictor */}
        <div className="px-4 md:px-6 pb-6">
          <div className="sleek-card p-6 md:p-7 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="font-display font-bold text-xl tracking-tight">Interactive Eligibility Predictor</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Adjust your CGPA to check real-time qualifying criteria across registered companies</p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 self-start md:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-foreground">
                  Eligible for <strong className="text-primary">{eligibleCount}</strong> / {filteredCompanies.length} companies
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0">Your CGPA:</label>
              <input
                type="range" min="5" max="10" step="0.1" value={userGPA}
                onChange={(e) => setUserGPA(parseFloat(e.target.value))}
                className="flex-1 accent-primary h-2 bg-muted/60 rounded-lg cursor-pointer"
              />
              <span className="font-display font-bold text-2xl text-primary w-14 text-right">{userGPA.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Company Navigation & Search */}
        <div className="px-4 md:px-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl tracking-tight">Recruiting Companies</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Click any company card to inspect interview tracks and prep resources</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
            <button
              onClick={() => { setShowAll(!showAll); setCurrentPage(1); }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer ${
                showAll ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-muted-foreground hover:text-foreground'
              }`}
            >
              {showAll ? "Paginated View" : "Show All"}
            </button>
          </div>
        </div>

        {/* Company Groups */}
        <div className="px-4 md:px-6 pb-8 space-y-8">
          {Object.entries(groupedCompanies).map(([category, comps]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full"></span>
                {category}
                <span className="text-xs text-muted-foreground font-normal">({comps.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {comps.map((company, index) => {
                  const isEligible = userGPA >= company.gpaCutoff;
                  return (
                    <div
                      key={company.id}
                      onClick={() => handleSelect(company)}
                      className={`sleek-card p-5 cursor-pointer transition-all duration-300 animate-fade-in group flex flex-col h-full hover:border-primary/40 ${
                        isEligible ? "hover:-translate-y-1.5" : "opacity-60"
                      }`}
                      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0`}>
                          {company.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{company.name}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold mt-1 inline-block ${
                            isEligible ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-destructive/15 text-destructive-foreground border border-destructive/40"
                          }`}>
                            {isEligible ? "Eligible" : `Need ${company.gpaCutoff} CGPA`}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-center mt-auto bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cutoff</p>
                          <p className="font-bold text-xs mt-0.5 font-mono">{company.gpaCutoff}</p>
                        </div>
                        <div className="border-l border-r border-white/5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg</p>
                          <p className="font-bold text-xs mt-0.5 text-emerald-400 font-mono">{company.avgLPA}L</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Max</p>
                          <p className="font-bold text-xs mt-0.5 text-primary font-mono">{company.highestLPA}L</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {Object.keys(groupedCompanies).length === 0 && (
            <div className="py-12 border border-dashed rounded-2xl border-white/10 bg-white/[0.01] text-center text-muted-foreground text-sm">
              No companies found matching "{searchQuery}".
            </div>
          )}

          {/* Pagination Controls */}
          {!showAll && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-1.5 font-medium bg-white/[0.02] px-4 py-1.5 rounded-xl border border-white/10 text-xs">
                <span>Page</span>
                <span className="text-primary font-bold">{currentPage}</span>
                <span className="text-muted-foreground">of {totalPages}</span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </MainLayout>

      {/* Modern Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-xl max-h-[85vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${selectedCompany.color} bg-opacity-10 border-b border-white/10 relative`}>
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedCompany.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                  {selectedCompany.logo}
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl tracking-tight">{selectedCompany.name}</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">CGPA Cutoff: <span className="text-foreground font-semibold font-mono">{selectedCompany.gpaCutoff}</span></p>
                </div>
              </div>

              {/* Package stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-black/30 rounded-xl p-3 text-center backdrop-blur-sm border border-white/5">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Average Package</p>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5 font-mono">{selectedCompany.avgLPA} LPA</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3 text-center backdrop-blur-sm border border-white/5">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Highest Package</p>
                  <p className="text-lg font-bold text-primary mt-0.5 font-mono">{selectedCompany.highestLPA} LPA</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.08]">
              {[
                { id: "overview", label: "Overview", icon: Star },
                { id: "prep", label: "Preparation Material", icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                      <Star className="w-3.5 h-3.5 text-primary" /> Technical Competencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-white/[0.03] rounded-lg text-xs font-medium border border-white/10 text-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                      <Code className="w-3.5 h-3.5 text-primary" /> Core DSA Assessment Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.dsaTopics.map((topic: string) => (
                        <span key={topic} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold border border-primary/20">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-2 rounded-xl text-xs h-10 font-semibold shadow-md shadow-primary/20"
                    size="lg"
                    onClick={() => setActiveTab("prep")}
                  >
                    View Curated Preparation Tracks →
                  </Button>
                </div>
              )}

              {activeTab === "prep" && (
                <div className="animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-4">
                    Recommended practice questions, experience reviews, and architecture guides for <strong className="text-foreground">{selectedCompany.name}</strong>
                  </p>
                  <div className="space-y-2.5">
                    {selectedCompany.prepMaterial.map((item: any, idx: number) => {
                      const cfg = prepTypeConfig[item.type];
                      const Icon = cfg.icon;
                      return (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${cfg.bg} hover:scale-[1.01] transition-all group`}
                        >
                          <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4 h-4 ${cfg.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">{item.label}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                              {cfg.label}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Career;
