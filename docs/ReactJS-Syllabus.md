# React JS Syllabus — Step by Step

A single, ordered syllabus for React JS training. Each topic builds on the previous one. Useful for students and upcoming batches.

---

## 1. Introduction to React

- What is React and why use it?
- React vs plain JavaScript vs other frameworks.
- Virtual DOM in simple terms.
- Where React is used (web apps, SPAs).

---

## 2. Environment Setup

- Install Node.js and npm (and check versions).
- Create a new React project (e.g. Vite with TypeScript or Create React App).
- Understand project folders: `src`, `public`, config files.
- Run dev server and open the app in the browser.

---

## 3. JSX Basics

- What is JSX and how it relates to JavaScript.
- Writing HTML-like syntax inside JavaScript.
- Embedding expressions with `{}`.
- JSX rules: one parent element, closing tags, `className` instead of `class`.

---

## 4. Components — Building Blocks

- What a component is (reusable UI piece).
- Function components: writing a simple component and returning JSX.
- Using components inside other components.
- File structure: one component per file (or small related components).

---

## 5. Props — Passing Data In

- What props are (inputs to a component).
- Passing props from parent to child.
- Reading props inside the component.
- Props are read-only; keep components predictable.

---

## 6. State — Data That Changes

- Why we need state (UI that updates over time).
- `useState`: declaring state and updater function.
- Updating state and re-renders.
- Rules: never mutate state directly; use the setter.

---

## 7. Events and User Input

- Handling events: `onClick`, `onChange`, `onSubmit`, etc.
- Event object and common use cases.
- Controlled inputs: linking input value to state.
- Simple forms: text, checkbox, select.

---

## 8. Conditional Rendering and Lists

- Showing/hiding UI with conditions (`&&`, ternary, early return).
- Rendering lists with `.map()`.
- Importance of `key` in list items (and why not index when list changes).
- Simple patterns: loading state, empty state, error message.

---

## 9. Side Effects and `useEffect`

- What “side effects” are (API calls, subscriptions, DOM, etc.).
- `useEffect`: when and how it runs.
- Dependency array: when to re-run the effect.
- Cleanup (e.g. unsubscribing) when needed.

---

## 10. Data Fetching

- Fetching data when the component mounts (`useEffect` + `fetch` or axios).
- Loading and error state while fetching.
- Displaying the fetched data in the UI.
- Simple best practices (avoid fetching in render, handle unmount).

---

## 11. React Router (Basics)

- Why routing (multiple “pages” in a SPA).
- Install and setup React Router.
- Routes, `Route`, and `Link`.
- Navigating programmatically and reading URL params.

---

## 12. Styling in React

- Global CSS and component-level CSS.
- CSS Modules (optional): scoped styles.
- Inline styles and when to use them.
- Optional: brief intro to a utility-first approach (e.g. Tailwind) if used in the project.

---

## 13. Lifting State Up and Composition

- When several components need the same data: lift state to a common parent.
- Passing both data and handlers as props.
- Composition: `children` and component composition patterns.

---

## 14. Building and Deployment

- Production build command (e.g. `npm run build`).
- What the build output is (static files).
- Deploying to a static host (e.g. Vercel, Netlify, GitHub Pages) — high-level steps.

---

## 15. Next Steps (Optional)

- Hooks in depth: `useContext`, `useRef`, custom hooks.
- State management: when to consider Context vs external library (e.g. Redux).
- TypeScript with React (types for props and state).
- Testing basics (e.g. React Testing Library).

---

*Use this syllabus in order; each day in **Daily Updates** can map to one or more of these topics.*
