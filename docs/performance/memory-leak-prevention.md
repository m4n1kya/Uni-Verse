# Client Memory Profiling & Memory Leak Prevention Guidelines

## Overview
Single-page applications that remain open across hours of study sessions risk accumulating leaked JavaScript heap objects, detached DOM nodes, and dangling background timers. This guide documents our Chrome DevTools memory profiling methodology, React lifecycle cleanup rules, and garbage collection safeguards.

---

## 1. Heap Allocation & Retained Memory Profiling

```
[Student Session Starts] ---> Heap: 18 MB
       |
       v (Frequent Route Navigation across 2 Hours)
[Unoptimized Memory Leak]  ---> Heap: 142 MB (Laggy, Mobile Tab Crashes)
[Optimized Clean Teardown] ---> Heap: 22 MB (Stable, Constant GC Returns)
```

### DevTools Snapshot Workflow
1. Open Chrome DevTools $\rightarrow$ **Memory** panel.
2. Select **Allocation instrumentation on timeline**.
3. Perform repetitive user actions: Open Transit modal $\rightarrow$ View live bus stream $\rightarrow$ Close modal $\rightarrow$ Repeat 10 times.
4. Filter for **Detached HTMLDivElement** and retained closures in the constructor tree.

---

## 2. Common Memory Leak Anti-Patterns & Solutions

### Dangling Event Listeners & Timers
Failing to remove window listeners or polling intervals retains the parent component in memory indefinitely:

```typescript
// Anti-Pattern: Closure retains component state forever
useEffect(() => {
  setInterval(() => refreshBusTelemetry(), 3000);
}, []);

// Optimized Pattern: Strict teardown in cleanup return
useEffect(() => {
  const timer = setInterval(() => refreshBusTelemetry(), 3000);
  return () => clearInterval(timer);
}, []);
```

### Uncancelled In-Flight Fetch Requests (AbortController)
When a student rapidly navigates away from a page before a slow network request resolves:

```typescript
useEffect(() => {
  const controller = new AbortController();

  async function loadCourseMaterials() {
    try {
      const res = await fetch(`/api/v1/courses/${courseCode}/syllabus`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setMaterials(data);
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Fetch error:', err);
      }
    }
  }

  loadCourseMaterials();
  return () => controller.abort(); // Cancels active HTTP request immediately
}, [courseCode]);
```

---

## 3. Detached DOM Tree Prevention in Modals & Drawers

Radix UI dialog and sheet components render through document portals (`document.body`). To ensure portals clean up properly:
- Verify that `unmountOnExit` or equivalent cleanup unlinks portal nodes from the DOM tree when closed.
- Avoid attaching manual DOM event listeners directly to `document.body` without removing them in `componentWillUnmount` / `useEffect` return functions.

---

## 4. Weak References for Transient Cache Maps

When associating client metadata with DOM nodes or dynamic objects:
- Use `WeakMap` or `WeakSet` instead of standard `Map` / `Set`.
- Entries in a `WeakMap` hold "weak" references to their keys, allowing the JavaScript V8 garbage collector to automatically reclaim memory as soon as the key object is unreferenced elsewhere.
