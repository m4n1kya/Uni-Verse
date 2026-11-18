import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Bus,
  UtensilsCrossed,
  Users,
  Home,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Books", path: "/ebooks" },
  { icon: Users, label: "Faculty", path: "/faculty" },
  { icon: UtensilsCrossed, label: "Food", path: "/food" },
  { icon: Bus, label: "Transit", path: "/transport" },
  { icon: Target, label: "Career", path: "/career" },
];

/**
 * Bottom navigation bar for mobile devices.
 * Sticky at the bottom of the viewport with modern frosted glass.
 */
export function BottomNav() {
  const location = useLocation();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/85 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-8px_24px_rgba(0,0,0,0.6)] safe-area-bottom select-none"
    >
      <div className="flex items-center justify-around py-1.5 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 relative min-w-[50px]",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("w-5 h-5 transition-transform duration-200", isActive && "scale-110 drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]")} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
