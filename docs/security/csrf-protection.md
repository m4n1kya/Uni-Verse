# Cross-Site Request Forgery (CSRF) Mitigation

## Mitigation Strategy
- Refresh tokens and sensitive auth cookies are marked with `HttpOnly`, `Secure`, and `SameSite=Strict`.
- State-changing API calls verify anti-CSRF token headers for non-idempotent endpoints.
