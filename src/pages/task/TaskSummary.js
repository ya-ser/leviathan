import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'
import { timestamp } from '../../firebase/config'
import '../dashboard/Dashboard.css'

export default function TaskSummary({ task }) {
  const { deleteDocument } = useFirestore('tasks')
  const { updateDocument, response } = useFirestore('tasks')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = (e) => {
    deleteDocument(task.id)
    history.push('/')
  }

  const handleClickTwo = async (e) => {
    e.preventDefault();

    await updateDocument(task.id, {
      completedDate: timestamp.now(new Date())
    })
    if (!response.error) {
      history.push('/')
    }
  }


  const handleClickIncomplete = async (e) => {
    e.preventDefault();
    
    await updateDocument(task.id, {
      completedDate: null
    })
    if (!response.error) {
      history.push('/') //redirect user to dashboard if no error
    }
  }

  // onClick for 'add' input to assign task to self
  // task is updated to show new user added
  // only users not assigned to add themselves

  const handleClickAdd = async (e) => {
    e.preventDefault()

    const assignSelf = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    await updateDocument(task.id, {
      assignedUsersList: [...task.assignedUsersList, assignSelf],
    })
    if (!response.error) {
      history.push('/') //redirect user to dashboard if no error
    }
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
              <Avatar  src={user.photoURL} />
            </div>
        ))}
        {!task.completedDate && !isAssigned(task.assignedUsersList, user.uid) && (<button className='add' onClick={handleClickAdd}>+</button>
        )}
        </div>
      </div>
      
        {user.uid === task.createdBy.id && (
          <button className='btn' onClick={handleClick}>Delete</button>
        )}
        {!task.completedDate && isAssigned(task.assignedUsersList, user.uid) && (
          <button className='btn' onClick={handleClickTwo}>Mark as Complete</button>
        )}
        {task.completedDate && isAssigned(task.assignedUsersList, user.uid) && (
          <button className='btn' onClick={handleClickIncomplete}>Mark as Incomplete</button>
        )}
      
    </div>
  )
}