# Design System: Color Tokens, Glassmorphism & Iconography

## Overview
Uni-Verse features a modern pitch-black dark theme engineered for visual clarity, reduced eye strain during late-night study sessions, and vibrant semantic color differentiation across campus modules.

---

## 1. Surface & Accent Color Palette

### Core Surfaces
- **Canvas Background (`--background`)**: `#09090B` (`240 10% 3.9%`) — Deep pitch-black canvas that makes glass cards pop.
- **Elevated Card Surface (`--card`)**: `rgba(24, 24, 27, 0.65)` with `backdrop-filter: blur(16px)` — Translucent zinc glass.
- **Subtle Hairline Border (`--border`)**: `rgba(255, 255, 255, 0.08)` hoverable to `rgba(255, 255, 255, 0.18)`.

### Module Semantic Accents
To prevent monochromatic visual fatigue, each campus domain uses a distinct multi-stop gradient and icon tint:
- **Academic & E-Books**: Electric Indigo (`#6366F1` $\rightarrow$ `#818CF8`)
- **Campus Food Court**: Warm Amber & Rose (`#F59E0B` $\rightarrow$ `#F43F5E`)
- **Real-Time Bus Transit**: Emerald & Teal (`#10B981` $\rightarrow$ `#06B6D4`)
- **Career Hub & Placements**: Violet & Fuchsia (`#8B5CF6` $\rightarrow$ `#D946EF`)
- **Faculty Directory**: Sky Cyan (`#0EA5E9` $\rightarrow$ `#38BDF8`)

---

## 2. Typography & Spacing Hierarchy

- **Font Stack**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Heading Scale**:
  - `H1 (Hero / Page Title)`: `2.25rem` (`36px`), `font-extrabold`, tight tracking (`-0.025em`)
  - `H2 (Section Header)`: `1.5rem` (`24px`), `font-bold`, tracking (`-0.015em`)
  - `H3 (Card Title)`: `1.125rem` (`18px`), `font-semibold`
- **Breathing Room**:
  - Section padding: `py-8 px-6` (`md:px-10`)
  - Grid gaps: `gap-6` (`24px`) minimum between interactive cards to prevent visual crowding.

---

## 3. Iconography Standards (Lucide React)

- **Library**: `lucide-react` standardized across all views.
- **Stroke Weight**: `1.75px` default stroke width for crisp rendering on Retina/HiDPI displays.
- **Sizing Conventions**:
  - Sidebar navigation icons: `w-5 h-5` (`20px`)
  - Quick Access feature badges: `w-6 h-6` (`24px`) inside `w-12 h-12` rounded glass containers (`rounded-xl`)
  - Inline metadata indicators: `w-4 h-4` (`16px`)
