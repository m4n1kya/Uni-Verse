# Input Validation & Sanitization Guidelines

## Best Practices
1. **Zod Validation**: All client payloads and API inputs are validated through strict Zod schemas.
2. **XSS Prevention**: User inputs are escaped before rendering; direct `dangerouslySetInnerHTML` is strictly prohibited.
3. **SQL Injection**: Parameterized SQL queries and ORM prepared statements are mandatory.
