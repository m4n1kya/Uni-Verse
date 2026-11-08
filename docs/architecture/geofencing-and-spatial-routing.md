# Campus Geofencing Engine & Spatial Location Architecture

## Overview
Uni-Verse delivers context-aware campus experiences—such as automated shuttle stop proximity countdowns, geofenced cafeteria daily special notifications, and library book return reminders—via an ultra-low-power **Spatial Geofencing Engine**. This specification defines our geographic coordinate data structures, PostGIS spatial indexing, client battery preservation policies, and privacy boundaries.

---

## 1. Spatial Topology & PostGIS Indexing

All campus facilities, bus stops, hostel blocks, and lecture complexes are mapped as spatial polygon features in PostgreSQL using the **PostGIS** extension:

```sql
-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Campus geofence zones table
CREATE TABLE campus_geofences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'dining', 'transit_stop', 'hostel', 'academic'
    boundary GEOMETRY(Polygon, 4326) NOT NULL,
    active_payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- R-Tree Spatial Index for sub-millisecond bounding box containment queries
CREATE INDEX idx_campus_geofences_spatial 
ON campus_geofences USING gist (boundary);
```

---

## 2. Low-Power Client Geofencing Strategy

Continuous GPS polling rapidly drains mobile device batteries. Uni-Verse uses a **Tiered Location Sampling Protocol**:

```
[Significant Motion Sensor Trigger]
                |
                v
[Coarse Network Cell Location Check (> 500m)]
                |
                +--- User inside Campus Perimeter? ---> [Medium Precision Wi-Fi Fingerprinting (~50m)]
                                                                |
                                                                +--- Within 100m of Bus Stop? ---> [High Precision GPS (~5m, 1Hz)]
```

### Power Consumption Budget
- **Campus Edge (Background)**: Significant motion detection consumes $< 1\%$ battery per 8-hour period.
- **Active Navigation (Foreground)**: GPS fixes throttle to $1\text{ fix / 5 seconds}$ when vehicle velocity is below $15\text{ km/h}$.

---

## 3. Spatial Query: Proximity & Containment Execution

When a campus shuttle publishes GPS coordinates:

```sql
-- Query bus stops within 50 meters of current bus coordinate
SELECT s.stop_id, s.name,
       ST_Distance(s.location::geography, ST_SetSRID(ST_MakePoint(79.1589, 12.9716), 4326)::geography) AS distance_meters
FROM transit_stops s
WHERE ST_DWithin(s.location::geography, ST_SetSRID(ST_MakePoint(79.1589, 12.9716), 4326)::geography, 50.0)
ORDER BY distance_meters ASC
LIMIT 1;
```

- **Query Execution Time**: $< 2.4\text{ ms}$ leveraging GIST spatial index lookups.
- **Trigger**: When distance falls below $25\text{ meters}$, an automated `transit:bus:arriving` event dispatches over WebSockets to waiting students.

---

## 4. Student Location Privacy Mandate
- **Ephemeral Processing**: GPS coordinates are evaluated in volatile memory and never persisted as raw trace logs.
- **Zero Cloud Tracking**: User proximity checks against static cafeteria zones execute locally in the client application using client-side turf.js whenever possible.
