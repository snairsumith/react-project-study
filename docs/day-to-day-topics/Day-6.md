# 12. Styling in React

---

# 1. Introduction

In React, styling can be done in multiple ways.
There is no single "correct" method for every case.

Common options:

- Global CSS
- Component-level CSS files
- CSS Modules (scoped styles)
- Inline styles
- Utility-first CSS (example: Tailwind CSS)

The best choice depends on:

- project size
- team preference
- need for style isolation
- speed of development

---

# 2. Global CSS

Global CSS means styles are shared across the whole app.
Typical example files:

- `src/index.css`
- `src/assets/css/main.css`

These are usually imported once near the app entry (`main.tsx` or `App.tsx`).

## Example

```css
/* src/assets/css/main.css */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #222;
}

.page-title {
  margin-bottom: 16px;
}
```

## Usage

```tsx
export default function Home() {
  return <h1 className="page-title">Home</h1>;
}
```

## When to use global CSS

- App-wide reset/base styles
- Typography defaults
- Reusable utility classes used in many pages

## Caution

Global class names can conflict as the app grows.

---

# 3. Component-level CSS

A simple and common pattern:

- keep one CSS file near a component or feature
- import it directly in that component/page

## Example

```tsx
// src/pages/Profile.tsx
import "./Profile.css";

export default function Profile() {
  return (
    <section className="profile-card">
      <h2 className="profile-title">My Profile</h2>
    </section>
  );
}
```

```css
/* src/pages/Profile.css */
.profile-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}

.profile-title {
  margin: 0;
}
```

## Benefits

- keeps styles closer to related UI
- easier to maintain than one giant global stylesheet

## Limitation

Class names are still global unless you use CSS Modules.

---

# 4. CSS Modules (Optional)

CSS Modules create **scoped class names** automatically.
This prevents style collisions between components.

File naming convention:

- `ComponentName.module.css`

## Example

```css
/* Button.module.css */
.btn {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
}
```

```tsx
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.btn}>Save</button>;
}
```

## When to use CSS Modules

- medium/large projects
- shared codebases where class name conflicts are common
- components that need isolated styling

---

# 5. Inline Styles and When to Use

Inline styles are written directly in JSX using a JavaScript object.

## Example

```tsx
export default function StatusBadge() {
  const isActive = true;

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 6,
        backgroundColor: isActive ? "#16a34a" : "#6b7280",
        color: "#fff",
      }}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
```

## Good use cases

- dynamic values from state/props
- one-off styles
- quick prototyping

## Avoid for

- large style blocks
- reusable class-based styling
- pseudo selectors (`:hover`) or media queries (not directly supported)

---

# 6. Brief Intro: Utility-first CSS (Tailwind) (Optional)

Utility-first CSS uses small utility classes directly in markup.

Example (Tailwind style):

```tsx
export default function Card() {
  return (
    <div className="p-4 rounded-lg border shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">Card Title</h2>
      <p className="text-gray-600">Card content</p>
    </div>
  );
}
```

## Pros

- fast UI building
- less custom CSS files
- consistent spacing/color system

## Cons

- class names can become long
- learning curve for utility class names

If your project uses Tailwind, keep class usage consistent and avoid mixing too many styling approaches.

---

# 7. Styling Best Practices

✔ Keep style approach consistent across the project

✔ Use global CSS for app-level base styles only

✔ Prefer component-level or module-level styles for feature UI

✔ Keep class names clear and meaningful

✔ Avoid very large CSS files; split by feature/component

✔ Use inline styles mostly for dynamic one-off cases

---

# 8. Styling Summary


| Approach      | Scope                      | Best for                        |
| ------------- | -------------------------- | ------------------------------- |
| Global CSS    | Whole app                  | base styles, common utilities   |
| Component CSS | Mostly local by convention | small/medium features           |
| CSS Modules   | Truly scoped               | large apps, avoiding conflicts  |
| Inline styles | Single element             | dynamic styles from props/state |
| Utility-first | per element via classes    | fast, consistent UI workflows   |


---

# 9. Styling Practice Exercises

### Exercise 1

Create a `UserCard` component and style it using:

- global class names (first)
- then convert the same UI to CSS Module

Compare maintainability.

---

