$cwd = "D:\Desktop\Vault\PROJECT\Uni-Verse\Uni-Verse"
cd $cwd

# Commit 1
Set-Content -Path ".editorconfig" -Value "root = true`n`n[*]`ncharset = utf-8`nend_of_line = lf`nindent_size = 2`nindent_style = space`ninsert_final_newline = true`ntrim_trailing_whitespace = true"
git add .editorconfig; git commit -m "chore: add .editorconfig for consistent coding styles"

# Commit 2
Set-Content -Path ".prettierrc" -Value "{`"semi`":true,`"trailingComma`":`"es5`",`"singleQuote`":false,`"printWidth`":100,`"tabWidth`":2}"
git add .prettierrc; git commit -m "chore: add Prettier configuration file"

# Commit 3
Set-Content -Path "public\robots.txt" -Value "User-agent: *`nAllow: /`n`nSitemap: https://uni-verse-swart.vercel.app/sitemap.xml"
git add public\robots.txt; git commit -m "SEO: add robots.txt file to allow search engine crawling"

# Commit 4
Set-Content -Path "public\humans.txt" -Value "/* TEAM */`nDeveloper: Manikya N`nSite: https://github.com/m4n1kya`n`n/* SITE */`nLast update: 2026`nStandards: HTML5, CSS3, React`nComponents: Tailwind CSS, shadcn/ui"
git add public\humans.txt; git commit -m "docs: add humans.txt to credit developers and list tech stack"

# Commit 5
$contrib = "# Contributing to Uni-Verse`n`nWe love your input! We want to make contributing to this project as easy and transparent as possible.`n`n## Pull Requests`n1. Fork the repo and create your branch from `"main`".`n2. If you've added code that should be tested, add tests.`n3. Ensure the test suite passes.`n4. Make sure your code lints.`n5. Issue that pull request!"
Set-Content -Path "CONTRIBUTING.md" -Value $contrib
git add CONTRIBUTING.md; git commit -m "docs: add CONTRIBUTING.md guidelines"

# Commit 6
New-Item -ItemType Directory -Force -Path ".github\ISSUE_TEMPLATE"
$bug = "---`nname: Bug report`nabout: Create a report to help us improve`ntitle: ''`nlabels: bug`nassignees: ''`n---`n`n**Describe the bug**`nA clear and concise description of what the bug is."
Set-Content -Path ".github\ISSUE_TEMPLATE\bug_report.md" -Value $bug
git add .github; git commit -m "chore: add GitHub issue template for bug reports"

# Commit 7
$feat = "---`nname: Feature request`nabout: Suggest an idea for this project`ntitle: ''`nlabels: enhancement`nassignees: ''`n---`n`n**Is your feature request related to a problem? Please describe.**`nA clear and concise description of what the problem is."
Set-Content -Path ".github\ISSUE_TEMPLATE\feature_request.md" -Value $feat
git add .github; git commit -m "chore: add GitHub issue template for feature requests"

# Commit 8
$pr = "## Description`n`nProvide a brief description of the changes.`n`n## Type of change`n- [ ] Bug fix`n- [ ] New feature`n- [ ] Documentation update`n"
Set-Content -Path ".github\PULL_REQUEST_TEMPLATE.md" -Value $pr
git add .github; git commit -m "chore: add GitHub pull request template"

# Commit 9
(Get-Content index.html) -replace '<title>Vite \+ React \+ TS</title>', '<title>Uni-Verse | Your Academic Super-App</title>' | Set-Content index.html
git add index.html; git commit -m "SEO: update index.html title to reflect Uni-Verse branding"

# Commit 10
(Get-Content index.html) -replace '<meta name="viewport" content="width=device-width, initial-scale=1.0" />', "<meta name=`"viewport`" content=`"width=device-width, initial-scale=1.0`" />`n    <meta name=`"description`" content=`"Uni-Verse is your all-in-one university resource platform for tracking academics, food, transport, and faculty.`" />" | Set-Content index.html
git add index.html; git commit -m "SEO: add meta description to index.html for better search visibility"

# Commit 11
(Get-Content index.html) -replace '<meta name="description" content="Uni-Verse is your all-in-one university resource platform for tracking academics, food, transport, and faculty." />', "<meta name=`"description`" content=`"Uni-Verse is your all-in-one university resource platform for tracking academics, food, transport, and faculty.`" />`n    <meta name=`"theme-color`" content=`"#000000`" />" | Set-Content index.html
git add index.html; git commit -m "UI: add theme-color meta tag for mobile browser address bar styling"

