# Contributing to Uni-Verse

Thank you for your interest in contributing to **Uni-Verse**! We welcome contributions from student developers, faculty, and open-source contributors to help build the best university campus platform.

---

## 1. Getting Started

### Prerequisites
- **Node.js**: \`>= 18.0.0\` (LTS recommended)
- **Package Manager**: \`npm\` (or \`pnpm\`)
- **Git**: Installed and configured

### Local Development Setup
1. Fork the repository and clone your fork locally:
   \`\`\`bash
   git clone https://github.com/<your-username>/Uni-Verse.git
   cd Uni-Verse
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 2. Branching Strategy

Always create a new branch from \`main\` for your work:
- \`feature/<feature-name>\` &mdash; for new user features or pages (e.g. \`feature/hostel-room-picker\`)
- \`fix/<bug-description>\` &mdash; for bug fixes (e.g. \`fix/bus-tracker-eta-flicker\`)
- \`docs/<doc-topic>\` &mdash; for documentation additions (e.g. \`docs/api-health-service\`)
- \`refactor/<scope>\` &mdash; for code cleanup with no behavioral change

---

## 3. Commit Message Conventions

We enforce the **Conventional Commits** specification:
\`\`\`
<type>(<scope>): <short description>
\`\`\`
### Common Types:
- \`feat\`: A new user-facing feature
- \`fix\`: A bug fix
- \`docs\`: Documentation only changes
- \`style\`: Code formatting, missing semicolons, etc. (no production code change)
- \`refactor\`: Refactoring production code without fixing a bug or adding a feature
- \`perf\`: Code change that improves performance
- \`test\`: Adding or refactoring tests
- \`chore\`: Build process or auxiliary tool changes

---

## 4. Code Quality & Standards

Before opening a pull request, ensure:
1. **TypeScript Typecheck**: No unresolved type errors (\`npx tsc --noEmit\`).
2. **Production Build**: The build compiles cleanly (\`npm run build\`).
3. **Accessibility**: All buttons and interactive controls include accessible names or ARIA labels.

---

## 5. Pull Request Submission

1. Push your branch to your fork: \`git push origin feature/your-feature-name\`
2. Open a Pull Request against the \`main\` branch of the upstream repository.
3. Fill out the PR template with:
   - Summary of changes
   - Associated issue number (if applicable)
   - Screenshots or video demo for UI alterations
4. A maintainer will review your pull request and merge once approved!
