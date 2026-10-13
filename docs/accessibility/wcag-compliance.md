# Accessibility (a11y) & WCAG 2.1 AA Design Specification

## Overview
Uni-Verse is committed to providing an inclusive digital campus experience for all students, faculty, and staff. Every view and interactive component adheres to **WCAG 2.1 Level AA** guidelines.

---

## 1. Keyboard Navigation & Focus Management

### Tab Order & Focus Rings
- Logical tab sequence follows visual reading order (Sidebar Navigation $\rightarrow$ Top Header Controls $\rightarrow$ Main Dashboard Content $\rightarrow$ Quick Access Cards).
- All interactive elements display a high-visibility focus ring (`focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`).
- Skip-to-content link allows keyboard and screen-reader users to bypass repetitive navigation menus immediately.

### Modal & Drawer Focus Trapping
- Built on **Radix UI** dialog and sheet primitives.
- Opening a modal automatically traps keyboard focus inside the dialog boundary.
- Pressing `Escape` closes the active overlay and returns focus to the exact trigger button that initiated it.

---

## 2. Screen Reader & ARIA Standards

### Dynamic Status Announcements
Real-time campus modules utilize polite ARIA live regions so visually impaired users receive non-intrusive updates:
- **Transit Hub**: Bus arrival countdown changes use `aria-live="polite"` and `aria-atomic="true"`.
- **Food Court**: Order token status transitions (`Preparing` $\rightarrow$ `Ready for Pickup`) trigger assertive screen-reader notifications (`role="status"`).

### Semantic Landmarks
- `<aside aria-label="Main Navigation">` for the campus sidebar.
- `<header>` for global search, profile, and notification triggers.
- `<main id="main-content">` for primary page views.
- Explicit `aria-label` attributes on all icon-only action buttons.

---

## 3. Color Contrast & Visual Readability

| UI Element | Foreground | Background | Contrast Ratio | WCAG AA Target |
|---|---|---|---|---|
| **Primary Body Text** | `#F8FAFC` (Slate 50) | `#09090B` (Zinc 950) | `19.4 : 1` | $\ge 4.5 : 1$ (Pass AAA) |
| **Muted Metadata** | `#94A3B8` (Slate 400) | `#09090B` (Zinc 950) | `7.2 : 1` | $\ge 4.5 : 1$ (Pass AAA) |
| **Primary Accent Badge** | `#818CF8` (Indigo 400) | `#18181B` (Zinc 900) | `5.8 : 1` | $\ge 4.5 : 1$ (Pass AA) |
| **Interactive Card Border** | `rgba(255,255,255,0.12)` | `#09090B` (Zinc 950) | Non-text UI | Verified visible |

---

## 4. Reduced Motion Support
Users with `prefers-reduced-motion: reduce` enabled in their operating system settings automatically experience instant state transitions without parallax, scale-bounce, or continuous pulse animations.
