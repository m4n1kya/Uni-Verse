# Database Schema: Grievance Redressal & Feedback

## Structure
Standardizes feedback ticketing, sentiment classification, department routing, and SLA resolution timings.

```sql
CREATE TABLE grievance_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID REFERENCES users(id),
    category VARCHAR(64) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status VARCHAR(32) DEFAULT 'open',
    assigned_department VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
