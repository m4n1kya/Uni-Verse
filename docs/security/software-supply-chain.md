# Software Supply Chain Security & SBOM Generation Standard

## Overview
Modern web applications rely heavily on open-source dependencies. To protect Uni-Verse against malicious package injection, dependency typosquatting, and compromised transitive libraries, this specification defines our **Software Supply Chain Security Baseline**, automated **Software Bill of Materials (SBOM)** generation, cryptographic build provenance, and vulnerability remediation SLAs.

---

## 1. Dependency Ingestion & Lockfile Verification

```
[Developer / CI Environment]
              |
              | 1. Execute 'npm ci --ignore-scripts'
              v
[Strict Lockfile Verification (package-lock.json)]
              |
              | 2. Cryptographic SHA-512 subresource check
              v
[Automated Vulnerability Scan (Trivy + npm audit)]
              |
      [Vulnerabilities Found?]
     /                        \
  YES (CVSS >= 7.0)          NO
    v                          v
[Block Build Pipeline]    [Permit Production Bundling]
```

### Strict Lockfile Integrity Mandate
- Production builds run exclusively via `npm ci --ignore-scripts` to prevent arbitrary post-install shell script execution from untrusted third-party dependencies.
- Every dependency entry in `package-lock.json` must contain a verified `integrity` field with a SHA-512 cryptographic hash.

---

## 2. Automated Software Bill of Materials (SBOM)

Every production release automatically generates an open-standard **CycloneDX (JSON)** and **SPDX** Software Bill of Materials via Syft during the GitHub Actions CI workflow:

```bash
# Automated CI SBOM Generation
syft scan dir:. -o cyclonedx-json=dist/sbom.cyclonedx.json
```

### SBOM Manifest Contents
- **Direct & Transitive Graph**: Comprehensive list of all 85+ production dependencies and transitive sub-packages.
- **Package Hashes**: Exact SHA-256 and SHA-512 hashes per package version.
- **License Compliance**: Validates that all bundled libraries adhere to approved permissive open-source licenses (MIT, Apache 2.0, BSD-3-Clause, ISC), strictly blocking restrictive copyleft licenses (GPLv3, AGPL).

---

## 3. Cryptographic Artifact Signing & Provenance (Sigstore / Cosign)

To guarantee that deployed assets originate strictly from our authorized GitHub Actions runners:
1. **Keyless Signing**: Build artifacts and container images are cryptographically signed using **Cosign** backed by Sigstore's Fulcio OIDC certificate authority.
2. **SLSA Level 3 Provenance**: An in-toto attestation is generated recording the exact git commit SHA, repository URL, workflow run ID, and compiler toolchain versions.
3. **Edge Admission Verification**: Production deployment webhooks verify the cryptographic signature before routing traffic to the release.

---

## 4. Vulnerability Remediation Service Level Agreements (SLAs)

When automated scanners (Dependabot, Snyk, Trivy) detect known Common Vulnerabilities and Exposures (CVEs):

| Severity Level | CVSS v3.1 Score | Remediation SLA | Deployment Action |
|---|---|---|---|
| **Critical** | $9.0 - 10.0$ | $\le 24\text{ hours}$ | Immediate hotfix; auto-merge patch version if test suite passes |
| **High** | $7.0 - 8.9$ | $\le 72\text{ hours}$ | Fast-track pull request with expedited staging review |
| **Medium** | $4.0 - 6.9$ | Next Sprint ($\le 14\text{ days}$) | Routine dependency upgrade cycle |
| **Low** | $0.1 - 3.9$ | $\le 30\text{ days}$ | Monitored and addressed during monthly maintenance |
