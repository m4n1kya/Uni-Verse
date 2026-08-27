import { MainLayout } from "@/components/layout/MainLayout";
import { Bus, Car, Phone, Clock, MapPin, Navigation, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import cardTransport from "@/assets/card-transport.jpg";

const busSchedules = [
  { id: 1, route: "Route A - Main Gate to Academic Block", time: "8:00 AM", status: "On Time", frequency: "Every 15 min" },
  { id: 2, route: "Route B - Hostel to Tech Park", time: "8:30 AM", status: "On Time", frequency: "Every 20 min" },
  { id: 3, route: "Route C - Campus Loop", time: "9:00 AM", status: "Delayed 5 min", frequency: "Every 10 min" },
  { id: 4, route: "Route D - Library Express", time: "9:15 AM", status: "On Time", frequency: "Every 30 min" },
];

const cabServices = [
  { name: "Ola", phone: "1800-123-4567", link: "#" },
  { name: "Uber", phone: "1800-234-5678", link: "#" },
  { name: "Campus Cab", phone: "044-2345-6789", link: "#" },
];

const driverContacts = [
  { id: 1, name: "Raju (Bus Route A)", phone: "+91 98765 43210", vehicle: "TN 01 AB 1234" },
  { id: 2, name: "Kumar (Bus Route B)", phone: "+91 98765 43211", vehicle: "TN 01 AB 1235" },
  { id: 3, name: "Suresh (Campus Van)", phone: "+91 98765 43212", vehicle: "TN 01 AB 1236" },
];

const Transport = () => {
  return (
    <MainLayout>
      {/* Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={cardTransport} alt="Transport" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="font-display font-bold text-3xl md:text-4xl">
            Transport <span className="gradient-text">Hub</span>
          </h1>
          <p className="text-muted-foreground mt-1">Bus schedules, cabs & more</p>
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="mx-4 md:mx-6 mt-4 glass-card p-4 flex items-center gap-4 border-l-4 border-primary">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <Bus className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Next Bus: Route A</p>
          <p className="text-sm text-muted-foreground">Arriving in 3 minutes at Main Gate</p>
        </div>
        <Button size="sm" variant="outline">Track</Button>
      </div>

      {/* Bus Schedules */}
      <section className="p-4 md:p-6">
        <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Bus className="w-5 h-5 text-primary" />
          Bus Schedules
        </h2>
        <div className="space-y-3">
          {busSchedules.map((bus, index) => (
            <div
              key={bus.id}
              className="glass-card p-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold">{bus.route}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {bus.time}
                    </span>
                    <span>{bus.frequency}</span>
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    bus.status === "On Time"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {bus.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MapPin className="w-4 h-4 mr-1" /> View Route
                </Button>
                <Button size="sm" className="flex-1">
                  <Navigation className="w-4 h-4 mr-1" /> Track Live
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cab Booking */}
      <section className="px-4 md:px-6 pb-6">
        <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Book a Cab
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cabServices.map((cab) => (
            <div key={cab.name} className="glass-card p-4 hover:glow-primary transition-all">
              <h3 className="font-semibold text-lg">{cab.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cab.phone}</p>
              <Button className="w-full mt-4" variant="default">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Driver Contacts */}
      <section className="px-4 md:px-6 pb-6">
        <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Driver Contacts
        </h2>
        <div className="space-y-3">
          {driverContacts.map((driver) => (
            <div key={driver.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
              </div>
              <a
                href={`tel:${driver.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="mx-4 md:mx-6 mb-6 glass-card p-4 border-l-4 border-yellow-500">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-500">Holiday Schedule</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Limited bus services on Sunday. Please check the holiday schedule for details.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transport;
