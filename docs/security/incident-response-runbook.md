# Security Incident Response & Forensic Analysis Runbook

## Overview
This runbook establishes protocol for detecting, classifying, containing, and remediating security incidents across Uni-Verse infrastructure. Because Uni-Verse processes Family Educational Rights and Privacy Act (FERPA) protected student records, payment data for dining/transit, and campus building physical access logs, rapid containment and regulatory compliance are critical.

---

## 1. Incident Severity Classification Matrix

| Level | Severity | Description | Target Containment | Lead Contact |
|---|---|---|---|---|
| **P0** | **Critical** | Unauthorized access to production database, exfiltration of PII/FERPA records, active ransomware, or compromised root/admin credentials. | $< 15\text{ minutes}$ | SecOps Incident Commander + CTO |
| **P1** | **High** | Privilege escalation in microservices, active credential stuffing / brute-force bypass, or exposed read-only staging database. | $< 60\text{ minutes}$ | Lead Security Engineer |
| **P2** | **Medium** | WAF bypass without data exfiltration, persistent XSS reported via bug bounty, or anomalous token refresh rate. | $< 4\text{ hours}$ | Application Security Team |
| **P3** | **Low** | Non-exploitable informational vulnerability, outdated transient dependency without public exploit, or misconfigured non-sensitive DNS record. | Next Sprint Cycle | On-call Platform Engineer |

---

## 2. Immediate Containment Playbooks

### 2.1 Compromised User / Administrator Session
When a compromised student, faculty, or admin credential token is identified:

1. **Global Session Invalidation**:
   Publish revocation event across Redis cluster to immediately reject all active JWTs for user:
   ```bash
   # Add user ID to Redis Token Blacklist with TTL matching JWT expiration (15 minutes)
   redis-cli SETEX "blacklist:user:<UUID>" 900 "compromised_revocation_event"
   ```
2. **Force Refresh Token Revocation**:
   Invalidate persistent refresh tokens in PostgreSQL:
   ```sql
   UPDATE user_sessions 
   SET is_revoked = TRUE, revoked_at = NOW(), revocation_reason = 'SECURITY_INCIDENT_REVOCATION' 
   WHERE user_id = '<COMPROMISED_USER_UUID>' AND is_revoked = FALSE;
   ```
3. **Trigger Mandatory MFA Re-enrollment**:
   Mark account for forced password change and WebAuthn/TOTP re-verification upon subsequent login.

---

### 2.2 Database Exfiltration or Unauthorized Access
If unauthorized queries or anomalous outbound data transfer is detected on PostgreSQL:

1. **Immediate Connection Severing**:
   ```sql
   -- Terminate active suspicious connections immediately
   SELECT pg_terminate_backend(pid) 
   FROM pg_stat_activity 
   WHERE usename = '<SUSPICIOUS_ROLE>' AND pid <> pg_backend_pid();
   ```
2. **Revoke Database User Credentials**:
   ```sql
   ALTER ROLE <SUSPICIOUS_ROLE> NOLOGIN;
   ALTER ROLE <SUSPICIOUS_ROLE> WITH PASSWORD '<ROTATED_RANDOM_SECRET>';
   ```
3. **Freeze Read-Replicas & Enable Forensic WAL Archiving**:
   Snapshot Point-in-Time Recovery (PITR) write-ahead logs to immutable AWS S3 Glacier vault for offline forensic reconstruction.

---

## 3. Forensic Investigation & Evidence Gathering

### 3.1 Correlating Edge WAF and Application Logs
Every incoming HTTP request receives a unique `x-request-id` header generated at the Cloudflare / Vercel Edge layer. Use the correlation ID to trace anomalous activity across microservices:

```bash
# Query OpenSearch / CloudWatch logs for the incident trace
aws logs filter-log-events \
  --log-group-name "/universe/production/api-gateway" \
  --filter-pattern '{ $.requestId = "req_01HP8Y9Z8K7..." }'
```

### 3.2 Audit Log Inspection
Uni-Verse maintains an append-only hash-chained `audit_logs` table. Verify integrity of audit records:
```sql
SELECT id, actor_id, action, resource, client_ip, created_at, signature
FROM audit_logs
WHERE created_at BETWEEN NOW() - INTERVAL '6 hours' AND NOW()
  AND action IN ('EXPORT_STUDENT_PII', 'GRADE_OVERRIDE', 'DOOR_ACCESS_OVERRIDE')
ORDER BY created_at DESC;
```

---

## 4. Regulatory Reporting & Communication

### 4.1 FERPA & Legal Notification Timelines
- **FERPA Compliance Officer**: Must be notified within **4 hours** of confirming PII exposure.
- **Affected Individuals**: Written disclosure required without unreasonable delay if unencrypted personal records were accessed.
- **Campus Public Information Officer**: Issues coordinated stakeholder communications; technical engineers must not comment externally.

### 4.2 Post-Incident Review (PIR)
Within **48 hours** of incident closure, conduct a blameless post-mortem covering:
1. Root-cause analysis (5-Whys methodology).
2. Detection gap analysis (why automated alerts did not trip sooner).
3. Preventive work items logged to Jira/Linear with high priority SLA.
