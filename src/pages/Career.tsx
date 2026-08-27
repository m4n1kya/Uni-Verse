import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Briefcase, TrendingUp, Code, DollarSign, Users, Star, X, BookOpen, ExternalLink, Youtube, FileText, Lightbulb, Search, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
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
        {/* Header */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src={cardCareer} alt="Career" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="font-display font-bold text-3xl md:text-4xl">
              Career & <span className="gradient-text">Placement Hub</span>
            </h1>
            <p className="text-muted-foreground mt-1">Predict your placement success</p>
          </div>
        </div>

        {/* Placement Stats */}
        <div className="p-4 md:p-6">
          <div className="glass-card p-6">
            <h2 className="font-display font-bold text-xl mb-6">Placement Statistics 2024</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <p className="text-3xl font-display font-bold text-primary">{placementStats.totalOffers}</p>
                <p className="text-sm text-muted-foreground">Total Offers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                  <DollarSign className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-3xl font-display font-bold text-secondary">{placementStats.avgPackage}L</p>
                <p className="text-sm text-muted-foreground">Avg Package</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <p className="text-3xl font-display font-bold text-accent">{placementStats.highestPackage}L</p>
                <p className="text-sm text-muted-foreground">Highest Package</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                  <Briefcase className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-3xl font-display font-bold text-secondary">{placementStats.companiesVisited}</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </div>
        </div>

        {/* GPA Predictor */}
        <div className="px-4 md:px-6 pb-6">
          <div className="glass-card p-6">
            <h2 className="font-display font-bold text-xl mb-4">Placement Predictor</h2>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm text-muted-foreground">Your CGPA:</label>
              <input
                type="range" min="5" max="10" step="0.1" value={userGPA}
                onChange={(e) => setUserGPA(parseFloat(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="font-bold text-xl text-primary w-12">{userGPA.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You're eligible for <span className="text-primary font-bold">{eligibleCount}</span> out of {filteredCompanies.length} companies
            </p>
          </div>
        </div>

        {/* Company Navigation & Search */}
        <div className="px-4 md:px-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="font-display font-bold text-xl">Recruiting Companies</h2>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-background/50 border border-border rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => { setShowAll(!showAll); setCurrentPage(1); }}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors shrink-0 ${
                showAll ? 'bg-primary text-primary-foreground border-primary glow-primary' : 'bg-muted/50 border-border hover:bg-muted text-muted-foreground'
              }`}
            >
              {showAll ? "Show Paginated" : "Show All"}
            </button>
          </div>
        </div>

        {/* Company Groups */}
        <div className="px-4 md:px-6 pb-6 space-y-8">
          {Object.entries(groupedCompanies).map(([category, comps]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
                <span className="w-1.5 h-5 bg-primary rounded-full"></span>
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {comps.map((company, index) => {
                  const isEligible = userGPA >= company.gpaCutoff;
                  return (
                    <div
                      key={company.id}
                      onClick={() => handleSelect(company)}
                      className={`glass-card p-5 cursor-pointer transition-all duration-300 animate-fade-in group flex flex-col h-full ${
                        isEligible ? "hover:glow-primary hover:-translate-y-1" : "opacity-50"
                      }`}
                      style={{ animationDelay: `${(index % 10) * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-lg font-bold text-white shadow-sm shrink-0`}>
                          {company.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">{company.name}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            isEligible ? "bg-secondary/15 text-secondary border border-secondary/20" : "bg-destructive/15 text-destructive-foreground border border-destructive/50"
                          }`}>
                            {isEligible ? "Eligible" : `Need ${company.gpaCutoff} CGPA`}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center mt-auto bg-muted/30 p-2 rounded-xl border border-white/5">
                        <div className="py-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Cutoff</p>
                          <p className="font-bold text-sm mt-0.5">{company.gpaCutoff}</p>
                        </div>
                        <div className="py-1 border-l border-r border-white/5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg</p>
                          <p className="font-bold text-sm mt-0.5 text-green-400">{company.avgLPA}L</p>
                        </div>
                        <div className="py-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Max</p>
                          <p className="font-bold text-sm mt-0.5 text-primary">{company.highestLPA}L</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {Object.keys(groupedCompanies).length === 0 && (
            <div className="py-12 border border-dashed rounded-xl border-border bg-muted/10 text-center text-muted-foreground">
              No companies found matching "{searchQuery}".
            </div>
          )}

          {/* Pagination Controls */}
          {!showAll && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1 font-medium bg-muted/50 px-4 py-2 rounded-xl border border-border text-sm">
                <span>Page</span>
                <span className="text-primary font-bold">{currentPage}</span>
                <span className="text-muted-foreground">of {totalPages}</span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </MainLayout>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-xl max-h-[85vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${selectedCompany.color} bg-opacity-10 border-b border-white/5 relative`}>
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedCompany.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                  {selectedCompany.logo}
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl">{selectedCompany.name}</h2>
                  <p className="text-muted-foreground text-sm">CGPA Cutoff: <span className="text-foreground font-semibold">{selectedCompany.gpaCutoff}</span></p>
                </div>
              </div>

              {/* Package stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-black/20 rounded-xl p-3 text-center backdrop-blur-sm">
                  <p className="text-xs text-muted-foreground">Average Package</p>
                  <p className="text-xl font-bold text-green-400 mt-0.5">{selectedCompany.avgLPA} LPA</p>
                </div>
                <div className="bg-black/20 rounded-xl p-3 text-center backdrop-blur-sm">
                  <p className="text-xs text-muted-foreground">Highest Package</p>
                  <p className="text-xl font-bold text-primary mt-0.5">{selectedCompany.highestLPA} LPA</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {[
                { id: "overview", label: "Overview", icon: Star },
                { id: "prep", label: "Preparation Material", icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
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
                  {/* Required Skills */}
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                      <Star className="w-4 h-4 text-primary" /> Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DSA Topics */}
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                      <Code className="w-4 h-4 text-primary" /> Key DSA Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.dsaTopics.map((topic: string) => (
                        <span key={topic} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-2"
                    size="lg"
                    onClick={() => setActiveTab("prep")}
                  >
                    View Preparation Material →
                  </Button>
                </div>
              )}

              {activeTab === "prep" && (
                <div className="animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-4">
                    Curated resources to help you crack <span className="text-foreground font-semibold">{selectedCompany.name}</span>
                  </p>
                  <div className="space-y-3">
                    {selectedCompany.prepMaterial.map((item: any, idx: number) => {
                      const cfg = prepTypeConfig[item.type];
                      const Icon = cfg.icon;
                      return (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-4 p-4 rounded-xl border ${cfg.bg} hover:scale-[1.01] transition-all duration-200 group`}
                        >
                          <div className={`w-10 h-10 rounded-lg ${cfg.bg} border ${cfg.bg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-5 h-5 ${cfg.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{item.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
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
