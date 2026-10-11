# Authentication & Session Management API

## Overview
Provides JWT-based authentication, student roll number verification, SSO integration, and token lifecycle management for Uni-Verse.

### Endpoints

#### POST /api/v1/auth/login
Authenticates a student or faculty member using university credentials.
- **Request Body**:
  ```json
  {
    "rollNumber": "21BCE1024",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1Ni...",
    "refreshToken": "d8f4e2...",
    "expiresIn": 3600,
    "user": {
      "id": "usr_9981",
      "name": "Arjun Sharma",
      "role": "student"
    }
  }
  ```

#### POST /api/v1/auth/refresh
Rotates the current refresh token and returns a new access token.

#### POST /api/v1/auth/logout
Invalidates the refresh token session on the server.
