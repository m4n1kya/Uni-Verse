# Iconography & SVG Asset Optimization Guidelines

## Overview
Icons in Uni-Verse communicate status, navigation paths, and interactions across campus services. To prevent UI clutter, unnecessary DOM weight, and layout shifts, this document establishes specifications for icon sizing, tree-shaking, SVG compression, and screen-reader accessibility.

---

## 1. Icon Library Standard: Lucide React

Uni-Verse standardizes on [`lucide-react`](https://lucide.dev/) for cohesive aesthetic alignment across all campus modules.

### Strict Import Pattern (Tree-Shaking)
Never import the entire icon library or use dynamic runtime resolution. Always use named imports to enable Rollup tree-shaking:

```tsx
// CORRECT: Named imports ensure only required SVGs enter the bundle
import { Compass, BookOpen, UtensilsCrossed, ShieldAlert } from 'lucide-react';

// INCORRECT: Prevents tree-shaking and bloats chunk size
// import * as Icons from 'lucide-react';
```

---

## 2. Icon Sizing & Stroke Consistency Scale

Icons must adhere to the 4px baseline grid. Stroke widths scale inversely with size to maintain perceptual weight:

| Token | Class | Pixel Size | Stroke Width | Primary Usage |
|---|---|---|---|---|
| `icon-xs` | `h-3.5 w-3.5` | $14 \times 14\text{ px}$ | $2.0\text{ px}$ | Inline badges, status tags, table micro-indicators |
| `icon-sm` | `h-4 w-4` | $16 \times 16\text{ px}$ | $1.75\text{ px}$ | Form input hints, dropdown options, breadcrumbs |
| `icon-md` | `h-5 w-5` | $20 \times 20\text{ px}$ | $1.75\text{ px}$ | Primary navigation, default button icons, list items |
| `icon-lg` | `h-6 w-6` | $24 \times 24\text{ px}$ | $1.5\text{ px}$ | Modal titles, empty state cards, service feature headers |
| `icon-xl` | `h-8 w-8` | $32 \times 32\text{ px}$ | $1.25\text{ px}$ | Hero landing sections, quick-action dashboard tiles |

---

## 3. SVG Asset Optimization (SVGO)

When custom vector illustrations or campus floorplan SVGs are introduced:

1. **Remove Hardcoded Dimensions**:
   Strip `width` and `height` attributes from the root `<svg>` tag; retain only `viewBox="0 0 24 24"`. Control dimensions exclusively via Tailwind utility classes.
2. **Dynamic Color Inheritance**:
   Set `stroke="currentColor"` or `fill="currentColor"` so icons dynamically inherit text color, dark mode themes, and hover states.
3. **Automated SVGO Compression Pipeline**:
   All raw SVG assets in `public/assets/` must pass through SVGO with the following flags:
   ```json
   {
     "plugins": [
       { "name": "removeDoctype", "active": true },
       { "name": "removeXMLProcInst", "active": true },
       { "name": "removeComments", "active": true },
       { "name": "removeMetadata", "active": true },
       { "name": "removeTitle", "active": false },
       { "name": "cleanupIds", "active": true },
       { "name": "convertPathData", "params": { "floatPrecision": 2 } }
     ]
   }
   ```

---

## 4. Accessibility (a11y) Standards for Icons

Every icon rendered in Uni-Verse must be classified as either **decorative** or **interactive**:

### 4.1 Decorative Icons (Accompanying Visible Text)
When an icon is accompanied by a descriptive text label, screen readers should ignore the icon to prevent repetitive auditory announcements:
```tsx
<button className="flex items-center gap-2">
  <BookOpen className="h-4 w-4" aria-hidden="true" />
  <span>View Course Catalog</span>
</button>
```

### 4.2 Interactive / Standalone Icon Buttons
When an icon button lacks adjacent visible text (e.g., search icon, close button, theme toggle), it **must** declare an accessible label:
```tsx
<button
  type="button"
  aria-label="Close campus notification banner"
  className="p-1 rounded-md hover:bg-muted"
>
  <X className="h-5 w-5" aria-hidden="true" />
</button>
```

---

## 5. Performance Checklist
- [x] Zero duplicate SVGs embedded across components.
- [x] All icon chunks code-split alongside their parent route components.
- [x] Unused icon variants pruned during production build via Rollup tree-shaking.
- [x] Zero Cumulative Layout Shift (CLS) from late-loading SVG geometries.
