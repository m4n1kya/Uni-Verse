# Chaos Engineering & Network Fault Injection Protocols

## Overview
Student devices operate on volatile university Wi-Fi networks characterized by frequent access point handovers between lecture halls, packet loss during peak lunchtime crowds, and sudden subterranean cell dead-zones in campus basement labs. To ensure the Uni-Verse client remains resilient under adverse conditions, we conduct continuous **Chaos Engineering & Network Fault Injection** experiments in staging environments.

---

## 1. Fault Injection Scenarios (Toxiproxy / Chaos Mesh)

```
[Student Web Client]  <---- Toxiproxy Proxy Bridge ---->  [Staging Backend Cluster]
                                    |
                    +---------------+---------------+
                    |                               |
                    v (Simulated Anomaly)           v (Simulated Anomaly)
         [1,500ms Handover Latency]      [15% Packet Jitter / Drop]
```

### Experiment Catalog

| Experiment Name | Injected Fault | Target Subsystem | Expected Steady-State Behavior |
|---|---|---|---|
| **Lecture Hall Handover** | $+1500\text{ ms}$ Latency + $500\text{ ms}$ Jitter | API Gateway | Client shows subtle loading indicator; queries do not time out |
| **Basement Dead-Zone** | $100\%$ Packet Loss (Blackhole for 30s) | Entire Client | Local IndexedDB queue buffers actions; offline banner displays |
| **Abrupt Transit Socket Reset** | `RST` packet sent every 45s | WebSocket Streamer | Exponential reconnect recovers within $< 3\text{ s}$; re-subscribes |
| **Redis Cache Eviction Surge** | Flush 100% of keys unexpectedly | Redis Sentinel | Database connection pool does not saturate; Redlock prevents stampede |

---

## 2. Hypothesis & Steady-State Verification

Every experiment begins with a measurable hypothesis:

### Hypothesis: Offline Food Cart Resiliency
> *"When a student loses network connectivity while adding cafeteria items to their cart, all items remain in local storage, and the checkout request is queued in IndexedDB without data loss or error alerts."*

### Verification Script (Playwright + Toxiproxy API)
```typescript
test('verifies offline cart actions queue cleanly during network partition', async ({ page }) => {
  await page.goto('/food');
  await page.click('button:has-text("Add to Cart")');

  // Inject total network blackhole via Toxiproxy
  await toxiproxy.disableToxic('api_gateway', 'bandwidth');

  // Perform offline interaction
  await page.click('button:has-text("Add to Cart")');
  
  // Verify UI shows local update with offline synchronization badge
  const badge = page.locator('[data-testid="sync-status-badge"]');
  await expect(badge).toHaveText(/Saved Offline/i);

  // Restore network
  await toxiproxy.enableToxic('api_gateway', 'bandwidth');

  // Assert automated sync flush
  await expect(badge).toHaveText(/All Changes Synced/i, { timeout: 10000 });
});
```

---

## 3. Chaos Experiment Blast Radius Guards
- Experiments run strictly in isolated staging sandboxes (`staging.universe-campus.org`).
- Production chaos tests require explicit maintenance windows and multi-signature approval.
- An automated "Dead Man's Switch" reverts all injected toxics within 5 minutes if test orchestrators lose contact.
