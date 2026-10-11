# Database Schema: Hostel Allotment & Infrastructure

## Structure
Coordinates hostel block architectures, bed allocations, check-in logs, and warden assignment records.

```sql
CREATE TABLE hostel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_name VARCHAR(32) NOT NULL,
    room_number VARCHAR(16) NOT NULL,
    capacity INT NOT NULL DEFAULT 2,
    occupied_count INT NOT NULL DEFAULT 0
);
```
