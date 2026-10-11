# Data Encryption Standards

## In Transit
- All external and internal service calls require TLS 1.3 encryption with modern cipher suites.
- Strict Transport Security (HSTS) enforced with `max-age=31536000; includeSubDomains; preload`.

## At Rest
- Database instances use AES-256 transparent data encryption.
- Passwords hashed using Argon2id with high memory cost factor.
