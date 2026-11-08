# GraphQL Federation Gateway & Entity Resolution Architecture

## Overview
To provide flexible querying for rich composite views—such as the central student dashboard combining academic roadmaps, active cafeteria orders, live transit departure estimates, and placement recommendations—Uni-Verse designs a **Federated GraphQL Supergraph Gateway** (Apollo Federation v2 / GraphQL Yoga) unifying isolated campus microservices.

---

## 1. Federated Supergraph Topology

```
[Web / Mobile Client]
          |
          | Single GraphQL Query: POST /graphql
          v
+--------------------------------------------------------------+
|                   GraphQL Federation Gateway                 |
|  - Request query plan generation                             |
|  - Distributed tracing & JWT validation                      |
|  - Automatic Persisted Query (APQ) hash verification         |
+--------------------------------------------------------------+
       /               |               \               \
      v                v                v               v
+------------+   +------------+   +------------+   +------------+
| Subgraph:  |   | Subgraph:  |   | Subgraph:  |   | Subgraph:  |
| Academics  |   | Dining     |   | Transit    |   | Career     |
+------------+   +------------+   +------------+   +------------+
```

---

## 2. Federated Entity Schemas (`@key`)

Subgraphs extend shared entity types seamlessly without tight coupling:

### Academics Subgraph (Owner of `Student`)
```graphql
type Student @key(fields: "id") {
  id: ID!
  rollNumber: String!
  fullName: String!
  department: String!
  cgpa: Float!
  enrolledCourses: [CourseEnrollment!]!
}
```

### Dining Subgraph (Extends `Student`)
```graphql
extend type Student @key(fields: "id") {
  id: ID! @external
  activeDiningOrders: [DiningOrder!]!
  loyaltyPoints: Int!
}
```

### Transit Subgraph (Extends `Student`)
```graphql
extend type Student @key(fields: "id") {
  id: ID! @external
  favoriteBusRoute: TransitRoute
}
```

---

## 3. DataLoader Batching & N+1 Query Elimination

Without batching, querying 20 students and their current course instructors executes $1 + 20 = 21$ sequential database queries ($N+1$ problem). The gateway implements **DataLoader Batch Resolvers**:

```typescript
import DataLoader from 'dataloader';

// Batches individual student ID lookups into a single SQL query
export const studentBatchLoader = new DataLoader<string, StudentRecord>(
  async (studentIds) => {
    const students = await db
      .selectFrom('users')
      .where('id', 'in', studentIds)
      .execute();

    // Map ordered results back to input keys
    const studentMap = new Map(students.map((s) => [s.id, s]));
    return studentIds.map((id) => studentMap.get(id) || null);
  }
);
```

---

## 4. Security: Automatic Persisted Queries (APQ) & Depth Limits
- **Query Depth Limiting**: Maximum AST query depth capped at 5 levels to block malicious nested recursive queries.
- **Persisted Queries**: Production clients send SHA-256 query hashes (`{ "extensions": { "persistedQuery": { "sha256Hash": "..." } } }`). The server only executes pre-approved queries compiled during production builds, completely closing the attack surface against arbitrary schema introspection.
