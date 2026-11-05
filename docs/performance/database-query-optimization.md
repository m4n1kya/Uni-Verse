# Database Query Optimization & Indexing Benchmarks

## Overview
As student enrollment scales, database queries that perform sequential scans create CPU bottlenecks and connection starvation. This document details our PostgreSQL query optimization methodology, composite index architectures, partial indexing strategies, and connection pool benchmarks.

---

## 1. Query Analysis Methodology (`EXPLAIN ANALYZE BUFFERS`)

All high-frequency queries undergo query execution plan profiling to eliminate disk reads (`shared read`) in favor of memory cache hits (`shared hit`):

```sql
EXPLAIN (ANALYZE, BUFFERS, COSTS)
SELECT c.course_code, c.title, e.grade, e.grade_points
FROM course_enrollments e
JOIN courses c ON e.course_code = c.course_code
WHERE e.student_id = 'usr_9981'
  AND e.semester = 6;
```

---

## 2. Advanced Indexing Strategies

### Partial Indexes on High-Velocity Queues
The cafeteria ordering system processes thousands of transactions daily. Completed orders are rarely modified. To keep the active order queue blazingly fast without bloating B-tree indexes:

```sql
-- Partial index: indexes ONLY active and in-progress orders (~50 rows vs 500,000 historical rows)
CREATE INDEX idx_active_orders_queue 
ON cafeteria_orders (vendor_id, created_at)
WHERE order_status IN ('pending', 'preparing');
```
- **Index Size Reduction**: From $38\text{ MB}$ to $< 180\text{ kB}$ ($-99.5\%$).
- **Insert Overhead**: Zero index maintenance cost for completed historical orders.

### Composite Covering Indexes (Index-Only Scans)
By including queried columns in the index payload, PostgreSQL satisfies queries directly from the index without reading table heap blocks (`Index Only Scan`):

```sql
CREATE INDEX idx_student_courses_covering 
ON course_enrollments (student_id, semester) 
INCLUDE (course_code, grade_points);
```

---

## 3. Query Benchmark Comparisons: Before vs. After

| Query Scenario | Unoptimized Plan | Optimized Indexing Plan | Latency Reduction |
|---|---|---|---|
| **Student Semester Grades** | `Seq Scan on course_enrollments` ($280\text{ ms}$) | `Index Only Scan` on covering index ($1.8\text{ ms}$) | **$-99.3\%$** |
| **Active Cafeteria Queue** | `Seq Scan + Filter` ($410\text{ ms}$) | `Bitmap Index Scan` on partial index ($3.4\text{ ms}$) | **$-99.1\%$** |
| **Faculty Search by Domain** | Full text regex scan ($650\text{ ms}$) | `GIN Index Scan` on `tsvector` ($8.2\text{ ms}$) | **$-98.7\%$** |
| **Latest Bus Telemetry** | Monolithic table sort ($820\text{ ms}$) | Partition-pruned range index ($4.1\text{ ms}$) | **$-99.5\%$** |

---

## 4. PgBouncer Connection Pooler Tuning

To prevent PostgreSQL process-per-connection memory bloat ($~10\text{ MB}$ RAM per backend worker):

```ini
# pgbouncer.ini
[databases]
universe_db = host=127.0.0.1 port=5432 dbname=universe_prod

[pgbouncer]
pool_mode = transaction
max_client_conn = 2000
default_pool_size = 50
reserve_pool_size = 10
server_idle_timeout = 60
```

- **Transaction Mode Pooling**: Allows 2,000 concurrent client sessions to share a lean pool of 50 physical PostgreSQL connections.
- **Memory Footprint**: Reduced server RAM consumption by $74\%$ under heavy peak registration load.
