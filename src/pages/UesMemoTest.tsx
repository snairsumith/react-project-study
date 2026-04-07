import { useMemo, useState } from 'react'

export default function MemoExample() {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    // pretend this is an expensive computation
    const items = Array.from({ length: 100 }, (_, i) => ({ name: `Item ${i}` }))
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder='Search' />
      <p>Result count: {filteredItems.length}</p>
      <ul>
        {filteredItems.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}