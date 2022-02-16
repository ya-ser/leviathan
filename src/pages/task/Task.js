import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Task.css'

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
      <h1>{document.name}</h1>
    </div>
  )
}