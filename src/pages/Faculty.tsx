import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Search,
  Mail,
  MapPin,
  BookOpen,
  X,
  Sparkles,
  Star,
  Users,
  Phone,
  ArrowUpRight,
  Calendar,
  Clock,
  Check,
  Copy,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import cardFaculty from "@/assets/card-faculty-realistic.png";

const departments = ["All", "BAI", "BCE", "SASL", "SCAI", "SCSE", "VITBS", "SMEC", "SEEE", "Architecture", "Bioscience", "BCG", "BHI"];

interface FacultyMember {
  id: number;
  name: string;
  department: string;
  cabin: string;
  email: string;
  specialization: string;
  rating: number;
  officeHours?: string;
}

const facultyMembers: FacultyMember[] = [
  { id: 1, name: "Dr. J. Sharmila Joseph", department: "BCE", cabin: "AB2 416", email: "sharmila.joseph@vitbhopal.ac.in", specialization: "Teaching Fellow", rating: 4.9, officeHours: "Mon & Wed: 2:00 PM – 4:00 PM" },
  { id: 2, name: "Dr. Abhinav Kumar", department: "SASL", cabin: "AB1 A408", email: "abhinavkumar@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.8, officeHours: "Tue & Thu: 10:00 AM – 12:00 PM" },
  { id: 3, name: "Dr. Mamta Agrawal", department: "SASL", cabin: "AB1 A201", email: "mamta.agrawal@vitbhopal.ac.in", specialization: "Associate Professor Grade 1", rating: 4.7, officeHours: "Wed & Fri: 3:00 PM – 4:30 PM" },
  { id: 4, name: "Dr. Saurabh Bhargava", department: "SASL", cabin: "AB1 B 401", email: "saurabhbhargava@vitbhopal.ac.in", specialization: "Assistant Professor Grade 1", rating: 4.6, officeHours: "Mon & Fri: 11:30 AM – 1:00 PM" },
  { id: 5, name: "Dr. Chandan Kumar Behera", department: "BCE", cabin: "AB2 - S-215", email: "chandank.behera@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.5, officeHours: "Tue & Thu: 2:30 PM – 4:00 PM" },
  { id: 6, name: "Dr. M. Suresh", department: "BCG", cabin: "AB2 - S-201", email: "suresh.m@vitbhopal.ac.in", specialization: "Senior Teaching Fellow", rating: 4.8, officeHours: "Mon & Thu: 1:30 PM – 3:30 PM" },
  { id: 7, name: "Dr. Shweta Saxena", department: "BHI", cabin: "AB2 - S-206", email: "shweta.saxena@vitbhopal.ac.in", specialization: "Assistant Professor", rating: 4.6, officeHours: "Wed & Fri: 11:00 AM – 12:30 PM" },
  { id: 8, name: "Dr. Tauseef Qamar", department: "SASL", cabin: "AB1 - 302", email: "tauseefqamar@vitbhopal.ac.in", specialization: "Assistant Professor Grade 1", rating: 4.7, officeHours: "Tue & Fri: 2:00 PM – 3:30 PM" },
  { id: 101, name: "Dr. G. PRABU KANNA", specialization: "Assistant Professor Senior Grade 2", department: "BAI", cabin: "AB2 - G-16", email: "prabukanna.g@vitbhopal.ac.in", rating: 4.8, officeHours: "Mon & Wed: 10:30 AM – 12:30 PM" },
  { id: 102, name: "Dr. SANTOSH KUMAR", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "AB2 - 310", email: "santoshkumarsahoo@vitbhopal.ac.in", rating: 4.5, officeHours: "Tue & Thu: 3:00 PM – 4:30 PM" },
  { id: 103, name: "Dr. D. LAKSHMI", specialization: "Associate professor Senior Grade 2", department: "BAI", cabin: "AB2 - F-122", email: "lakshmi.d@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Fri: 1:30 PM – 3:00 PM" },
  { id: 104, name: "Dr. G.R. HEMALAKSHMI", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "AB2 - 405", email: "hemalakshmi@vitbhopal.ac.in", rating: 4.7, officeHours: "Mon & Thu: 11:00 AM – 1:00 PM" },
  { id: 105, name: "Dr. ABHISHEKH", specialization: "Assistant Professor Grade 2", department: "SASL", cabin: "AB1 - 208", email: "abhishek@vitbhopal.ac.in", rating: 4.7, officeHours: "Tue & Fri: 2:30 PM – 4:00 PM" },
  { id: 106, name: "Mrs. LAKSHMI", specialization: "Student Councillor", department: "SASL", cabin: "Admin - G04", email: "lakshmi.prabha@vitbhopal.ac.in", rating: 4.8, officeHours: "Daily: 10:00 AM – 1:00 PM" },
  { id: 107, name: "Dr. ABHISHEK KUMAR SHUKLA", specialization: "Assistant Professor Grade 2", department: "SCAI", cabin: "AB2 - G-11", email: "abhishekkumarshukla@vitbhopal.ac.in", rating: 4.6, officeHours: "Wed & Fri: 2:00 PM – 3:30 PM" },
  { id: 108, name: "Dr. ABHISHEK RAJ", specialization: "Assistant Professor Grade 2", department: "VITBS", cabin: "AB1 - 501", email: "abhishekraj@vitbhopal.ac.in", rating: 4.5, officeHours: "Mon & Wed: 11:00 AM – 12:30 PM" },
  { id: 109, name: "Dr. ABHISHEK SHRIVASTAVA", specialization: "Assistant Professor Grade 1", department: "SMEC", cabin: "AB2 - 105", email: "abhishek.shrivastava@vitbhopal.ac.in", rating: 4.8, officeHours: "Tue & Thu: 2:00 PM – 4:00 PM" },
  { id: 110, name: "Dr. KUMAR ABHISHEK", specialization: "Assistant Professor Senior Grade 2", department: "SASL", cabin: "AB1 - 312", email: "kumar@vitbhopal.ac.in", rating: 4.7, officeHours: "Mon & Fri: 1:30 PM – 3:00 PM" },
  { id: 111, name: "Dr. KANNAIYA RAJA N", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "AB2 - 315", email: "kannaiyaraja@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Thu: 2:00 PM – 4:00 PM" },
  { id: 112, name: "Dr. KANNAN S", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "AB2 - 220", email: "kannanshanmugam@vitbhopal.ac.in", rating: 4.6, officeHours: "Tue & Fri: 11:00 AM – 12:30 PM" },
  { id: 113, name: "Mr. KANNAN", specialization: "Assistant Professor Senior", department: "BCE", cabin: "AB2 - 219", email: "kannanshanmugam@vitbhopal.ac.in", rating: 4.5, officeHours: "Mon & Thu: 3:00 PM – 4:30 PM" },
  { id: 114, name: "Dr. ACHU GOVIND K.R", specialization: "Assistant Professor Grade 2", department: "SEEE", cabin: "AB2 - 118", email: "achugovind@vitbhopal.ac.in", rating: 4.7, officeHours: "Wed & Fri: 10:30 AM – 12:00 PM" },
  { id: 115, name: "Dr. ABDUR RAHMAN M S", specialization: "Assistant Professor", department: "SASL", cabin: "AB1 - 402", email: "abdur.rahman@vitbhopal.ac.in", rating: 4.8, officeHours: "Tue & Thu: 1:30 PM – 3:00 PM" },
  { id: 116, name: "Dr. BUBAI MANNA", specialization: "Assistant Professor Grade 1", department: "BCE", cabin: "AB2 - 322", email: "bubaimanna@vitbhopal.ac.in", rating: 4.6, officeHours: "Mon & Wed: 2:30 PM – 4:00 PM" },
  { id: 124, name: "Dr. VINESH KUMAR", specialization: "Assistant Professor Senior Grade 2", department: "SCAI", cabin: "AB2 - G-05", email: "vinesh.kumar@vitbhopal.ac.in", rating: 4.7, officeHours: "Tue & Thu: 11:00 AM – 1:00 PM" },
  { id: 125, name: "Dr. VINOD BHATT", specialization: "Associate professor Senior Grade 1", department: "SASL", cabin: "AB1 - 215", email: "vinod.bhatt@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Fri: 3:00 PM – 4:30 PM" },
  { id: 126, name: "Dr. VINOD KUMAR JATAV", specialization: "Assistant Professor Grade 1", department: "SASL", cabin: "AB1 - 318", email: "vinodkumarjatav@vitbhopal.ac.in", rating: 4.5, officeHours: "Mon & Thu: 2:00 PM – 3:30 PM" },
  { id: 127, name: "Mr. DEVRAJ VISHNU", specialization: "Assistant Professor Junior", department: "SCAI", cabin: "AB2 - F-108", email: "devrajvishnu@vitbhopal.ac.in", rating: 4.6, officeHours: "Tue & Fri: 10:30 AM – 12:00 PM" },
  { id: 128, name: "Dr. G. VISHNUVARTHANAN", specialization: "Associate professor Senior Grade 1", department: "SCAI", cabin: "AB2 - 410", email: "vishnuvarthanan@vitbhopal.ac.in", rating: 4.8, officeHours: "Mon & Wed: 3:00 PM – 4:30 PM" },
  { id: 129, name: "Dr. HARSHLATA VISHWAKARMA", specialization: "Assistant Professor Grade 1", department: "SCAI", cabin: "AB2 - F-105", email: "harshlatavishwakarma@vitbhopal.ac.in", rating: 4.7, officeHours: "Tue & Thu: 1:30 PM – 3:00 PM" },
  { id: 130, name: "Dr. ABDUL RAHMAN", specialization: "Associate Professor Grade 2", department: "SCAI", cabin: "AB2 - F-113", email: "abdulrahman@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Fri: 11:00 AM – 12:30 PM" },
  { id: 131, name: "Dr. MANISHA JAIN", specialization: "Associate professor Senior Grade 1", department: "SASL", cabin: "AB1 - 404", email: "manisha.jain@vitbhopal.ac.in", rating: 4.8, officeHours: "Mon & Thu: 2:30 PM – 4:00 PM" },
  { id: 132, name: "Dr. MANISHA SINGH", specialization: "Assistant Professor Senior Grade 1", department: "VITBS", cabin: "AB1 - 508", email: "manisha.singh@vitbhopal.ac.in", rating: 4.6, officeHours: "Tue & Fri: 10:00 AM – 11:30 AM" },
  { id: 133, name: "Dr. S. ANANTHAKUMARAN", specialization: "Associate professor Senior Grade 1", department: "BCE", cabin: "AB2 - 325", email: "ananthakumaran@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Thu: 3:00 PM – 4:30 PM" },
  { id: 134, name: "Dr. JASTIN SAMUEL R", specialization: "Assistant Professor Senior Grade 1", department: "Bioscience", cabin: "Bio - 102", email: "jastinsamuel@vitbhopal.ac.in", rating: 4.7, officeHours: "Mon & Wed: 1:30 PM – 3:00 PM" },
  { id: 135, name: "Dr. AJEET SINGH", specialization: "Assistant Professor Grade 1", department: "BCE", cabin: "AB2 - 212", email: "ajeetsingh@vitbhopal.ac.in", rating: 4.5, officeHours: "Tue & Thu: 2:00 PM – 3:30 PM" },
  { id: 136, name: "Dr. PALAS MANDAL", specialization: "Assistant Professor Grade 2", department: "SASL", cabin: "AB1 - 320", email: "palasmandal@vitbhopal.ac.in", rating: 4.8, officeHours: "Wed & Fri: 11:30 AM – 1:00 PM" },
  { id: 137, name: "Dr. SASMITA PADHY", specialization: "Associate professor Senior Grade 2", department: "BCE", cabin: "AB2 - 318", email: "sasmita.padhy@vitbhopal.ac.in", rating: 4.7, officeHours: "Mon & Thu: 3:00 PM – 4:30 PM" },
  { id: 138, name: "Dr. MANOJ ACHARYA", specialization: "Assistant Professor Senior Grade 2", department: "SASL", cabin: "AB1 - 410", email: "manoj.acharya@vitbhopal.ac.in", rating: 4.6, officeHours: "Tue & Fri: 2:00 PM – 3:30 PM" },
  { id: 139, name: "Dr. Manoj Kumar", specialization: "Assistant Professor Grade 2", department: "BAI", cabin: "AB2 - 128", email: "manojkumar@vitbhopal.ac.in", rating: 4.7, officeHours: "Wed & Thu: 10:30 AM – 12:00 PM" },
  { id: 140, name: "Ms. Manorma Chouhan", specialization: "Teaching Fellow", department: "BCE", cabin: "AB2 - F-102", email: "manormachouhan@vitbhopal.ac.in", rating: 4.5, officeHours: "Mon & Wed: 2:00 PM – 3:30 PM" },
  { id: 141, name: "Dr. Preetam Suman", specialization: "Associate Professor Grade 1", department: "BCE", cabin: "AB2 - 308", email: "preetam.suman@vitbhopal.ac.in", rating: 4.8, officeHours: "Tue & Thu: 3:30 PM – 5:00 PM" },
  { id: 142, name: "Dr. I. Jasmine Selvakumari Jeya", specialization: "Associate Professor Senior Grade 2", department: "BCE", cabin: "AB2 - 402", email: "jasmineselvakumarijeya@vitbhopal.ac.in", rating: 4.7, officeHours: "Wed & Fri: 1:30 PM – 3:00 PM" },
  { id: 143, name: "Dr. Amrita Parashar", specialization: "Assistant Professor", department: "SCAI", cabin: "AB2 - F-110", email: "amritaparashar@vitbhopal.ac.in", rating: 4.8, officeHours: "Mon & Thu: 11:00 AM – 12:30 PM" },
  { id: 144, name: "Dr. Bhakti Parashar", specialization: "Assistant Professor Senior Grade 2", department: "VITBS", cabin: "AB1 - 512", email: "bhakti.parashar@vitbhopal.ac.in", rating: 4.6, officeHours: "Tue & Fri: 2:30 PM – 4:00 PM" },
  { id: 145, name: "Dr. Paras Jain", specialization: "Associate Professor Grade 2", department: "SCAI", cabin: "AB2 - G-22", email: "paras.jain@vitbhopal.ac.in", rating: 4.9, officeHours: "Wed & Thu: 2:00 PM – 3:30 PM" },
  { id: 146, name: "Dr. Shagun Sharma", specialization: "Assistant Professor Grade 1", department: "SCSE", cabin: "AB2 - 320", email: "shagunsharma@vitbhopal.ac.in", rating: 4.8, officeHours: "Mon & Fri: 10:30 AM – 12:00 PM" },
];

const consultationSlots = [
  "Tomorrow • 2:30 PM",
  "Tomorrow • 3:30 PM",
  "Thursday • 11:00 AM",
  "Friday • 3:00 PM",
  "Next Monday • 2:00 PM",
];

const consultationPurposes = [
  "Project / Thesis Guidance",
  "Course Doubt Clarification",
  "Letter of Recommendation (LOR)",
  "Research Mentorship",
];

function getInitials(name: string): string {
  const clean = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Faculty = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Booking Consultation state
  const [isBooking, setIsBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(consultationSlots[0]);
  const [selectedPurpose, setSelectedPurpose] = useState(consultationPurposes[0]);

  const filteredFaculty = useMemo(() => {
    return facultyMembers.filter((faculty) => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.cabin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || faculty.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  const handleCopyEmail = (email: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(email);
    setCopiedEmail(email);
    toast({
      title: "Email Copied",
      description: `${email} copied to clipboard.`,
    });
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleConfirmConsultation = () => {
    if (!selectedFaculty) return;
    toast({
      title: "Consultation Confirmed! 📅",
      description: `Appointment with ${selectedFaculty.name} reserved for ${selectedSlot} (${selectedPurpose}).`,
    });
    setIsBooking(false);
    setSelectedFaculty(null);
  };

  return (
    <>
      <MainLayout>
        {/* Sleek Header */}
        <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
          <img
            src={cardFaculty}
            alt="Faculty"
            className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium text-xs uppercase tracking-wider">Academic Directory</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Faculty <span className="gradient-text">Directory</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              Cabin locations, official emails, office hours & 1-click consultation scheduling
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 md:p-6 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search faculty by professor name, cabin number (e.g. AB2), or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-2xl bg-white/[0.03] border-white/10 text-xs md:text-sm focus-visible:ring-primary/40 font-medium"
            />
          </div>

          {/* Department Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 pt-4 scrollbar-hide">
            {departments.map((dept) => {
              const count = dept === "All"
                ? facultyMembers.length
                : facultyMembers.filter(f => f.department === dept).length;

              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    selectedDept === dept
                      ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25"
                      : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {dept} <span className="text-[10px] opacity-75 font-normal">({count})</span>
                </button>
              );
            })}
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
                onClick={() => {
                  setSelectedFaculty(faculty);
                  setIsBooking(false);
                }}
                className="sleek-card p-5 cursor-pointer hover:border-primary/40 transition-all animate-fade-in group flex flex-col justify-between"
                style={{ animationDelay: `${(index % 12) * 0.03}s` }}
              >
                <div>
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 border border-primary/25 flex items-center justify-center text-sm font-bold text-primary shadow-inner shrink-0">
                      {getInitials(faculty.name)}
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
                    {faculty.officeHours && (
                      <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{faculty.officeHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Consultation
                  </span>
                  <span className="text-primary font-semibold flex items-center gap-0.5">
                    Profile <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="py-12 border border-dashed rounded-2xl border-white/10 bg-white/[0.01] text-center text-muted-foreground text-sm">
              No faculty members found matching "{searchQuery}".
            </div>
          )}
        </div>
      </MainLayout>

      {/* Modern Faculty Detail Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-md animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-between items-center mb-2">
                <span className="glass-pill text-[10px] text-primary uppercase font-bold tracking-wider">
                  Academic Profile
                </span>
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-5 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-primary/30 flex items-center justify-center text-2xl font-bold text-primary mb-3 shadow-lg">
                  {getInitials(selectedFaculty.name)}
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

              {!isBooking ? (
                <>
                  {/* Info Cards */}
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Cabin Location</p>
                      <p className="font-semibold text-xs flex items-center gap-2 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {selectedFaculty.cabin}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Official Email</p>
                        <a
                          href={`mailto:${selectedFaculty.email}`}
                          className="font-medium text-xs flex items-center gap-2 text-primary hover:underline truncate"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          {selectedFaculty.email}
                        </a>
                      </div>
                      <button
                        onClick={(e) => handleCopyEmail(selectedFaculty.email, e)}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10 transition-colors"
                        title="Copy Email"
                      >
                        {copiedEmail === selectedFaculty.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Academic Designation</p>
                      <p className="font-semibold text-xs flex items-center gap-2 text-foreground">
                        <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                        {selectedFaculty.specialization}
                      </p>
                    </div>

                    {selectedFaculty.officeHours && (
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                        <p className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">Office Hours</p>
                        <p className="font-medium text-xs flex items-center gap-2 text-foreground">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {selectedFaculty.officeHours}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 space-y-2">
                    <Button
                      onClick={() => setIsBooking(true)}
                      className="w-full rounded-xl py-2.5 font-semibold text-xs shadow-md shadow-primary/25 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Consultation Slot
                    </Button>

                    <div className="flex gap-2">
                      <a
                        href={`mailto:${selectedFaculty.email}`}
                        className="flex-1 py-2 px-3 bg-white/[0.03] hover:bg-white/[0.08] text-foreground font-semibold text-xs rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Send Direct Email
                      </a>
                      <Button
                        variant="outline"
                        className="rounded-xl border-white/10 text-xs px-4"
                        onClick={() => setSelectedFaculty(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* Interactive Consultation Booking Step */
                <div className="space-y-4 animate-fade-in">
                  <div className="text-left">
                    <h3 className="font-semibold text-sm flex items-center gap-1.5 text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      Select Consultation Slot
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      15-minute one-on-one session at cabin {selectedFaculty.cabin}
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-semibold">
                      Purpose of Meeting
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {consultationPurposes.map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPurpose(p)}
                          className={`p-2 rounded-xl text-[11px] font-medium border text-left transition-all ${
                            selectedPurpose === p
                              ? "bg-primary/15 border-primary text-primary"
                              : "bg-white/[0.02] border-white/10 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-semibold">
                      Available Time Window
                    </label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-hide">
                      {consultationSlots.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                            selectedSlot === slot
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {slot}
                          </span>
                          {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleConfirmConsultation}
                      className="flex-1 rounded-xl text-xs font-semibold shadow-md shadow-primary/20"
                    >
                      Confirm Appointment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsBooking(false)}
                      className="rounded-xl border-white/10 text-xs px-3"
                    >
                      Back
                    </Button>
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

export default Faculty;
