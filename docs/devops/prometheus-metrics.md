# Prometheus Metrics Instrumentation & Grafana Dashboard Observability

## Overview
Uni-Verse instruments application runtimes with **Prometheus Metrics** to provide deep real-time observability into system health, API latency profiles, transit stream saturation, and cafeteria order queues. This specification defines metric naming conventions, custom business metric definitions, and Alertmanager routing rules.

---

## 1. The Four Golden Signals & Core Telemetry

Every service instance exposes an authenticated scrapable endpoint at `/metrics` conforming to OpenMetrics standards:

```
+-------------------------------------------------------------+
|                     The Four Golden Signals                 |
+-------------------------------------------------------------+
| 1. LATENCY     | Time taken to service a request (p50, p95) |
| 2. TRAFFIC     | Request rate (Requests Per Second - RPS)   |
| 3. ERRORS      | Rate of requests that fail (HTTP 5xx / 4xx)|
| 4. SATURATION  | System capacity utilization (CPU, DB Pool) |
+-------------------------------------------------------------+
```

---

## 2. Standard Metric Definitions

### HTTP Ingress Metrics
- `http_requests_total` (`Counter`): Total HTTP requests labeled by `method`, `route`, and `status`.
- `http_request_duration_seconds` (`Histogram`): Latency buckets: `[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0]`.

### Campus Domain Business Metrics

| Metric Identifier | Type | Labels | Description |
|---|---|---|---|
| `universe_active_transit_sockets` | `Gauge` | `route_id` | Count of active client WebSocket connections receiving bus GPS streams |
| `universe_cafeteria_orders_total` | `Counter` | `vendor_id`, `status` | Cumulative food court orders grouped by vendor stall and completion status |
| `universe_db_pool_active_connections` | `Gauge` | `pool_name` | Number of database connections currently checked out of PgBouncer pool |
| `universe_auth_login_failures_total` | `Counter` | `reason` | Failed login attempts for credential brute-force anomaly detection |

---

## 3. Prometheus Alerting Rules (`alerts.yml`)

```yaml
groups:
  - name: universe_production_alerts
    rules:
      # 1. High API Error Rate Alert
      - alert: HighHttpErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) > 0.01
        for: 3m
        labels:
          severity: critical
        annotations:
          summary: "Uni-Verse API error rate exceeds 1% over 3 minutes"
          runbook_url: "docs/devops/incident-response-matrix.md"

      # 2. Elevated p95 API Latency Alert
      - alert: ApiLatencyDegradation
        expr: |
          histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 0.60
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API 95th percentile response time is above 600ms"

      # 3. Database Connection Pool Saturation
      - alert: DatabasePoolNearlyFull
        expr: |
          universe_db_pool_active_connections / 100 > 0.85
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "PgBouncer connection pool utilization is above 85%"
```

---

## 4. Grafana Production Dashboard Layout

The master operational Grafana dashboard is organized into four intuitive rows:
1. **Top Row - Executive KPI Gauges**: Real-time Active Students, Average Site Latency ($< 120\text{ ms}$), Global 5xx Error Rate ($0.01\%$), and Edge Cache Hit Ratio ($98.4\%$).
2. **Second Row - Traffic Heatmap**: Requests per second stacked by HTTP route (`/api/v1/transit`, `/api/v1/cafeteria`, `/api/v1/courses`).
3. **Third Row - Database & Cache Health**: Aurora PostgreSQL CPU utilization, active connections, and Redis hit/miss ratios.
4. **Bottom Row - Telemetry Streaming**: Live WebSocket frame rates and active GPS vehicle telemetry broadcast counts.
