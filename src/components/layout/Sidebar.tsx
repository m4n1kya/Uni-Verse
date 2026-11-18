import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookMarked, 
  BusFront, 
  Coffee, 
  UsersRound, 
  Map, 
  Target, 
  Home,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: any;
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BookMarked, label: "E-Books & Academic", path: "/ebooks", badge: "GPA", badgeColor: "text-primary bg-primary/10 border-primary/20" },
  { icon: UsersRound, label: "Faculty Directory", path: "/faculty" },
  { icon: Coffee, label: "Food Court", path: "/food", badge: "Express", badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { icon: BusFront, label: "Transport Hub", path: "/transport", badge: "Live", badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { icon: Map, label: "Roadmap & Journey", path: "/journey" },
  { icon: Target, label: "Career & Placements", path: "/career", badge: "Cutoffs", badgeColor: "text-accent bg-accent/10 border-accent/20" },
];

/**
 * Sidebar navigation component for desktop.
 * Handles collapsible state, telemetry status, and accessible navigation.
 */
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border/70 transition-all duration-300 sticky top-0 z-40 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary shadow-lg shrink-0">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl gradient-text">
              Uni-Verse
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider rounded-md bg-primary/15 text-primary border border-primary/25">
              v2.4
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border border-primary/25 shadow-sm font-semibold"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive && "text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                )}
              />
              {!collapsed && (
                <span className="text-xs font-medium tracking-tight truncate flex-1">
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && !isActive && (
                <span className={cn("text-[9px] font-bold px-1.5 py-0.2 rounded-md border uppercase tracking-wider shrink-0", item.badgeColor)}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Campus Telemetry Status */}
      {!collapsed && (
        <div className="px-3 py-2 mx-3 mb-2 rounded-xl bg-muted/30 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">Campus Network</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-medium">GPS Telemetry Online</span>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-xl bg-muted/50 hover:bg-muted border border-white/5 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
