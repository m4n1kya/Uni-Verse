# Blue-Green Deployments & Automated Canary Releases Runbook

## Overview
To prevent production regressions during major releases, Uni-Verse uses **Progressive Canary Deployments** combined with Blue-Green infrastructure swapping. This runbook details traffic routing weights, automated rollback triggers, and error budget burn-rate monitors.

---

## 1. Canary Traffic Rollout Progression

Traffic shifts progressively across edge nodes using weighted DNS and Vercel Edge Middleware routing:

```
Phase 1: Internal Dogfooding (0% Public Traffic)
  - Accessible via canary cookie: 'universe_deployment_tier=canary'
  - Validated by campus maintainers & QA testers

Phase 2: Initial Canary Ingress (10% Traffic)
  - Target: 10% of randomized student sessions
  - Duration: 30 minutes observation window
  - Metrics Monitored: HTTP 5xx error rate, client exception rate, p95 latency

Phase 3: Expanded Canary (50% Traffic)
  - Duration: 60 minutes observation window

Phase 4: Full Promotion (100% Traffic)
  - Immutable production tag promoted; legacy deployment drained
```

---

## 2. Automated Circuit Breakers & Rollback Triggers

Canary releases immediately trigger automated rollbacks if any of the following health thresholds are breached:

| Metric | Normal Baseline | Canary Alert Threshold | Action |
|---|---|---|---|
| **Edge HTTP 5xx Rate** | $< 0.05\%$ | $> 0.5\%$ over 3 mins | Instant 100% rollback to Blue |
| **Client JS Uncaught Errors** | $< 0.10\%$ | $> 0.8\%$ over 5 mins | Rollback + Sentry incident alert |
| **API p95 Latency** | $< 250\text{ ms}$ | $> 600\text{ ms}$ over 5 mins | Drain Canary traffic to 0% |
| **Database Connection Saturation** | $< 50\%$ | $> 85\%$ sustained | Auto-scale replica + pause rollout |

---

## 3. Database Migration Isolation

To ensure that both Blue (v1) and Green (v2) deployments can operate simultaneously without schema collisions, all database changes adhere to the **Expand and Contract Pattern**:

1. **Expand (Pre-deployment)**: Add new columns as nullable or with defaults. Never drop or rename active columns.
2. **Dual-Write**: Application code writes to both old and new schema columns during canary phases.
3. **Contract (Post-deployment)**: Once the v2 deployment is at 100% traffic for $\ge 48\text{ hours}$, run cleanup migrations to drop legacy columns.

---

## 4. Emergency Instant Rollback Command

In the event of an urgent production regression:

```bash
# 1. Instantly route 100% traffic to previous stable deployment
vercel rollback --yes

# 2. Invalidate edge CDN cache tags across all regions
curl -X POST "https://api.vercel.com/v1/edge/purge-tags" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -d '{"tags": ["production-bundle"]}'

# 3. Post incident notification to engineering channel
npm run notify:incident -- --status="rolled_back" --severity="sev-1"
```
