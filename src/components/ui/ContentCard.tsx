import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  image?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Reusable card component for displaying featured modules or items.
 * Built with sleek surface elevation, keyboard navigation, and subtle border reflections.
 */
export function ContentCard({
  image,
  title,
  subtitle,
  badge,
  children,
  className,
  onClick,
}: ContentCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "sleek-card group relative cursor-pointer transition-all duration-300 hover:-translate-y-2 select-none border border-white/10 hover:border-primary/40 shadow-lg hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      {/* Top Accent Line highlight on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      
      {/* Radial Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Image Container */}
      {image && (
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240_10%_4%)] via-[hsl(240_10%_4%/0.3)] to-transparent" />
          {badge && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-md text-primary border border-primary/30 rounded-full shadow-lg flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
