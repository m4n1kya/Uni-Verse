import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Play, Info } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  className?: string;
}

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
    <div className={cn("relative h-[60vh] md:h-[70vh] overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-2xl">
        <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 animate-fade-in">
          {subtitle}
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-lg mb-6 line-clamp-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {description}
          </p>
        )}

        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              className="border-foreground/20 hover:bg-foreground/10 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Info className="w-5 h-5" />
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
