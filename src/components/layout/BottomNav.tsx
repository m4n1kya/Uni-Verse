import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Bus,
  UtensilsCrossed,
  Users,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Books", path: "/ebooks" },
  { icon: Users, label: "Faculty", path: "/faculty" },
  { icon: UtensilsCrossed, label: "Food", path: "/food" },
  { icon: Bus, label: "Transport", path: "/transport" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("w-5 h-5", isActive && "animate-scale-in")} />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
