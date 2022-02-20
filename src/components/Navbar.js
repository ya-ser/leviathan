import './Navbar.css'
// logo import from assets folder goes here
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'
import snake from '../assets/snake.svg'


export default function Navbar() {

  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar' >
      <ul>
        <li className="logo">
          <img src={logo} alt="leviathan logo" />
        </li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {/* {user && (

          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <img src={snake} className="snake" alt='snake' />}
          </li>

        )} */}

      </ul>
    </div>
  )
}

