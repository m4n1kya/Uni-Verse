# Enterprise Secrets Management & Automated Rotation Policy

## Overview
Uni-Verse enforces an absolute **Zero Plaintext Secrets** mandate across all source code, continuous integration pipelines, container registries, and server runtime environments. All sensitive credentials—including database passwords, JWT signing private keys, third-party payment gateway secrets, and Redis auth tokens—are dynamically injected, encrypted in transit, and rotated automatically.

---

## 1. Secrets Classification & Storage Topology

```
+--------------------------------------------------------------+
|                    HashiCorp Vault / AWS KMS                 |
|               (Master Hardware Security Module)              |
+--------------------------------------------------------------+
        |                                       |
        v (Dynamic Credentials)                 v (Envelope Encryption)
+-------------------------------+       +-------------------------------+
|    Ephemeral DB Access Roles  |       | Application Configuration     |
|    - 1-Hour Leased Credentials|       | - Encrypted at rest           |
|    - Auto-revoked on expiry   |       | - Injected via env at runtime |
+-------------------------------+       +-------------------------------+
```

### Classification Matrix

| Secret Tier | Classification | Storage Provider | Rotation Cadence |
|---|---|---|---|
| **Tier 1: Master Keys** | Top Secret (HSM) | AWS KMS / Vault Transit Engine | 365 Days (Automated Key Versioning) |
| **Tier 2: Database Credentials** | Confidential | Vault PostgreSQL Dynamic Engine | 1 Hour (Lease-based revocation) |
| **Tier 3: Service API Tokens** | Confidential | HashiCorp Vault KV Store | 30 Days (Scheduled rotation) |
| **Tier 4: Client Tokens (JWT)** | Ephemeral | In-Memory Redis Session Store | 15 Minutes (Refresh Token Rotation) |

---

## 2. Dynamic Database Credentials Pattern

Application service instances never possess permanent database user accounts or passwords. Instead:
1. When a backend container boots, it authenticates with Vault using its Kubernetes ServiceAccount token.
2. Vault issues a temporary PostgreSQL role with strictly scoped privileges (e.g., `SELECT, INSERT, UPDATE ON cafeteria_orders`):
   ```sql
   -- Generated dynamically by Vault with 1-hour lease
   CREATE ROLE "v-token-universe-prod-a8f9" WITH LOGIN PASSWORD 'temporary_password' VALID UNTIL '2026-11-02 13:00:00';
   GRANT universe_app_readwrite TO "v-token-universe-prod-a8f9";
   ```
3. A background daemon renews the lease hourly. If an instance terminates or is compromised, the lease expires and access is revoked automatically.

---

## 3. Envelope Encryption for Sensitive Student Records

Confidential student attributes (health records, emergency contacts, disciplinary filings) utilize **Envelope Encryption**:
1. A unique Data Encryption Key (DEK) encrypts the student record using AES-256-GCM.
2. The DEK itself is encrypted using a Master Key (KEK) managed in AWS KMS.
3. Only the encrypted record and encrypted DEK are persisted to the database. Even with a full database dump, the data remains unreadable without KMS master key access.

---

## 4. Secret Leakage Prevention & Audit Gateways

- **Pre-Commit Hooks**: Local git hooks run `gitleaks protect --staged` before every commit.
- **CI/CD Scanning**: GitHub Actions pipeline executes TruffleHog deep scans across all commits in PR branches.
- **Runtime Masking**: Application logging engines (Winston / Pino) employ regex redaction filters to scrub patterns matching JWTs, authorization headers, credit card numbers, and API tokens before writing to stdout.
