# High Availability & Disaster Recovery (DR) Runbook

## Overview
Uni-Verse powers mission-critical campus operations across academics, dining, and transportation. This runbook establishes high-availability topologies, automated backup cadences, failover procedures, and point-in-time recovery targets for university production infrastructure.

---

## 1. Reliability Targets (SLO / RPO / RTO)

| Metric | Target | Description |
|---|---|---|
| **Availability (SLO)** | $99.95\%$ | No more than $21.9\text{ minutes}$ of unscheduled downtime per month |
| **Recovery Point Objective (RPO)** | $\le 5\text{ minutes}$ | Maximum tolerable data loss window in catastrophic failure |
| **Recovery Time Objective (RTO)** | $\le 15\text{ minutes}$ | Maximum acceptable time to restore service following an outage |

---

## 2. Infrastructure Resilience Architecture

```
                                [Global Route 53 / Edge CDN]
                                              |
                       +----------------------+----------------------+
                       |                                             |
                       v                                             v
             [Primary Region: ap-south-1]               [Warm Standby: ap-south-2]
             - Vercel Multi-Region Edge                 - Standby Edge Nodes
             - Primary PostgreSQL Primary               - Read-Replica (Streaming WAL)
             - Redis Telemetry Broker                   - Hot-Spare Cache
                       |                                             |
                       +---------------- Synchronous ----------------+
                                       Replication
```

---

## 3. Database Backup & Point-in-Time Recovery (PITR)

### Backup Schedule
- **Continuous Archiving**: Write-Ahead Logs (WAL) shipped every 60 seconds to encrypted object storage (`S3-Standard-IA`).
- **Daily Full Snapshots**: Automated pg_dump snapshot at `02:00 UTC` with 30-day retention.
- **Weekly Cold Storage**: Monthly archives transferred to Glacier for 365-day compliance retention.

### Restoration Procedure
```bash
# 1. Stop current replica connections
systemctl stop universe-api-service

# 2. Restore base backup to recovery target
pg_restore -d universe_db /mnt/backups/daily/universe_base_latest.dump

# 3. Apply WAL up to target recovery point
cat << EOF > /var/lib/postgresql/data/recovery.conf
restore_command = 'cp /mnt/wal_archive/%f %p'
recovery_target_time = '2026-10-24 05:00:00 UTC'
recovery_target_action = 'promote'
EOF

# 4. Restart database and promote to primary
systemctl start postgresql
```

---

## 4. Peak Traffic Degraded Modes

During course registration surges or campus festival ticketing (10,000+ concurrent students):
1. **Queueing Throttler**: Non-essential background tasks (analytics aggregation, PDF thumbnail generators) pause automatically.
2. **Read-Heavy Caching**: Static course syllabi, faculty directories, and bus schedules switch to aggressive 1-hour browser/edge cache headers (`Cache-Control: public, max-age=3600`).
3. **Optimistic Queueing**: Cafeteria checkout requests route to an asynchronous Redis FIFO queue with instant client token confirmation.

---

## 5. Rollback & Post-Mortem Protocols

### Incident Execution Steps
1. **Identify Severity**: Severity 1 (Outage impacting student core tasks) vs Severity 2 (Degraded optional widget).
2. **Vercel Rollback**: Promote the previous known-good deployment via dashboard or CLI in $< 30\text{ seconds}$ (`vercel rollback`).
3. **Database Migration Revert**: Run downstream idempotent migration rollback script (`npm run db:migrate:down`).
4. **Post-Mortem**: Document Root Cause Analysis (RCA), timeline, and automated regression tests within 48 hours in `docs/adr/`.
