# Database Schema: Academic Records & Courses

## Structure
Tracks semesters, course enrollments, grade points, and cumulative grade point averages (CGPA).

```sql
CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    course_code VARCHAR(16) NOT NULL,
    semester INT NOT NULL,
    credits INT NOT NULL,
    grade VARCHAR(4),
    grade_points NUMERIC(3, 2),
    status VARCHAR(16) DEFAULT 'enrolled'
);
```
