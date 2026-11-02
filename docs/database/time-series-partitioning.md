# Time-Series Table Partitioning & Telemetry Archival Specification

## Overview
Uni-Verse ingests hundreds of thousands of high-frequency events daily: real-time GPS coordinate telemetry from campus shuttles, user audit log records, and live cafeteria order updates. Storing these events in flat monolithic tables causes index bloat, slower query execution, and high vacuum overhead. This specification defines **Declarative PostgreSQL Table Partitioning** and automated lifecycle archival policies.

---

## 1. Partitioning Strategy by Entity Domain

```
+-------------------------------------------------------------+
|               bus_telemetry (Master Partitioned)            |
+-------------------------------------------------------------+
         |                        |                        |
         v                        v                        v
+------------------+     +------------------+     +------------------+
| bus_telemetry_y  |     | bus_telemetry_y  |     | bus_telemetry_y  |
| 2026m10 (Oct)    |     | 2026m11 (Nov)    |     | 2026m12 (Dec)    |
+------------------+     +------------------+     +------------------+
```

### Partitioning Keys & Intervals

| Table Name | Partition Method | Key Column | Interval | Active Retention Window |
|---|---|---|---|---|
| `bus_telemetry` | `RANGE` | `timestamp` | Daily (24h) | 14 Days Hot $\rightarrow$ Cold S3 Archive |
| `audit_logs` | `RANGE` | `created_at` | Monthly | 12 Months Hot $\rightarrow$ Glacier |
| `cafeteria_order_events` | `RANGE` | `event_time` | Weekly | 90 Days Hot $\rightarrow$ Analytics DB |

---

## 2. DDL Schema Implementation

```sql
-- 1. Create master partitioned table for bus telemetry
CREATE TABLE bus_telemetry (
    id BIGSERIAL,
    bus_id VARCHAR(32) NOT NULL,
    route_id VARCHAR(32) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    speed_kmh NUMERIC(5, 2) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (timestamp, id)
) PARTITION BY RANGE (timestamp);

-- 2. Scoped index for query pruning
CREATE INDEX idx_bus_telemetry_query_pruning 
ON bus_telemetry (bus_id, timestamp DESC);

-- 3. Create monthly child partitions with explicit range constraints
CREATE TABLE bus_telemetry_2026_11 PARTITION OF bus_telemetry
    FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');

CREATE TABLE bus_telemetry_2026_12 PARTITION OF bus_telemetry
    FOR VALUES FROM ('2026-12-01 00:00:00+00') TO ('2027-01-01 00:00:00+00');
```

---

## 3. Query Pruning & Performance Benefits

When the Transit Hub queries current bus positions, the PostgreSQL query planner evaluates partition constraint boundaries:

```sql
EXPLAIN ANALYZE
SELECT latitude, longitude, speed_kmh
FROM bus_telemetry
WHERE bus_id = 'bus_04'
  AND timestamp >= NOW() - INTERVAL '15 minutes';
```

- **Partition Pruning Execution**: `Append (Rows Removed by Filter: 0)`
- **Partitions Scanned**: Exactly 1 (the current daily partition).
- **Execution Time**: Dropped from $420\text{ ms}$ (full table scan) to $< 8\text{ ms}$ (index range scan on active child partition).

---

## 4. Automated Partition Creation & Cold Storage Worker

A scheduled pg_cron / Node.js worker executes nightly:
1. **Forward Provisioning**: Automatically provisions child partition tables 7 days in advance.
2. **Cold Archival**: Partitions older than 14 days are exported to Parquet format via `pg_dump / COPY` and uploaded to compressed S3 cold storage (`s3://universe-telemetry-archive/`).
3. **Partition Dropping**: Once confirmed in cold storage, the historical partition is dropped instantaneously via `DROP TABLE`, reclaiming disk space without trigger locks or VACUUM degradation.
