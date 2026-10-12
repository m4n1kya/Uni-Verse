# Deployment & CI/CD Specification

## Overview
Uni-Verse uses an automated continuous integration and continuous deployment (CI/CD) pipeline powered by GitHub Actions and Vercel. Every commit pushed to \`main\` triggers an automated production build and instant global edge distribution.

---

## 1. Vercel Production Pipeline

### Automated Workflow
1. **GitHub Webhook Trigger**: Any push to \`main\` notifies Vercel's build workers.
2. **Build Environment**:
   - Runtime: Node.js 20.x LTS
   - Package Manager: \`npm\` (or \`pnpm\`)
   - Build Command: \`npm run build\` (\`vite build\`)
   - Output Directory: \`dist/\`
3. **Edge Network Caching**: Static assets (\`assets/*.js\`, \`assets/*.css\`, images) are hashed and served with \`Cache-Control: public, max-age=31536000, immutable\`.
4. **HTML Caching**: \`index.html\` is served with \`Cache-Control: public, max-age=0, must-revalidate\` ensuring instant client hydration of new releases.

---

## 2. Preview Deployments

For Pull Requests opened against \`main\`:
- Vercel automatically deploys an isolated preview build with a unique URL (e.g. \`https://uni-verse-git-feature-bus-tracker.vercel.app\`).
- Automated comment is posted to the PR with the preview link and Lighthouse performance score.
- Reviewers and QA engineers can test live interactions without affecting production users.

---

## 3. Environment Variables Strategy

Environment variables are categorized by environment:
- **Development**: \`.env.local\` (ignored from git)
- **Preview**: Configured in Vercel Project Settings for pull request sandboxes.
- **Production**: Configured in Vercel Production Environment Settings.

All client-accessible variables must begin with the \`VITE_\` prefix:
\`\`\`env
VITE_API_BASE_URL=https://api.universe-campus.org/v1
VITE_WS_BUS_TRACKER_URL=wss://transit.universe-campus.org/stream
VITE_ENABLE_ANALYTICS=true
\`\`\`

---

## 4. Rollback & Disaster Recovery Protocol

If an unexpected runtime regression occurs in production:
1. **Instant Rollback**: Open Vercel Dashboard -> **Deployments** -> select the previous successful deployment -> click **Promote to Production** (takes < 2 seconds, no rebuild required).
2. **Git Revert**: Revert the offending commit locally using \`git revert <commit-sha>\` and push to \`main\` to align git history with production state.
