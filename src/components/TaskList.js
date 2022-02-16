import './TaskList.css'

export default function TaskList({ tasks }) {
  return (
    <div>
      {tasks.length === 0 && <p>No tasks yet!</p>}
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  )
}