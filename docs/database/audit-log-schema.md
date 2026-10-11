# Database Schema: System Audit & Access Logs

## Structure
Immutable chronological logging for authentication attempts, sensitive data modifications, and role elevation.

```sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id UUID,
    action VARCHAR(64) NOT NULL,
    resource VARCHAR(128) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
