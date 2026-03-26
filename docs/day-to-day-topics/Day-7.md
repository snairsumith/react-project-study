# 10. React Hooks (Core Hooks)

---

# 1. Introduction

React Hooks let you use React features inside **function components**.

Before Hooks, React features like state and lifecycle methods required **class components**.
Now you can write everything using functions.

In this module we cover the **core Hooks**:

* `useState`
* `useEffect`
* `useRef`
* `useContext`
* `useMemo`
* `useCallback`
* `useReducer`

---

# 2. Why Hooks Exist

Hooks solve common problems with older class patterns:

* simpler code (no classes)
* better logic reuse
* easier composition of features
* less boilerplate

---

# 3. Rules of Hooks (Very Important)

React has strict rules to keep hook order consistent.

## Rule 1: Only call Hooks at the top level

Do NOT call Hooks inside:

* loops
* conditions
* nested functions

Incorrect:

```tsx
if (isLoggedIn) {
  useState(0)
}
```

Correct:

```tsx
const [count, setCount] = useState(0)
if (isLoggedIn) {
  // render something
}
```

---

## Rule 2: Only call Hooks from React functions

Call Hooks only inside:

* React function components
* custom hooks (that also follow the rules)

---

## Rule 3: Hook order must not change

React relies on the fact that Hooks are called in the same order every render.

---

# 4. `useState` — Manage Component State

## 4.1 What it does

`useState` creates a piece of state in your component.

It returns:

* the current state value
* a setter function to update it

## 4.2 Basic example

```tsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(count + 1)
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}
```

---

## 4.3 Functional updates (avoid stale state)

If the next state depends on the previous state, use the functional setter form.

```tsx
setCount(prev => prev + 1)
```

This is especially important with async logic or intervals.

---

## 4.4 Multiple `useState` calls

You can keep separate state values:

```tsx
const [firstName, setFirstName] = useState('')
const [age, setAge] = useState(0)
```

---

## 4.5 Common mistakes

* Mutating state directly:

```tsx
stateValue = 10 // WRONG
```

* Updating state and immediately reading the new value in the same render.
State updates trigger re-render, but values update after render.

---

# 5. `useEffect` — Handle Side Effects

## 5.1 What it does

`useEffect` runs **after render**.
Use it for side effects like:

* API calls
* timers
* subscriptions
* manual DOM interactions

---

## 5.2 Basic syntax

```tsx
useEffect(() => {
  // side effect
}, [dependencies])
```

* No dependency array: runs after every render
* Empty array `[]`: runs once on mount
* With dependencies: runs when a dependency value changes

---

## 5.3 Example: fetch on mount

```tsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}
```

---

## 5.4 Example: dependency-driven refetch

When URL param changes or filter changes:

```tsx
useEffect(() => {
  // fetch based on filter or id
}, [filterText])
```

---

## 5.5 Cleanup function (avoid memory leaks)

If you create a timer or subscription, clean it up.

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

React will call cleanup:

* when the component unmounts
* before re-running the effect (when dependencies change)

---

## 5.6 Best practices for `useEffect`

* Keep effects small and focused
* Use the dependency array correctly
* Put cleanup where it belongs
* Prefer early returns for invalid states

---

# 6. `useRef` — Access DOM Elements and Keep Mutable Values

`useRef` gives you a stable reference that persists across renders.

It’s commonly used for:

* DOM references (focus, measure)
* storing mutable values without triggering re-render

---

## 6.1 DOM ref example: focus an input

```tsx
import { useRef, useEffect } from 'react'

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
    </div>
  )
}
```

---

## 6.2 Store mutable values (without re-render)

```tsx
const lastRequestId = useRef(0)

lastRequestId.current = newId
```

This is useful when you need a value but don’t want re-renders.

---

## 6.3 Common mistakes

* Using `useRef` when state should be used (ref changes do not re-render UI)
* Forgetting to type `useRef` when using DOM elements in TypeScript

---

# 7. `useContext` — Global Data Sharing

## 7.1 Why useContext

`useContext` avoids prop drilling when multiple components need the same data.

Instead of:

Parent -> Child -> Grandchild -> ... (props)

You store shared state in a Context provider.

---

## 7.2 Basic Context example

```tsx
import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}
```

---

## 7.3 When to use context

Good use cases:

* theme (light/dark)
* authentication state (logged in user)
* app-level settings

Not ideal for:

* large rapidly changing values (can cause many re-renders)
* complex derived state that changes very frequently

---

