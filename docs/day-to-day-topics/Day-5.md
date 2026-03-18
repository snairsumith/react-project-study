# 11. React Router (Basics)

---

# 1. Introduction

Most React apps are **Single Page Applications (SPA)**.
That means the browser loads **one HTML page**, and React updates the UI without full page reloads.

But we still want the user to move between multiple screens like:

* Home
* About
* Products
* Product Details
* Login

For this, we use **Routing**.

---

# 2. Why Routing? (Multiple “Pages” in a SPA)

Routing helps us:

* Show different UI based on the **URL**
* Navigate with links without reloading the page
* Support browser actions: **back/forward/refresh**
* Share URLs (deep links), e.g. `/products/42`

Without routing, you often end up doing manual state-based navigation like:

* `showHome` / `showLogin` booleans
* conditional rendering in `App.tsx`

Routing is the standard approach for real apps.

---

# 3. Install React Router

For web apps, we install **react-router-dom**.

```bash
npm install react-router-dom
```

If you're using TypeScript, React Router already includes types.

---

# 4. Basic Setup (BrowserRouter)

React Router needs a router provider at the root.
Commonly, we wrap our app with `BrowserRouter`.

### Example (main entry)

Typical files:

* `src/main.tsx` (Vite default)
* or `src/index.tsx` (CRA style)

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

---

# 5. Routes, Route, and Link

## 5.1 `Routes` and `Route`

* `Routes` is a container for route definitions.
* `Route` maps a URL path to a React element.

```tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### Notes

* `path="*"` is the fallback for unknown URLs (404 page).
* In React Router v6+, `element` takes JSX: `element={<Home />}`.

---

## 5.2 `Link` (navigation without reload)

Use `Link` instead of `<a href="">`.

Why?

* `<a>` triggers full page reload.
* `Link` updates the URL and renders the route **without reloading**.

```tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/about">About</Link>
    </nav>
  );
}
```

---

# 6. Route Parameters (Reading URL Params)

Many pages need dynamic values from the URL.

Examples:

* `/products/10`
* `/users/abc123`

## 6.1 Define a route with a param

```tsx
<Route path="/products/:productId" element={<ProductDetails />} />
```

## 6.2 Read params using `useParams`

```tsx
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
    </div>
  );
}
```

### Notes (important)

* Params are **strings**.
* If you need a number, convert it:
  * `const id = Number(productId)`

---

# 7. Query Params (Search Params)

Query params look like:

* `/products?search=apple&inStock=true`

React Router provides `useSearchParams`.

```tsx
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const inStock = searchParams.get("inStock") === "true";

  return (
    <div>
      <h1>Products</h1>

      <p>search: {search}</p>
      <p>inStock: {String(inStock)}</p>

      <button
        onClick={() => setSearchParams({ search: "apple", inStock: "true" })}
      >
        Set query params
      </button>
    </div>
  );
}
```

---

# 8. Navigating Programmatically (`useNavigate`)

Sometimes we navigate after an action like:

* login success
* form submit
* button click

Use `useNavigate`.

```tsx
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Example: after login success
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

### Navigation options

```tsx
navigate(-1); // go back
navigate(1);  // go forward

navigate("/dashboard", { replace: true }); // replace history entry
```

---

# 9. Active Links (`NavLink`) (Optional but useful)

`NavLink` helps style the current active route.

```tsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

---

# 10. Common Mistakes

* Using `<a href="/about">` instead of `<Link to="/about">`
* Forgetting to wrap the app in `BrowserRouter`
* Expecting `useParams()` values to be numbers (they are strings)
* Not adding a `*` route for 404

---

# 11. Best Practices (Basics)

✔ Keep routes in one place (e.g. `AppRoutes.tsx`)

✔ Keep pages in `src/pages/`

✔ Use `Link` / `NavLink` for navigation

✔ Use route params for detail pages (e.g. `/products/:id`)

✔ Use programmatic navigation for flows (login, submit)

---

# 12. Summary

| Concept | What it does |
| --- | --- |
| `BrowserRouter` | Enables routing in browser apps |
| `Routes` / `Route` | Define URL → component mapping |
| `Link` | Navigate without full page reload |
| `NavLink` | Link with active styling support |
| `useNavigate` | Navigate programmatically |
| `useParams` | Read `:param` from URL |
| `useSearchParams` | Read and set query params |

---

# 13. Practice Exercises

### Exercise 1: Basic Pages

Create:

* `/` → Home
* `/about` → About
* `/contact` → Contact
* `*` → NotFound

Add a navbar with `Link`.

---

### Exercise 2: Product List + Details

Create:

* `/products` → list page
* `/products/:productId` → details page

On the list page, render links like:

* `Link to={"/products/1"}`
* `Link to={"/products/2"}`

Read the `productId` using `useParams`.

---

### Exercise 3: Programmatic Navigation

Create a `Login` page.

On successful login (mock with a button), navigate to `/dashboard`.

Try `replace: true` so the user cannot go back to login.

---

### Exercise 4: Query Params

On `/products`, read a query param `search`.

Example URLs:

* `/products?search=apple`
* `/products?search=spinach`

Display the value on the UI.

---

# End of Lesson

