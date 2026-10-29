# Redis Caching Topologies & Invalidation Policies

## Overview
To sustain low latency ($< 50\text{ ms}$) during high-throughput university portal operations, Uni-Verse deploys a multi-tier **Redis Cache Cluster**. This specification documents cache topologies, eviction policies, TTL guidelines, and cache stampede mitigation.

---

## 1. Caching Topology & Patterns

```
[Client Request]
       |
       v
+--------------------------------------------------------------+
|                    API Gateway / Edge                        |
+--------------------------------------------------------------+
       |
       | 1. Query Cache (GET)
       v
+--------------------------------------------------------------+
|                     Redis Cache Cluster                      |
|               (Primary-Replica Sentinel Set)                 |
+--------------------------------------------------------------+
       |                                      ^
       | Cache Miss                           | 2. Populate Cache (SETEX)
       v                                      |
+--------------------------------------------------------------+
|                 PostgreSQL Master Database                   |
+--------------------------------------------------------------+
```

### Cache-Aside (Lazy Loading)
- Used for read-heavy, low-volatility entities such as course syllabi, faculty cabins, and campus building directories.
- Application queries Redis first. On cache miss, reads from PostgreSQL and populates Redis with an explicit TTL.

### Write-Through with Invalidation Pub/Sub
- Used for dynamic entities such as cafeteria order queues and bus route schedules.
- Mutations write to PostgreSQL master and immediately invalidate or update Redis keys, broadcasting an event over Redis Pub/Sub channels to flush edge node local caches.

---

## 2. Key Namespace Conventions & TTL Tiers

All keys follow a strict hierarchical namespace pattern: `universe:<domain>:<entity>:<id>`

| Namespace Pattern | Sample Key | TTL | Invalidation Trigger |
|---|---|---|---|
| `universe:courses:details:<code>` | `universe:courses:details:CSE3002` | 24 Hours | Nightly ETL update |
| `universe:faculty:profile:<id>` | `universe:faculty:profile:fac_102` | 7 Days | Admin profile update |
| `universe:transit:route:<routeId>` | `universe:transit:route:rt_north` | 1 Hour | Route disruption alert |
| `universe:dining:menu:<stallId>` | `universe:dining:menu:stall_04` | 4 Hours | Merchant daily special change |
| `universe:session:token:<jti>` | `universe:session:token:tok_9a8` | 15 Mins | User logout / token rotation |

---

## 3. Cache Stampede Mitigation (Redlock & Probabilistic Early Expiration)

When heavily requested keys expire during morning rush hours, hundreds of concurrent requests can simultaneously hit the database:

### Probabilistic Early Expiration (XFetch Algorithm)
Instead of hard expiration, worker threads compute a probabilistic refresh check:

$$\Delta \cdot \beta \cdot \ln(\text{random}()) > \text{TTL}_{\text{remaining}}$$

- Where $\beta = 1.0$ and $\Delta$ is the execution time of the database query.
- A single background worker re-fetches the record before it actually expires, keeping the cache continuously hot.

### Distributed Locking with Redlock
When a cache miss does occur for heavy aggregation queries (e.g., student CGPA batch calculations):
1. Worker acquires a distributed lock: `SET universe:lock:cgpa:<id> my_random_token NX PX 5000`.
2. Only the lock winner executes the heavy SQL query and writes back to Redis.
3. Other concurrent threads wait 100ms and read the newly cached result.

---

## 4. Memory Eviction Policy
- **MaxMemory Strategy**: `allkeys-lru` (Least Recently Used across all keys).
- **Cluster High-Water Mark**: Automated alerts fire if Redis memory utilization exceeds $75\%$ of allocated RAM.
