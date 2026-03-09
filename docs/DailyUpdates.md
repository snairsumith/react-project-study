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

*Add new days below using the template above.*