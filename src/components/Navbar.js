import './Navbar.css'
// logo import from assets folder goes here
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar' >
      <ul>
        <li className="logo">
          <img src= {logo} alt="leviathan logo" />
        </li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li>
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </div>
  )
}

