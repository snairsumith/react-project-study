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

*Add new days below using the template above.*

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