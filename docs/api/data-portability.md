# Student Data Portability & GDPR / DPDP Compliance API

## Overview
In accordance with international privacy mandates (GDPR Article 20 "Right to Data Portability" and India's Digital Personal Data Protection Act), Uni-Verse provides automated endpoints enabling students to request, track, and download all personal and academic records in an interoperable, machine-readable format.

---

## 1. Asynchronous Export Workflow

Because compiling academic histories, cafeteria transaction ledgers, attendance metrics, and library loan records requires querying multiple subsystem databases, exports execute as **Asynchronous Background Jobs**:

```
[Student Client]                [Uni-Verse API Gateway]             [Export Worker]
       |                                   |                               |
       | 1. POST /students/me/export       |                               |
       |---------------------------------->|                               |
       | 2. Returns 202 Accepted (Job ID)  | 3. Enqueues job in Redis      |
       |<----------------------------------|------------------------------>|
       |                                   | 4. Gathers & encrypts archive |
       |                                   |    (AES-256 ZIP bundle)       |
       | 5. Poll /export/:jobId (or SSE)   |                               |
       |---------------------------------->|                               |
       | 6. Returns signed S3 download URL |                               |
       |<----------------------------------|                               |
```

---

## 2. API Endpoints

### Request New Export Job
`POST /api/v1/students/me/export`

- **Headers**: `Authorization: Bearer <JWT>`
- **Request Body**:
  ```json
  {
    "format": "json",
    "includeModules": ["academics", "cafeteria_orders", "library_loans", "attendance"],
    "encryptionPublicKey": "optional_pgp_key_string"
  }
  ```
- **Response (202 Accepted)**:
  ```json
  {
    "jobId": "job_exp_91823a",
    "status": "PROCESSING",
    "requestedAt": "2026-10-29T05:32:00Z",
    "estimatedCompletionSeconds": 45
  }
  ```

---

### Check Export Job Status
`GET /api/v1/students/me/export/:jobId`

- **Response (200 OK - Complete)**:
  ```json
  {
    "jobId": "job_exp_91823a",
    "status": "COMPLETED",
    "completedAt": "2026-10-29T05:32:41Z",
    "archiveSizeMb": 4.82,
    "downloadUrl": "https://vault.universe-campus.org/exports/job_exp_91823a.zip?signature=...",
    "expiresAt": "2026-10-30T05:32:41Z"
  }
  ```

---

## 3. Data Archive Package Format

The downloaded `.zip` bundle includes:
1. `manifest.json`: Checksum, generation timestamp, and student identity metadata.
2. `academic_records.json`: Course enrollment history, grade points, semester CGPAs.
3. `dining_orders.json`: Cafeteria transaction history, receipt timestamps, dietary preferences.
4. `library_history.json`: Borrowed books, return dates, active reservations.
5. `security_audit.json`: Active sessions, IP log history, OAuth consent grants.

---

## 4. Security & Expiration Protections
- **Pre-signed URL Expiry**: The generated S3 download URL expires strictly 24 hours after completion.
- **Payload Encryption**: Archives are encrypted at rest using temporary AES-GCM 256-bit keys before transfer.
- **Rate Limit**: Maximum 1 export request per student per 7-day rolling window to prevent server resource abuse.
