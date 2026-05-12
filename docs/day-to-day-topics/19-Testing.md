# React Testing — Teaching Notes

## Topic 19: Jest, React Testing Library, Unit, Component, and Snapshot Tests

---

# 1. Why Test React Apps?

Automated tests help you:

* **Catch regressions** when you refactor or upgrade dependencies.
* **Document behavior** — tests show how a module or component is supposed to work.
* **Ship with confidence** — especially for forms, routing, and business rules.

Tests fall on a spectrum from **small and fast** (unit) to **broader** (component / integration). This lesson focuses on **Jest**, **React Testing Library (RTL)**, **unit tests**, **component tests**, and **snapshots**.

---

# 2. Testing Tools — Jest and React Testing Library

### Jest

**Jest** is a **JavaScript test runner** and assertion library. It typically provides:

| Feature            | Role                                              |
| ------------------ | ------------------------------------------------- |
| Test runner        | Finds `*.test.js` / `*.spec.js`, runs them      |
| Assertions         | `expect(x).toBe(y)`, `toEqual`, `toThrow`, etc.   |
| Mocking            | `jest.fn()`, `jest.spyOn`, timers, modules        |
| Watch mode         | Re-run tests on file save                         |

Jest often runs in a **JSDOM** environment so DOM APIs exist in Node (needed for React components).

### React Testing Library (RTL)

**RTL** encourages tests that resemble **how users interact** with the UI:

* **Render** components into a virtual DOM (JSDOM).
* **Query** by **role**, **label text**, **placeholder**, not by implementation details like `class` or internal state.
* **Fire events** (clicks, typing) and assert on **visible outcomes**.

| Package                         | Purpose                                      |
| ------------------------------- | -------------------------------------------- |
| `@testing-library/react`        | `render`, `screen`, `within`, `waitFor`      |
| `@testing-library/jest-dom`     | Extra matchers: `toBeInTheDocument()`, etc.  |
| `@testing-library/user-event` | **Recommended** over `fireEvent` for typing  |

### Vite projects (optional note)

This training repo uses **Vite**. Many teams use **Vitest** instead of Jest — its API is **Jest-compatible** (`describe`, `it`, `expect`, `vi` instead of `jest`). **RTL usage is the same** regardless of runner. The syllabus names **Jest**; concepts transfer directly to Vitest.

---

# 3. Basic Jest Syntax (Unit and General)

```javascript
// math.js — module under test
export function add(a, b) {
  return a + b;
}

// math.test.js
import { add } from "./math";

describe("add", () => {
  it("returns sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("handles zero", () => {
    expect(add(0, 0)).toBe(0);
  });
});
```

### Explanation

* **`describe`** groups related cases.
* **`it` / `test`** is one behavior you assert.
* **`expect`** defines the **expected** outcome.

---

# 4. Unit Testing

**Unit tests** target **one small unit** of code in isolation: a **pure function**, a **formatter**, a **reducer**, or a **hook** (with RTL’s `renderHook` when needed).

### Characteristics

| Trait              | Meaning                                      |
| ------------------ | -------------------------------------------- |
| **Fast**           | No real network, minimal I/O                 |
| **Deterministic** | Same input → same result every run           |
| **Isolated**      | Dependencies mocked when they are heavy      |

### Example — pure function

```javascript
// slugify.js
export function slugify(text) {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// slugify.test.js
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
    expect(slugify("   ")).toBe("");
  });
});
```

### Example — mocking a module (Jest)

When a unit calls `fetch` or a heavy module, **mock** it so the test stays unit-sized.

```javascript
// api.js
export async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Bad status");
  return res.json();
}

// api.test.js
import { getJson } from "./api";

describe("getJson", () => {
  it("returns parsed JSON on success", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const data = await getJson("https://example.com/x");
    expect(data).toEqual({ id: 1 });
    expect(fetch).toHaveBeenCalledWith("https://example.com/x");
  });
});
```

---

# 5. Component Testing (React Testing Library)

Component tests **render** React trees and assert on the **DOM** and **user-visible** behavior.

### Setup (typical Jest project)

