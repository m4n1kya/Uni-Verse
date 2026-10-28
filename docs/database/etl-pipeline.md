# Automated Campus Data Ingestion & ETL Pipeline Specification

## Overview
Uni-Verse integrates with disparate legacy campus systems (Banner, PeopleSoft, internal SIS, faculty publications APIs, and food vendor POS systems). This specification details the asynchronous **Extract, Transform, Load (ETL)** pipeline that synchronizes course catalogs, faculty directories, and cafeteria menus nightly.

---

## 1. Pipeline Architecture

```
[University SIS / Banner]     [Faculty Research APIs]     [Food Court POS]
            |                            |                        |
            v                            v                        v
+--------------------------------------------------------------------+
|                  Ingestion Workers (Node.js / Python)              |
|        - Scheduled cron triggers (02:00 UTC daily)                 |
|        - Rate-limited scraping & SOAP/REST adaptors                |
+--------------------------------------------------------------------+
                                   |
                                   v
+--------------------------------------------------------------------+
|                   Transformation & Cleaning Stage                  |
|        - Zod schema validation & normalization                     |
|        - Deduplication & fuzzy entity matching                     |
|        - PDF OCR & text tokenization for search vectors            |
+--------------------------------------------------------------------+
                                   |
                                   v
+--------------------------------------------------------------------+
|                      PostgreSQL Staging Buffer                     |
|        - Upsert into 'stg_*' tables                                |
|        - Atomic swap into production via transactional views       |
+--------------------------------------------------------------------+
```

---

## 2. Extraction & Ingestion Jobs

| Job Identifier | Frequency | Source System | Target Schema |
|---|---|---|---|
| `job:sync:course_catalog` | Daily at 02:00 UTC | University ERP (Oracle DB) | `courses`, `course_sections` |
| `job:sync:faculty_directory` | Weekly (Sunday) | HR / Campus LDAP | `faculty`, `office_hours` |
| `job:sync:cafeteria_menus` | Daily at 06:00 UTC | Merchant REST APIs / Webhooks | `cafeteria_stalls`, `menu_items` |
| `job:index:notes_search` | Nightly at 03:30 UTC | File Storage (PDF notes) | `documents_fts` (PostgreSQL tsvector) |

---

## 3. Data Cleansing & Validation Rules

### Schema Invariants
All ingested records pass through strict Zod validators prior to persistence:
1. **Course Codes**: Normalized to uppercase regex `^[A-Z]{3}[0-9]{4}$` (e.g., `CSE3002`).
2. **Faculty Contact**: Phone numbers sanitized to E.164 standard; emails verified against `@universe.edu` domain.
3. **Food Pricing**: Verified $\text{price} > 0$ with currency code `INR`.

### Conflict & Deduplication Strategy
- **Natural Keys**: Deduplication keyed on `(department_id, course_code, academic_year)`.
- **Fuzzy Name Matching**: Levenshtein distance $\le 2$ used to reconcile faculty names across HR records and published paper citations.

---

## 4. Idempotent Upsert & Zero-Downtime Swap

To prevent partial reads or transient empty states while the ETL pipeline executes:
1. Data writes to staging tables (e.g. `stg_courses`).
2. Data consistency verification verifies row count threshold:
   $$\text{RowCount}(\text{stg}) \ge 0.95 \times \text{RowCount}(\text{prod})$$
3. Atomic transaction swaps staging into live tables using PostgreSQL table renaming:
   ```sql
   BEGIN;
   ALTER TABLE courses RENAME TO courses_old;
   ALTER TABLE stg_courses RENAME TO courses;
   DROP TABLE courses_old;
   COMMIT;
   ```

---

## 5. Dead-Letter Queue (DLQ) & Alerting
Malformed rows that fail validation are routed to `etl_dead_letter_records` with error stack traces and trigger a Discord/Slack webhook notification to the campus engineering team.
