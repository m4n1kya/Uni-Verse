# Consumer-Driven API Contract Testing & Schema Validation Protocol

## Overview
As Uni-Verse expands across multiple autonomous feature teams (Academics, Dining, Transit, Career), frontend client applications and backend microservices must evolve without introducing breaking communication regressions. This specification defines our **Consumer-Driven Contract (CDC) Testing** workflow using **Pact**, automated OpenAPI schema validation, and breaking-change detection in CI/CD.

---

## 1. Consumer-Driven Contract (CDC) Lifecycle

```
[Consumer: React Web Client]
            |
            | 1. Generate Pact Contract Specification
            v
[Pact Contract JSON: 'UniVerseWeb-DiningService.json']
            |
            | 2. Publish Contract to Pact Broker
            v
[Central Pact Broker]
            |
            | 3. Provider verification triggered in CI
            v
[Provider: Cafeteria Backend Service]
            |
       [Contract Satisfied?]
      /                     \
   YES                       NO (Breaking Change Detected!)
    v                         v
[Can-I-Deploy: APPROVED]   [Block Provider Deployment + Alert]
```

---

## 2. Pact Test Case Implementation (TypeScript)

The client defines its precise expectations regarding API response shapes and data types:

```typescript
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';

pactWith({ consumer: 'UniVerseWeb', provider: 'DiningService' }, (provider) => {
  describe('GET /api/v1/cafeteria/menu', () => {
    beforeEach(() => {
      provider.addInteraction({
        state: 'today specials are active',
        uponReceiving: 'a request for cafeteria menu items',
        withRequest: {
          method: 'GET',
          path: '/api/v1/cafeteria/menu',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            stalls: Matchers.eachLike({
              id: Matchers.string('stall_01'),
              name: Matchers.string('Bistro North'),
              isOpen: Matchers.boolean(true),
              items: Matchers.eachLike({
                itemId: Matchers.string('item_01'),
                name: Matchers.string('Paneer Roll'),
                priceInr: Matchers.integer(80),
                isVeg: Matchers.boolean(true),
              }),
            }),
          },
        },
      });
    });

    it('successfully parses cafeteria menu response', async () => {
      const response = await fetch(`${provider.mockService.baseUrl}/api/v1/cafeteria/menu`, {
        headers: { Accept: 'application/json' },
      });
      const data = await response.json();
      expect(data.stalls[0].items[0].priceInr).toBe(80);
    });
  });
});
```

---

## 3. Local Development with Prism Mock Servers

Frontend developers can build and test views completely offline without deploying live backend databases by spinning up an ephemeral mock server powered by **Stoplight Prism**:

```bash
# Start local mock server based on API documentation contracts
npx @stoplight/prism-cli mock docs/api/openapi.yaml -p 4010
```

- Returns randomized, schema-valid synthetic responses based on examples in `docs/api/`.
- Validates request payload compliance, warning developers immediately if required fields are omitted.

---

## 4. Automated Breaking Change Prevention in CI

Every pull request modifying an API contract runs `oasdiff` against the production baseline:

```bash
# CI automated contract diff check
oasdiff -base https://api.universe-campus.org/openapi.json -revision docs/api/openapi.yaml -breaking
```

### Breaking Change Rules
1. **Never Remove or Rename Active Properties**: Existing JSON fields must remain present.
2. **Never Tighten Validations**: Do not make previously optional parameters required.
3. **Deprecation Grace Period**: Deprecated fields must be tagged with `@deprecated` in the OpenAPI schema for a minimum of 90 days before formal removal.
