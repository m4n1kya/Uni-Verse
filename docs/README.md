# Uni-Verse Engineering Documentation

Welcome to the technical specification, system architecture, and operational runbook index for **Uni-Verse**.

---

## 📚 Technical Documentation Index

| Domain | Directory / Path | Key Specifications & Runbooks Covered |
|---|---|---|
| **System Architecture** | [`ARCHITECTURE.md`](./ARCHITECTURE.md)<br>[`architecture/`](./architecture/) | Core system topology, Vite Module Federation RFC, decoupled cross-domain event bus, and service boundaries |
| **API Specifications** | [`api/`](./api/) | 15 REST service contracts and WebSocket real-time event streaming (`wss://`) for transit & food orders |
| **Database & Ingestion** | [`database/`](./database/) | Relational SQL schemas, client offline sync engine, indexing strategies, and automated ETL data ingestion pipelines |
| **Security & Zero-Trust** | [`security/`](./security/) | Zero-Trust API gateway, mutual TLS (mTLS), JWT token rotation, RBAC matrix, and FERPA privacy compliance |
| **DevOps & Infrastructure** | [`devops/`](./devops/) | Vercel CI/CD edge pipeline, PWA offline caching, multi-region disaster recovery runbook, and RUM monitoring |
| **Design System** | [`design-system/`](./design-system/) | Pitch-black (`#09090b`) tokens, glassmorphism blur utilities, domain color accents, and Lucide icon rules |
| **Accessibility (a11y)** | [`accessibility/`](./accessibility/) | WCAG 2.1 AA design patterns, keyboard focus trapping, ARIA live announcements, and contrast benchmarks |
| **Performance** | [`performance/`](./performance/) | Route-level code splitting, asset preloading, rendering memoization, and Lighthouse Core Web Vitals |
| **Testing & QA** | [`testing/`](./testing/) | Unit test suites, MSW network mocking, E2E user journeys, and k6 stress load testing scenarios |
| **User Guides** | [`guides/`](./guides/) | Quick-start guide, interactive campus map walkthrough, and internationalization (i18n) roadmap |