1. Install: `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `babel` or `ts-jest` / SWC as needed for JSX.
2. In a **setup file**, import jest-dom once:

```javascript
// jest.setup.js
import "@testing-library/jest-dom";
```

3. Point Jest config at `jest.setup.js` and `testEnvironment: "jsdom"`.

(Exact config varies by bundler; follow the official Jest + RTL docs for your stack.)

### Example — simple counter

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

// Counter.jsx: button increments displayed count

describe("Counter", () => {
  it("increments when user clicks the button", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    // Prefer queries tied to accessibility / visible text
    const button = screen.getByRole("button", { name: /increment/i });
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
```

### Query priority (RTL guidance)

Prefer, in order:

1. **`getByRole`** — buttons, headings, links, etc.
2. **`getByLabelText`** — form fields
3. **`getByPlaceholderText`** — when label missing (prefer fixing a11y)
4. **`getByText`**
5. **`getByTestId`** — last resort (`data-testid`)

### Async UI — `findBy` / `waitFor`

```javascript
import { render, screen, waitFor } from "@testing-library/react";
import UserName from "./UserName";

describe("UserName", () => {
  it("shows name after fetch", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: "Ada" }),
    });

    render(<UserName userId={1} />);

    // findBy* waits and re-tries (good for async updates)
    expect(await screen.findByText("Ada")).toBeInTheDocument();
  });
});
```

### Explanation

* **`render`** mounts the component into JSDOM.
* **`userEvent`** simulates realistic pointer/keyboard input.
* **`findBy`** wraps **async** assertions so React state updates can flush.

---

# 6. Snapshot Testing

A **snapshot** serializes part of the tree (often **HTML string** or **component output**) to a **file** on disk. The next run **compares** output to the saved snapshot.

### Basic usage (Jest)

```javascript
import { render } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting snapshot", () => {
  it("matches snapshot for default props", () => {
    const { container } = render(<Greeting name="World" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

First run creates `__snapshots__/....snap`. Review the diff in PRs.

### When snapshots help

* **Stable** presentational output (icons, small static cards).
* **Regression guard** for large markup you rarely change on purpose.

### When snapshots hurt

* **Volatile** UI (dates, random IDs, animations).
* Replacing **behavior assertions** — a snapshot can pass while the app is **broken** for users.
* Huge snapshots that nobody reads in code review.

**Best practice:** prefer **role + text** assertions; use snapshots **sparingly** and keep them **small**.

### Updating snapshots

When the UI **should** change, run Jest with **update snapshot** flag (e.g. `jest -u`). Treat updates like any code change: **review** the diff carefully.

---

# 7. What to Test — Quick Guide

| Layer        | Examples                                      |
| ------------ | --------------------------------------------- |
| **Unit**     | Validators, formatters, URL builders, reducers |
| **Component** | User flows: submit form, toggle, error message |
| **Snapshot** | Optional stable markup; avoid as only test    |

---

# 8. Best Practices

✔ Test **behavior**, not **implementation** (avoid testing internal state unless necessary).

✔ Use **accessible queries** (`getByRole`) so tests and a11y improve together.

✔ Prefer **`user-event`** over low-level `fireEvent` for realistic input.

✔ **Mock** network at the boundary; assert **loading / success / error** UI.

✔ Keep snapshots **focused**; do not snapshot the entire app shell by default.

✔ Run tests in **CI** on every push so the team trusts the suite.

---

# 9. Summary

| Concept                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| **Jest**                | Runner + assertions + mocks                                |
| **React Testing Library** | Render React, query like a user, assert DOM               |
| **Unit test**           | Small isolated logic, often pure functions + mocks         |
| **Component test**      | Render + interact + assert visible results                 |
| **Snapshot test**       | Compare serialized output to a stored file; use sparingly  |

---

# 10. Command Cheat Sheet

| Goal              | Typical command        |
| ----------------- | ---------------------- |
| Run all tests     | `jest` or `npm test`   |
| Watch mode        | `jest --watch`         |
| Update snapshots  | `jest -u`              |
| Single file       | `jest path/to/file`    |

---

# End of Lesson
