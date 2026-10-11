# Database Indexing & Query Optimization Strategy

## High-Throughput Indexes

1. **User Lookups**:
   - `CREATE INDEX idx_users_roll_number ON users(roll_number);`
2. **Transit Real-Time Queries**:
   - `CREATE INDEX idx_bus_telemetry_latest ON bus_telemetry(bus_id, timestamp DESC);`
3. **Library Catalog Full-Text Search**:
   - `CREATE INDEX idx_books_search ON books USING gin(to_tsvector('english', title || ' ' || author));`
4. **Student Course History**:
   - `CREATE INDEX idx_enrollments_student_semester ON course_enrollments(student_id, semester);`
