# Webhooks Integration Architecture & Replay Defense Protocol

## Overview
Uni-Verse coordinates asynchronous data exchanges with external campus systems—such as food stall Point-of-Sale (POS) terminals, digital library checkout kiosks, and student union event ticketing engines—through an enterprise **Webhooks Integration Architecture**. This specification defines our webhook dispatch lifecycle, cryptographic signature verification, replay attack mitigations, and delivery retry policies.

---

## 1. Webhook Dispatch Lifecycle

```
[Uni-Verse Event Broker]
            |
            v
[Webhook Dispatch Worker Pool]
            |
            | 1. Compute HMAC SHA-256 signature with secret
            | 2. Attach X-Universe-Signature & X-Universe-Timestamp
            v
+--------------------------------------------------------------+
|               HTTP POST to Registered Endpoint               |
|            (e.g., https://vendor-pos.campus.internal)        |
+--------------------------------------------------------------+
            |
       [HTTP 2xx Success?]
      /                   \
   YES /                     \ NO (HTTP 4xx / 5xx / Timeout)
      v                       v
[Log Delivery Succeeded]   [Queue in Retry Backoff (Max 5 attempts)]
```

---

## 2. Cryptographic Signature & Payload Authentication

To ensure that received webhooks originate strictly from Uni-Verse and have not been tampered with in transit, every request includes two security headers:

- `X-Universe-Timestamp`: Unix epoch timestamp in seconds (e.g. `1793776800`).
- `X-Universe-Signature`: Hex-encoded HMAC-SHA256 digest computed over the timestamp concatenated with the raw request body:
  $$\text{Signature} = \text{HMAC-SHA256}(\text{Secret},\; \text{Timestamp} + "." + \text{PayloadBody})$$

### Receiver Verification Implementation (TypeScript / Node.js)
```typescript
import crypto from 'crypto';

export function verifyWebhookSignature(
  rawBody: string,
  timestampHeader: string,
  signatureHeader: string,
  webhookSecret: string
): boolean {
  // 1. Defend against replay attacks: reject timestamps older than 5 minutes
  const currentTime = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestampHeader, 10);
  if (Math.abs(currentTime - requestTime) > 300) {
    return false;
  }

  // 2. Compute expected HMAC digest
  const signaturePayload = `${timestampHeader}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(signaturePayload)
    .digest('hex');

  // 3. Constant-time comparison to thwart timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
```

---

## 3. Webhook Event Catalog

| Event Name | Trigger Source | Payload Highlights |
|---|---|---|
| `dining.order.paid` | Food Court Payment Service | `orderId`, `vendorId`, `totalAmount`, `items[]`, `pickupToken` |
| `dining.order.status_changed`| Vendor POS Kitchen Terminal | `orderId`, `previousStatus`, `newStatus`, `estimatedMinutes` |
| `library.book.overdue` | Digital Library System | `loanId`, `studentRollNumber`, `bookIsbn`, `fineAccumulated` |
| `transit.shuttle.breakdown` | Transit Telematics System | `busId`, `routeId`, `geoCoordinates`, `backupBusDispatched` |

### Sample Payload: `dining.order.status_changed`
```json
{
  "eventId": "evt_wh_891024",
  "event": "dining.order.status_changed",
  "timestamp": 1793776800,
  "payload": {
    "orderId": "ord_9182",
    "vendorId": "stall_underbelly_01",
    "status": "PREPARING",
    "estimatedReadyTime": "2026-11-04T07:15:00Z"
  }
}
```

---

## 4. Delivery Retry Schedule & Circuit Breakers

When a vendor endpoint fails to acknowledge with an HTTP `2xx` within 5 seconds:
1. **Exponential Retry Cadence**:
   - Attempt 1: Immediate $+ 15\text{ seconds}$
   - Attempt 2: $+ 1\text{ minute}$
   - Attempt 3: $+ 5\text{ minutes}$
   - Attempt 4: $+ 30\text{ minutes}$
   - Attempt 5: $+ 2\text{ hours}$
2. **Circuit Breaker**: If an endpoint fails $100\%$ of deliveries across 24 consecutive hours, the webhook subscription is automatically paused (`STATUS: SUSPENDED`) and an email alert is dispatched to the vendor administrator.
