# Incident Response Severity Matrix & On-Call Escalation Protocol

## Overview
To maintain high availability and rapid recovery during production incidents, Uni-Verse adheres to a standardized **Incident Response Protocol**. This runbook establishes incident classification criteria, Mean Time to Respond (MTTR) targets, on-call paging hierarchies, and blameless post-mortem standards.

---

## 1. Incident Severity Matrix

| Severity Tier | Impact Scope | Examples | Target MTTA | Target MTTR |
|---|---|---|---|---|
| **SEV-1 (Critical Outage)** | Complete outage of critical campus systems affecting $> 25\%$ of active students. | - Entire web portal down (HTTP 5xx)<br>- Database primary failure<br>- Authentication SSO unreachable | $\le 5\text{ mins}$ | $\le 30\text{ mins}$ |
| **SEV-2 (Major Degradation)** | Significant feature broken with no immediate student workaround. | - Cafeteria payment/order gateway down<br>- Transit live GPS telemetry failure<br>- Course enrollment submit failure | $\le 15\text{ mins}$ | $\le 2\text{ hours}$ |
| **SEV-3 (Moderate Issue)** | Non-critical feature impaired; workaround exists. | - Faculty directory search slow<br>- E-Book PDF download failure for single unit<br>- Notification delayed | $\le 1\text{ hour}$ | $\le 8\text{ hours}$ |
| **SEV-4 (Minor Cosmetic)** | Minor UI inconsistency or non-blocking bug. | - Typo in documentation<br>- Minor styling alignment glitch on specific browser | $\le 1\text{ business day}$ | Next sprint |

---

## 2. On-Call Escalation Ladder

```
[Automated Monitor Fires Alert]
              |
              v
[Tier 1: Primary On-Call SRE]  (Paging via PagerDuty / Opsgenie)
       |
       +--- Unacknowledged after 5 mins ---> [Tier 2: Secondary Engineer]
                                                    |
                                                    +--- Unacknowledged after 10 mins ---> [Tier 3: Engineering Lead / VP]
```

### Communication Channels
- **War Room Slack Channel**: `#incident-YYYYMMDD-<incident-slug>` generated automatically by PagerDuty.
- **Incident Commander (IC)**: The primary responder assumes the role of IC and coordinates mitigation tasks.
- **Communications Lead**: Posts status updates every 15 minutes to the public status page (`status.universe-campus.org`).

---

## 3. Incident Lifecycle Workflow

```
1. DETECT          2. TRIAGE          3. MITIGATE        4. RESOLVE         5. LEARN
(Alert fires)  --> (Assess severity) --> (Rollback / Fix) --> (Verify healthy) --> (Blameless RCA)
```

### Rapid Mitigation Guidelines
- **Prioritize Mitigation over Root-Cause Investigation**: If a recent commit was deployed within 60 minutes, immediately trigger `vercel rollback` or `git revert` rather than attempting a live fix under pressure.
- **Circuit Breaking**: If an external dependency is failing (e.g. third-party map tiles API), trip the feature flag to render the cached static fallback.

---

## 4. Blameless Post-Mortem & RCA SLA
- **Post-Mortem Window**: Required for all SEV-1 and SEV-2 incidents within 48 hours of resolution.
- **Focus**: Process, tooling, and architectural safeguards—never personal blame.
- **Deliverables**: Added to `docs/adr/` with concrete preventative Jira action items assigned to the engineering team.
