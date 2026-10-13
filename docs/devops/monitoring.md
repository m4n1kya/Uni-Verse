# Observability, Error Tracking & Production Monitoring

## Overview
To guarantee 99.9% uptime across peak university hours (morning transit rush, lunch cafeteria pre-orders, and semester exam registration), Uni-Verse implements structured client-side telemetry, real-time crash reporting, and synthetic uptime monitoring.

---

## 1. Client-Side Error Boundaries & Crash Reporting

### React Error Boundary Hierarchy
- **Root Application Boundary**: Catches unhandled fatal rendering exceptions and displays a clean recovery screen with a "Reload Application" action.
- **Widget-Level Boundaries**: Individual dashboard cards (Bus Tracker, Cafeteria Menu, Career Predictor) are isolated so a transient third-party map or API failure degrades gracefully without crashing the entire dashboard.

### Automated Exception Telemetry
- Captures anonymized stack traces, component trees, browser user-agent metadata, and active route path.
- Strips all Personally Identifiable Information (PII) such as student roll numbers, emails, and authorization headers prior to transmission (`beforeSend` sanitizer hook).

---

## 2. Real User Monitoring (RUM) & Web Vitals

Production sessions sample Core Web Vitals metrics via the browser `PerformanceObserver` API:
- **LCP (Largest Contentful Paint)**: Monitored across campus Wi-Fi and 4G/5G mobile networks.
- **INP (Interaction to Next Paint)**: Tracks responsiveness of modal toggles, search filtering, and tab switches.
- **Route Transition Latency**: Measures time from link click to dynamic chunk hydration.

---

## 3. Health Checks & Alerting Thresholds

| Service Domain | Check Interval | Warning Threshold | Critical Pager Alert |
|---|---|---|---|
| **Web App Edge (Vercel)** | 60 seconds | HTTP response > 800ms | HTTP 5xx or timeout > 3s |
| **Authentication API** | 30 seconds | Latency p95 > 450ms | Error rate > 1.0% over 5m |
| **Transit WebSocket Stream** | 15 seconds | Packet delay > 5s | Connection drop rate > 2% |
| **Cafeteria Order Queue** | 60 seconds | Latency p95 > 600ms | Failed checkout > 0.5% |

---

## 4. Incident Response Workflow
1. **Detection**: Automated alert fires to the campus engineering Slack/Discord webhook.
2. **Triage**: On-call maintainer inspects deployment logs and recent commit diffs.
3. **Mitigation**: If caused by a frontend regression, promote the previous immutable Vercel production deployment within 10 seconds.
4. **Post-Mortem**: Document root cause, timeline, and preventative test coverage in `docs/adr/`.
