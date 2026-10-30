# Runtime Rendering & React Memoization Optimization Guide

## Overview
Uni-Verse is engineered for seamless 60 FPS client responsiveness across low-power student devices. While build-time code-splitting minimizes network payload, runtime rendering discipline ensures smooth scrolling, instantaneous input typing, and minimal garbage collection pauses.

---

## 1. Component Re-render Isolation

### Context State Partitioning
Placing multiple frequently updating state fields into a single global React Context triggers cascading re-renders across all consumer components. Uni-Verse segregates contexts into isolated boundaries:

```
+-------------------------------------------------------------+
|                     Application Providers                   |
+-------------------------------------------------------------+
        |                                      |
        v                                      v
+-----------------------+              +-----------------------+
|  Static Theme Context |              | Active Query Context  |
|  (Never re-renders)   |              | (Scoped to child rail)|
+-----------------------+              +-----------------------+
        |                                      |
        v                                      v
 [Navigation Shell]                    [Live Bus Telemetry]
```

---

## 2. Memoization Disciplines (`React.memo`, `useMemo`, `useCallback`)

### Cost-Benefit Evaluation
Memoization carries memory overhead for storing dependency arrays and previous return values. It is applied strategically based on computational complexity:

| Scenario | Optimization Applied | Rationale |
|---|---|---|
| **Complex Search Filtering** (e.g. 40+ recruiting companies) | `useMemo` | Avoids re-sorting/filtering arrays on unrelated re-renders |
| **List Row Action Callbacks** (e.g. food cart increment/decrement) | `useCallback` | Preserves referential stability for memoized card atoms |
| **Pure Presentation Cards** (e.g. `ContentCard`, `HeroBanner`) | `React.memo` with shallow prop compare | Prevents DOM reconciliation when parent view updates |

### Implementation Example: Company Search Filter
```tsx
const filteredCompanies = useMemo(() => {
  if (!searchQuery.trim() && selectedCategory === 'all') {
    return companiesData;
  }
  const query = searchQuery.toLowerCase();
  return companiesData.filter(company => 
    company.name.toLowerCase().includes(query) &&
    (selectedCategory === 'all' || company.category === selectedCategory)
  );
}, [searchQuery, selectedCategory]);
```

---

## 3. Virtualization & DOM Node Management

For high-cardinality views (e.g. faculty directory with 200+ professors or e-book archives with 50+ downloadable PDFs):
- **Windowing Threshold**: When a list exceeds 30 complex cards, DOM windowing (`tanstack-virtual` or CSS content-visibility) renders only items currently within the active viewport $\pm 200\text{ px}$.
- **`content-visibility: auto`**: Applied to below-the-fold content rails and modal sections:
  ```css
  .below-fold-section {
    content-visibility: auto;
    contain-intrinsic-size: 1px 400px;
  }
  ```
  This skips layout calculation and painting until the user scrolls near the section, saving up to $150\text{ ms}$ of main-thread execution on mobile devices.

---

## 4. Layout Thrashing & CSS GPU Acceleration

### Eliminating Forced Synchronous Layouts
- Never interleave style writes with layout reads (`element.offsetHeight`, `getBoundingClientRect()`).
- Use CSS Transforms and Opacity rather than top/left/width/height for animations to keep animation cycles on the GPU compositor thread:
  ```css
  /* Optimized - Zero reflow */
  .card-hover-lift {
    transform: translateY(0);
    transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }
  .card-hover-lift:hover {
    transform: translateY(-4px);
  }
  ```
