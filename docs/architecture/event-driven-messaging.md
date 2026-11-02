# Asynchronous Event-Driven Messaging & Notification Fan-Out

## Overview
Uni-Verse coordinates events across disparate campus domains through an asynchronous **Event-Driven Architecture (EDA)**. Rather than relying on synchronous HTTP chains, services publish domain events to an enterprise message broker (RabbitMQ / Redis Streams) which fans out to specialized notification dispatchers, analytics consumers, and real-time WebSocket bridges.

---

## 1. Event Broker Topology & Topic Exchanges

```
[Publishing Service]              [Topic Exchange: 'universe.campus']
(Cafeteria / Transit / Academics)               |
               \                               /
                \                             /
                 v                           v
              +---------------------------------+
              |    RabbitMQ Topic Exchange      |
              +---------------------------------+
                 /              |              \
                /               |               \
               v                v                v
      +---------------+  +---------------+  +---------------+
      | Queue: Push   |  | Queue: In-App |  | Queue: Audit  |
      | Notifications |  | WebSockets    |  | Analytics     |
      +---------------+  +---------------+  +---------------+
              |                 |                   |
              v                 v                   v
      [APNs / FCM]       [Client Sockets]     [Data Lake]
```

### Routing Key Standard
All routing keys adhere to the dot-separated standard: `campus.<domain>.<entity>.<action>`

| Routing Key | Event Description | Consumers |
|---|---|---|
| `campus.transit.bus.delayed` | Bus arrival delayed $> 5\text{ mins}$ | Push Notification Worker, WebSocket Streamer |
| `campus.dining.order.ready` | Food order prepared for pickup | In-App Toast Dispatcher, Push Worker |
| `campus.academics.grade.published` | Semester examination grades updated | Email Notifier, Mobile Push, Audit Logger |
| `campus.emergency.alert.broadcast` | Severe weather or campus safety advisory | All queues (Fan-out high-priority) |

---

## 2. Event Envelope Schema

Every message published to the broker conforms to the CloudEvents v1.0 standard:

```typescript
export interface CampusEventEnvelope<T = unknown> {
  specversion: "1.0";
  id: string;               // Unique UUIDv4 for deduplication
  source: string;           // E.g. "universe.service.dining"
  type: string;             // E.g. "campus.dining.order.ready"
  datacontenttype: "application/json";
  time: string;             // ISO-8601 UTC timestamp
  data: T;                  // Typed payload
}
```

---

## 3. Idempotent Consumer & Deduplication Guard

Because distributed message brokers provide **at-least-once delivery**, consumers implement an idempotent receipt guard:
1. When a consumer receives an event, it queries Redis: `SET universe:event:seen:<id> 1 NX EX 86400`.
2. If the key already exists (`NX` returns null), the event is recognized as a duplicate and acknowledged (`ACK`) immediately without re-processing.
3. If the key is new, the consumer processes the payload and acknowledges upon successful execution.

---

## 4. Dead-Letter Exchange (DLX) & Exponential Retry

When message processing encounters unhandled exceptions (e.g., third-party FCM service outage):
1. **Retry Mechanism**: The message is rejected (`NACK`) with a header tracking `x-retry-count`.
2. **Backoff Delay**: The message is routed to an interim TTL retry queue with exponential delay ($2^n \times 1\text{ s}$).
3. **Dead-Letter Queue (DLQ)**: If `x-retry-count >= 5`, the message is routed to `universe.dlq` for operator investigation. A Slack alert is posted with the failed payload and stack trace.
