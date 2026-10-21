# Progressive Web App (PWA) & Offline Caching Specification

## Overview
Uni-Verse is designed as a high-performance campus super-app. Because campus Wi-Fi coverage can fluctuate between lecture halls, hostel blocks, and transit shuttles, Uni-Verse implements a robust **Offline-First** caching architecture powered by modern Service Workers and client-side storage.

---

## 1. Service Worker Caching Strategies

Uni-Verse employs hybrid Workbox-compatible caching strategies tailored to data volatility:

| Resource Type | Strategy | Cache Name | Expiration / Max Entries |
|---|---|---|---|
| **Static Assets** (`.js`, `.css`, fonts) | `CacheFirst` | `universe-static-v1` | 365 days / 60 entries (immutable hashes) |
| **Course Notes & PDFs** | `CacheFirst` | `universe-documents-v1` | 30 days / 100 entries (LRU purge) |
| **Campus Map Tiles & SVGs** | `StaleWhileRevalidate` | `universe-media-v1` | 14 days / 50 entries |
| **Bus Tracker & GPS Telemetry** | `NetworkOnly` with fallback | `universe-runtime-v1` | No cache (real-time streaming) |
| **Cafeteria Menus & Specials** | `NetworkFirst` (3s timeout) | `universe-data-v1` | 24 hours / 20 entries |

---

## 2. Web App Manifest & Installation

The application provides an installable mobile experience across iOS (Safari Add to Home Screen) and Android (Chromium WebAPK):

```json
{
  "name": "Uni-Verse Academic Super-App",
  "short_name": "Uni-Verse",
  "description": "Unified campus platform for academics, transit, dining, and career",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#09090b",
  "theme_color": "#09090b",
  "icons": [
    {
      "src": "/placeholder.svg",
      "sizes": "192x192 512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 3. Background Sync & Network Resiliency

### Offline Action Queue
When a user performs actions without active connectivity (e.g., bookmarking a course syllabus, queuing a food order, or marking an attendance reminder):
1. **Queue Dispatch**: The action payload is persisted to an IndexedDB outbox queue.
2. **Connectivity Listeners**: The client listens to the `navigator.onLine` window event and Service Worker `sync` events.
3. **Automatic Replay**: Upon network reconnection, outbox requests replay in chronological sequence with idempotent request IDs (`X-Idempotency-Key`).
4. **Toast Notification**: The user receives an unobtrusive Sonner toast confirming synchronization.

---

## 4. Storage Quota & Eviction Policy

- **Target Footprint**: $< 50\text{ MB}$ client storage for typical student usage.
- **Quota Monitoring**: Checks `navigator.storage.estimate()` before caching large PDF attachments.
- **Graceful Eviction**: Least Recently Used (LRU) eviction triggers when storage exceeds 80% of available browser quota.