### Exercise 2

Build a status badge (`online` / `offline`) using inline styles for dynamic colors.

---

### Exercise 3

Take one existing page and refactor:

- move page-only styles into a dedicated CSS file
- keep only base styles in global CSS

---

# 13. Lifting State Up and Composition

---

# 1. Introduction

In React, data usually flows from parent to child via props.
When multiple components need the same data, keep one source of truth.

That pattern is called **Lifting State Up**.

Composition is the pattern of building complex UIs by combining smaller components.

---

# 2. Why Lift State Up?

Problem:

- `SearchBar` needs filter text
- `ProductTable` also needs the same filter text

If each component has its own separate state, they can go out of sync.

Solution:

- Move shared state to the closest common parent
- Pass the state and handlers down as props

---

# 3. Core Pattern: Shared State in Parent

## Parent owns state

```tsx
import { useState } from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}
```

## Child receives data + handler props

```tsx
type SearchBarProps = {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
};

export default function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}
```

---

# 4. Passing Data and Handlers as Props

When lifting state up, parent passes:

- **data props** (current state)
- **handler props** (functions to update state)

This keeps:

- data flow predictable
- updates centralized
- components easier to test

Naming tips:

- Data: `value`, `checked`, `filterText`
- Handlers: `onChange`, `onSubmit`, `onFilterTextChange`

---

# 5. One-way Data Flow

React follows one-way flow:

- Parent -> Child (data)
- Child -> Parent (events via callbacks)

This pattern improves debugging and avoids hidden state updates.

---

# 6. Composition Basics

Composition means building UIs by combining reusable components.

Instead of large monolithic components, create small parts:

- layout containers
- presentational components
- feature components

---

# 7. `children` Prop Pattern

Use `children` when a wrapper component should render any nested content.

## Example

```tsx
type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}
```

Usage:

```tsx
<Card title="Profile">
  <p>Name: Sumith</p>
  <button>Edit</button>
</Card>
```

Benefits:

- flexible wrapper components
- reusable layout patterns

---

# 8. Composition Patterns (Beginner-friendly)

## 8.1 Wrapper components

Examples:

- `Card`
- `Modal`
- `Panel`

These components mainly style/layout and render `children`.

## 8.2 Specialized + generic components

Create a generic container, then specialized versions.

Example:

- `List` (generic)
- `ProductList`, `UserList` (specialized)

---

# 9. Common Mistakes

- Keeping duplicate shared state in sibling components
- Passing too many deeply nested props (prop drilling) without planning
- Mutating props directly in child components
- Creating very large parent components with too many responsibilities

---

# 10. Best Practices

✔ Lift state only as high as necessary (not always to top-level app)

✔ Keep one source of truth for shared data

✔ Use clear prop names for data and handlers

✔ Keep components small and focused

✔ Prefer composition over duplication

✔ Use TypeScript interfaces for props in all shared components

---

# 11. Lifting State + Composition Summary


| Concept           | Description                                  |
| ----------------- | -------------------------------------------- |
| Lifting State Up  | Move shared state to a common parent         |
| Data props        | Parent passes current values to children     |
| Handler props     | Parent passes callbacks to update values     |
| One-way data flow | Parent -> Child data, Child -> Parent events |
| Composition       | Build complex UI from smaller components     |
| `children`        | Pass nested JSX into reusable wrappers       |


---

# 12. Practice Exercises

### Exercise 1: Shared Counter

Create:

- `CounterDisplay` component
- `CounterButtons` component
- `CounterPage` parent

Store `count` only in parent and pass:

- `count` to display
- increment/decrement handlers to buttons

---

### Exercise 2: Search + List

Create:

- `SearchInput`
- `UserList`
- parent `UserPage`

Lift search text state to `UserPage`.
Pass search text and handler to `SearchInput`.
Pass filtered data to `UserList`.

---

### Exercise 3: Reusable Card via `children`

Create a reusable `Card` wrapper with `children`.
Use it in at least three places:

- Profile card
- Product card
- Settings card

---

### Exercise 4: Mini Dashboard Composition

Build a page with:

- `DashboardLayout`
- `Sidebar`
- `MainContent`
- `StatCard` components

Use composition to structure the page cleanly.

---

# End of Lesson

