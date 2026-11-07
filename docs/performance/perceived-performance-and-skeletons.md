# Perceived Performance, Skeleton Placeholders & Progressive Hydration

## Overview
Actual load latency is governed by physical network constraints, but **Perceived Performance** is governed by visual interface design. Displaying generic full-screen blocking spinners makes an app feel sluggish and broken. Uni-Verse implements **Content-Shaped Skeleton Placeholders**, hardware-accelerated shimmer animations, and a **Three-Tier Progressive Hydration** model that makes interactions feel instantaneous.

---

## 1. Psychology of Perceived Latency & Skeleton Design

```
Spinner Loading Pattern (High Perceived Waiting Time):
[Blank Screen + Spinning Loader] ===================> [Sudden Content Pop]

Uni-Verse Progressive Skeleton Pattern (Low Perceived Waiting Time):
[Layout Shell (0ms)] ---> [Content-Shaped Skeletons (10ms)] ---> [Smooth Cross-Fade into Data]
```

### Key Perceived Performance Gains
- **Layout Geometry Pre-allocation**: Skeletons match the exact dimensions and aspect ratios of incoming data cards, preventing layout jumps and guaranteeing $\text{CLS} = 0$.
- **Cognitive Preparation**: The skeleton outlines prime the user's eye to receive the data structure before the network payload arrives.

---

## 2. Hardware-Accelerated CSS Shimmer Architecture

Many skeleton implementations use JavaScript timers or animate background-position, causing continuous CPU repaints. Uni-Verse implements pure GPU compositor shimmers:

```css
/* Skeleton container with dark theme base */
.skeleton-card {
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
}

/* Shimmer highlight animated strictly via transform */
.skeleton-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: skeleton-shimmer 1.6s infinite ease-in-out;
  will-change: transform;
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}
```

---

## 3. Three-Tier Progressive Hydration Architecture

```
Tier 1: Shell & Navigation Bar (0ms)
  - Synchronous static layout shell, sidebar, and header controls render immediately.

Tier 2: Cached Local Data (10ms - 30ms)
  - Reads last known transit schedules, enrolled courses, and food menus from IndexedDB.
  - User can immediately view data without seeing a blank state.

Tier 3: Network Reconciliation & Live Stream (150ms - 400ms)
  - TanStack Query reconciles stale local data with fresh origin responses.
  - Active WebSocket streams connect and inject real-time GPS coordinate deltas seamlessly.
```

---

## 4. Accessibility During Skeleton States
- Skeletons are marked with `aria-hidden="true"` to prevent screen readers from reading empty repetitive placeholder elements.
- The parent container declares `aria-busy="true"` and an `aria-live="polite"` status message (e.g., *"Loading bus schedules..."*) so assistive technology users receive non-intrusive status context.
