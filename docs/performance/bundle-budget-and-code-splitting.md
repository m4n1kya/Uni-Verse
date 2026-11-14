# Production Bundle Budgets, Code-Splitting Architecture & Caching Runbook

## Overview
Uni-Verse delivers an expansive super-app experience across 8 primary sub-modules without compromising initial load speed. This document defines the engineering standards for **Core Web Vitals performance budgets**, **route-level code-splitting boundaries**, **Rollup chunk topology**, and **edge cache-invalidation policies**.

---

## 1. Core Web Vitals Performance Budgets

Every production deployment is benchmarked against strict performance budgets enforced in synthetic CI audits and real user monitoring (RUM):

| Metric | Target Budget | Warning Threshold | Optimization Technique Applied |
|---|---|---|---|
| **LCP (Largest Contentful Paint)** | $< 1.2\text{ s}$ | $> 2.0\text{ s}$ | `fetchPriority="high"` on hero image, eliminated render-blocking `@import` fonts, direct Google Fonts preconnect |
| **INP (Interaction to Next Paint)** | $< 80\text{ ms}$ | $> 150\text{ ms}$ | Concurrent React 18 transitions, lightweight local UI states, debounced search filters |
| **CLS (Cumulative Layout Shift)** | $< 0.05$ | $> 0.10$ | Fixed aspect-ratio image wrappers (`aspect-[3/4]`), font-display swap, non-shifting skeleton placeholders |
| **FCP (First Contentful Paint)** | $< 0.8\text{ s}$ | $> 1.5\text{ s}$ | Inline critical CSS, preconnected font origins, route-level code splitting |
| **Total JavaScript Initial Chunk** | $< 170\text{ kB}$ (gzipped) | $> 250\text{ kB}$ | Manual chunk vendor segregation, dynamic route import boundaries |

---

## 2. Route-Level Code-Splitting Topology

Uni-Verse segments all secondary page views into lazy-loaded chunks using React `lazy` and `Suspense`:

```tsx
// src/App.tsx
const Index = lazy(() => import("./pages/Index"));
const EBooks = lazy(() => import("./pages/EBooks"));
const Transport = lazy(() => import("./pages/Transport"));
const FoodCourt = lazy(() => import("./pages/FoodCourt"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Journey = lazy(() => import("./pages/Journey"));
const Career = lazy(() => import("./pages/Career"));
const NotFound = lazy(() => import("./pages/NotFound"));
```

### Benefits
- **Zero Idle Code Delivery**: A user visiting the home dashboard downloads only `Index.js` and shared framework runtimes; heavy modules like `Career.js` (with company dataset arrays) or `EBooks.js` are never requested until the user navigates there.
- **Micro-Chunk Loading**: Secondary routes range between **5 KB** and **50 KB**, downloading within $15\text{ ms}$ on 4G networks.

---

## 3. Rollup Manual Chunk Allocation

In `vite.config.ts`, third-party vendor dependencies are partitioned into dedicated immutable chunks:

```ts
rollupOptions: {
  output: {
    manualChunks: {
      "vendor-react": ["react", "react-dom", "react-router-dom"],
      "vendor-ui": [
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-tooltip",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      "vendor-query": ["@tanstack/react-query"],
    },
  },
}
```

### Chunk Isolation Rationale
1. **Long-Term Browser Caching**: Core React runtime (`vendor-react-*.js`) changes rarely across releases. End users maintain this chunk in their persistent browser cache indefinitely.
2. **Parallel Asset Streaming**: Multiple smaller parallel HTTP/2 & HTTP/3 multiplexed requests resolve faster than single monolithic bundles.

---

## 4. Asset Inlining & Asset Pipeline Configuration

```ts
build: {
  target: "es2020",
  cssCodeSplit: true,
  cssMinify: true,
  assetsInlineLimit: 4096, // Inlines SVGs / micro-assets < 4KB as Base64 URI
  modulePreload: {
    polyfill: true,
  },
}
```

- **`assetsInlineLimit: 4096`**: Prevents discrete roundtrips for micro icons and decorations.
- **`cssCodeSplit: true`**: Guarantees CSS rules for unvisited modules do not block the critical rendering path of current views.

---

## 5. Edge CDN & Browser Caching Directives

On Vercel / Cloudflare Edge networks, HTTP caching headers are partitioned by asset volatility:

### 5.1 Hashed Assets (`/dist/assets/*-[hash].js`, `*-[hash].css`, `*-[hash].png`)
```http
Cache-Control: public, max-age=31536000, immutable
```
*Because Vite embeds content hashes in filenames, these assets can be safely cached for 1 full year.*

### 5.2 Application Shell (`/index.html`)
```http
Cache-Control: public, max-age=0, must-revalidate
```
*Guarantees users immediately receive new asset hash pointers upon every production deployment.*
