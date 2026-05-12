# React Error Handling — Teaching Notes

## Topic 18: Boundaries, Async Safety, Logging, and User-Friendly Fallbacks

---

# 1. Why Error Handling Matters

When something **throws** during React work or inside **async** code, the app can:

* Show a **blank screen** or a broken subtree.
* Leave users **confused** with no next step.
* Hide **bugs** in production if errors are swallowed silently.

Good error handling means: **catch what you can**, **recover or explain**, **log for developers**, and **never expose sensitive internals** to end users.

This lesson covers: **Error Boundaries**, **`try/catch`** for API and async logic, **logging**, and **friendly fallback UI**.

---

# 2. Where Errors Happen in a React App

| Area                         | Typical cause                                      |
| ---------------------------- | -------------------------------------------------- |
| **Render**                   | Bad data, null access, bug in JSX expression     |
| **Effects** (`useEffect`)    | Failed `fetch`, rejected promise not handled       |
| **Event handlers**           | Click/submit logic throws                          |
| **Async callbacks**          | `setTimeout`, promise `.then` throws               |
| **Libraries**                | Third-party code throws during render              |

**Important:** Not every error is handled the same way. **Error Boundaries** only cover **some** of these cases (see below).

---

# 3. Error Boundaries — What They Are

An **Error Boundary** is a React component that **catches JavaScript errors** in:

* Its **child** components’ **render**
* **Lifecycle methods** (in class components)
* **Constructors** of the tree below it

When an error is caught, the boundary can **render a fallback UI** instead of crashing the whole app.

### What Error Boundaries do **not** catch

| Situation                                      | Use instead                    |
| ---------------------------------------------- | ------------------------------ |
| Errors in **event handlers**                   | `try/catch` inside the handler |
| **Async** code (`setTimeout`, `fetch` `.then`) | `try/catch` or `.catch()`      |
| Errors during **Server Components** (framework)| Framework / route error files  |
| Errors in the **boundary’s own** render        | Another boundary **above** it  |

So: boundaries protect the **render tree**; **you** still guard **events and async** code.

---

# 4. Implementing an Error Boundary (Class Component)

React does **not** ship a built-in `ErrorBoundary` function component API in all versions. The **documented pattern** is still a **class** component with:

* **`static getDerivedStateFromError`** — update state so the next render shows fallback.
* **`componentDidCatch`** — log the error and extra info (side effects allowed here).

```javascript
import { Component } from "react";

// Class is required for this classic Error Boundary pattern.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // When errorInfo is set, we show fallback instead of children.
    this.state = { error: null, errorInfo: null };
  }

  // Runs during render phase: return new state to trigger fallback UI.
  static getDerivedStateFromError(error) {
    return { error };
  }

  // Runs after an error is committed: safe place for logging.
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log for developers (see section 7 for production logging).
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    // Clear error so children can try again (often pair with a "key" on children).
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback: Fallback } = this.props;

    if (error) {
      // Friendly fallback: optional custom component from parent.
      if (Fallback) {
        return <Fallback error={error} onReset={this.handleReset} />;
      }
      return (
        <section role="alert">
          <h2>Something went wrong</h2>
          <p>Please try again. If the problem continues, contact support.</p>
          <button type="button" onClick={this.handleReset}>
            Try again
          </button>
        </section>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
```

### Wrapping parts of the app

```javascript
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary>
        <MainRoutes />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

Smaller boundaries **isolate** failures: one broken widget does not remove the entire page.

### Explanation

1. A child **throws** during render.
2. React **walks up** looking for the nearest boundary.
3. **`getDerivedStateFromError`** stores the error → next render shows fallback.
4. **`componentDidCatch`** runs once for logging / analytics.

---

# 5. Resetting After an Error (`key` Pattern)

After the boundary clears its error state, React may **reuse** the same child instances. Some broken state can **persist**. A reliable pattern is to **remount** the whole subtree by changing the boundary’s **`key`** so children start from a clean slate.

```javascript
import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Optional custom fallback: must be a component (see section 4 props).
function SectionErrorFallback({ error, onReset }) {
  // Log for developers; keep visible copy generic for end users.
  if (error) console.error("Section failed:", error);
  return (
    <div role="alert">
      <p>Could not load this section.</p>
      <button
        type="button"
        onClick={() => {
          onReset();
        }}
      >
        Dismiss message
      </button>
    </div>
  );
}

