# Data Masking, Anonymization & Staging Database Seeding Protocols

## Overview
Under university data governance and student privacy compliance (FERPA / GDPR / DPDP), **production student records must never exist in staging, testing, or local developer environments**. This protocol defines our automated **Data Sanitization & Synthetic Seeding Pipeline**, pseudonymization algorithms, and differential privacy baselines.

---

## 1. Production-to-Staging Sanitization Pipeline

```
[Production PostgreSQL Master]
              |
              v (Read Replica Snapshot)
[Sanitization & Masking Engine]
  - Pseudonymize Names & Contacts (HMAC + Salt)
  - Scrub Medical Records & Disciplinary Logs
  - Perturb Grades & GPAs (Preserve Statistical Mean)
              |
              v
[Sanitized Staging Database] ---> [Automated Verification Scanner]
                                  (Asserts Zero PII Leakage)
```

---

## 2. Field-Level Masking Algorithms

| Entity Field | Masking Strategy | Output Example |
|---|---|---|
| **Student Full Name** | Synthetic Markov Generator | `"Alex Rivera"` |
| **Roll Number** | Deterministic Format-Preserving Hash | `"22BCE" + SHA256(id)[:4].upper()` |
| **Institutional Email** | Domain-Restricted Alias | `student_9812@sandbox.universe.edu` |
| **Phone Number** | Fixed ITU Standard Sandbox Range | `+91-98765-00000` through `...-00999` |
| **CGPA / Grade Points** | Gaussian Noise Perturbation ($\sigma = 0.15$) | Preserves normal distribution without exact scores |
| **Medical History** | Complete Truncation | Replaced with synthetic mock records |

---

## 3. Synthetic Seed Script Example (Node.js / TypeScript)

```typescript
import { faker } from '@faker-js/faker';

export function generateSyntheticStudent(index: number) {
  // Deterministic seed for repeatable automated integration tests
  faker.seed(1000 + index);

  return {
    id: `usr_mock_${index.toString().padStart(4, '0')}`,
    rollNumber: `23BCE${(1000 + index).toString()}`,
    fullName: faker.person.fullName(),
    email: `student_${index}@sandbox.universe.edu`,
    department: faker.helpers.arrayElement(['CSE', 'ECE', 'MECH', 'CIVIL']),
    semester: faker.number.int({ min: 1, max: 8 }),
    cgpa: parseFloat(faker.number.float({ min: 6.0, max: 9.8, fractionDigits: 2 }).toFixed(2)),
  };
}
```

---

## 4. Automated PII Leakage Scanner in CI/CD

Before any staging database dump is approved for developer access, an automated test asserts that:
1. Regex scanner searches for known production institutional email patterns (`@vit.ac.in`, `@universe.edu`).
2. Exact string matches against production hashes must return zero matches.
3. Verification check emits exit code 1 and blocks deployment if any unmasked entity is discovered.
