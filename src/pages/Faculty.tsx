import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Mail, MapPin, BookOpen, Filter, X } from "lucide-react";
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
        {/* Header */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src={cardFaculty} alt="Faculty" className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="font-display font-bold text-3xl md:text-4xl">
              Faculty <span className="gradient-text">Directory</span>
            </h1>
            <p className="text-muted-foreground mt-1">Connect with your professors</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 md:p-8 border-b border-border space-y-5">
          {/* Search Bar — full width */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-muted border-border rounded-xl w-full"
            />
          </div>

          {/* Department Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedDept === dept
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFaculty.map((faculty, index) => (
              <div
                key={faculty.id}
                onClick={() => setSelectedFaculty(faculty)}
                className="glass-card p-4 cursor-pointer hover:glow-orange transition-all animate-fade-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                      {faculty.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      {faculty.department}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">Cabin: {faculty.cabin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span className="truncate">{faculty.specialization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </MainLayout>

      {/* Faculty Detail Modal */}
      {
        selectedFaculty && (
          <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md animate-scale-in">
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setSelectedFaculty(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-primary-foreground mb-4">
                    {selectedFaculty.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <h2 className="font-display font-bold text-xl">{selectedFaculty.name}</h2>
                  <span className="text-sm px-3 py-1 bg-primary/20 text-primary rounded-full mt-2">
                    {selectedFaculty.department}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <p className="text-sm text-muted-foreground mb-1">Cabin</p>
                    <p className="font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {selectedFaculty.cabin}
                    </p>
                  </div>

                  <div className="glass-card p-4">
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${selectedFaculty.email}`}
                      className="font-semibold flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedFaculty.email}
                    </a>
                  </div>

                  <div className="glass-card p-4">
                    <p className="text-sm text-muted-foreground mb-1">Specialization</p>
                    <p className="font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      {selectedFaculty.specialization}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="default">
                  See Schedule
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Faculty;
