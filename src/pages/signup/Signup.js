import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link } from 'react-router-dom'

// styles
import './Signup.css'
import snake from '../../assets/snake.svg'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)
    // if file is not selected
    if (!selected) {
      setThumbnailError('Please choose a file')
      return
    }
    // if file selected is not an image
    if (!selected.type.includes('image')) {
      setThumbnailError('Select an image file')
      return
    }
    // if selected image is too large
    if (selected.size > 5000000) {
      setThumbnailError('File size too large. File size must be less than 5MB')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated');

  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1 className='title-form'>Register</h1>
      <div className='field'>
        <label>
          <input className='login-fields'
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
          />
        </label>
        <label>
          <input className='login-fields'
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
          />
        </label>
        <label>
          <input className='login-fields'
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder="Username"
          />
        </label>
        <label>
          <span>Profile thumbnail:</span>
          <input
            required
            type="file"
            onChange={handleFileChange}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
      </div>
      {!isPending && <button className="reg-btn">Sign up</button>}
      {isPending && <img src={snake} className="snake" alt='snake' />}
      {error && <div className="error">{error}</div>}
      <label className='signup-action'>
        Have an account? <Link to="/login">Log in</Link>
      </label>
    </form>
  )
}