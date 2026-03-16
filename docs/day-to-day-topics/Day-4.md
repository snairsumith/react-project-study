# 10. Data Fetching in React

---

# 1. Introduction

Most modern applications need to **retrieve data from external sources** such as:

* REST APIs
* Databases
* Backend servers
* Third-party services

In React, **data fetching is usually performed when a component mounts**.

The most common approach is using:

* `useEffect`
* `fetch` API
* `axios` library

---

# 2. Fetching Data When Component Mounts

To fetch data when a component loads, we use **`useEffect` with an empty dependency array (`[]`)**.

This ensures the API call runs **only once when the component mounts**.

---

## Example – Using `fetch`

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
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

---

## Explanation

1. Component loads
2. `useEffect` runs
3. API is called
4. Data is stored in state
5. UI automatically updates

---

# 3. Fetching Data Using Axios

`axios` is a popular HTTP client that simplifies API calls.

---

## Install Axios

```bash
npm install axios
```

---

## Example – Using Axios

```javascript
import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsers(response.data);
      });

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

---

# 4. Handling Loading State

While data is being fetched, it is good practice to show a **loading indicator**.

---

## Example – Loading State

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>User List</h2>

      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

    </div>
  );
}
```

---

# 5. Handling Error State

API calls can fail due to:

* Network issues
* Server errors
* Invalid responses

It is important to **handle errors properly**.

---

## Example – Error Handling

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch users");
        setLoading(false);
      });

  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>User List</h2>

      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

    </div>
  );
}
```

---

# 6. Displaying Fetched Data

Once the data is received, we display it using **JavaScript array methods like `map()`**.

Example:

```javascript
{users.map(user => (
  <p key={user.id}>{user.name}</p>
))}
```

---

# 7. Using Async/Await (Cleaner Syntax)

Using `async/await` makes the code easier to read.

---

## Example

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    async function fetchUsers() {

      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();

      setUsers(data);
    }

    fetchUsers();

  }, []);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

---

# 8. Avoid Fetching Data in Render

❌ Incorrect approach:

```javascript
function Users() {

  const data = fetch("/api/users");

  return <div>{data}</div>;
}
```

This causes **multiple API calls on every render**.

✔ Correct approach: use `useEffect`.

---

# 9. Handling Component Unmount

If a component unmounts before the request finishes, it may cause **memory leaks or errors**.

---

## Example – Cleanup with AbortController

```javascript
import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      });

    return () => {
      controller.abort();
    };

  }, []);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

---

# 10. Best Practices for Data Fetching

✔ Fetch data inside `useEffect`

✔ Always handle **loading state**

✔ Always handle **error state**

✔ Avoid API calls inside render

✔ Cancel requests when component unmounts

✔ Use `async/await` for readability

✔ Use libraries like **React Query or SWR** for complex apps

---

# 11. Real World Example – Dashboard API

Typical dashboard flow:

1. Component mounts
2. API call triggered
3. Show loading spinner
4. Data received
5. Render UI
6. Handle errors if request fails

---

# 12. Summary

| Concept       | Description                             |
| ------------- | --------------------------------------- |
| Data Fetching | Getting data from an API                |
| useEffect     | Runs the API call when component mounts |
| Loading State | Shows loading indicator                 |
| Error State   | Handles API errors                      |
| Cleanup       | Prevents memory leaks                   |

---

# 13. Practice Exercise

Students should build:

### Exercise 1

Fetch and display **users from API**

API:

```
https://jsonplaceholder.typicode.com/users
```

Display:

* Name
* Email
* Company

---

### Exercise 2

Create a **Post Viewer**

API:

```
https://jsonplaceholder.typicode.com/posts
```

Display:

* Post Title
* Post Body

---

# End of Lesson
