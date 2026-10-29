# Campus Single Sign-On (SSO) & OpenID Connect (OIDC) Integration

## Overview
Uni-Verse integrates seamlessly with enterprise university Identity Providers (IdPs)—including Microsoft Entra ID (Azure AD), Google Workspace for Education, and Shibboleth SAML 2.0 federations. This specification details authentication token exchanges, role claim mapping, and secure Single Sign-Out protocols.

---

## 1. Authentication Flow: Authorization Code with PKCE

To prevent authorization code interception attacks on public web clients and mobile applications, Uni-Verse mandates **Proof Key for Code Exchange (PKCE)** (RFC 7636):

```
+----------+                                    +-----------------------+
|  Client  |                                    | University IdP (Entra)|
+----------+                                    +-----------------------+
     |                                                      |
     | 1. Generate code_verifier + code_challenge           |
     | 2. Redirect: GET /authorize?code_challenge=...       |
     |----------------------------------------------------->|
     |                                                      |
     | 3. Student logs in via university credentials        |
     | 4. Redirect with auth code: /callback?code=AUTH_CODE |
     |<-----------------------------------------------------|
     |                                                      |
     | 5. POST /oauth/token (code + code_verifier)          |
     |----------------------------------------------------->|
     |                                                      |
     | 6. Returns ID Token (JWT) + Access Token             |
     |<-----------------------------------------------------|
```

---

## 2. Token Claims & Attribute Mapping

Upon successful OIDC federation, incoming claims from the university directory are mapped to Uni-Verse user profiles:

```typescript
export interface UniversityIdTokenClaims {
  sub: string;                   // Unique IdP persistent user UUID
  email: string;                 // Student institutional email (e.g., student@universe.edu)
  name: string;                  // Full display name
  given_name: string;            // First name
  family_name: string;           // Last name
  department: string;            // Academic department (e.g., "Computer Science")
  roll_number: string;           // University registration / roll number
  user_type: 'student' | 'faculty' | 'staff' | 'alumni';
  graduation_year?: number;      // Anticipated batch graduation year
}
```

### Claim Normalization Logic
- **Student Roll Verification**: Extracted using regex match on standard institutional formats (`^[0-9]{2}[A-Z]{3}[0-9]{4}$`).
- **Department Routing**: Canonical department codes (e.g. `CSE`, `ECE`, `MECH`) are derived from the IdP `department` claim for course dashboard filtering.

---

## 3. Session Synchronization & Single Logout (SLO)

1. **Back-Channel Logout (OIDC)**: When a student logs out of their central university portal, the IdP sends an asynchronous HTTP POST to `/api/v1/auth/backchannel-logout` with a signed `logout_token`.
2. **Session Invalidation**: The server revokes all active refresh tokens associated with the `sub` claim and publishes an invalidation event across the Redis cluster.
3. **Client Socket Notification**: Connected client browser tabs receive a `uni:auth:session-expired` WebSocket message, prompting immediate redirect to the login screen.

---

## 4. Security Hardening Measures
- **State Token Validation**: Cryptographically secure, unguessable `state` tokens prevent Cross-Site Request Forgery (CSRF).
- **Issuer Validation**: Strict verification of JWT signature using the IdP's JSON Web Key Set (JWKS) cached with a 1-hour TTL.
- **Clock Skew Tolerance**: Maximum 60-second clock skew tolerance on `iat` (issued at) and `exp` (expiration) timestamps.
