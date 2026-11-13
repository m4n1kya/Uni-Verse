# Keyboard Navigation Standards, Focus Trapping & Accessibility Runbook

## Overview
Uni-Verse is engineered to be fully operable via keyboard without requiring a mouse or pointer device. This document defines the engineering standards for focus order, focus-visible indicators, modal focus trapping, global shortcuts, and screen-reader live announcements conforming to **WCAG 2.1 Level AA (Criterion 2.1.1, 2.1.2, 2.4.3, 2.4.7)**.

---

## 1. Focus Management & `:focus-visible` Architecture

### 1.1 Contrast & Geometry Tokens
All interactive elements (buttons, links, form inputs, modal controls) must exhibit an unmistakable, high-contrast visual focus ring when engaged via keyboard navigation:

```css
/* Global Keyboard Focus Ring Token */
:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  box-shadow: 0 0 12px hsl(var(--primary) / 0.4);
}

/* Suppress focus rings on pointer click while preserving keyboard accessibility */
:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

### 1.2 Skip-to-Content Implementation
To prevent keyboard users from tabbing through repetitive sidebar navigation links on every page load, a hidden skip link is anchored at the top of the DOM:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:shadow-2xl"
>
  Skip to main content
</a>
```

---

## 2. Modal & Drawer Focus Trapping

When a modal dialog opens (e.g., Student Sign In, Vendor Menu, Course Details, Year Roadmap):

1. **Initial Focus Placement**: Focus is immediately moved to the primary interactive element (e.g., email input or close button).
2. **Keyboard Trapping**: Pressing `Tab` from the last focusable element cycles back to the first focusable element. Pressing `Shift+Tab` from the first element cycles to the last.
3. **Escape Key Dismissal**: Pressing `Escape` closes the modal immediately and restores focus to the invoking trigger element.
4. **Body Scroll Lock**: Background scrolling is disabled with `overflow: hidden` on `document.body`.

### Reusable Focus Trap Hook Pattern
```tsx
export function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, containerRef]);
}
```

---

## 3. Global Keyboard Shortcuts Registry

Uni-Verse exposes consistent keyboard shortcuts to accelerate common student workflows:

| Key Binding | Scope | Action |
|---|---|---|
| `⌘ + K` or `Ctrl + K` | Global | Focus global search / command palette |
| `Esc` | Global | Dismiss active modal, drawer, or dropdown menu |
| `?` or `Shift + /` | Global | Open Keyboard Shortcuts Help cheatsheet |
| `←` / `→` (Arrow Keys) | Content Rails | Scroll horizontal content rails (Featured Modules, Specials) |
| `Space` / `Enter` | Interactive Tiles | Trigger card navigation or module selection |

---

## 4. Dynamic ARIA Live Region Protocols

When asynchronous state updates occur without a full page refresh (e.g., live shuttle ETA updates, food cart mutations, real-time GPA predictions), screen readers must be informed without disrupting user focus:

```tsx
{/* Cart Live Counter */}
<div 
  aria-live="polite" 
  aria-atomic="true" 
  className="sr-only"
>
  {cart.length > 0 
    ? `Cart updated: ${cart.reduce((s, c) => s + c.quantity, 0)} items, total ₹${totalAmount}`
    : "Cart is empty"}
</div>
```

- **`aria-live="polite"`**: Used for standard state updates (transit schedule refresh, filter changes, cart recalculation).
- **`aria-live="assertive"`**: Reserved strictly for critical campus emergencies, severe weather halts, or connectivity disconnects.

---

## 5. Automated CI Verification

Our automated accessibility test suite (`tests/e2e/keyboard-navigation.spec.ts`) runs in Playwright:
1. Verifies that all routes can be navigated end-to-end using `page.keyboard.press('Tab')`.
2. Asserts zero keyboard traps outside intentionally modal containers.
3. Confirms contrast ratios of `:focus-visible` indicators exceed $3:1$ against adjacent backgrounds.
