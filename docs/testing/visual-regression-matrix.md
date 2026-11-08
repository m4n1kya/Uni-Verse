# Automated Cross-Browser Visual Regression Testing Matrix

## Overview
Because Uni-Verse features pitch-black dark styling (`#09090b`), translucent glassmorphic blur layers (`backdrop-blur-md`), and intricate gradient accents, CSS adjustments can introduce subtle layout breaks or color contrast shifts across different browser rendering engines. This specification defines our **Automated Visual Regression Testing Matrix** powered by **Playwright** and pixel-diff budgets.

---

## 1. Browser Engine & Viewport Test Matrix

```
[Playwright Test Runner (CI Runner)]
                  |
         +--------+--------+
         |                 |                 |
         v                 v                 v
[Chromium (Blink)]  [WebKit (Safari)]  [Firefox (Gecko)]
 - Desktop 1920x1080 - Desktop 1440x900 - Desktop 1366x768
 - Pixel 7 (Mobile)  - iPhone 15 (iOS)  - Tablet 768x1024
```

### Coverage Scope by Route

| Route View | Primary Visual Elements Tested | Viewports Evaluated | Pixel Diff Threshold |
|---|---|---|---|
| **`/` (Dashboard)** | Hero banner, Quick Access glass grid, BottomNav | Desktop, Tablet, Mobile | $\le 0.05\%$ |
| **`/food` (Food Court)** | Stall cards, Veg/Non-Veg chips, Cart drawer | Desktop, Mobile | $\le 0.10\%$ |
| **`/transport` (Transit)**| Route cards, live bus map markers, status badges| Desktop, Mobile | $\le 0.10\%$ |
| **`/career` (Career Hub)**| Placement company grid, filter chips, salary bars| Desktop, Tablet | $\le 0.08\%$ |

---

## 2. Dynamic State Stabilization Rules

To eliminate false-positive snapshot diffs caused by font smoothing differences, real-time timers, or random data:

```typescript
// tests/visual/visual-helpers.ts
import { Page } from '@playwright/test';

export async function stabilizePageForSnapshot(page: Page) {
  // 1. Freeze system clock to a fixed reference time
  await page.clock.setFixedTime(new Date('2026-11-08T12:00:00Z'));

  // 2. Enforce reduced motion to stop CSS transforms and spring oscillations
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // 3. Wait until all web fonts are loaded
  await page.evaluate(() => document.fonts.ready);

  // 4. Hide volatile dynamic elements (e.g. real-time live seconds countdown)
  await page.addStyleTag({
    content: `
      [data-testid="live-timer"],
      [data-testid="random-avatar"] {
        visibility: hidden !important;
      }
    `,
  });
}
```

---

## 3. Pixel Tolerance Budget & CI Reporting

- **Strict Pixel Threshold**: Snapshots fail if pixel differences exceed **$0.1\%$** ($\Delta > 0.001$).
- **Color Threshold**: `threshold: 0.2` in pixelmatch to tolerate minor sub-pixel font anti-aliasing variations between Linux CI runners and macOS developer workstations.
- **Automated Pull Request Diffs**: When a visual regression fails in GitHub Actions, an automated comment uploads an interactive slider carousel showing *Baseline*, *Current*, and *Diff (Highlighted in Red)* images.
