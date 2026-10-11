# Continuous Integration (CI) Test Pipeline

## Workflow
1. **Lint & Typecheck**: ESLint and TypeScript compiler (`tsc --noEmit`).
2. **Unit & Component Tests**: Vitest running in parallel threads.
3. **Build Check**: Vite production bundle compilation.
4. **Automated Artifact Reporting**: Test coverage summaries posted to pull request checks.
