import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentRailProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  onViewAll?: () => void;
}

export function ContentRail({ title, subtitle, children, className, onViewAll }: ContentRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={cn("py-6", className)}>
      {/* Header */}
      <div className="flex items-end justify-between mb-4 px-4 md:px-6">
        <div>
          <h2 className="font-display font-bold text-xl md:text-2xl">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
        <div className="hidden md:flex gap-2 items-center">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors mr-2 whitespace-nowrap"
            >
              View All
            </button>
          )}
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        ref={scrollRef}
        className="content-rail px-4 md:px-6"
      >
        {children}
      </div>
    </section>
  );
}
