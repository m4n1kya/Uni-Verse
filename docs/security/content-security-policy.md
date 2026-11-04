# Content Security Policy (CSP) & HTTP Security Headers Baseline

## Overview
Uni-Verse enforces an uncompromising **Defense-in-Depth** web security policy. This specification defines our strict **Content Security Policy (CSP Level 3)**, cryptographic Subresource Integrity (SRI) verifications, Permissions-Policy restrictions, and HTTP response security headers applied at Vercel Edge Middleware.

---

## 1. Content Security Policy (CSP Level 3)

The application mandates a strict, nonce-based Content Security Policy that completely disables unsafe inline script execution (`'unsafe-inline'`), arbitrary string code evaluations (`'unsafe-eval'`), and unauthorized external resource injections.

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_NONCE}' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://uni-verse-swart.vercel.app;
  connect-src 'self' https://api.universe-campus.org wss://api.universe-campus.org https://fonts.googleapis.com https://fonts.gstatic.com;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  report-uri /api/v1/security/csp-reports;
  report-to csp-endpoint;
```

### Directive Rationales
- **`object-src 'none'`**: Prevents execution of legacy plugins (Flash, Java applets, ActiveX).
- **`frame-ancestors 'none'`**: Completely prevents clickjacking attacks by forbidding the application from being embedded in `<iframe>`, `<frame>`, or `<object>` elements across external origins.
- **`connect-src`**: Restricts asynchronous fetch/XHR requests and WebSocket telemetry channels strictly to approved campus domains.
- **`base-uri 'self'`**: Neutralizes Base Tag Hijacking attacks that attempt to redirect relative URL imports.

---

## 2. Complementary HTTP Security Headers

Every edge HTTP response emitted by the platform injects the following RFC-compliant headers:

| Header Name | Configured Directive | Protection Vector |
|---|---|---|
| **`Strict-Transport-Security`** | `max-age=63072000; includeSubDomains; preload` | Enforces TLS across all subdomains for 2 years; preloaded in browsers |
| **`X-Content-Type-Options`** | `nosniff` | Disables MIME-type sniffing; blocks executable file impersonation |
| **`Referrer-Policy`** | `strict-origin-when-cross-origin` | Protects student privacy by omitting paths on outbound external links |
| **`X-Frame-Options`** | `DENY` | Legacy fallback defending against clickjacking on older browsers |
| **`Cross-Origin-Opener-Policy`**| `same-origin` | Isolates browser browsing context; thwarts Spectre-style side-channel attacks |
| **`Cross-Origin-Resource-Policy`**| `same-origin` | Prevents unauthorized cross-origin reading of static assets |

---

## 3. Permissions-Policy (Feature Policy)

Restricts access to browser hardware APIs to eliminate unprompted hardware surveillance:

```http
Permissions-Policy: 
  camera=(),
  microphone=(),
  geolocation=(self "https://uni-verse-swart.vercel.app"),
  payment=(),
  usb=(),
  magnetometer=(),
  accelerometer=(),
  display-capture=()
```

- **Geolocation**: Allowed exclusively on `'self'` to compute proximity to campus bus stops and dining facilities.
- **Camera/Microphone/Payment**: Explicitly disabled (`()`) across all pages.

---

## 4. Automated CSP Violation Reporting & Triage

1. **Edge Ingestion**: Client CSP violation reports post automatically to `/api/v1/security/csp-reports`.
2. **Telemetry Filter**: The worker deduplicates reports by `blocked-uri` and `violated-directive` over a 5-minute rolling window in Redis.
3. **Automated Alerting**: If an unexpected script injection violation fires $> 10$ times in 60 seconds, an alert is paged directly to the security on-call team for immediate inspection.
