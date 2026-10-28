# RFC: Modular Micro-Frontend Architecture & Cross-Domain Event Bus

## Status: Proposed / Architectural RFC
**Target Version**: Uni-Verse v2.0  
**Domain**: Frontend Architecture & Sub-Module Isolation  

---

## 1. Context & Motivation

As Uni-Verse expands to encompass diverse campus domains (Academics, Dining & Cafeteria, Transport & Bus Telemetry, Career & Placements), maintaining a single monolithic bundle presents architectural challenges:
- **Independent Deployment**: Changes to the food court menu should not risk regressions in the grade tracker or require full-app rebuilds.
- **Domain Team Autonomy**: Student engineering clubs managing specific sub-apps (e.g. Bus Tracking Team) should own isolated repositories and deploy independently.
- **Selective Hydration**: Mobile users checking bus departure times should not download heavy charting libraries used in the Career Predictor.

---

## 2. Architecture: Vite Module Federation

```
+-------------------------------------------------------------------+
|                     Host Shell (Uni-Verse Core)                   |
|        - Root Layout, Global Navigation & Authentication          |
|        - Shared Theme Context, Audio/Haptic Engine                |
|        - Cross-Domain Message Bus                                 |
+-------------------------------------------------------------------+
          |                         |                        |
          v (Dynamic Import)        v (Dynamic Import)       v (Dynamic Import)
+-----------------------+ +--------------------+ +--------------------+
|  Remote: Academics    | |  Remote: Transit   | |  Remote: Dining    |
|  (Notes, Grades, GPA) | |  (Bus GPS, Routes) | |  (Orders, Stalls)  |
+-----------------------+ +--------------------+ +--------------------+
```

### Shared Dependency Singletons
To eliminate duplicate runtime libraries across remotes, the host federates core runtime singletons:
```typescript
// vite.config.ts (Host Shell)
federation({
  name: 'universe_host',
  remotes: {
    transit: 'https://transit.universe-campus.org/assets/remoteEntry.js',
    dining: 'https://dining.universe-campus.org/assets/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.3.0' },
    '@tanstack/react-query': { singleton: true },
    'lucide-react': { singleton: true },
  },
})
```

---

## 3. Decoupled Cross-Domain Event Bus

Remotes communicate without tight coupling via a type-safe browser `CustomEvent` bus:

```typescript
export interface CampusEventMap {
  'uni:auth:session-expired': { reason: string };
  'uni:cart:item-added': { vendorId: string; itemId: string; count: number };
  'uni:transit:emergency-delay': { routeId: string; delayMinutes: number };
  'uni:theme:changed': { mode: 'dark' | 'light' };
}

export class CampusEventBus {
  static emit<K extends keyof CampusEventMap>(event: K, payload: CampusEventMap[K]): void {
    window.dispatchEvent(new CustomEvent(event, { detail: payload }));
  }

  static on<K extends keyof CampusEventMap>(
    event: K,
    handler: (payload: CampusEventMap[K]) => void
  ): () => void {
    const listener = (e: Event) => handler((e as CustomEvent).detail);
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }
}
```

---

## 4. Fallback & Resilience (Degraded Remote Shells)

When a micro-frontend remote fails to load due to network partition:
1. **Error Boundary Fallback**: The host renders a scoped "Module Temporarily Unavailable" glass card.
2. **Heartbeat Poll**: Background health check probes the remote's `health.json` endpoint every 30 seconds.
3. **Auto-Recovery**: When healthy, the component automatically re-attempts dynamic module import without a full page reload.
