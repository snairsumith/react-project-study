# React JS Syllabus — Step by Step

A single, ordered syllabus for React JS training. Each topic builds on previous modules. Useful for students and upcoming batches.

---

## 1. Introduction to React

- What is React.
- History of React.
- Why React is popular.
- Advantages of React.
- SPA (Single Page Application).
- React vs Angular vs Vue.
- Virtual DOM.
- Real DOM vs Virtual DOM.
- React architecture (component-based design and one-way data flow).

---

## 2. Environment Setup

- Install Node.js and npm (and check versions).
- Create a new React project (Vite with TypeScript recommended).
- Understand project folders: `src`, `public`, config files.
- Run dev server and open the app in the browser.

---

## 3. JSX (JavaScript XML)

- What is JSX.
- JSX syntax.
- Embedding expressions with `{}`.
- JSX attributes.
- JSX vs HTML.
- JSX rules (single parent, proper closing tags, `className`, etc.).
- Rendering elements.

---

## 4. Components — Building Blocks

- What a component is (reusable UI piece).
- Function components and returning JSX.
- Using components inside other components.
- File structure: one component per file (or small related components).

---

## 5. Props — Passing Data In

- What props are (inputs to a component).
- Passing props from parent to child.
- Reading props inside components.
- Props are read-only and should not be mutated.

---

## 6. State — Data That Changes

- Why state is needed (dynamic UI updates).
- `useState`: state value and setter.
- Updating state and re-renders.
- Rules: never mutate state directly; always use setter.

---

## 7. Events and User Input

- Handling events: `onClick`, `onChange`, `onSubmit`, etc.
- Event object and common event use cases.
- Controlled inputs.
- Simple forms: text, checkbox, select.

---

## 8. Forms in React

- Controlled components.
- Uncontrolled components.
- Handling input fields.
- Handling multiple inputs with one handler.
- Basic form validation (required, length, format).

---

## 9. Conditional Rendering and Lists

- Showing/hiding UI with conditions (`&&`, ternary, early return).
- Rendering lists with `.map()`.
- Importance of `key` in list items.
- Common states: loading, empty, and error UI.

---

## 10. React Hooks (Core Hooks)

- `useState` — manage component state.
- `useEffect` — handle side effects.
- `useRef` — access DOM elements and keep mutable values.
- `useContext` — share global data without prop drilling.
- `useMemo` — optimize expensive calculations.
- `useCallback` — memoize functions.
- `useReducer` — manage complex state logic.

---

## 11. Side Effects and `useEffect`

- What side effects are (API calls, timers, subscriptions, DOM interactions).
- `useEffect` lifecycle behavior.
- Dependency array and re-run behavior.
- Cleanup functions to prevent memory leaks.

---

## 12. Data Fetching

- Fetching data on mount (`useEffect` + `fetch` or axios).
- Loading and error state handling.
- Displaying fetched data in UI.
- Best practices (avoid fetching in render, handle unmount/abort).
- `try/catch` pattern for API error handling.

---

## 13. React Router (Basics to Intermediate)

- Why routing is needed in SPAs.
- Using React Router.
- `BrowserRouter`, `Routes`, `Route`.
- `Link`, `NavLink`.
- `useNavigate`.
- Route params (`useParams`).
- Nested routes.
- Protected routes (basic auth guard idea).

---

## 14. Styling in React

- Global CSS and component-level CSS.
- CSS Modules (optional): scoped styles.
- Inline styles and when to use them.
- Optional: utility-first approach (Tailwind CSS) if used in project.

---

## 15. Lifting State Up and Composition

- Lift state to a common parent when multiple components share data.
- Pass both data and handlers as props.
- Composition patterns using `children`.
- Reusable component composition patterns.

---

## 16. State Management

- Context API for global state sharing.
- Redux fundamentals and when to use Redux.
- Redux concepts: Store, Actions, Reducers, Dispatch.
- Modern Redux approach: Redux Toolkit.

---

## 17. Performance Optimization

- `React.memo`.
- `useMemo`.
- `useCallback`.
- Lazy loading (`React.lazy`).
- Code splitting.
- `Suspense`.

---

## 18. Error Handling

- Error Boundaries.
- `try/catch` in API and async logic.
- Logging errors.
- Friendly fallback UI for users.

---

## 19. Testing

- Testing tools: Jest and React Testing Library.
- Unit testing.
- Component testing.
- Snapshot testing.

---

## 20. Advanced React Concepts

- Higher Order Components (HOC).
- Render Props.
- Custom Hooks.
- Compound Components.
- Portals.
- Fragments.
- Forward Ref.

---

## 21. TypeScript with React

- Installing and setting up TypeScript.
- Functional component typing.
- Props typing.
- State typing.
- API response typing.
- Using TypeScript effectively in React projects.

---

## 22. React Project Architecture

- Folder structure best practices.
- Component structure and modular design.
- Separation of concerns.
- Reusable components.
- API service layer structure.

---

## 23. Authentication

- Login system basics.
- JWT authentication flow.
- Protected routes.
- Token storage approaches and cautions.

---

## 24. Deployment

- Build production app (`npm run build`).
- Understand build output (static files).
- Deploy React apps on:
  - Vercel
  - Netlify
  - AWS
  - Firebase

---

## 25. Real World Projects

- Todo App.
- Weather App.
- Blog Application.
- E-commerce UI.
- Dashboard App.
- Chat Application.

---

*Use this syllabus in order; each day in **Daily Updates** can map to one or more of these topics.*
