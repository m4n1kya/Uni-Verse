# E2E Test Suite: Authentication & Routing

## Test Scenarios
1. **Valid Login**: Student enters valid credentials, lands on Dashboard with personalized profile card.
2. **Invalid Password**: Displays red warning alert without resetting roll number field.
3. **Session Expiry**: When token expires, redirects gracefully to login with return path preserved.
