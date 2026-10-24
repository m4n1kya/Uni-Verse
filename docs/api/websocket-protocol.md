# Real-Time WebSocket & Telemetry Event Protocol

## Overview
Uni-Verse uses bidirectional WebSocket streams (`wss://`) alongside standard REST APIs to power real-time campus experiences: live GPS bus tracking, instantaneous cafeteria order status updates, and emergency campus broadcast notifications.

---

## 1. Connection Lifecycle & Handshake

### WebSocket Endpoint
```text
wss://api.universe-campus.org/v1/stream
```

### Handshake & Authentication
To protect against unauthorized socket connections without exposing long-lived access tokens in URL queries, Uni-Verse uses a single-use **Ticket Exchange Pattern**:
1. Client issues `POST /api/v1/auth/ws-ticket` using its bearer token.
2. Server responds with a short-lived ticket string (valid for 60 seconds):
   ```json
   { "ticket": "wst_8f91c7a2e04b" }
   ```
3. Client initiates the WebSocket connection passing the ticket in Sec-WebSocket-Protocol or query parameter:
   ```text
   wss://api.universe-campus.org/v1/stream?ticket=wst_8f91c7a2e04b
   ```

---

## 2. Framing & Message Structure

All WebSocket messages follow a strict JSON payload schema:

```typescript
export interface WebSocketMessage<T = unknown> {
  id: string;             // UUIDv4 correlation identifier
  event: string;          // Namespaced event name (domain:action)
  timestamp: string;      // ISO-8601 UTC timestamp
  channel?: string;       // Topic/channel identifier
  payload: T;             // Event-specific data
}
```

### Heartbeat (Keep-Alive)
- **Client Ping**: Every 30 seconds, client emits `{"event": "system:ping"}`.
- **Server Pong**: Server replies `{"event": "system:pong"}`.
- If no response is received within 10 seconds, the client assumes connection drop and executes an exponential backoff reconnect.

---

## 3. Channel Subscription Syntax

Clients subscribe and unsubscribe from specific telemetry feeds dynamically without disconnecting the socket:

### Subscribe Request
```json
{
  "id": "req_sub_01",
  "event": "channel:subscribe",
  "channel": "transit:bus:bus_04"
}
```

### Supported Channels
| Channel Pattern | Description | Access Tier |
|---|---|---|
| `transit:bus:<busId>` | Live coordinate coordinates (latitude, longitude, speed, ETA) | Public (Student/Faculty) |
| `cafeteria:order:<orderId>` | Order status transitions (`RECEIVED` $\rightarrow$ `PREPARING` $\rightarrow$ `READY`) | Authenticated (Order owner) |
| `alerts:campus:emergency` | High-priority campus security and weather broadcasts | Broadcast (All connected sockets) |

---

## 4. Telemetry Event Payloads

### `transit:telemetry`
```json
{
  "id": "evt_991823",
  "event": "transit:telemetry",
  "channel": "transit:bus:bus_04",
  "timestamp": "2026-10-24T05:40:00Z",
  "payload": {
    "busId": "bus_04",
    "routeId": "route_north_campus",
    "coordinates": {
      "latitude": 12.9716,
      "longitude": 79.1589
    },
    "speedKmh": 28.5,
    "nextStop": "Library Circle",
    "etaMinutes": 3
  }
}
```

### `cafeteria:status`
```json
{
  "id": "evt_991824",
  "event": "cafeteria:status",
  "channel": "cafeteria:order:ord_5021",
  "timestamp": "2026-10-24T05:41:15Z",
  "payload": {
    "orderId": "ord_5021",
    "status": "READY_FOR_PICKUP",
    "pickupToken": 142,
    "vendorName": "Bistro North"
  }
}
```

---

## 5. Reconnection & Backoff Protocol

When a socket connection drops unexpectedly:
1. Reconnect attempts use jittered exponential backoff:
   $$t_{\text{backoff}} = \min(1000 \times 2^{\text{attempt}} + \text{jitter},\; 30000)\text{ ms}$$
2. Upon successful reconnect, the client re-subscribes to all active channels automatically.
