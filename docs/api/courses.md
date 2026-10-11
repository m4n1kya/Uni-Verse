# Course Registration & Syllabus API

## Overview
Handles course enrollment, credit tracking, elective allotments, and syllabus downloads.

### Endpoints

#### GET /api/v1/courses/active
Lists all currently registered courses for the current academic semester.

#### GET /api/v1/courses/:courseCode/syllabus
Downloads official PDF or JSON curriculum outline.
