import { useState, useEffect } from 'react'
import './Create.css'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' }
]


export default function Create() {
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  
  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value, assignedUsers)
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
          <span>Task category:</span>
          <Select 
            onChange={(option) => setCategory(option) }
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className='btn'>Add Task</button>
      </form>
    
    </div>
  )
}