function AppShell() {
  const [boundaryKey, setBoundaryKey] = useState(0);

  const handleHardRetry = () => {
    // New key remounts ErrorBoundary and all children — strongest reset.
    setBoundaryKey((k) => k + 1);
  };

  return (
    <div>
      <ErrorBoundary key={boundaryKey} fallback={SectionErrorFallback}>
        <MainRoutes />
      </ErrorBoundary>
      <button type="button" onClick={handleHardRetry}>
        Hard reset this section
      </button>
    </div>
  );
}
```

**Typical UX:** put “Try again” in the fallback and call **`onReset`** from the boundary **and** bump **`boundaryKey`** if you need a full remount of `MainRoutes`.

---

# 6. `try/catch` in API and Async Logic

**Promises** and **`async/await`** rejections **do not** trigger Error Boundaries unless the rejection happens **during render** (which you should avoid). Handle them **explicitly**.

### Example — `async` event handler

```javascript
import { useState } from "react";

function UserSearch() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/1");
      if (!res.ok) {
        // Treat HTTP errors as expected failures, not only thrown exceptions.
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("UserSearch failed:", err);
      setErrorMessage("We could not load the user. Please try again.");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Loading…" : "Load user"}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}
```

### Example — `useEffect` with async IIFE

```javascript
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Bad response");
        const data = await res.json();
        if (!cancelled) setPosts(data);
      } catch (err) {
        console.error("Posts fetch failed:", err);
        if (!cancelled) setErrorMessage("Could not load posts.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (errorMessage) {
    return <p role="alert">{errorMessage}</p>;
  }

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

### Explanation

* **`try/catch`** wraps **await** and synchronous throws in that block.
* **`finally`** is good for loading flags.
* **`cancelled` flag** avoids `setState` after unmount when the request finishes late.

---

# 7. Logging Errors

| Goal                    | Practice                                                |
| ----------------------- | ------------------------------------------------------- |
| **Developers** need detail | `console.error(error, errorInfo)` in dev               |
| **Production**          | Send to a **logging service** (e.g. Sentry, LogRocket) with **release version** |
| **Users**               | Show a **short, actionable** message — not stack traces |
| **Security**            | Do **not** log passwords, tokens, or PII unnecessarily  |

```javascript
componentDidCatch(error, errorInfo) {
  const payload = {
    message: error?.message,
    componentStack: errorInfo?.componentStack,
    // Add build id / route name if available
  };
  console.error("UI error", payload);
  // if (window.sendToLoggingService) window.sendToLoggingService(payload);
}
```

---

# 8. Friendly Fallback UI for Users

Principles:

* **Clear headline** — “Something went wrong” is fine; blame the situation, not the user.
* **Next step** — Retry, go home, contact support.
* **Accessibility** — `role="alert"` on the main error message region when appropriate.
* **No raw stack traces** in production UI for non-technical users.

```javascript
function FullPageErrorFallback({ onGoHome }) {
  return (
    <main role="alert" className="error-page">
      <h1>We hit a snag</h1>
      <p>You can go back to the home page and continue from there.</p>
      <button type="button" onClick={onGoHome}>
        Go home
      </button>
    </main>
  );
}
```

Combine **route-level** boundary (full page) with **component-level** boundaries (single card or panel).

---

# 9. Putting It Together

| Mechanism        | Best for                                      |
| ---------------- | --------------------------------------------- |
| **Error Boundary** | Unexpected errors **during render** in subtree |
| **`try/catch`**    | **Fetch**, async handlers, parsing JSON       |
| **`.catch()`**    | Chained promises when not using `async/await` |
| **Error state**  | **Expected** failures (404, validation) — show inline message |

---

# 10. Best Practices

✔ Use **multiple** boundaries so one broken feature does not nuke the app.

✔ Handle **HTTP and network** errors as **expected** paths with user-visible messages.

✔ **Log** with enough context to debug; **display** a simple message.

✔ After recovery, consider **`key` remount** so children start clean.

✔ Do not use `try/catch` **around** arbitrary JSX to catch **child** render errors — it does not work; use a **boundary** instead.

---

# 11. Summary

| Concept            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| Error Boundary     | Class (or lib) that catches **render** errors in children  |
| Limits             | Does **not** catch async or event-handler errors by default |
| `try/catch`        | Use in **async** code and **event** handlers               |
| Logging            | `console` / services; avoid leaking secrets                |
| Fallback UI        | Clear copy, retry or navigation, accessible alert        |

---

# 12. Quick Mental Checklist

* Render might throw? → **Boundary** around that subtree.
* `fetch` / `await`? → **`try/catch`** + user-facing error state.
* Click handler runs risky code? → **`try/catch`** inside the handler.
* Need to recover cleanly? → **Reset state** + optional **`key`** bump.

---

# End of Lesson
