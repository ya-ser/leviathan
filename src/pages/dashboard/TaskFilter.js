import { useState } from "react"

const filterList = ['all', 'mine', 'development', 'design']

export default function TaskFilter() {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (newFilter) => {
    console.log(newFilter)
    setCurrentFilter(newFilter)
  }

  return (
    <div className="task-filter">
    <p>Filter by:</p>
      <nav>
        {filterList.map((f) => (
          <button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  )
}