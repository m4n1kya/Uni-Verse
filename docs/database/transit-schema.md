# Database Schema: Transit & Telemetry

## Structure
Captures GPS coordinates, vehicle registration, active route stops, and speed alerts.

```sql
CREATE TABLE bus_telemetry (
    id BIGSERIAL PRIMARY KEY,
    bus_id VARCHAR(32) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    speed_kmh NUMERIC(5, 2) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
