import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Play, Info, Sparkles, ShieldCheck, Zap } from "lucide-react";

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
 * Includes background image, cinematic gradients, glass badges, and accessible action buttons.
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
    <div className={cn("relative h-[62vh] md:h-[70vh] overflow-hidden rounded-b-3xl border-b border-white/[0.08]", className)}>
      {/* Background Image & Multi-layer Gradients */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover brightness-[0.65] contrast-[1.15] scale-[1.02] transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.2),transparent_60%)]" />
        {/* Subtle specular top highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Floating Status Badges Top-Right (Desktop) */}
      <div className="absolute top-6 right-6 md:right-10 hidden sm:flex items-center gap-2.5 z-10 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-foreground/90 shadow-lg">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span>v2.4 Core</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-foreground/90 shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Telemetry Active</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-3xl z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-3 self-start animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-primary font-medium text-xs uppercase tracking-widest">{subtitle}</span>
        </div>

        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4 animate-fade-in drop-shadow-sm text-foreground" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>

        {description && (
          <p className="text-muted-foreground text-sm md:text-base mb-6 line-clamp-3 leading-relaxed animate-fade-in max-w-2xl font-normal" style={{ animationDelay: "0.2s" }}>
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-foreground px-6 py-2.5 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-sm cursor-pointer"
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
