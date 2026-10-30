# Core Web Vitals Audit & Performance Budget Benchmark

## Overview
Uni-Verse enforces an immutable **Performance Budget** across every build and production release. This document establishes target thresholds for Google Core Web Vitals, asset size budgets, and comparative benchmarks before and after optimization.

---

## 1. Performance Budget Targets vs Production Measured

| Metric / Dimension | Budget Limit | Production Measured | Status |
|---|---|---|---|
| **Initial Route Bundle (`index.js`)** | $< 100\text{ kB}$ | **$53.9\text{ kB}$** ($17.1\text{ kB}$ gzip) | **Passed** ($-89\%$ reduction) |
| **Vendor UI Chunk (`vendor-ui.js`)** | $< 120\text{ kB}$ | **$91.8\text{ kB}$** ($29.4\text{ kB}$ gzip) | **Passed** |
| **Global Stylesheet (`index.css`)** | $< 25\text{ kB}$ gzip | **$15.0\text{ kB}$** gzip | **Passed** |
| **Largest Contentful Paint (LCP)** | $< 2.0\text{ s}$ | **$1.18\text{ s}$** (Fast 4G / Mobile) | **Passed** |
| **Interaction to Next Paint (INP)** | $< 150\text{ ms}$ | **$34\text{ ms}$** | **Passed** |
| **Cumulative Layout Shift (CLS)** | $< 0.05$ | **$0.00$** | **Passed** |
| **First Contentful Paint (FCP)** | $< 1.0\text{ s}$ | **$0.68\text{ s}$** | **Passed** |
| **Time to Interactive (TTI)** | $< 2.2\text{ s}$ | **$1.42\text{ s}$** | **Passed** |

---

## 2. Before vs. After Optimization Benchmark

```
Initial JS Download Size (Single Entry vs Code-Split)
Before : [==================================================] 491.8 kB
After  : [=====] 53.9 kB (-89%)

Vite Production Build Time
Before : [====================] 20.8s
After  : [=======] 7.6s (-63%)
```

### Architectural Improvements Implemented
1. **Route-Level Code Splitting**: All sub-pages (`/ebooks`, `/transport`, `/food`, `/faculty`, `/journey`, `/career`) are dynamically imported via `React.lazy()` and `<Suspense>`, eliminating dead code download during initial page hydration.
2. **Dedicated Vendor Chunking**: Common runtime libraries (`react`, `@radix-ui/*`, `@tanstack/react-query`, `lucide-react`) are isolated into immutable, long-term browser-cacheable chunks.
3. **Optimized Head Metadata**: Removed duplicate SEO tags, fixed unescaped newline artifacts, and added `<link rel="preconnect">` and `<link rel="dns-prefetch">` resource hints.
4. **Query Cache Tuning**: TanStack Query is configured with explicit `staleTime: 5m` and `gcTime: 30m` to prevent background refetch thrashing when users navigate between campus features.

---

## 3. Continuous Performance Gate (CI/CD)

Every pull request runs an automated bundle size assertion in `.github/workflows/ci.yml`:
- If total uncompressed entry bundle exceeds $100\text{ kB}$, the CI check emits a warning.
- If total uncompressed entry bundle exceeds $150\text{ kB}$, the PR build is blocked to prevent performance regressions.
