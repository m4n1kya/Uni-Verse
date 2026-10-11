# Student Profile & Academic Record API

## Overview
Enables retrieving and updating student information, GPA calculation, semester roadmaps, and profile customization.

### Endpoints

#### GET /api/v1/students/me
Fetches current authenticated student details.
- **Response (200 OK)**:
  ```json
  {
    "id": "usr_9981",
    "rollNumber": "21BCE1024",
    "fullName": "Arjun Sharma",
    "department": "Computer Science & Engineering",
    "semester": 6,
    "cgpa": 8.92,
    "attendanceAverage": 91.5
  }
  ```

#### PUT /api/v1/students/me/preferences
Updates UI theme, notification channels, and dietary tags.
