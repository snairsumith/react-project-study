# React Performance Optimization — Teaching Notes

## Topic 17: Faster Apps with Memoization, Lazy Loading, and Suspense

---

# 1. Why Performance Matters in React

React **re-renders** components when state, context, or parent props change. Most of the time this is fine. Problems appear when:

* The component tree is **large** or deeply nested.
* **Expensive calculations** run on every render.
* **New function or object references** are created each render and passed to memoized children, defeating optimizations.
* The **initial JavaScript bundle** is huge, so first load feels slow.

**Performance optimization** means: do **less unnecessary work** (fewer renders, cheaper renders) and **load less code** until it is needed.

This lesson covers: **`React.memo`**, **`useMemo`**, **`useCallback`**, **`React.lazy`**, **code splitting**, and **`Suspense`**.

---

# 2. Re-renders — Quick Mental Model

| What happens                         | Result                          |
| ------------------------------------ | ------------------------------- |
| Parent state changes                 | Parent re-renders              |
| Parent re-renders                    | Default: **children re-render** |
| Child’s own state / context changes  | That child re-renders           |

Optimizations **do not skip** updates when data really changed. They help when a child would re-render **only because the parent did**, but the **props are effectively the same**.

---

# 3. `React.memo` — Memoizing a Component

**`React.memo`** is a **higher-order component** that wraps your function component. React **skips re-rendering** the wrapped child if its **props are shallowly equal** to the last render’s props.

### When to use it

* The component is **pure** (same props → same UI).
* The component is **expensive** to render or appears **often** in the tree.
* The parent re-renders **frequently** while the child’s props **often stay the same**.

### Syntax

```javascript
import { memo } from "react";

// Named export style (also valid: React.memo)
const UserCard = memo(function UserCard({ name, role }) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  );
});

export default UserCard;
```

### Explanation

1. Parent renders.
2. React compares **new props** vs **old props** (shallow compare).
3. If **equal** → React **reuses** the last output (no render of `UserCard`).
4. If **different** → `UserCard` renders normally.

### Shallow compare — important detail

| Prop type   | “Equal” means                          |
| ----------- | -------------------------------------- |
| Primitives  | Same value (`===`)                     |
| Objects     | **Same reference** — new `{}` each time counts as “changed” |
| Functions   | **Same reference** — inline `() => {}` each render is a new prop |

So **`memo` pairs well with `useCallback` / stable props** (covered later).

### Optional custom comparison

```javascript
import { memo } from "react";

const ScoreRow = memo(
  function ScoreRow({ id, score }) {
    return <tr><td>{id}</td><td>{score}</td></tr>;
  },
  // Return true if props are "equal enough" to skip render
  (prevProps, nextProps) =>
    prevProps.id === nextProps.id && prevProps.score === nextProps.score
);
```

Use custom compare **only** when you understand the trade-off (harder to maintain, easy to introduce bugs).

---

# 4. `useMemo` — Memoizing a Computed Value

**`useMemo`** remembers the **result** of an expensive calculation between renders. It **recomputes** only when **dependencies** change.

### Syntax

```javascript
import { useMemo, useState } from "react";

function ProductList({ items, filterText }) {
  // Re-filter only when items or filterText change — not on unrelated state updates
  const visibleItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  return (
    <ul>
      {visibleItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Parameters

| Part              | Role                                      |
| ----------------- | ----------------------------------------- |
| Factory function  | Runs to produce the **memoized value**    |
| Dependency array  | Same idea as `useEffect`: when to re-run   |

### When `useMemo` helps

* **Heavy** filtering, sorting, mapping on large lists.
* Creating a **stable object** you pass to a **`memo`** child (so shallow compare passes).

### When not to overuse

* Cheap operations: memoization adds **memory** and **dependency bookkeeping**.
* Rule of thumb: **measure first** (React DevTools Profiler), then optimize hot paths.

---

# 5. `useCallback` — Memoizing a Function Reference

**`useCallback`** returns a **stable function reference** across renders, until dependencies change.

It is **`useMemo` for functions** — roughly:

```javascript
// Conceptual equivalence (simplified)
useCallback(fn, deps)  ≈  useMemo(() => fn, deps)
```

### Pitfall — new function every render breaks `memo`

If the parent does `onToggle={() => handle(todo.id)}` or `onToggle={makeToggle(todo.id)}` where `makeToggle` **returns a new function each call**, the child still gets a **new prop reference** every time. **`React.memo` will not skip** those re-renders.

**Fix:** one **stable** `useCallback` that accepts **`id`** (or the whole item) as an argument.

### Example — one stable callback + `id` argument

```javascript
import { useState, useCallback, memo } from "react";

const TodoRow = memo(function TodoRow({ id, label, isSelected, onSelect }) {
  const handleClick = () => onSelect(id);
  return (
    <li>
      <button type="button" onClick={handleClick}>
        {label} {isSelected ? "(selected)" : ""}
      </button>
    </li>
  );
});

