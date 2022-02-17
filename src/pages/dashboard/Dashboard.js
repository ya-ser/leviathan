import TaskList from '../../components/TaskList'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import TaskFilter from './TaskFilter'
import { useState } from 'react'


export default function Dashboard() {
  const { documents, error } = useCollection('tasks')
  const [currentFilter, setCurrentFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <TaskFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
      )}
      {documents && <TaskList tasks={documents} />}
    </div>
  )
}

