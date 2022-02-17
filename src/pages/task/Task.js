import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Task.css'
import TaskComments from './TaskComments'
import TaskSummary from './TaskSummary'

export default function Task() {
  const { id } = useParams()
  const { error, document } = useDocument('tasks', id)

  if (error) {
    return <div className='error'>{error}</div>
  }
  if (!document) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='task-details'>
      <TaskSummary task={document} />
      <TaskComments />
    </div>
  )
}