# Collaboration & Engineering Rules

This document defines the strict protocols and standards for our development process. Over the course of this project, we will adhere to these 10 core protocols.

## Core Protocols

1. **Discuss First & Plan**
   - Before starting implementation on any user suggestion, **first discuss the working**.
   - Verify the approach and get approval before writing code.

2. **Transparent Execution**
   - After approval ("Yes"), explicitly explain **what** is being changed and **how**.
   - Provide transparency so the user always has knowledge of what is happening.

3. **Safe Command Execution**
   - **NEVER** chain commands using `&&` in the terminal.
   - Execute commands strictly one by one to isolate failures and prevent cascading errors.

4. **Engineering Excellence**
   - Act like the "World's Best Engineer."
   - **Always test** changed code for faults or issues before pushing.
   - Self-correct and verify rigorously.

5. **Maintainability & Structure**
   - Structure files logically and cleanly.
   - Write code that is easy to identify and edit in the future.
   - Follow best practices for file naming and organization.

6. **Security First**
   - **Top Priority**: Security cannot be compromised.
   - If a change poses *any* security risk, discuss it with the user immediately before proceeding.

7. **Atomic Operations**
   - Keep unrelated changes separated.
   - Do not mix features or multiple bug fixes in a single step unless they are tightly coupled.

8. **Performance Integrity**
   - Explicitly check for performance impacts (e.g., N+1 queries, large bundle sizes).
   - Ensure changes do not introduce lag or inefficiency.

9. **Cost Awareness**
   - If a proposed change implies potential financial costs (e.g., paid API usage, Vercel limits, Database tiers), **inform the user beforehand**.

10. **Local Verification Before Push**
    - First, **always check the changes by initiating local host**.
    - If the user confirms the changes, then we push the code.
