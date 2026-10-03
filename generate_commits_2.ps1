$cwd = "D:\Desktop\Vault\PROJECT\Uni-Verse\Uni-Verse"
cd $cwd

# 1. Add MIT License
$license = "MIT License`n`nCopyright (c) 2026 Manikya N`n`nPermission is hereby granted, free of charge, to any person obtaining a copy..."
Set-Content -Path "LICENSE" -Value $license
git add LICENSE; git commit -m "docs: add MIT License to repository"

# 2. Add VSCode settings
New-Item -ItemType Directory -Force -Path ".vscode"
$settings = "{`n  `"editor.formatOnSave`": true,`n  `"editor.defaultFormatter`": `"esbenp.prettier-vscode`"`n}"
Set-Content -Path ".vscode\settings.json" -Value $settings
git add .vscode; git commit -m "chore: add VSCode workspace settings for auto-formatting"

# 3. Add VSCode extensions
$ext = "{`n  `"recommendations`": [`"esbenp.prettier-vscode`", `"bradlc.vscode-tailwindcss`", `"dbaeumer.vscode-eslint`"]`n}"
Set-Content -Path ".vscode\extensions.json" -Value $ext
git add .vscode; git commit -m "chore: recommend essential VSCode extensions for project contributors"

# 4. Add .nvmrc
Set-Content -Path ".nvmrc" -Value "20"
git add .nvmrc; git commit -m "chore: specify Node.js version via .nvmrc"

# 5. Add .npmrc
Set-Content -Path ".npmrc" -Value "engine-strict=true"
git add .npmrc; git commit -m "chore: enforce strict engine versions in .npmrc"

# 6. Add .dockerignore
$dockerignore = "node_modules`n.git`n.env`ndist`nbuild"
Set-Content -Path ".dockerignore" -Value $dockerignore
git add .dockerignore; git commit -m "chore: add .dockerignore to optimize future container builds"

# 7. Add CHANGELOG.md
$changelog = "# Changelog`n`nAll notable changes to this project will be documented in this file.`n`n## [Unreleased]`n- Initial modern redesign`n- Added quick links and dashboard components"
Set-Content -Path "CHANGELOG.md" -Value $changelog
git add CHANGELOG.md; git commit -m "docs: initialize CHANGELOG.md for version tracking"

# 8. Add CODE_OF_CONDUCT.md
$coc = "# Code of Conduct`n`nPlease be respectful to all contributors and users. We are committed to providing a welcoming and inspiring community for all."
Set-Content -Path "CODE_OF_CONDUCT.md" -Value $coc
git add CODE_OF_CONDUCT.md; git commit -m "docs: add CODE_OF_CONDUCT.md for community guidelines"

# 9. Add SECURITY.md
$sec = "# Security Policy`n`n## Supported Versions`n- v1.0.x (Current)`n`n## Reporting a Vulnerability`nPlease report security vulnerabilities to the repository owner privately."
Set-Content -Path "SECURITY.md" -Value $sec
git add SECURITY.md; git commit -m "docs: add SECURITY.md for vulnerability reporting procedures"

# 10. Basic CI Workflow
New-Item -ItemType Directory -Force -Path ".github\workflows"
$ci = "name: CI`non: [push, pull_request]`njobs:`n  build:`n    runs-on: ubuntu-latest`n    steps:`n      - uses: actions/checkout@v3`n      - run: npm install`n      - run: npm run build"
Set-Content -Path ".github\workflows\ci.yml" -Value $ci
git add .github; git commit -m "ci: add GitHub Actions workflow for automated builds"

# 11. Add lang attribute to index.html
(Get-Content index.html) -replace '<html lang="en">', '<html lang="en" dir="ltr">' | Set-Content index.html
git add index.html; git commit -m "a11y: add text direction attribute to root HTML element"

# 12. Add comment to tailwind config
(Get-Content tailwind.config.ts) -replace 'export default \{', '// Main Tailwind CSS configuration file`nexport default {' | Set-Content tailwind.config.ts
git add tailwind.config.ts; git commit -m "docs: add architectural comment to tailwind.config.ts"

# 13. Add comment to postcss config
(Get-Content postcss.config.js) -replace 'export default \{', '// PostCSS processing configuration`nexport default {' | Set-Content postcss.config.js
git add postcss.config.js; git commit -m "docs: add architectural comment to postcss.config.js"

# 14. Add comment to vite config
(Get-Content vite.config.ts) -replace 'export default defineConfig', '// Vite build tool configuration`nexport default defineConfig' | Set-Content vite.config.ts
git add vite.config.ts; git commit -m "docs: add architectural comment to vite.config.ts"

# 15. Update README Architecture section
Add-Content -Path "README.md" -Value "`n## 🏛 Architecture`nThis project uses a component-based architecture powered by React, with highly modular, reusable UI components stored in the `"src/components`" directory."
git add README.md; git commit -m "docs: add Architecture overview to README.md"

# 16. Add aria-hidden to decorative icons in MainLayout
(Get-Content src\components\layout\MainLayout.tsx) -replace '<User className="w-7 h-7" />', '<User className="w-7 h-7" aria-hidden="true" />' | Set-Content src\components\layout\MainLayout.tsx
git add src\components\layout\MainLayout.tsx; git commit -m "a11y: mark purely decorative User icon in MainLayout as hidden for screen readers"

# 17. Add aria-hidden to Mail icon
(Get-Content src\components\layout\MainLayout.tsx) -replace '<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />', '<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />' | Set-Content src\components\layout\MainLayout.tsx
git add src\components\layout\MainLayout.tsx; git commit -m "a11y: mark purely decorative Mail icon in MainLayout as hidden for screen readers"

# 18. Add aria-hidden to Lock icon
(Get-Content src\components\layout\MainLayout.tsx) -replace '<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />', '<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />' | Set-Content src\components\layout\MainLayout.tsx
git add src\components\layout\MainLayout.tsx; git commit -m "a11y: mark purely decorative Lock icon in MainLayout as hidden for screen readers"

# 19. Format JSON in package.json
(Get-Content package.json) -replace '"build": "vite build"', '"build": "vite build",`n    "lint:check": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"' | Set-Content package.json
git add package.json; git commit -m "chore: add strict linting script to package.json"

# 20. Add format script
(Get-Content package.json) -replace '"lint:check": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"', '"lint:check": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",`n    "format": "prettier --write `"src/**/*.{ts,tsx,css}`""' | Set-Content package.json
git add package.json; git commit -m "chore: add prettier format script to package.json for codebase consistency"

# 21. Add clean script
(Get-Content package.json) -replace '"format": "prettier --write \\"src/\*\*/\*\.\{ts,tsx,css\}\\""', '"format": "prettier --write `"src/**/*.{ts,tsx,css}`"",`n    "clean": "rm -rf dist"' | Set-Content package.json
git add package.json; git commit -m "chore: add clean script to quickly remove build artifacts"

git push
