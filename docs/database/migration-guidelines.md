# Zero-Downtime Database Migration Guidelines & Schema Rollback Runbook

## Overview
Uni-Verse operates 24/7 across campus housing, dining, library access control, and academic registration. With over 25,000 active students and faculty, schema migrations must execute **without query blocking, connection starvation, or user-facing downtime**.

This document outlines mandatory protocols for authoring, testing, and applying relational database schema migrations against production PostgreSQL clusters.

---

## 1. Core Principles of Zero-Downtime Migrations

### The Expand and Contract Pattern
Schema changes modifying column semantics, renaming columns, or splitting tables must never occur in a single atomic deployment. Always follow the **three-phase lifecycle**:

```
Phase 1: Expand
  ├── Add new nullable column or table in PostgreSQL
  ├── Deploy application code that dual-writes to both old and new columns
  └── Read traffic remains on the legacy column

Phase 2: Backfill & Switch
  ├── Run throttled background worker to backfill legacy rows in micro-batches
  ├── Validate data parity between old and new columns
  └── Deploy application code switching reads to the new column

Phase 3: Contract
  ├── Verify zero remaining reads on the legacy column via metrics
  ├── Deploy code removing dual-writes (writes only to new column)
  └── Drop legacy column asynchronously or mark column as deprecated
```

---

## 2. Safe Migration Directives

### 2.1 Enforce Lock Timeouts
PostgreSQL DDL commands acquire an `ACCESS EXCLUSIVE` lock on the target table. If an active query is executing, the DDL command queues behind it, blocking all subsequent reads and writes.

Every migration script **must** define strict lock and statement timeouts:

```sql
-- Always set at the start of every migration transaction
SET LOCAL lock_timeout = '2s';
SET LOCAL statement_timeout = '10s';
```

If the migration cannot acquire the table lock within 2 seconds, it aborts cleanly, preventing connection pool exhaustion.

---

### 2.2 Adding Indexes Concurrently
Standard `CREATE INDEX` locks the entire table against writes for the duration of the scan. In Uni-Verse, all production indexes must be created concurrently outside transaction blocks:

```sql
-- WRONG: Locks table for writes
-- CREATE INDEX idx_user_reservations_room ON room_reservations(room_id);

-- CORRECT: Runs non-blocking background index build
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_reservations_room 
ON room_reservations (room_id, reservation_timestamp DESC);
```

> [!WARNING]
> If a concurrent index build fails midway, PostgreSQL marks it as `INVALID`. The CI/CD deployment runner checks for invalid indexes and drops them before retrying:
> ```sql
> SELECT indexrelid::regclass FROM pg_index WHERE NOT indisvalid;
> DROP INDEX CONCURRENTLY IF EXISTS <invalid_index_name>;
> ```

---

### 2.3 Adding Foreign Key Constraints Safely
Adding a foreign key with validation can lock both child and parent tables for full sequential scans. Split foreign key creation into two separate statements:

```sql
-- Step 1: Add constraint without table scan (acquires brief lock only)
ALTER TABLE cafeteria_meal_orders
ADD CONSTRAINT fk_cafeteria_meal_orders_student
FOREIGN KEY (student_id) REFERENCES students(id) NOT VALID;

-- Step 2: Validate existing rows concurrently without write lock
ALTER TABLE cafeteria_meal_orders
VALIDATE CONSTRAINT fk_cafeteria_meal_orders_student;
```

---

### 2.4 Column Renaming & Type Alteration
Directly executing `ALTER TABLE users RENAME COLUMN phone TO mobile;` will instantly crash any active application instances still referencing `phone`.

Use view aliasing or generated columns during the transition:
```sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN mobile VARCHAR(20);

-- Step 2: Trigger / application synchronization
-- Dual-write in application layer, followed by asynchronous sync:
UPDATE users SET mobile = phone WHERE mobile IS NULL;

-- Step 3: Deprecate and drop in subsequent release cycle
```

---

## 3. Migration Pipeline Automation in CI/CD

Before merging any Pull Request containing migrations, GitHub Actions executes:
1. **Linting Check (`pg-migrator-lint`)**:
   - Detects missing `CONCURRENTLY` on index creation.
   - Flags unindexed foreign keys.
   - Disallows `ALTER TABLE ADD COLUMN` with volatile default functions (e.g., `DEFAULT uuid_generate_v4()`).
   - Verifies explicit `lock_timeout` settings.
2. **Ephemeral Replay Simulation**:
   - Spawns an isolated PostgreSQL container seeded with anonymized production schema.
   - Executes `up` migrations, verifies schema diff, then executes `down` rollback migrations.

---

## 4. Emergency Rollback Playbook

If a migration triggers lock contention, deadlocks, or replication lag in production:

1. **Immediate Cancellation**:
   ```sql
   -- Find and terminate hanging migration process
   SELECT pg_cancel_backend(pid) 
   FROM pg_stat_activity 
   WHERE query LIKE '%ALTER TABLE%' AND state = 'active';
   ```
2. **Revert Schema Version Pointer**:
   Roll back the migration tracking row in `schema_migrations` and revert the application deployment artifact to the previous green build.
3. **Clean Up Orphaned Constraints/Indexes**:
   Verify no dangling unvalidated constraints or invalid index builds consume table maintenance overhead.