# 8. `useMemo` — Memoize Expensive Calculations

## 8.1 What it does

`useMemo` caches the result of a calculation until dependencies change.

It’s helpful when:

* calculation is expensive
* inputs change often, but result only changes sometimes

---

## 8.2 Example: expensive filter

```tsx
import { useMemo, useState } from 'react'

export default function MemoExample() {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    // pretend this is an expensive computation
    const items = Array.from({ length: 10000 }, (_, i) => ({ name: `Item ${i}` }))
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>Result count: {filteredItems.length}</p>
    </div>
  )
}
```

---

## 8.3 Common mistakes

* Using `useMemo` everywhere without measuring performance
* Putting unstable values in the dependency array (causes recalculation)

---

# 9. `useCallback` — Memoize Functions

## 9.1 What it does

`useCallback` returns a memoized function.

It helps when:

* you pass a function to child components
* child uses `React.memo` or depends on referential equality

---

## 9.2 Example: stable handler for memoized child

```tsx
import { useCallback, useState } from 'react'
import React from 'react'

const Child = React.memo(function Child({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click from child</button>
})

export default function CallbackParent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />
    </div>
  )
}
```

---

## 9.3 `useMemo` vs `useCallback`

* `useMemo` memoizes a **value**
* `useCallback` memoizes a **function**

They solve different problems, but are often used together.

---

# 9.4 Difference Between `useEffect`, `useMemo`, and `useCallback`

These three hooks are often confused because all of them accept a dependency array.
But they are used for very different goals.

## Quick idea

* `useEffect` -> run side-effect code after render
* `useMemo` -> cache a computed value
* `useCallback` -> cache a function reference

---

## 9.4.1 Side-by-side comparison table

| Hook | Primary purpose | Returns | When it runs/recomputes | Typical use case |
| --- | --- | --- | --- | --- |
| `useEffect` | Perform side effects | `undefined` (optionally cleanup function from callback) | After render, when dependencies change | API calls, timers, subscriptions, syncing with external systems |
| `useMemo` | Memoize computed value | Cached value | During render, recomputed only when dependencies change | Expensive filtering/sorting/calculation |
| `useCallback` | Memoize function identity | Cached function | During render, new function only when dependencies change | Stable callbacks for memoized children |

---

## 9.4.2 Mental model

Think like this:

* Need to **do something** outside render? -> `useEffect`
* Need to **calculate a value** efficiently? -> `useMemo`
* Need to **keep a callback stable** across renders? -> `useCallback`

---

## 9.4.3 Example A: `useEffect` (side effect)

```tsx
import { useEffect, useState } from 'react'

export default function UserLoader({ userId }: { userId: string }) {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadUser() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      const data = await res.json()
      if (!isCancelled) setUserName(data.name)
    }

    loadUser()

    return () => {
      isCancelled = true
    }
  }, [userId])

  return <p>User: {userName}</p>
}
```

Why `useEffect`?

* API call is a side effect (external operation)
* it depends on `userId`
* includes cleanup pattern

---

## 9.4.4 Example B: `useMemo` (memoized value)

```tsx
import { useMemo, useState } from 'react'

type Product = { id: number; name: string }

export default function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return products
    return products.filter(p => p.name.toLowerCase().includes(normalized))
  }, [products, query])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>Total: {filteredProducts.length}</p>
    </div>
  )
}
```

Why `useMemo`?

* `filteredProducts` is a derived value
* avoids recalculating filter when dependencies are unchanged

---

## 9.4.5 Example C: `useCallback` (memoized function)

```tsx
import React, { useCallback, useState } from 'react'

const SaveButton = React.memo(function SaveButton({
  onSave,
}: {
  onSave: () => void
}) {
  return <button onClick={onSave}>Save</button>
})

export default function Parent() {
  const [count, setCount] = useState(0)

  const handleSave = useCallback(() => {
    console.log('Saved')
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <SaveButton onSave={handleSave} />
    </div>
  )
}
```

Why `useCallback`?

* keeps `handleSave` reference stable
* helps `React.memo` child avoid unnecessary re-render caused by new function identity

---

## 9.4.6 Combined real-world pattern

You often use all three together:

* `useEffect` -> fetch raw data
* `useMemo` -> derive filtered/sorted data
* `useCallback` -> stable event handlers passed to child components

```tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type User = { id: number; name: string }

const UserList = React.memo(function UserList({
  users,
  onSelect,
}: {
  users: User[]
  onSelect: (id: number) => void
}) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <button onClick={() => onSelect(user.id)}>{user.name}</button>
        </li>
      ))}
    </ul>
  )
})

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase()
    return users.filter(user => user.name.toLowerCase().includes(q))
  }, [users, query])

  const handleSelectUser = useCallback((id: number) => {
    console.log('Selected user id:', id)
  }, [])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <UserList users={filteredUsers} onSelect={handleSelectUser} />
    </div>
  )
}
```

---

## 9.4.7 Common confusion and how to avoid it

* "I need to fetch data, should I use `useMemo`?" -> No, use `useEffect`
* "I need to optimize a computed list, should I use `useEffect`?" -> No, use `useMemo`
* "I pass a callback to a memoized child and child re-renders" -> use `useCallback`
* "Should I use all three everywhere?" -> No, only when needed

---

## 9.4.8 Decision checklist

Ask in this order:

1. Am I interacting with external systems (network, timer, subscriptions, DOM side effect)?
   * Yes -> `useEffect`
2. Am I computing a value that is expensive and can be reused?
   * Yes -> `useMemo`
3. Am I passing callbacks to memoized children and need stable references?
   * Yes -> `useCallback`

If none apply, plain variables and plain functions are usually enough.

---

# 10. `useReducer` — Complex State Management

## 10.1 What it does

`useReducer` is an alternative to `useState` when state transitions are complex.

It works with:

* `reducer` function (state + action -> new state)
* `dispatch` function (send actions)

---

## 10.2 Basic Counter with reducer

```tsx
import { useReducer } from 'react'

type State = { count: number }
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

export default function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

---

## 10.3 When to choose `useReducer`

Use `useReducer` when:

* state update logic is complicated
* many different actions exist
* you want a clean predictable state machine approach

---

# 11. Quick Comparison (All Core Hooks)

| Hook | Used for | Key idea |
| --- | --- | --- |
| `useState` | simple state | value + setter |
| `useEffect` | side effects | run after render |
| `useRef` | refs + mutable values | stable reference |
| `useContext` | shared data | avoid prop drilling |
| `useMemo` | memoized values | cache computed result |
| `useCallback` | memoized functions | stable function identity |
| `useReducer` | complex state | reducer + dispatch |

---

# 12. Common Mistakes Summary

* Breaking Hook rules (calling inside conditions/loops)
* Wrong dependency arrays in `useEffect`
* Using `useRef` for values that should be displayed (needs state)
* Overusing `useMemo`/`useCallback` without reason
* Overusing context for fast-changing values
* Building an overly complex reducer for simple state

---

# 13. Best Practices

✔ Keep components small and focused  
✔ Use `useState` first for simple state  
✔ Use `useEffect` for side effects only  
✔ Use cleanup in `useEffect` when needed  
✔ Use `useRef` for DOM access or mutable values  
✔ Use `useContext` when many components need the same data  
✔ Use memoization only for expensive work or referential equality needs  
✔ Use `useReducer` when updates become hard to manage with many `useState` hooks  

---

# 14. Practice / Exam Exercises

## Exercise 1: Counter + Effects

Create a component:

* uses `useState` for `count`
* uses `useEffect` to set the document title to `Clicked {count} times`
* add a cleanup example if you use a timer

Expected:

* title updates when count changes

---

## Exercise 2: Fetch + Loading + Cleanup

Build a component that:

* fetches data from an API in `useEffect`
* shows loading UI while waiting
* includes error handling
* cancels requests (use cleanup strategy like `AbortController`)

Expected:

* no setState after unmount

---

## Exercise 3: Focus with `useRef`

Create a form with:

* an input
* a button “Focus”
* clicking “Focus” focuses the input using `useRef`

Expected:

* input receives focus without page reload

---

## Exercise 4: Theme with `useContext`

Create:

* `ThemeProvider` with light/dark state
* a button to toggle theme
* at least two components that read theme using `useContext`

Expected:

* both components update when theme changes

---

## Exercise 5: Performance with `useMemo` and `useCallback`

Build a small product list:

* store a search query in `useState`
* use `useMemo` to compute filtered results
* create a memoized child component that receives a handler
* use `useCallback` for the handler

Expected:

* filtering updates correctly
* child does not re-render unnecessarily (explain why)

---

## Exercise 6: Shopping Cart with `useReducer`

Implement a reducer with actions:

* add item
* remove item
* increase quantity
* decrease quantity

Expected:

* predictable state transitions using `dispatch`

---

# End of Lesson

