# Daily Training Updates

**Purpose:** Share each day’s training details with students. Useful for revision and for upcoming batches.

**Repository:**  
Run / clone: [https://github.com/snairsumith/react-project-study.git](https://github.com/snairsumith/react-project-study.git)

---

## How to use this doc

- Add **one section per training day**.
- Copy the **Day template** below for each new day.
- Keep entries short and clear so students and future batches can follow.

---

## Reference: Create React + Vite project

Use one of these commands (replace `my-app` with your project name):

**npm**
```bash
npm create vite@latest my-app -- --template react
```

**yarn**
```bash
yarn create vite my-app --template react
```

**pnpm**
```bash
pnpm create vite my-app --template react
```

Then go into the project and run:
```bash
cd my-app
npm install    # or yarn install / pnpm install
npm run dev    # or yarn dev / pnpm dev
```

---

## Day template (copy for each day)

```markdown
### Day X — DD Mon YYYY

**Topics covered**
- 
- 

**Key points / concepts**
- 
- 

**Code / examples**
- 
- 

**Exercises / hands-on**
- 
- 

**Notes / tips**
- 

**Next session**
- 
```

---

## Daily entries

### Day 1 — 9 Mar 2025

**Topics covered**
- React + Vite project setup
- Project structure and running the app
- Components and pages (Home, Login, Button)
- Basic state with `useState`

**Key points / concepts**
- Vite is the build tool; use `npm run dev` to start dev server
- Components go in `src/components/`, pages in `src/pages/`
- `useState` holds state; pass props (e.g. `count`, `handleClick`) to child components

**Code / examples**
- Creating app: `npm create vite@latest my-app -- --template react` (see Reference section above)
- `App.tsx`: importing components, using `useState`, passing props to `<Button />`

**Exercises / hands-on**
- Clone repo and run `npm install` then `npm run dev`
- Toggle `<Home />` / `<Login />` in `App.tsx` to view different pages
- Use the Button component with count and click handler

**Notes / tips**
- Keep components small and in their own files
- Use the Reference section in this doc for Vite create commands

**Next session**
- (Add planned topics for next class)

---

### Day 2 — 10 Mar 2025

**Topics covered**
- Filterable Product Table (Thinking in React): search + “in stock only” filter
- Lifting state up: keeping filter state in parent, passing as props to SearchBar and ProductTable
- Controlled inputs: text and checkbox tied to state
- TypeScript interfaces for props and product data
- Component structure: page → SearchBar, ProductTable → ProductCategoryRow, ProductRow

**Key points / concepts**
- State lives in the lowest common parent that needs it; pass state and handlers down as props (e.g. `filterText`, `handleFilterTextChange`)
- Controlled input: `value` / `checked` from state; `onChange` updates state
- Product shape: `category`, `price`, `stocked`, `name` (in `src/utils/product.ts`)
- Filter in the component that renders the list: filter by name (case-insensitive) and by `stocked` when checkbox is on

**Code / examples**
- `FilterableProductTable.tsx`: `useState` for `filterText` and `inStockOnly`; handlers passed to SearchBar; products + filter values passed to ProductTable
- `SearchBar`: controlled text input and “Only show products in stock” checkbox; receives filter state and change handlers via props
- `ProductTable`: filters `products` by `filterText` and `inStockOnly`; builds rows with `ProductCategoryRow` (per category) and `ProductRow` (per product)
- Shared type: `Product` interface (e.g. in `types/Products`) used by product data and components

**Exercises / hands-on**
- Open `FilterableProductTable` in App; use search and “Only show products in stock”
- Add or edit items in `src/utils/product.ts` and see the table update
- Optionally add CSS (e.g. `FilterableProductTable.css`) to style the table and search bar

**Notes / tips**
- One responsibility per component; parent owns shared state and passes it down
- Define props with TypeScript interfaces (`SearchBarProps`, `ProductTableProps`) for clarity and autocomplete

**Next session**
- (Add planned topics for next class)

---

### Day 3 — 11 Mar 2025

**Topics covered**
- Side effects in React: what they are and when to use them
- `useEffect` hook: syntax, dependency array, when it runs
- Fetching data (API call) inside `useEffect` (e.g. Dog API with axios)
- Cleanup function: why and when (timers, subscriptions); preventing memory leaks
- Loading state and conditional fetch (e.g. fetch on button click via dependency)

**Key points / concepts**
- Side effects = work outside React’s render (API calls, timers, DOM, localStorage, subscriptions)
- `useEffect(fn, deps)`: no deps → every render; `[]` → run once on mount; `[x]` → run when `x` changes
- Cleanup: return a function from `useEffect`; React runs it on unmount or before re-running the effect (e.g. `clearInterval`, reset state)
- For API calls: use loading/error state; trigger fetch with state in dependency array (e.g. `[loadDogs]`) or `[]` for mount-only

**Code / examples**
- `SideEffects.tsx`: `useEffect` with `[loadDogs]` — axios GET to Dog API when “Load Dogs” is clicked; cleanup resets `loadDogs`, `dogs`, `loading`
- Same page: second `useEffect` with `[]` — `setInterval` for a timer; cleanup returns `clearInterval(timer)`
- Typing API response: `DogResponse` type for `res.data.data`; optional fields like `country`
- Detailed notes: `docs/day-to-day-topics/Day-3.md` (useEffect examples, dependency array, cleanup, best practices)

**Exercises / hands-on**
- Open `SideEffects` page in App; click “Load Dogs” and watch list and loading state
- Add error state and show a message when the API call fails
- Try a small timer in a component and confirm it clears on unmount (navigate away)

**Notes / tips**
- Use cleanup for any subscription or timer so you don’t leak memory or update unmounted components
- Keep each effect focused (e.g. one effect for API, one for timer); list correct dependencies
- Install axios if needed: `npm install axios`

**Next session**
- (Add planned topics for next class)

---

### Day 4 — 12 Mar 2025

**Topics covered**
- React Router basics: why routing is needed in an SPA
- Installing and setting up React Router (`react-router-dom`, `BrowserRouter`)
- Defining routes using `Routes` and `Route`
- Navigation using `Link` and programmatic navigation using `useNavigate`
- URL params with `useParams` and query params with `useSearchParams`
- Data fetching with `useEffect` + axios (list + detail page flow)

**Key points / concepts**
- Router setup must be at the app root: wrap `<App />` with `<BrowserRouter>` in `main.tsx`
- Route mapping is done in `App.tsx` using:
  - `<Routes>` as the container
  - `<Route path="..." element={<Component />}/>` for each page
- Programmatic navigation: `useNavigate()` is useful for “onClick go to details”
- Dynamic routing:
  - Route params: `/dog-detail/:dogId` → read with `useParams()`
  - Query params: `?type=...&size=...` → read with `useSearchParams()`
- Data fetching pattern:
  - Use `useEffect(() => {...}, [])` to fetch on mount
  - Use `useEffect(() => {...}, [dogId])` to refetch when the URL param changes
  - Track `loading` state and render a loader while waiting

**Code / examples**
- Router setup: `src/main.tsx` wraps `<App />` with `<BrowserRouter>`
- Route table: `src/App.tsx`
  - `/` → Home
  - `/login` → Login
  - `/filter-product` → FilterableProductTable
  - `/side-effects` → SideEffects
  - `/data-fetch` → DataFetch
  - `/dog-detail/:dogId` → DogDetail (route param)
  - `*` → NotFound (404)
- `DataFetch.tsx`: fetch dogs list from Dog API on mount; click card → `navigate("/dog-detail/<id>?type=...")`
- `DogDetail.tsx`: read `dogId` with `useParams`; read query params with `useSearchParams`; fetch single dog by id
- 404 page: `src/pages/404.tsx` uses `Link` back to Home
- Detailed router notes: `docs/day-to-day-topics/Day-5.md`

**Exercises / hands-on**
- Add a simple menu/navbar using `Link` to navigate between pages
- In `DataFetch`, filter the dog list by the search input (case-insensitive)
- Add error state to `DataFetch` / `DogDetail` and show a friendly message when API fails
- Try changing the URL param manually in the browser and confirm `DogDetail` refetches (dependency `[dogId]`)

**Notes / tips**
- Prefer `Link` over `<a href>` to avoid full page reloads
- Always include correct dependencies in `useEffect`
- Keep API types (response shape) consistent across list/detail pages

**Next session**
- (Add planned topics for next class)

---

### Day 5 — 13 Mar 2025

**Topics covered**
- **API service layer**: shared axios instance, reusable API functions
- Environment-based `baseURL` (`import.meta.env.VITE_API_ENDPOINT` with fallback)
- **Axios interceptors**: attach auth header from `localStorage`; handle `403` (redirect to login)
- Refactor **DataFetch** and **DogDetail** to call `getDogs()` / `getDogDetail()` instead of hard-coded URLs
- **Styling in React**: global / feature CSS for menu and login (`main.css`); mix of `className` and inline styles

**Key points / concepts**
- Centralize HTTP setup in one client (`apiClient`) so base URL, headers, and error handling stay consistent
- Expose thin functions (`getDogs`, `getDogDetail`) from `src/api/index.ts` so pages stay readable
- Interceptors: run on every request/response — good for tokens and global error handling
- Styling: global CSS for shared layout (menu, login); inline styles are OK for small dynamic/layout tweaks (e.g. flex grid in DataFetch)
- **Note:** `Menu` still uses `<a href>`; for a true SPA, prefer `Link` from React Router (avoids full page reload)

**Code / examples**
- `src/api/apiClient.ts`: `axios.create({ baseURL: ... })`, request interceptor (`Authorization: Bearer`), response interceptor (`403` → `window.location.href = '/login'`)
- `src/api/index.ts`: `getDogs()`, `getDogDetail(dogId)`
- `DataFetch.tsx` → `getDogs()`; `DogDetail.tsx` → `getDogDetail(dogId)`
- `Home.tsx`: `Menu` + `Banner` + `About` inside `.main-container`
- `components/Home/Menu.tsx`: menu items from data; classes `menu-container`, `menu-item`, `sub-style` / `no-sub-style`
- `assets/css/main.css`: `.menu-container`, login styles (`.login-container`, inputs, buttons, messages)

**Exercises / hands-on**
- Add `.env` with `VITE_API_ENDPOINT` and confirm requests use it
- Replace `<a href>` in `Menu` with `Link to` and compare behavior (no full reload)
- Remove unused imports if all requests go through `src/api`
- Wire `DataFetch` search input to filter the list by dog name (case-insensitive)

**Notes / tips**
- Use `VITE_` prefix for variables exposed to the browser in Vite
- Keep API typing (`Dog`, response shape) aligned between list and detail pages

**Next session**
- (Add planned topics for next class)

---

### Day 6 — 14 Mar 2025

**Topics covered**
- React Hooks practical session: `useContext`, `useRef`, `useState`, `useEffect`
- Theme management using Context API (`ThemeProvider`, `useTheme`)
- Building a dedicated React Hooks page (`/react-hooks`) with theme-based UI
- DOM access and manipulation with `useRef` (focus input + update element style)

**Key points / concepts**
- Context setup:
  - `createContext<ThemeContextValue | null>(null)`
  - Provider exposes `theme` and `toggleTheme`
  - Custom hook `useTheme()` validates provider usage
- `useTheme` guard pattern:
  - throws error if context is missing (`useTheme must be used within ThemeProvider`)
- `useRef` usage patterns:
  - focus input on mount (`inputRef.current?.focus()`)
  - reference DOM node (`divRef`) and update style based on `count`
- `useEffect` with dependencies:
  - `[]` for mount-only behavior (focus input)
  - `[count]` to react to state updates (change color red/blue)

**Code / examples**
- `src/components/ReactHooks/ReactContext.tsx`
  - `Theme` type (`light | dark`)
  - `ThemeContextValue` type (`theme`, `toggleTheme`)
  - `ThemeProvider` + `useTheme` custom hook
- `src/components/ReactHooks/ReactRef.tsx`
  - `count` state
  - `inputRef` for autofocus
  - `divRef` to dynamically set background color (`count < 10` -> red, else blue)
- `src/pages/ReactHooks.tsx`
  - consumes `useTheme`
  - applies theme class: `light-theme` / `dark-theme`
  - renders `Menu`, `ReactRef`, and `Toggle Theme` button

**Exercises / hands-on**
- Add a third theme option (e.g. `system`) and update context types
- Persist selected theme in `localStorage` and restore on page load
- In `ReactRef`, add a button to scroll a referenced section into view
- Replace direct DOM style mutation with conditional `className` based on state

**Notes / tips**
- Keep provider at app/root level so every route can consume the same context
- Use custom hooks (`useTheme`) to keep context usage clean and safe
- Prefer state-driven classes for styling when possible; use direct ref DOM updates only when required

**Next session**
- (Add planned topics for next class)

---

### Day 7 — 15 Mar 2025

**Topics covered**
- `useMemo` for memoizing derived values (search + filtered list)
- `useEffect + useMemo + useCallback` combined real-world pattern
- `React.memo` and why stable props matter (avoid unnecessary re-renders)

**Key points / concepts**
- `useMemo` memoizes a **value** (example: filtered list) and recomputes only when dependencies change
- `useCallback` memoizes a **function reference** and helps when passing callbacks to memoized children
- `useEffect` is for **side effects** (example: fetching data on mount)
- `React.memo` prevents child re-render when props are referentially equal
- Dependency arrays should include every value used inside the memo/effect callback that can change

**Code / examples**
- `src/pages/UesMemoTest.tsx`
  - `query` state + `useMemo` to compute `filteredItems`
  - renders result count and list based on memoized filter
- `src/pages/CombinedRealWorldPattern.tsx`
  - `useEffect([])` fetch users on mount
  - `useMemo([users, query])` compute `filteredUsers`
  - `useCallback([])` memoize `handleSelectUser`
  - `UserList` wrapped with `React.memo` to reduce re-renders

**Exercises / hands-on**
- In `UesMemoTest`, increase list size to simulate expensive filtering and compare behavior with/without `useMemo`
- Add a button that changes unrelated state and verify `filteredItems` does not recompute unnecessarily
- In `CombinedRealWorldPattern`, log renders in `UserList` and observe the difference when removing `useCallback`
- Add a `loading` state to the fetch and show a loader before users are loaded

**Notes / tips**
- Use memoization only when it solves a real issue (expensive compute or stable props for memoized children)
- `useMemo` does not “make code faster” by default; it trades memory/complexity for fewer recalculations

**Next session**
- (Add planned topics for next class)

---

*Add new days below using the template above.*