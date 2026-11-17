import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Bus,
  Car,
  Phone,
  Clock,
  MapPin,
  Navigation,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  X,
  Search,
  ShieldCheck,
  Users,
  Copy,
  Check,
  Gauge,
  BellRing,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import cardTransport from "@/assets/card-transport.jpg";

interface RouteStop {
  name: string;
  time: string;
  state: "completed" | "current" | "upcoming";
  est: string;
}

interface BusRoute {
  id: number;
  route: string;
  category: "Academic" | "Hostel" | "Loop" | "Express";
  time: string;
  status: "On Time" | "Delayed 5 min" | "Departed" | "Boarding";
  frequency: string;
  nextStop: string;
  speed: string;
  occupancy: number; // percentage
  plate: string;
  driver: string;
  stops: RouteStop[];
}

const busSchedules: BusRoute[] = [
  {
    id: 1,
    route: "Route A - Main Gate to Academic Block",
    category: "Academic",
    time: "8:00 AM",
    status: "On Time",
    frequency: "Every 15 min",
    nextStop: "Main Gate Stop",
    speed: "24 km/h",
    occupancy: 68,
    plate: "TN 01 AB 1234",
    driver: "Raju",
    stops: [
      { name: "Main Gate Security Hub", time: "8:00 AM", state: "current", est: "Arrived" },
      { name: "Central Library Terminal", time: "8:06 AM", state: "upcoming", est: "6 mins" },
      { name: "Academic Block 1 Entrance", time: "8:12 AM", state: "upcoming", est: "12 mins" },
      { name: "Academic Block 2 Portico", time: "8:16 AM", state: "upcoming", est: "16 mins" },
      { name: "Tech Park & Lab Complex", time: "8:22 AM", state: "upcoming", est: "22 mins" },
    ],
  },
  {
    id: 2,
    route: "Route B - Hostel to Tech Park",
    category: "Hostel",
    time: "8:30 AM",
    status: "On Time",
    frequency: "Every 20 min",
    nextStop: "Hostel Block 1",
    speed: "31 km/h",
    occupancy: 84,
    plate: "TN 01 AB 1235",
    driver: "Kumar",
    stops: [
      { name: "Hostel Block 1 Quad", time: "8:30 AM", state: "completed", est: "Departed" },
      { name: "Hostel Block 3 Pavilion", time: "8:35 AM", state: "current", est: "Boarding" },
      { name: "Indoor Sports Complex", time: "8:41 AM", state: "upcoming", est: "6 mins" },
      { name: "Tech Park Central Circle", time: "8:48 AM", state: "upcoming", est: "13 mins" },
    ],
  },
  {
    id: 3,
    route: "Route C - Campus Perimeter Loop",
    category: "Loop",
    time: "9:00 AM",
    status: "Delayed 5 min",
    frequency: "Every 10 min",
    nextStop: "Cafeteria Complex",
    speed: "18 km/h",
    occupancy: 45,
    plate: "TN 01 AB 1237",
    driver: "Vikram",
    stops: [
      { name: "Main Gate Bus Terminal", time: "8:55 AM", state: "completed", est: "Departed" },
      { name: "Health Center & Pharmacy", time: "9:02 AM", state: "completed", est: "Departed" },
      { name: "Cafeteria Complex", time: "9:08 AM", state: "current", est: "Approaching" },
      { name: "Student Activity Center (SAC)", time: "9:14 AM", state: "upcoming", est: "6 mins" },
      { name: "Central Research Facility", time: "9:20 AM", state: "upcoming", est: "12 mins" },
      { name: "Main Gate Return Bay", time: "9:26 AM", state: "upcoming", est: "18 mins" },
    ],
  },
  {
    id: 4,
    route: "Route D - Library & Lab Express",
    category: "Express",
    time: "9:15 AM",
    status: "On Time",
    frequency: "Every 30 min",
    nextStop: "Central Library",
    speed: "35 km/h",
    occupancy: 38,
    plate: "TN 01 AB 1238",
    driver: "Ganesh",
    stops: [
      { name: "North Campus Gate", time: "9:15 AM", state: "completed", est: "Departed" },
      { name: "Central Library Hub", time: "9:21 AM", state: "current", est: "At Stop" },
      { name: "Bio-Tech Research Center", time: "9:28 AM", state: "upcoming", est: "7 mins" },
      { name: "Auditorium Roundabout", time: "9:35 AM", state: "upcoming", est: "14 mins" },
    ],
  },
];