function TodoList({ todos }) {
  const [selectedId, setSelectedId] = useState(null);

  // Same function reference every render unless you add deps
  const handleSelect = useCallback((id) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoRow
          key={todo.id}
          id={todo.id}
          label={todo.text}
          isSelected={selectedId === todo.id}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
}
```

### When `useCallback` helps

* Passing callbacks to **`memo`** children or **optimized list** components.
* Functions listed in **`useEffect`** dependency arrays (avoid effect churn).

### Pitfall

Wrapping **every** handler in `useCallback` without a reason usually **adds noise** without measurable gain.

---

# 6. Lazy Loading with `React.lazy`

**`React.lazy`** lets you **load a component’s JavaScript** only when it is **first rendered**, instead of in the initial bundle.

### Syntax

```javascript
import { lazy, Suspense } from "react";

// Default export from module must be a React component
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<p>Loading dashboard…</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

### Explanation

1. Initial load: **`Dashboard` chunk is not downloaded yet**.
2. When React tries to render `<Dashboard />`, it **starts loading** the module.
3. While loading, **`Suspense` shows `fallback`**.
4. After load, **`Dashboard` renders**.

### Dynamic import

`import("./Dashboard")` returns a **Promise**. The bundler (Vite, webpack, etc.) creates a **separate chunk** for that file.

---

# 7. Code Splitting

**Code splitting** means **breaking the app into smaller JS files** (chunks) loaded **on demand** or **in parallel** when useful.

| Technique              | What splits                         |
| ---------------------- | ----------------------------------- |
| `React.lazy` + import  | **Route-level** or **feature-level** UI |
| Dynamic `import()`     | Any module the bundler can isolate  |
| Route-based splitting  | Each major page = its own chunk    |

### Why it matters

* Smaller **first** download → faster **Time to Interactive**.
* Users who never open “Admin” never download the Admin chunk.

`React.lazy` is the **React-side API**; the **bundler** does the actual file splitting.

---

# 8. `Suspense` — Declarative Loading UI

**`Suspense`** lets you **declare a fallback** while children are “not ready” (lazy components, or in future/alternate setups, async data patterns where supported).

### Basic usage with `lazy`

```javascript
import { lazy, Suspense, useState } from "react";

const Reports = lazy(() => import("./Reports"));

function Shell() {
  const [showReports, setShowReports] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShowReports(true)}>
        Open reports
      </button>

      {showReports && (
        <Suspense fallback={<p>Loading reports module…</p>}>
          <Reports />
        </Suspense>
      )}
    </div>
  );
}
```

### Nested Suspense

You can wrap **different sections** with different fallbacks (finer-grained loading UX).

```javascript
<Suspense fallback={<p>Layout skeleton…</p>}>
  <Header />
  <Suspense fallback={<p>Main content loading…</p>}>
    <MainPanel />
  </Suspense>
</Suspense>
```

### Error handling note

**`Suspense` does not catch render errors** or failed lazy loads in all cases the way you might expect. For **failed imports**, use **Error Boundaries** and/or **`lazy` with `.catch()`** patterns as needed. (Topic 18 in your syllabus covers error boundaries in depth.)

---

# 9. How the Pieces Fit Together

| Tool            | Optimizes                                      |
| --------------- | ---------------------------------------------- |
| `React.memo`    | **Skipping** child re-renders when props match |
| `useMemo`       | **Skipping** expensive value recomputation     |
| `useCallback`   | **Stable** function references                 |
| `React.lazy`    | **When** component code is downloaded          |
| Code splitting  | **Size** of each network payload               |
| `Suspense`      | **UX** while async UI (e.g. lazy) is pending   |

---

# 10. Best Practices

✔ **Profile first** — React DevTools **Profiler** finds slow components.

✔ Use **`memo`** on components that are **pure** and **often** re-rendered with **same props**.

✔ Use **`useMemo` / `useCallback`** when you have a **measured** cost or **reference stability** requirement.

✔ Split **routes** and **heavy features** with **`lazy`** + **`Suspense`**.

✔ Keep dependency arrays **correct** — stale closures are worse than a missed optimization.

✔ Avoid **premature** wrapping of every component in `memo` and every value in `useMemo`.

---

# 11. Summary

| Concept          | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `React.memo`     | Skip re-render if props are shallowly equal                |
| `useMemo`        | Cache a computed value until dependencies change           |
| `useCallback`    | Cache a function reference until dependencies change       |
| `React.lazy`     | Load component module on first render                      |
| Code splitting   | Multiple smaller bundles instead of one monolith           |
| `Suspense`       | Show fallback while lazy (or async) UI is not ready        |

---

# 12. Quick Reference Snippets

**Memoized list item + stable callback:**

```javascript
const Row = memo(function Row({ id, onDelete }) {
  return (
    <button type="button" onClick={() => onDelete(id)}>
      Delete {id}
    </button>
  );
});

// Parent: const onDelete = useCallback((id) => { ... }, [deps]);
```

**Route-style lazy page:**

```javascript
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

// In router JSX:
<Suspense fallback={<p>Loading…</p>}>
  <SettingsPage />
</Suspense>
```

---

# End of Lesson
