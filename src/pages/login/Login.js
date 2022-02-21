import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Login.css'
import snake from '../../assets/snake.svg'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  // add useLogin hook
  // extract isPending
  // update online prop of 
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <img src={snake} className="snake" alt='snake' />}
      {error && <div className="error">{error}</div>}
      <span className='sign-action'>
        Need an account?<Link to="/signup">Sign up</Link>
      </span>
    </form>
  )
}