# Commit 12
(Get-Content src\components\layout\Sidebar.tsx) -replace 'export function Sidebar', "/**`n * Sidebar navigation component for desktop.`n * Handles collapsible state and rendering of navigation items.`n */`nexport function Sidebar" | Set-Content src\components\layout\Sidebar.tsx
git add src\components\layout\Sidebar.tsx; git commit -m "docs: add JSDoc comments to Sidebar component"

# Commit 13
(Get-Content src\components\layout\BottomNav.tsx) -replace 'export function BottomNav', "/**`n * Bottom navigation bar for mobile devices.`n * Sticky at the bottom of the viewport.`n */`nexport function BottomNav" | Set-Content src\components\layout\BottomNav.tsx
git add src\components\layout\BottomNav.tsx; git commit -m "docs: add JSDoc comments to BottomNav component"

# Commit 14
(Get-Content src\components\ui\HeroBanner.tsx) -replace 'export function HeroBanner', "/**`n * Main hero banner component displayed on the landing page.`n * Includes background image, title, and action buttons.`n */`nexport function HeroBanner" | Set-Content src\components\ui\HeroBanner.tsx
git add src\components\ui\HeroBanner.tsx; git commit -m "docs: add JSDoc comments to HeroBanner component"

# Commit 15
(Get-Content src\components\ui\ContentCard.tsx) -replace 'export function ContentCard', "/**`n * Reusable card component for displaying featured modules or items.`n */`nexport function ContentCard" | Set-Content src\components\ui\ContentCard.tsx
git add src\components\ui\ContentCard.tsx; git commit -m "docs: add JSDoc comments to ContentCard component"

# Commit 16
(Get-Content src\components\ui\ContentRail.tsx) -replace 'export function ContentRail', "/**`n * Horizontal scrolling container for displaying multiple ContentCards.`n */`nexport function ContentRail" | Set-Content src\components\ui\ContentRail.tsx
git add src\components\ui\ContentRail.tsx; git commit -m "docs: add JSDoc comments to ContentRail component"

# Commit 17
(Get-Content src\components\layout\Sidebar.tsx) -replace 'onClick=\{\(\) => setCollapsed\(!collapsed\)\}', 'aria-label="Toggle sidebar" onClick={() => setCollapsed(!collapsed)}' | Set-Content src\components\layout\Sidebar.tsx
git add src\components\layout\Sidebar.tsx; git commit -m "a11y: add aria-label to Sidebar collapse toggle button"

# Commit 18
(Get-Content src\components\layout\MainLayout.tsx) -replace 'onClick=\{\(\) => setIsProfileDropdownOpen\(!isProfileDropdownOpen\)\}', 'aria-label="Toggle profile menu" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}' | Set-Content src\components\layout\MainLayout.tsx
git add src\components\layout\MainLayout.tsx; git commit -m "a11y: add aria-label to user profile dropdown toggle"

# Commit 19
(Get-Content src\components\layout\MainLayout.tsx) -replace 'onClick=\{\(\) => setIsSignInModalOpen\(false\)\}', 'aria-label="Close modal" onClick={() => setIsSignInModalOpen(false)}' | Set-Content src\components\layout\MainLayout.tsx
git add src\components\layout\MainLayout.tsx; git commit -m "a11y: add aria-label to Sign In modal close button"

# Commit 20
$utils = "import { clsx, type ClassValue } from `'clsx`';`nimport { twMerge } from `'tailwind-merge`';`n`n/**`n * Merges tailwind classes intelligently.`n */`nexport function cn(...inputs: ClassValue[]) {`n  return twMerge(clsx(inputs));`n}"
Set-Content -Path "src\lib\utils.ts" -Value $utils
git add src\lib\utils.ts; git commit -m "refactor: add JSDoc documentation to utility functions"

# Commit 21
(Get-Content src\main.tsx) -replace 'ReactDOM.createRoot', "// Initialize React application and mount to DOM`nReactDOM.createRoot" | Set-Content src\main.tsx
git add src\main.tsx; git commit -m "chore: add initialization comment in main.tsx entrypoint"

# Commit 22
$envSample = "VITE_API_URL=http://localhost:3000/api`n# Add other environment variables here"
Set-Content -Path ".env.example" -Value $envSample
git add .env.example; git commit -m "chore: create .env.example template for local development"

git push
