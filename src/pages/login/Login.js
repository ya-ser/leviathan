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
      </div>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <img src={snake} className="snake" alt='snake' />}
      {error && <div className="error">{error}</div>}
      <label className='signup-action'>
        Don't have an account yet? <Link to="/signup">Sign up</Link>
      </label>
    </form>
  )
}