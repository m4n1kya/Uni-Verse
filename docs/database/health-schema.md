# Database Schema: Health Center & Emergency Contacts

## Structure
Secures confidential health consultations, blood group metadata, prescription logs, and parent emergency alerts.

```sql
CREATE TABLE medical_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    physician_name VARCHAR(128) NOT NULL,
    diagnosis TEXT,
    prescriptions TEXT,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
