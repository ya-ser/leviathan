

const filterList = ['all', 'assigned', 'development', 'design']

export default function TaskFilter({ currentFilter, changeFilter }) {
  

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
    
  }

  return (
    <div className="task-filter">
      <nav>
      <p>Filter by:</p>
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