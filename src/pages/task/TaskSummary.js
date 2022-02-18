import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { timestamp } from '../../firebase/config'

export default function TaskSummary({ task }) {
  const { deleteDocument } = useFirestore('tasks')
  const { updateDocument, response } = useFirestore('tasks')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = (e) => {
    deleteDocument(task.id)
    history.push('/')
    console.log(task)
  }

  const handleClickTwo = async (e) => {
    e.preventDefault();

    await updateDocument(task.id, {
      completedDate: timestamp.now(new Date())
    })
    if (!response.error) {
      history.push('/')
      console.log(task)
    }
    //timestamp the completed time
    //add to task obj in firestore database
    //change appearance
  }

  const isAssigned = (tasks, userid) => {
    for(let task of tasks) {
      if (task.id === userid) {
        return true
      }
    }
    return false
  }

  return (
    <div>
      <div className="task-summary" >
        <h1 className="page-title">{task.name}</h1>
        <p>By {task.createdBy.displayName}</p>
        <p className="'due-date">
          Task due by {task.dueDate.toDate().toDateString()}
        </p>
        {task.completedDate && <p className="'due-date">
          Completed {task.completedDate.toDate().toDateString()}
        </p>}
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
          <button className='btn' onClick={handleClick}>Delete</button>
        )}
        {!task.completedDate && isAssigned(task.assignedUsersList, user.uid) && (
          <button className='btn' onClick={handleClickTwo}>Mark as Complete</button>
        )}
      
    </div>
  )
}