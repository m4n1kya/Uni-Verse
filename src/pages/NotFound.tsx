import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, BookOpen, Bus, Compass, UtensilsCrossed, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickRecoveryLinks = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "E-Books & Academic", path: "/ebooks", icon: BookOpen },
  { label: "Transport Hub", path: "/transport", icon: Bus },
  { label: "Campus Food Court", path: "/food", icon: UtensilsCrossed },
  { label: "Career & Placements", path: "/career", icon: Target },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="sleek-card w-full max-w-lg p-8 md:p-12 text-center relative z-10 border border-white/10 shadow-2xl bg-card/90 backdrop-blur-2xl animate-scale-in">
        {/* Glowing 404 Display */}
        <div className="relative mb-4">
          <span className="font-display font-extrabold text-7xl md:text-9xl gradient-text tracking-tighter drop-shadow-sm block">
            404
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/25 text-destructive text-[11px] font-semibold uppercase tracking-wider mt-2">
            Route Not Found
          </div>
        </div>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-2">
          Lost in the Uni-Verse
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto mb-5 leading-relaxed">
          The campus coordinate you navigated to does not exist or may have been relocated in the latest academic release.
        </p>

        {/* Attempted Route Indicator */}
        <div className="mb-6 p-2 rounded-xl bg-white/[0.02] border border-white/5 inline-flex items-center gap-2 max-w-full">
          <Compass className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-[11px] font-mono text-muted-foreground truncate max-w-xs">{location.pathname}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-xl border-white/10 text-xs h-10 px-4 hover:bg-white/[0.04] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Go Back
          </Button>
          <Button
            asChild
            className="rounded-xl text-xs h-10 px-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            <Link to="/">
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Return to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Discovery Directory */}
        <div className="pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Quick Campus Portals
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickRecoveryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-primary/10 border border-white/5 hover:border-primary/25 text-xs text-muted-foreground hover:text-primary transition-all font-medium"
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
