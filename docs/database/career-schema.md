# Database Schema: Career Drives & Placements

## Structure
Tracks visiting enterprise recruiters, CTC packages, eligibility cutoffs, and student drive applications.

```sql
CREATE TABLE placement_drives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(128) NOT NULL,
    ctc_lpa NUMERIC(5, 2) NOT NULL,
    min_cgpa NUMERIC(3, 2) NOT NULL,
    max_arrears INT DEFAULT 0,
    drive_date DATE NOT NULL
);
```
