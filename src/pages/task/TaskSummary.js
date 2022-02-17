import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'

export default function TaskSummary({ task }) {
  const { deleteDocument } = useFirestore('tasks')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = (e) => {
    deleteDocument(task.id)
    history.push('/')
  }
  return (
    <div>
      <div className="task-summary" >
        <h2 className="page-title">{task.name}</h2>
        <p>By {task.createdBy.displayName}</p>
        <p className="'due-date">
          Task due by {task.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {task.details}
        </p>
        <h4>Task is assigned to:</h4>
        <div className='assigned-users'>
          {task.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
        ))}
        </div>
      </div>
        {user.uid === task.createdBy.id && (
          <button className='btn' onClick={handleClick}>Mark as Complete</button>
        )}
        {/* {user.uid === task.assignedUsersList.id && (
          <button className='btn' onClick={handleClick}>Mark as Complete</button>
        )} */}
    </div>
  )
}