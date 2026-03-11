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

*Add new days below using the template above.*