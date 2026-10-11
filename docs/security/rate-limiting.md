# API Rate Limiting & Abuse Prevention

## Rate Limiting Rules
- **Public / Auth Endpoints**: Maximum 10 requests / minute per IP to prevent credential brute-forcing.
- **Authenticated Endpoints**: Maximum 120 requests / minute per user token.
- **Telemetry Ingestion**: Maximum 1 request / second per registered vehicle device.
- **Headers Returned**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`.
