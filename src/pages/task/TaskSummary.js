
import Avatar from '../../components/Avatar'


export default function TaskSummary({ task }) {
  return (
    <div>
      <div className="task-summary" >
        <h2 className="page-title">{task.name}</h2>
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

    </div>
  )
}