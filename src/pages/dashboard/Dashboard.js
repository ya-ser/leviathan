import TaskList from '../../components/TaskList'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'
import TaskFilter from './TaskFilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('tasks')
  const [currentFilter, setCurrentFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const tasks = documents ? documents.filter((document) => {
    switch(currentFilter) {
      case 'all':
        return true
      case 'assigned':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if(user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <TaskFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
      )}
      {tasks && <TaskList tasks={tasks} />}
    </div>
  )
}

