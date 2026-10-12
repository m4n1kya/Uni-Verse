# Frontend Performance & Asset Optimization

## Overview
Uni-Verse is engineered for maximum responsiveness across low-power mobile devices and campus Wi-Fi networks. This document details our bundle architecture, rendering performance strategies, and image asset delivery.

---

## 1. Vite Bundle Architecture & Code Splitting

### Route-Level Lazy Loading
All major sub-applications and dashboards are dynamically imported using \`React.lazy()\` and wrapped in \`<Suspense>\`:
\`\`\`tsx
const FoodCourtPage = React.lazy(() => import('@/pages/FoodCourtPage'));
const TransportHub = React.lazy(() => import('@/pages/TransportHub'));
const CareerHub = React.lazy(() => import('@/pages/CareerHub'));
\`\`\`
This reduces the initial JavaScript chunk size to under 150 kB gzipped, allowing instantaneous dashboard rendering.

### Vendor Chunking
Third-party libraries (Lucide React, Radix UI primitives, date utilities) are chunked separately so user browsers can cache vendor bundles indefinitely across frequent application feature updates.

---

## 2. React Rendering Optimization

1. **Context Granularity**: UI state (dark mode, notification badge counts, cart item totals) is isolated into separate React Context providers to prevent whole-tree re-renders on minor state mutations.
2. **Memoization Disciplines**:
   - Complex filter/search operations on student courses and faculty lists utilize \`useMemo\`.
   - Event callback handlers passed to deeply nested card lists utilize \`useCallback\`.
   - Reusable UI atoms (cards, badges, buttons) are wrapped in \`React.memo\` where prop equality checks yield measurable performance gains.

---

## 3. Image & Visual Asset Delivery

- **Modern Formats**: All photographic campus assets are stored in modern WebP / AVIF formats with compressed PNG fallbacks.
- **Lazy Loading**: Non-critical hero and vendor card images specify \`loading="lazy"\` and explicit width/height dimensions to eliminate Cumulative Layout Shift (CLS = 0).
- **CSS GPU Acceleration**: Transform animations and opacity fades leverage hardware acceleration via \`transform: translateZ(0)\` and \`will-change\` CSS rules.

---

## 4. Core Web Vitals Targets

| Metric | Target Threshold | Production Average |
|---|---|---|
| **Largest Contentful Paint (LCP)** | < 2.0s | ~1.2s |
| **First Input Delay (FID) / INP** | < 100ms | ~32ms |
| **Cumulative Layout Shift (CLS)** | < 0.05 | 0.00 |
| **First Contentful Paint (FCP)** | < 1.0s | ~0.7s |
