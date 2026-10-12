# Campus Localization & Internationalization (i18n) Roadmap

## Overview
Uni-Verse is designed to support a multicultural campus student body. This roadmap outlines the internationalization architecture, translation management, and locale formatting standards across all web interfaces.

---

## 1. Supported Locales & Scope

### Phase 1 (Core University Languages)
- \`en-IN\` &mdash; English (India) &mdash; Default fallback
- \`hi-IN\` &mdash; Hindi (हिन्दी)
- \`te-IN\` &mdash; Telugu (తెలుగు)
- \`ta-IN\` &mdash; Tamil (தமிழ்)

---

## 2. Technical Architecture

### Translation Engine
- Utilizes \`i18next\` and \`react-i18next\` for client-side translation interpolation.
- Translation bundles are separated into feature-specific namespaces:
  - \`common.json\`: Navigation, buttons, dialog labels, error states.
  - \`cafeteria.json\`: Dietary tags, food item descriptions, order statuses.
  - \`transit.json\`: Bus stop names, route alerts, transit schedules.
  - \`academics.json\`: Grade scales, department titles, semester names.

### Locale Switching
- Student language preference is persisted in \`localStorage\` and synced to their user profile backend record.
- Language switcher dropdown is accessible directly from the top navigation bar with high-contrast accessibility tags.

---

## 3. Formatting Standards

### Dates & Timestamps
- All date strings are formatted using the browser's native \`Intl.DateTimeFormat\` API matching the active locale:
  - Default Indian standard: \`DD/MM/YYYY, HH:mm\` (e.g. \`12/10/2026, 14:30\`).

### Currency Display
- Cafeteria prices and library fine calculations format through \`Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })\` (e.g. \`₹45.00\`).

---

## 4. Directionality & Typography
- UTF-8 encoding enforced across all document headers.
- Font stacks configured with system fallbacks supporting Devanagari, Dravidian, and Latin scripts without layout shifting.
