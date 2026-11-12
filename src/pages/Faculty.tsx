import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Mail, MapPin, BookOpen, X, Sparkles, Star, Users, Phone, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cardFaculty from "@/assets/card-faculty-realistic.png";

const departments = ["All", "BAI", "BCE", "SASL", "SCAI", "SCSE", "VITBS", "SMEC", "SEEE", "Architecture", "Bioscience", "BCG", "BHI"];

const facultyMembers = [
  { id: 1, name: "Dr. J. Sharmila Joseph", department: "BCE", cabin: "AB2 416", email: "sharmila.joseph@vitbhopal.ac.in", specialization: "Teaching Fellow", rating: 4.9 },
  { id: 2, name: "Dr. Abhinav Kumar", department: "SASL", cabin: "AB1 A408", email: "abhinavkumar@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.8 },
  { id: 3, name: "Dr. Mamta Agrawal", department: "SASL", cabin: "AB1 A201", email: "mamta.agrawal@vitbhopal.ac.in", specialization: "Associate Professor Grade 1", rating: 4.7 },
  { id: 4, name: "Dr. Saurabh Bhargava", department: "SASL", cabin: "AB1 B 401", email: "saurabhbhargava@vitbhopal.ac.in", specialization: "Assistant Professor Grade 1", rating: 4.6 },
  { id: 5, name: "Dr. Chandan Kumar Behera", department: "BCE", cabin: "AB2 - S-215", email: "chandank.behera@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.5 },
  { id: 6, name: "Dr. M. Suresh", department: "BCG", cabin: "AB2 - S-201", email: "suresh.m@vitbhopal.ac.in", specialization: "Senior Teaching Fellow", rating: 4.8 },
  { id: 7, name: "Dr. Shweta Saxena", department: "BHI", cabin: "AB2 - S-206", email: "shweta.saxena@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.6 },
  { id: 8, name: "Dr. Tauseef Qamar", department: "SASL", cabin: "N/A", email: "tauseefqamar@vitbhopal.ac.in", specialization: "Assistant Professor Grade 1", rating: 4.7 },
  { id: 101, name: "Dr. G. PRABU KANNA", specialization: "Assistant Professor Senior Grade 2", department: "BAI", cabin: "AB2 - G-16", email: "prabukanna.g@vitbhopal.ac.in", rating: 4.8 },
  { id: 102, name: "Dr. SANTOSH KUMAR", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "N/A", email: "santoshkumarsahoo@vitbhopal.ac.in", rating: 4.5 },
  { id: 103, name: "Dr. D. LAKSHMI", specialization: "Associate professor Senior Grade 2", department: "BAI", cabin: "AB2 - F-122", email: "lakshmi.d@vitbhopal.ac.in", rating: 4.9 },
  { id: 104, name: "Dr. G.R. HEMALAKSHMI", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "N/A", email: "hemalakshmi@vitbhopal.ac.in", rating: 4.7 },
  { id: 105, name: "Dr. ABHISHEKH", specialization: "Assistant Professor Grade 2", department: "SASL", cabin: "N/A", email: "abhishek@vitbhopal.ac.in", rating: 4.7 },
  { id: 106, name: "Mrs. LAKSHMI", specialization: "Student Councillor", department: "SASL", cabin: "N/A", email: "lakshmi.prabha@vitbhopal.ac.in", rating: 4.8 },
  { id: 107, name: "Dr. ABHISHEK KUMAR SHUKLA", specialization: "Assistant Professor Grade 2", department: "SCAI", cabin: "AB2 - G-11", email: "abhishekkumarshukla@vitbhopal.ac.in", rating: 4.6 },
  { id: 108, name: "Dr. ABHISHEK RAJ", specialization: "Assistant Professor Grade 2", department: "VITBS", cabin: "N/A", email: "abhishekraj@vitbhopal.ac.in", rating: 4.5 },
  { id: 109, name: "Dr. ABHISHEK SHRIVASTAVA", specialization: "Assistant Professor Grade 1", department: "SMEC", cabin: "N/A", email: "abhishek.shrivastava@vitbhopal.ac.in", rating: 4.8 },
  { id: 110, name: "Dr. KUMAR ABHISHEK", specialization: "Assistant Professor Senior Grade 2", department: "SASL", cabin: "N/A", email: "kumar@vitbhopal.ac.in", rating: 4.7 },
  { id: 111, name: "Dr. KANNAIYA RAJA N", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "N/A", email: "kannaiyaraja@vitbhopal.ac.in", rating: 4.9 },
  { id: 112, name: "Dr. KANNAN S", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "N/A", email: "kannanshanmugam@vitbhopal.ac.in", rating: 4.6 },
  { id: 113, name: "Mr. KANNAN", specialization: "Assistant Professor Senior", department: "BCE", cabin: "N/A", email: "kannanshanmugam@vitbhopal.ac.in", rating: 4.5 },
  { id: 114, name: "Dr. ACHU GOVIND K.R", specialization: "Assistant Professor Grade 2", department: "SEEE", cabin: "N/A", email: "achugovind@vitbhopal.ac.in", rating: 4.7 },
  { id: 115, name: "Dr. ABDUR RAHMAN M S", specialization: "Assistant Professor", department: "SASL", cabin: "N/A", email: "abdur.rahman@vitbhopal.ac.in", rating: 4.8 },
  { id: 116, name: "Dr. BUBAI MANNA", specialization: "Assistant Professor Grade 1", department: "BCE", cabin: "N/A", email: "bubaimanna@vitbhopal.ac.in", rating: 4.6 },
  { id: 117, name: "Dr. HARIHARASITARAMAN S", specialization: "Associate Professor Grade 1", department: "SCAI", cabin: "N/A", email: "hariharasitaraman.s@vitbhopal.ac.in", rating: 4.9 },
  { id: 118, name: "Dr. HEMANTA KALITA", specialization: "Assistant Professor Grade 2", department: "SASL", cabin: "N/A", email: "hemantakalita@vitbhopal.ac.in", rating: 4.7 },
  { id: 119, name: "Dr. HEMANT KUMAR NASHINE", specialization: "Professor Grade 2", department: "SASL", cabin: "N/A", email: "hemantkumar.nashine@vitbhopal.ac.in", rating: 4.9 },
  { id: 120, name: "Dr. J. MANIKANDAN", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "N/A", email: "manikandan.j@vitbhopal.ac.in", rating: 4.6 },
  { id: 121, name: "Mr. KHAN USAMA AZIZURREHMAN", specialization: "Assistant Professor Grade 1", department: "Architecture", cabin: "N/A", email: "usamaazizurrehmankhan@vitbhopal.ac.in", rating: 4.5 },
  { id: 122, name: "Mr. MANIKANDAN S P", specialization: "Teaching Fellow", department: "SEEE", cabin: "N/A", email: "manikandan.s.p@vitbhopal.ac.in", rating: 4.8 },
  { id: 123, name: "Mr. GOVIND PRASAD", specialization: "Teaching Fellow", department: "SEEE", cabin: "N/A", email: "govind.pandiya2020@vitbhopal.ac.in", rating: 4.6 },
  { id: 124, name: "Dr. VINESH KUMAR", specialization: "Assistant Professor Senior Grade 2", department: "SCAI", cabin: "AB2 - G-05", email: "vinesh.kumar@vitbhopal.ac.in", rating: 4.7 },
  { id: 125, name: "Dr. VINOD BHATT", specialization: "Associate professor Senior Grade 1", department: "SASL", cabin: "N/A", email: "vinod.bhatt@vitbhopal.ac.in", rating: 4.9 },
  { id: 126, name: "Dr. VINOD KUMAR JATAV", specialization: "Assistant Professor Grade 1", department: "SASL", cabin: "N/A", email: "vinodkumarjatav@vitbhopal.ac.in", rating: 4.5 },
  { id: 127, name: "Mr. DEVRAJ VISHNU", specialization: "Assistant Professor Junior", department: "SCAI", cabin: "AB2 - F-108", email: "devrajvishnu@vitbhopal.ac.in", rating: 4.6 },
  { id: 128, name: "Dr. G. VISHNUVARTHANAN", specialization: "Associate professor Senior Grade 1", department: "SCAI", cabin: "N/A", email: "vishnuvarthanan@vitbhopal.ac.in", rating: 4.8 },
  { id: 129, name: "Dr. HARSHLATA VISHWAKARMA", specialization: "Assistant Professor Grade 1", department: "SCAI", cabin: "AB2 - F-105", email: "harshlatavishwakarma@vitbhopal.ac.in", rating: 4.7 },
  { id: 130, name: "Dr. ABDUL RAHMAN", specialization: "Associate Professor Grade 2", department: "SCAI", cabin: "AB2 - F-113", email: "abdulrahman@vitbhopal.ac.in", rating: 4.9 },
  { id: 131, name: "Dr. MANISHA JAIN", specialization: "Associate professor Senior Grade 1", department: "SASL", cabin: "N/A", email: "manisha.jain@vitbhopal.ac.in", rating: 4.8 },
  { id: 132, name: "Dr. MANISHA SINGH", specialization: "Assistant Professor Senior Grade 1", department: "VITBS", cabin: "N/A", email: "manisha.singh@vitbhopal.ac.in", rating: 4.6 },
  { id: 133, name: "Dr. S. ANANTHAKUMARAN", specialization: "Associate professor Senior Grade 1", department: "BCE", cabin: "N/A", email: "ananthakumaran@vitbhopal.ac.in", rating: 4.9 },
  { id: 134, name: "Dr. JASTIN SAMUEL R", specialization: "Assistant Professor Senior Grade 1", department: "Bioscience", cabin: "N/A", email: "jastinsamuel@vitbhopal.ac.in", rating: 4.7 },
  { id: 135, name: "Dr. AJEET SINGH", specialization: "Assistant Professor Grade 1", department: "BCE", cabin: "N/A", email: "ajeetsingh@vitbhopal.ac.in", rating: 4.5 },
  { id: 136, name: "Dr. PALAS MANDAL", specialization: "Assistant Professor Grade 2", department: "SASL", cabin: "N/A", email: "palasmandal@vitbhopal.ac.in", rating: 4.8 },
  { id: 137, name: "Dr. SASMITA PADHY", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "N/A", email: "sasmita.padhy@vitbhopal.ac.in", rating: 4.7 },
  { id: 138, name: "Dr. MANOJ ACHARYA", specialization: "Assistant Professor Senior Grade 2", department: "SASL", cabin: "N/A", email: "manoj.acharya@vitbhopal.ac.in", rating: 4.6 },
  { id: 139, name: "Dr. Manoj Kumar", specialization: "Assistant Professor Grade 2", department: "BAI", cabin: "N/A", email: "manojkumar@vitbhopal.ac.in", rating: 4.7 },
  { id: 140, name: "Ms. Manorma Chouhan", specialization: "Teaching Fellow", department: "BCE", cabin: "AB2 - F-102", email: "manormachouhan@vitbhopal.ac.in", rating: 4.5 },
  { id: 141, name: "Dr. Preetam Suman", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "N/A", email: "preetam.suman@vitbhopal.ac.in", rating: 4.8 },
  { id: 142, name: "Dr. I. Jasmine Selvakumari Jeya", specialization: "Associate Professor Senior Grade 2", department: "BCE", cabin: "N/A", email: "jasmineselvakumarijeya@vitbhopal.ac.in", rating: 4.7 },
  { id: 143, name: "Dr. Amrita Parashar", specialization: "Assistant Professor", department: "SCAI", cabin: "AB2 - F-110", email: "amritaparashar@vitbhopal.ac.in", rating: 4.8 },
  { id: 144, name: "Dr. Bhakti Parashar", specialization: "Assistant Professor Senior Grade 2", department: "VITBS", cabin: "N/A", email: "bhakti.parashar@vitbhopal.ac.in", rating: 4.6 },
  { id: 145, name: "Dr. Paras Jain", specialization: "Associate Professor Grade 2", department: "SCAI", cabin: "AB2 - G-22", email: "paras.jain@vitbhopal.ac.in", rating: 4.9 },
  { id: 146, name: "Dr. Shagun Sharma", specialization: "Assistant Professor Grade 1", department: "SCSE", cabin: "N/A", email: "shagunsharma@vitbhopal.ac.in", rating: 4.8 },
];

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || faculty.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <>
      <MainLayout>
        {/* Sleek Header */}
        <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
          <img src={cardFaculty} alt="Faculty" className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium text-xs uppercase tracking-wider">Academic Directory</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Faculty <span className="gradient-text">Directory</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">Direct cabin allocations, research specializations & student consultation hours</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 md:p-6 space-y-4 border-b border-white/[0.06]">
          {/* Sleek Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search faculty by professor name or research domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 h-12 text-sm bg-white/[0.03] border-white/10 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  selectedDept === dept
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-105"
                    : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="p-4 md:p-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground font-medium">
              Showing <strong className="text-foreground">{filteredFaculty.length}</strong> professors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFaculty.map((faculty, index) => (
              <div
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className="sleek-card p-5 cursor-pointer hover:border-primary/40 transition-all animate-fade-in group flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <div>
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 border border-primary/25 flex items-center justify-center text-lg font-bold text-primary shadow-inner shrink-0">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight line-clamp-1">
                        {faculty.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="glass-pill text-[10px] font-semibold text-primary">
                          {faculty.department}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400 text-xs font-medium ml-auto">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{faculty.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate font-mono">Cabin: {faculty.cabin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{faculty.specialization}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Consultation</span>
                  <span className="text-primary font-semibold flex items-center gap-0.5">
                    Profile <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </MainLayout>

      {/* Modern Faculty Detail Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-md animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-primary/30 flex items-center justify-center text-2xl font-bold text-primary mb-3 shadow-lg">
                  {selectedFaculty.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <h2 className="font-display font-bold text-xl tracking-tight">{selectedFaculty.name}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="glass-pill text-xs font-semibold text-primary">
                    {selectedFaculty.department}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedFaculty.rating} rating</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Cabin Location</p>
                  <p className="font-semibold text-sm flex items-center gap-2 font-mono">
                    <MapPin className="w-4 h-4 text-primary" />
                    {selectedFaculty.cabin}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Official Email</p>
                  <a
                    href={`mailto:${selectedFaculty.email}`}
                    className="font-medium text-xs flex items-center gap-2 text-primary hover:underline break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {selectedFaculty.email}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Academic Designation</p>
                  <p className="font-semibold text-xs flex items-center gap-2 text-foreground">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    {selectedFaculty.specialization}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2.5">
                <a
                  href={`mailto:${selectedFaculty.email}`}
                  className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs rounded-xl transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <Button variant="outline" className="rounded-xl border-white/10 text-xs px-4" onClick={() => setSelectedFaculty(null)}>
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

export default Faculty;
