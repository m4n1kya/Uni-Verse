# Data Architecture: Client-Side Offline Sync Engine

## Overview
Uni-Verse uses a **Local-First** data synchronization model to provide zero-latency UI interactions and seamless offline operation. When network connectivity drops, mutations (e.g. food cart updates, course material bookmarking, study plan changes) are persisted locally and reconciled with the PostgreSQL master upon reconnection.

---

## 1. Storage Topology & Object Stores

Local state is stored in client-side **IndexedDB** managed by an offline storage abstraction layer:

```
+-------------------------------------------------------------+
|                     React Application Layer                 |
|             (TanStack Query Cache + Context Providers)       |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                  Offline Sync Engine (Engine)               |
|      +---------------------+     +-----------------------+  |
|      | Mutation Outbox     |     | Entity Cache Store    |  |
|      | (FIFO Queue)        |     | (IndexedDB / KeyVal)  |  |
|      +---------------------+     +-----------------------+  |
+-------------------------------------------------------------+
                               |
                      [Network Available?]
                     /                    \
              YES  /                        \  NO
                  v                          v
    +---------------------------+   +---------------------------+
    | Server API Reconciliation |   | Retain in Local Outbox    |
    | (POST /api/v1/sync/batch) |   | (Wait for 'online' event) |
    +---------------------------+   +---------------------------+
```

### IndexedDB Object Stores

| Store Name | Primary Key | Indexes | Purpose |
|---|---|---|---|
| `outbox_mutations` | `autoIncrement id` | `status`, `timestamp` | FIFO queue for pending remote operations |
| `cached_courses` | `courseCode` | `department`, `semester` | Offline course syllabus & materials |
| `cached_transit` | `routeId` | `updatedAt` | Latest known campus bus schedules & stops |
| `user_preferences` | `key` | `updatedAt` | Dark mode, dietary filters, language settings |

---

## 2. Optimistic UI Updates

To ensure an instantaneous perceived performance ($< 16\text{ ms}$ response):
1. **Immediate Local Mutation**: The React state updates immediately with temporary client-generated IDs (`temp_<uuid>`).
2. **Outbox Enqueue**: The mutation payload with a timestamp, action type, and idempotency token is written to `outbox_mutations`.
3. **Background Sync**: If online, the worker attempts an immediate dispatch.
4. **Rollback Guard**: If the server rejects the mutation with an unrecoverable validation error (422), the engine reverts the local state and prompts the user with an actionable error dialog.

---

## 3. Conflict Resolution Protocol

When concurrent mutations occur across multiple sessions or while reconnecting:

### Deterministic Last-Write-Wins (LWW) with Vector Clocks
1. Each entity payload contains a monotonic `version` counter and an ISO-8601 UTC `updated_at` timestamp.
2. If `client.version > server.version`: Server accepts the mutation and bumps the version.
3. If `client.version < server.version`:
   - **For Non-destructive Data** (e.g. course bookmarks, preference flags): Field-level merge is performed (three-way merge).
   - **For Time-sensitive Transactions** (e.g. food order placement, reserved seat booking): Server state prevails; client is notified of the expired availability.

---

## 4. Exponential Backoff & Retry Circuit Breaker

The sync dispatcher employs an exponential backoff retry mechanism with jitter to prevent server thundering-herd problems when campus Wi-Fi restores:

$$\text{Delay} = \min\left(\text{InitialDelay} \times 2^{\text{retryCount}} + \text{jitter},\; \text{MaxDelay}\right)$$

- $\text{InitialDelay} = 1000\text{ ms}$
- $\text{MaxDelay} = 30000\text{ ms}$
- $\text{MaxAttempts} = 5$ before parking in dead-letter storage for manual retry.
