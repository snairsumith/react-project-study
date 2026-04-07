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