const cabServices = [
  { name: "Ola Cabs", phone: "1800-123-4567", rating: "4.8", desc: "Designated campus pickup bay 1" },
  { name: "Uber Mobility", phone: "1800-234-5678", rating: "4.7", desc: "Main security check-post bay" },
  { name: "Campus Express Transit", phone: "044-2345-6789", rating: "4.9", desc: "Internal campus 24x7 point-to-point" },
];

const driverContacts = [
  { id: 1, name: "Raju", route: "Bus Route A", phone: "+91 98765 43210", vehicle: "TN 01 AB 1234", status: "Active" },
  { id: 2, name: "Kumar", route: "Bus Route B", phone: "+91 98765 43211", vehicle: "TN 01 AB 1235", status: "Active" },
  { id: 3, name: "Suresh", route: "Campus Van Shuttle", phone: "+91 98765 43212", vehicle: "TN 01 AB 1236", status: "On Break" },
];

const filterCategories = ["All Routes", "Academic", "Hostel", "Loop", "Express"] as const;
type CategoryType = typeof filterCategories[number];

const Transport = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All Routes");
  const [activeRouteModal, setActiveRouteModal] = useState<BusRoute | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const filteredRoutes = busSchedules.filter((bus) => {
    const matchesCategory =
      selectedCategory === "All Routes" || bus.category === selectedCategory;
    const matchesSearch =
      bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.nextStop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.stops.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyPhone = (phone: string, name: string) => {
    navigator.clipboard?.writeText(phone);
    setCopiedPhone(phone);
    toast({
      title: "Contact Number Copied",
      description: `${name}'s direct mobile (${phone}) copied to clipboard.`,
    });
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const handleSetReminder = (route: BusRoute) => {
    toast({
      title: "Transit Reminder Scheduled",
      description: `You will be notified 5 minutes before ${route.route} arrives at ${route.nextStop}.`,
    });
  };

  const handleShareRoute = (route: BusRoute) => {
    if (navigator.share) {
      navigator.share({
        title: `Uni-Verse Transit: ${route.route}`,
        text: `Check live telemetry for ${route.route} - next stop: ${route.nextStop} (${route.status}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${route.route} - Live telemetry at ${route.nextStop}`);
      toast({
        title: "Route Link Copied",
        description: "Live telemetry summary copied to clipboard.",
      });
    }
  };

  return (
    <MainLayout>
      {/* Sleek Header */}
      <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
        <img 
          src={cardTransport} 
          alt="Transport" 
          className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium text-xs uppercase tracking-wider">Campus Mobility Hub</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Transport <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Live bus telemetry, GPS stop tracking & verified operator directory</p>
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="mx-4 md:mx-6 -mt-6 relative z-10 sleek-card p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-background/85 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shadow-inner">
            <Bus className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm md:text-base">Next Bus: Route A (Academic Hub)</span>
              <span className="status-dot-pulse">
                <span className="bg-emerald-400"></span>
                <span className="bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Arriving in <strong className="text-emerald-400">3 minutes</strong> at Main Gate Security Hub • 24 km/h GPS feed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setActiveRouteModal(busSchedules[0])}
            className="rounded-xl px-4 shadow-md shadow-primary/20"
          >
            <Navigation className="w-3.5 h-3.5 mr-1.5" />
            Track Route A Live
          </Button>
        </div>
      </div>

      {/* Controls: Search and Route Categories */}
      <section className="p-4 md:p-6 mt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25"
                    : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by stop or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-xl text-xs bg-white/[0.03] border-white/10 focus-visible:ring-primary/40"
            />
          </div>
        </div>

        {/* Bus Schedules Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            Active Fleet Schedules ({filteredRoutes.length})
          </h2>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            GPS Telemetry Live
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRoutes.map((bus, index) => (
            <div
              key={bus.id}
              className="sleek-card p-5 animate-fade-in group hover:border-primary/40 transition-all flex flex-col justify-between"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-primary">
                        {bus.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {bus.plate}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{bus.route}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {bus.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>{bus.frequency}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-primary/90 font-medium">Next: {bus.nextStop}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border shrink-0 ${
                      bus.status === "On Time"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>

                {/* Occupancy and Telemetry mini-bar */}
                <div className="mt-3 pt-3 border-t border-white/[0.04] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      Capacity: <strong className="text-foreground">{bus.occupancy}%</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-muted-foreground" />
                      Velocity: <span className="font-mono text-foreground">{bus.speed}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bus.occupancy > 80
                          ? "bg-amber-400"
                          : bus.occupancy > 50
                          ? "bg-primary"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${bus.occupancy}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveRouteModal(bus)}
                  className="flex-1 rounded-xl text-xs h-9 border-white/10 hover:bg-white/[0.04]"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1 text-muted-foreground" /> View {bus.stops.length} Stops
                </Button>
                <Button
                  size="sm"
                  onClick={() => setActiveRouteModal(bus)}
                  className="flex-1 rounded-xl text-xs h-9 shadow-sm shadow-primary/20"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" /> Track Route
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cab Booking */}
      <section className="px-4 md:px-6 py-4">
        <h2 className="font-display font-bold text-xl tracking-tight mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Campus Cab Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cabServices.map((cab) => (
            <div key={cab.name} className="sleek-card p-5 group hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cab.name}</h3>
                  <span className="glass-pill text-[10px] text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    Verified Partner
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{cab.desc}</p>
                <p className="text-sm font-mono text-primary font-semibold">{cab.phone}</p>
              </div>
              <Button
                onClick={() => {
                  toast({
                    title: "Connecting to Dispatch",
                    description: `Routing dispatch request to ${cab.name} priority campus counter.`,
                  });
                }}
                className="w-full mt-4 rounded-xl text-xs h-9 font-medium"
                variant="default"
              >
                Request Pickup
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Driver Contacts */}
      <section className="px-4 md:px-6 pb-6">
        <h2 className="font-display font-bold text-xl tracking-tight mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Duty Driver Directory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {driverContacts.map((driver) => (
            <div key={driver.id} className="sleek-card p-4 flex items-center justify-between group hover:border-primary/30 transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{driver.name}</h3>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    driver.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {driver.status}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{driver.route}</p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">{driver.vehicle}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyPhone(driver.phone, driver.name)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10 transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedPhone === driver.phone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`tel:${driver.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 rounded-xl transition-all text-xs font-semibold shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="mx-4 md:mx-6 mb-8 sleek-card p-4 border border-amber-500/30 bg-amber-500/[0.03]">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm text-amber-400">Campus Holiday Transit Advisory</h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Limited bus loop frequency on Sundays and gazetted holidays. Campus express cabs operate continuously with normal dispatch cycles.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Route Stop Timeline Modal */}
      {activeRouteModal && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {activeRouteModal.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {activeRouteModal.plate}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl tracking-tight">
                    {activeRouteModal.route}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Driver: <span className="text-foreground font-medium">{activeRouteModal.driver}</span> • {activeRouteModal.frequency}
                  </p>
                </div>
                <button
                  onClick={() => setActiveRouteModal(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Telemetry Overview */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-center">
                  <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">Status</span>
                  <span className="text-xs font-semibold text-emerald-400">{activeRouteModal.status}</span>
                </div>
                <div className="text-center border-x border-white/5">
                  <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">Current Speed</span>
                  <span className="text-xs font-mono font-semibold text-foreground">{activeRouteModal.speed}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">Bus Load</span>
                  <span className="text-xs font-semibold text-primary">{activeRouteModal.occupancy}% Filled</span>
                </div>
              </div>

              {/* Route Waypoint Timeline */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-4 flex items-center justify-between">
                  <span>Waypoint Progress ({activeRouteModal.stops.length} Stops)</span>
                  <span className="text-emerald-400 font-mono text-[11px] lowercase">live telemetry</span>
                </h3>

                <div className="space-y-4 relative pl-4 border-l border-white/10 ml-2">
                  {activeRouteModal.stops.map((stop, i) => (
                    <div key={i} className="relative group">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          stop.state === "completed"
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                            : stop.state === "current"
                            ? "bg-primary border-primary shadow-md shadow-primary/40 animate-pulse"
                            : "bg-background border-white/20"
                        }`}
                      >
                        {stop.state === "completed" && (
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        )}
                        {stop.state === "current" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-medium ${
                                stop.state === "current"
                                  ? "text-primary font-bold"
                                  : stop.state === "completed"
                                  ? "text-muted-foreground line-through decoration-white/20"
                                  : "text-foreground"
                              }`}
                            >
                              {stop.name}
                            </span>
                            {stop.state === "current" && (
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30">
                                Current Stop
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground block mt-0.5">
                            Scheduled: {stop.time}
                          </span>
                        </div>

                        <span
                          className={`text-xs font-medium font-mono ${
                            stop.state === "current"
                              ? "text-emerald-400 font-bold"
                              : stop.state === "completed"
                              ? "text-muted-foreground"
                              : "text-foreground/80"
                          }`}
                        >
                          {stop.est}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetReminder(activeRouteModal)}
                  className="flex-1 rounded-xl text-xs h-10 border-white/10 hover:bg-white/[0.04]"
                >
                  <BellRing className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  Set ETA Alert
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleShareRoute(activeRouteModal)}
                  className="flex-1 rounded-xl text-xs h-10 shadow-sm shadow-primary/20"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  Share Telemetry
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Transport;
