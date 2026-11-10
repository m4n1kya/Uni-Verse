import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Play, Info, Sparkles } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  className?: string;
}

/**
 * Main hero banner component displayed on the landing page.
 * Includes background image, title, and action buttons.
 */
export function HeroBanner({
  title,
  subtitle,
  description,
  image,
  primaryAction,
  secondaryAction,
  className,
}: HeroBannerProps) {
  return (
    <div className={cn("relative h-[60vh] md:h-[68vh] overflow-hidden rounded-b-3xl border-b border-white/[0.08]", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover brightness-[0.65] contrast-[1.15] scale-[1.02] transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-3 self-start animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-primary font-medium text-xs uppercase tracking-widest">{subtitle}</span>
        </div>

        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4 animate-fade-in drop-shadow-sm" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>

        {description && (
          <p className="text-muted-foreground text-base md:text-lg mb-6 line-clamp-3 leading-relaxed animate-fade-in max-w-2xl" style={{ animationDelay: "0.2s" }}>
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-current" />
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-foreground px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
