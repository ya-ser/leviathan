import TaskList from '../../components/TaskList'
import { useCollection } from '../../hooks/useCollection'
import './Dashboard.css'


export default function Dashboard() {
  const { documents, error} = useCollection('tasks')


  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <TaskList tasks={documents} />}
    </div>
  )
}

