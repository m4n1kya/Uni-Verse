# Performance & Stress Load Testing Scenarios (k6)

## Overview
To validate that Uni-Verse handles high-concurrency peak campus events without performance degradation or downtime, we define automated load testing suites implemented with **Grafana k6**.

---

## 1. Test Scenarios & Concurrency Profiles

```
Concurrent Virtual Users (VUs)
    ^
    |                   [Registration Rush: Peak 5,000 VUs]
5000|                        /-------------------\
    |                       /                     \
2500|       [Lunch Rush]   /                       \
    |       /----------\  /                         \
1000|  ----/            \/                           \----
    +----------------------------------------------------> Time (mins)
```

### Scenario Matrix

| Scenario Name | Traffic Profile | Target VUs | Duration | Critical SLA Target |
|---|---|---|---|---|
| **Course Registration Rush** | Rapid Spike | 5,000 VUs | 10 mins | $p95 \text{ Latency} < 450\text{ ms}$, Error rate $< 0.1\%$ |
| **Lunchtime Cafeteria Ordering** | Sustained Plateau | 2,500 VUs | 45 mins | $p95 \text{ Latency} < 300\text{ ms}$, Checkout $< 800\text{ ms}$ |
| **Transit GPS Telemetry Ingestion** | High-Frequency WebSocket | 10,000 connections | 60 mins | Message roundtrip $< 150\text{ ms}$, Zero dropped frames |
| **Endurance / Memory Leak Test** | Steady State | 1,000 VUs | 12 hours | Memory growth $< 5\%$, Zero container restarts |

---

## 2. Sample k6 Test Script: Course Registration Spike

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 1000 },  // Ramp-up to 1,000 users
    { duration: '3m', target: 5000 },  // Surge to peak 5,000 users
    { duration: '4m', target: 5000 },  // Sustain peak load
    { duration: '2m', target: 0 },     // Ramp-down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<450', 'p(99)<900'],
    'errors': ['rate<0.01'],
  },
};

const BASE_URL = __ENV.TARGET_URL || 'https://staging.universe-campus.org';

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${__ENV.TEST_JWT_TOKEN}`,
    },
  };

  // 1. Fetch available course sections
  const catalogRes = http.get(`${BASE_URL}/api/v1/courses/active`, params);
  check(catalogRes, {
    'catalog status 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(1);

  // 2. Submit course registration payload
  const payload = JSON.stringify({
    courseCode: 'CSE3002',
    slotId: 'SLOT_A1_L31',
  });

  const enrollRes = http.post(`${BASE_URL}/api/v1/courses/enroll`, payload, params);
  check(enrollRes, {
    'enrollment status 200 or 409': (r) => r.status === 200 || r.status === 409,
    'latency under 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(2);
}
```

---

## 3. Bottleneck Triage Checklist

When a load test triggers an SLA threshold violation:
1. **Database Lock Contention**: Check `pg_stat_activity` for `ExclusiveLock` on `course_enrollments` table rows.
2. **Connection Pool Exhaustion**: Inspect PgBouncer client pool saturation vs active server connections.
3. **Vite Edge Cache Hit Ratio**: Ensure static assets (`/assets/*.js`, `/assets/*.css`) maintain $> 98\%$ edge cache hit rate.
4. **Redis Memory Overhead**: Verify telemetry Pub/Sub channels have bounded buffer lengths.
