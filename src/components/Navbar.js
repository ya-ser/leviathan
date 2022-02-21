import './Navbar.css'
// logo import from assets folder goes here
import logo from '../assets/logo.svg'


import React from 'react'



export default function Navbar() {

  // const { logout, isPending } = useLogout()
 

  return (
    <div className='navbar' >
      {/* <ul> */}
      <div className='logo'>
        <img src={logo} alt="leviathan logo" />
      </div>
        {/* <li className="logo">
        </li> */}

        {/* {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )} */}

        {/* {user && (

          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <img src={snake} className="snake" alt='snake' />}
          </li>

        )} */}

      {/* </ul> */}
    </div>
  )
}

