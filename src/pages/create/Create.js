import { useState } from 'react'
import './Create.css'


export default function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  // category test
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate)
  }


  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task name:</span>
          <input 
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            value={name}
          />
        </label>
        <label>
          <span>Task details:</span>
          <textarea
            required 
            type="text" 
            onChange={(e) => setDetails(e.target.value)} 
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          // this is a category test
          <span>Task category:</span>
          {/* category select */}
        </label>
        <label>
          <span>Assign to:</span>
          {/* assignee select */}
        </label>

        <button className='btn'>Add Task</button>
      </form>
    
    </div>
  )
}
