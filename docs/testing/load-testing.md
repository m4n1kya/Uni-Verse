# Load & Stress Testing Specifications

## Simulation Parameters
- Simulates course registration rush: 10,000 concurrent students hitting the portal in a 5-minute window.
- Tool: k6 script simulating user login -> view course catalog -> submit registration.
- Expected 99th percentile response time: < 800ms.
