# React Hooks Teaching Notes

## Side Effects and `useEffect`

---

# 1. What are Side Effects?

In React, **Side Effects** are operations that interact with things **outside the React component**.

Normally, React components should only **render UI based on state and props**.
But sometimes we need to perform additional tasks like:

* Fetching data from an API
* Subscribing to events
* Updating the DOM manually
* Setting timers
* Logging data
* Accessing browser storage (localStorage)

These operations are called **Side Effects** because they affect something **outside the component's rendering process**.

---

# 2. Examples of Side Effects

| Operation        | Example                      |
| ---------------- | ---------------------------- |
| API Call         | Fetch user data from server  |
| Subscription     | Listen to WebSocket messages |
| DOM Manipulation | Focus an input field         |
| Timers           | `setTimeout` / `setInterval` |
| Local Storage    | Save user settings           |

---

# 3. `useEffect` Hook

React provides the **`useEffect` hook** to handle side effects.

It allows us to run code **after the component renders**.

### Syntax

```javascript
useEffect(() => {
   // side effect code
}, [dependencies]);
```

**Parameters**

| Parameter        | Description                   |
| ---------------- | ----------------------------- |
| Effect Function  | Contains the side effect code |
| Dependency Array | Controls when the effect runs |

---

# 4. When `useEffect` Runs

`useEffect` runs **after the component renders**.

Behavior depends on the **dependency array**.

| Dependency Array    | Behavior                        |
| ------------------- | ------------------------------- |
| No dependency array | Runs after every render         |
| Empty array `[]`    | Runs once when component mounts |
| `[value]`           | Runs whenever the value changes |

---

# 5. Example – API Call

Fetching data from an API when the component loads.

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>

      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

    </div>
  );
}

export default Users;
```

### Explanation

1. Component loads
2. `useEffect` runs
3. API is called
4. Data is stored in state
5. UI updates automatically

---

# 6. Dependency Array

The **dependency array** controls **when the effect runs again**.

### Example

```javascript
import { useEffect, useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

    </div>
  );
}

export default Counter;
```

### Explanation

* The effect runs **every time `count` changes**
* React checks dependency values
* If the value changes → effect runs again

---

# 7. `useEffect` Without Dependency Array

If no dependency array is provided, the effect runs **after every render**.

```javascript
useEffect(() => {
   console.log("Component rendered");
});
```

⚠ This can cause **performance issues** if not used carefully.

---

# 8. Cleanup Function

Sometimes we need to **clean up side effects** to prevent memory leaks.

Examples:

* Removing event listeners
* Clearing timers
* Unsubscribing from services

React allows a **cleanup function** inside `useEffect`.

### Syntax

```javascript
useEffect(() => {

   // side effect code

   return () => {
      // cleanup code
   };

}, []);
```

---

# 9. Example – Timer Cleanup

```javascript
import { useEffect, useState } from "react";

function Timer() {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer cleaned up");
    };

  }, []);

  return <h2>Seconds: {seconds}</h2>;
}

export default Timer;
```

### Explanation

1. `setInterval` starts a timer
2. When component **unmounts**, cleanup runs
3. `clearInterval` stops the timer
4. Prevents **memory leaks**

---

# 10. Example – Event Listener Cleanup

```javascript
import { useEffect } from "react";

function WindowSize() {

  useEffect(() => {

    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return <h2>Resize the window</h2>;
}

export default WindowSize;
```

---

# 11. Real Example – Update Page Title

```javascript
import { useEffect, useState } from "react";

function PageTitle() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}

export default PageTitle;
```

---

# 12. Best Practices for `useEffect`

✔ Keep effects **small and focused**

✔ Always include **correct dependencies**

✔ Use **cleanup functions** for timers, listeners, and subscriptions

✔ Avoid unnecessary effects

✔ Split multiple concerns into **multiple `useEffect` hooks**

Example:

```javascript
useEffect(() => {
   // API call
}, []);

useEffect(() => {
   // event listener
}, []);
```

---

# 13. Summary

| Concept          | Description                        |
| ---------------- | ---------------------------------- |
| Side Effects     | Operations outside React rendering |
| useEffect        | Hook used to handle side effects   |
| Dependency Array | Controls when effect runs          |
| Cleanup Function | Prevents memory leaks              |

---

# 14. Quick Example

```javascript
useEffect(() => {

  console.log("Component mounted");

  return () => {
    console.log("Component unmounted");
  };

}, []);
```

---

# 15. Common Real-World Uses

Developers commonly use `useEffect` for:

* Fetching API data
* Listening to WebSocket messages
* Handling timers
* Updating document title
* Tracking analytics
* Subscribing to events
* Managing DOM interactions

---

# End of Lesson
