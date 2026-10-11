# Faculty Directory & Consultation API

## Overview
Provides access to professor office hours, research labs, publication records, and consultation appointments.

### Endpoints

#### GET /api/v1/faculty
Searches faculty members by department, research domain, or cabin number.

#### POST /api/v1/faculty/:facultyId/appointments
Requests a meeting slot during declared office hours.
