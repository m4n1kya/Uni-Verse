# Database Schema: Campus Events & Clubs

## Structure
Stores campus club details, executive committee rosters, scheduled workshops, and attendee ticket records.

```sql
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
    student_id UUID REFERENCES users(id),
    ticket_qr_code VARCHAR(255) UNIQUE NOT NULL,
    attended BOOLEAN DEFAULT FALSE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
