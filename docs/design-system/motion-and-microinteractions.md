# Motion Architecture, Spring Physics & Accessible Micro-Interactions

## Overview
Motion in Uni-Verse is designed to convey state changes, clarify spatial relationships, and provide tactile feedback without compromising performance or causing vestibular discomfort. This specification defines our **Framer Motion Spring Physics Tokens**, animation duration budgets ($\le 300\text{ ms}$), hardware-accelerated GPU pipelines, and accessible reduced-motion fallbacks.

---

## 1. Physics-Based Spring Tokens (Framer Motion)

Uni-Verse uses natural spring dynamics rather than synthetic ease-in-out bezier curves:

```typescript
export const motionTokens = {
  // Snappy spring for button clicks and card press states
  tapFeedback: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.5,
  },

  // Responsive spring for interactive card hovers and lift states
  cardHover: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },

  // Smooth critically damped spring for modal sheets and overlays
  modalEntrance: {
    type: "spring",
    stiffness: 300,
    damping: 32,
    mass: 1.0,
  },
} as const;
```

---

## 2. Animation Frame Budgets & Execution Constraints

To maintain an unyielding 60 FPS on mobile devices:
1. **Duration Caps**: Micro-interactions must complete in $\le 200\text{ ms}$. Complex modal presentations must complete in $\le 300\text{ ms}$.
2. **Strict Property Whitelist**: Animations are constrained exclusively to GPU-composited properties:
   - Allowed: `transform: translate3d(), scale()`, `opacity`.
   - Strictly Forbidden: `top`, `bottom`, `left`, `right`, `width`, `height`, `margin`, `padding`, `filter`.
3. **No Continuous Idle Loops**: Decorative infinite pulse or rotation loops are prohibited unless indicating active loading progress.

---

## 3. Accessible Reduced Motion Standard (WCAG 2.1 AA)

Users with vestibular disorders or motion sensitivity can experience nausea from spatial movement and parallax scaling. When `prefers-reduced-motion: reduce` is detected:

```typescript
import { useReducedMotion } from 'framer-motion';

export function AccessibleCard({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const animationVariants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 12 // Eliminate vertical translation
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.25 
      }
    },
  };

  return <motion.div variants={animationVariants}>{children}</motion.div>;
}
```

- Spatial translations (`x`, `y`, `scale`) collapse to zero.
- Transitions convert to instantaneous cross-fades ($< 100\text{ ms}$).
