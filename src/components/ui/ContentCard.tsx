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
      className={cn(
        "glass-card group relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.3)]",
        className
      )}
    >
      {/* Top Accent Line like SubjectGrid */}
      <div className="absolute top-0 left-0 w-full h-1 border-t-2 border-t-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      
      {/* Radial Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      {/* Image */}
      {image && (
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          {badge && (
            <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
