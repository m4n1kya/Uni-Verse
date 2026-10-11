# JWT Refresh Token Rotation Specification

## Architecture
To protect against token theft, Uni-Verse implements single-use Refresh Token Rotation (RTR).
- When a refresh token is exchanged, a new pair (access token + refresh token) is issued.
- The previous refresh token is immediately marked revoked.
- If a revoked refresh token is presented, all child sessions for that user family are automatically invalidated (compromise detection).
