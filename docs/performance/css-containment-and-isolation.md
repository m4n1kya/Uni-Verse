# CSS Containment, Layout Isolation & GPU Compositing Specification

## Overview
As Uni-Verse renders complex interactive dashboards—such as real-time bus telemetry tickers, animated food court status chips, and dynamic e-book card filters—uncontrolled DOM mutations can trigger expensive browser reflows across the entire document tree. This specification defines our **CSS Containment (`contain`) Rules**, layout boundary isolation, and GPU compositing guidelines to sustain a rock-solid 60 FPS frame budget ($16.6\text{ ms}$ per frame).

---

## 1. The Rendering Pipeline & Reflow Prevention

```
Traditional DOM Reflow (Uncontained):
DOM Mutation in [Bus Card] ---> Recalculate Styles ---> Reflow ENTIRE Page Layout ---> Repaint All ---> Composite

Optimized CSS Containment (Contained):
DOM Mutation in [Bus Card] ---> Scoped Layout Recalculation ---> Repaint [Bus Card] ONLY ---> Composite
```

---

## 2. CSS Containment Directives by Component Type

The CSS `contain` property informs the browser's layout engine that an element's subtree is independent of the rest of the document tree:

```css
/* Applied to repeated dashboard widgets and cards */
.contained-card {
  contain: layout paint;
  content-visibility: auto;
  contain-intrinsic-size: 1px 320px;
}

/* Applied to live updating telemetry badges (Bus arrival counter, cart badge) */
.contained-badge {
  contain: layout style;
}
```

### Directive Matrix

| Directive | Scope | Applied In Uni-Verse | Performance Advantage |
|---|---|---|---|
| `contain: layout` | Isolates layout recalculations to element boundary | Quick Access Cards, Transit route cards | Outer DOM nodes never shift or recompute geometry |
| `contain: paint` | Clips descendants; offscreen elements skip painting | Modal drawers, collapsible accordion content | Offscreen content consumes zero GPU rasterization |
| `contain: style` | Prevents CSS counters and quotes from leaking | Dynamic notification list items | Scopes style invalidation trees |
| `contain: strict` | Combines `layout`, `paint`, `size`, `style` | Fixed-dimension map and chart containers | Maximum browser optimization |

---

## 3. GPU Compositor Layer Management (`will-change`)

Promoting elements to their own GPU compositor layer eliminates CPU rasterization during animations. However, excessive layer creation exhausts VRAM on mobile devices.

### Rules of Engagement
1. **Never Apply `will-change` Permanently in Base CSS**:
   ```css
   /* Anti-Pattern: Permanently consumes VRAM for hundreds of cards */
   .card { will-change: transform, opacity; }
   ```
2. **Apply JIT (Just-In-Time) on Hover/Focus**:
   ```css
   /* Optimized: Promotes to GPU compositor only when interaction is imminent */
   .card:hover {
     will-change: transform;
   }
   ```
3. **Limit to Hardware-Accelerated Properties**: Only animate `transform` and `opacity`. Never animate `top`, `left`, `margin`, `padding`, `width`, or `height`.

---

## 4. Compositing Audit & Layer Verification

During release QA, Chrome DevTools $\rightarrow$ **More tools** $\rightarrow$ **Layers** verifies:
- Total compositor layers $< 30$ on desktop and $< 15$ on mobile.
- "Scrolling contents layer" exists for virtualized containers.
- Zero "slow scroll rects" or uncontainable layout recalculations during rapid scroll gestures.
