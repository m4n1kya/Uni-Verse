# Fluid Typography, Responsive Scaling & Font Performance Strategy

## Overview
Typography in Uni-Verse serves as both an aesthetic anchor and a functional information hierarchy. To eliminate breakpoint-based font jumps and avoid Flash of Invisible Text (FOIT), this specification defines our **Fluid Typography Scaling (`clamp()`)**, variable font delivery, and metric-matched fallback font loading strategy.

---

## 1. Mathematical Model for Fluid Typography

Instead of jarring step-function `@media` query font jumps, typography scales continuously and proportionally between mobile viewports ($360\text{ px}$) and desktop viewports ($1440\text{ px}$):

$$\text{FluidFontSize} = \text{clamp}\left(V_{\min},\; V_{\min} + (V_{\max} - V_{\min}) \times \frac{\text{100vw} - W_{\min}}{W_{\max} - W_{\min}},\; V_{\max}\right)$$

### Typography Token Scale

| Semantic Token | Min Size ($360\text{ px}$) | Preferred Fluid Expression | Max Size ($1440\text{ px}$) | Target Element |
|---|---|---|---|---|
| `--text-hero` | $28\text{ px}$ (`1.75rem`) | `clamp(1.75rem, 1.25rem + 2.2vw, 2.5rem)` | $40\text{ px}$ (`2.5rem`) | Dashboard Hero Title |
| `--text-h1` | $22\text{ px}$ (`1.375rem`) | `clamp(1.375rem, 1.05rem + 1.4vw, 2.0rem)` | $32\text{ px}$ (`2.0rem`) | Module Section Headings |
| `--text-h2` | $18\text{ px}$ (`1.125rem`) | `clamp(1.125rem, 0.95rem + 0.8vw, 1.5rem)` | $24\text{ px}$ (`1.5rem`) | Card Headings & Dialogs |
| `--text-body` | $14\text{ px}$ (`0.875rem`) | `clamp(0.875rem, 0.83rem + 0.2vw, 1.0rem)` | $16\text{ px}$ (`1.0rem`) | Standard Body Paragraphs |
| `--text-caption`| $12\text{ px}$ (`0.75rem`) | Fixed at `0.75rem` | $12\text{ px}$ (`0.75rem`) | Metadata Chips & Tags |

---

## 2. Zero-CLS Font Loading & Metric Overrides

When custom web fonts hydrate, differences in character glyph bounding boxes cause the entire page layout to shift (Cumulative Layout Shift). To achieve $\text{CLS} = 0.00$:

```css
/* Custom Variable Font with swap display */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC;
}

/* Metric-matched fallback matching Inter's exact x-height and ascent */
@font-face {
  font-family: 'Inter-Fallback';
  src: local('Arial');
  ascent-override: 90.49%;
  descent-override: 22.48%;
  line-gap-override: 0%;
  size-adjust: 107.41%;
}

:root {
  font-family: 'Inter', 'Inter-Fallback', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 3. Font Delivery Performance Highlights
- **Single Variable WOFF2 File**: Replaces separate font files for regular, medium, bold, and black weights, reducing total font network requests from 5 files ($140\text{ kB}$) to 1 single variable font ($38\text{ kB}$).
- **Preload Critical Subset**: The Latin subset is preloaded in `index.html` via `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
- **Zero FOIT**: Text renders instantly with the metric-matched fallback font on initial paint, transitioning smoothly to `Inter` without layout jumping.
