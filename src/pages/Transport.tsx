import { MainLayout } from "@/components/layout/MainLayout";
import { Bus, Car, Phone, Clock, MapPin, Navigation, AlertCircle, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import cardTransport from "@/assets/card-transport.jpg";

const busSchedules = [
  { id: 1, route: "Route A - Main Gate to Academic Block", time: "8:00 AM", status: "On Time", frequency: "Every 15 min", nextStop: "Main Gate" },
  { id: 2, route: "Route B - Hostel to Tech Park", time: "8:30 AM", status: "On Time", frequency: "Every 20 min", nextStop: "Hostel Block 1" },
  { id: 3, route: "Route C - Campus Loop", time: "9:00 AM", status: "Delayed 5 min", frequency: "Every 10 min", nextStop: "Cafeteria Complex" },
  { id: 4, route: "Route D - Library Express", time: "9:15 AM", status: "On Time", frequency: "Every 30 min", nextStop: "Central Library" },
];

const cabServices = [
  { name: "Ola Cabs", phone: "1800-123-4567", link: "#", desc: "Campus pickup point 1" },
  { name: "Uber Mobility", phone: "1800-234-5678", link: "#", desc: "Main security gate" },
  { name: "Campus Shuttle Cab", phone: "044-2345-6789", link: "#", desc: "Internal campus transit" },
];

const driverContacts = [
  { id: 1, name: "Raju (Bus Route A)", phone: "+91 98765 43210", vehicle: "TN 01 AB 1234", status: "Active" },
  { id: 2, name: "Kumar (Bus Route B)", phone: "+91 98765 43211", vehicle: "TN 01 AB 1235", status: "Active" },
  { id: 3, name: "Suresh (Campus Van)", phone: "+91 98765 43212", vehicle: "TN 01 AB 1236", status: "On Break" },
];

const Transport = () => {
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
            <span className="text-primary font-medium text-xs uppercase tracking-wider">Campus Mobility</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Transport <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Live bus telemetry, verified cab operators & driver directory</p>
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
              <span className="font-semibold text-sm md:text-base">Next Bus: Route A</span>
              <span className="status-dot-pulse">
                <span className="bg-emerald-400"></span>
                <span className="bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Arriving in <strong className="text-emerald-400">3 minutes</strong> at Main Gate Stop</p>
          </div>
        </div>
        <Button size="sm" className="rounded-xl px-5 shadow-md shadow-primary/20">
          <Navigation className="w-3.5 h-3.5 mr-1.5" />
          Track Live
        </Button>
      </div>

      {/* Bus Schedules */}
      <section className="p-4 md:p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            Active Bus Schedules
          </h2>
          <span className="text-xs text-muted-foreground font-medium">GPS Synced</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {busSchedules.map((bus, index) => (
            <div
              key={bus.id}
              className="sleek-card p-5 animate-fade-in group hover:border-primary/40 transition-all"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{bus.route}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {bus.time}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span>{bus.frequency}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="text-primary/90">Next: {bus.nextStop}</span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    bus.status === "On Time"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {bus.status}
                </span>
              </div>
              <div className="flex gap-2.5 pt-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs h-9 border-white/10 hover:bg-white/[0.04]">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-muted-foreground" /> View Stops
                </Button>
                <Button size="sm" className="flex-1 rounded-xl text-xs h-9 shadow-sm shadow-primary/20">
                  <Navigation className="w-3.5 h-3.5 mr-1" /> Live Map
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cab Booking */}
      <section className="px-4 md:px-6 pb-6">
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
                  <span className="glass-pill text-[10px] text-muted-foreground">Verified</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{cab.desc}</p>
                <p className="text-sm font-mono text-primary">{cab.phone}</p>
              </div>
              <Button className="w-full mt-4 rounded-xl text-xs h-9 font-medium" variant="default">
                Book Ride
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
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{driver.name}</h3>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">{driver.vehicle}</p>
              </div>
              <a
                href={`tel:${driver.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 rounded-xl transition-all text-xs font-semibold shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
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
    </MainLayout>
  );
};

export default Transport;
