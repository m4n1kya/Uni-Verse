# Zero-Trust API Gateway & Mutual TLS (mTLS) Specification

## Overview
Uni-Verse employs a **Zero-Trust Network Architecture (ZTNA)**. Every request originating from clients, third-party campus vendor systems, or internal background workers must be explicitly authenticated, authorized, and encrypted—regardless of whether it originates inside or outside the university intranet.

---

## 1. Network Boundary Topology

```
[Clients: Web / Mobile / IoT]
              |
              v (HTTPS / TLS 1.3)
+--------------------------------------------------------------+
|                     Edge API Gateway                         |
|  - Cloudflare / Vercel Edge Firewall                         |
|  - DDoS Shield & Geo-IP Validation                           |
|  - JWT Signature & Scope Verification                        |
|  - Per-Student Dynamic Rate Limiting                         |
+--------------------------------------------------------------+
              |
              v (Mutual TLS / mTLS Internal Mesh)
+--------------------------------------------------------------+
|                   Core Application Services                  |
|  [Auth Service]   [Transit Service]   [Cafeteria Engine]     |
+--------------------------------------------------------------+
              |
              v (Encrypted Wire Protocol)
+--------------------------------------------------------------+
|            PostgreSQL Cluster + Redis Telemetry              |
+--------------------------------------------------------------+
```

---

## 2. Mutual TLS (mTLS) for Internal Services

All inter-service RPC communication utilizes mTLS with X.509 certificates managed by HashiCorp Vault:
- **Cipher Suites**: Restricted to `TLS_AES_256_GCM_SHA384` and `TLS_CHACHA20_POLY1305_SHA256`.
- **Certificate Rotation**: Automated 30-day certificate rotation with zero-downtime hot-reloading.
- **Service Identity**: Verified using SPIFFE IDs (e.g., `spiffe://universe.campus/ns/prod/sa/transit-collector`).

---

## 3. Request Fingerprinting & Threat Scoring

The API Gateway computes a dynamic **Risk Score ($R \in [0, 100]$)** for incoming requests before hitting upstream handlers:

$$R = w_{\text{geo}} \cdot S_{\text{geo}} + w_{\text{rate}} \cdot S_{\text{rate}} + w_{\text{device}} \cdot S_{\text{device}}$$

- **$S_{\text{geo}}$**: IP reputation and ASN mismatch relative to enrolled student profile.
- **$S_{\text{rate}}$**: Token bucket consumption velocity relative to moving baseline.
- **$S_{\text{device}}$**: Browser TLS client hello fingerprint (JA3 / JA4 hash) stability.

### Enforcement Tiers
- **$R < 40$**: Normal execution.
- **$40 \le R < 75$**: Step-up multi-factor challenge (OTP / push approval).
- **$R \ge 75$**: Instant connection termination with HTTP 403 and security audit alert.

---

## 4. Third-Party Vendor Ingress (Cafeteria & Shuttle Operators)

External merchant terminals in the food court and GPS trackers on contracted shuttle buses connect via dedicated ingress paths:
1. **IP Whitelisting**: Strict CIDR boundary enforcement per food stall.
2. **HMAC Webhook Signatures**: Payment and inventory webhooks verify `X-Signature-SHA256` computed with rotating merchant secrets.
3. **Payload Sanitization**: Strict JSON schema enforcement using Zod contracts before queuing events into Redis.
