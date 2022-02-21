import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'
import {useAuthContext} from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import snake from '../assets/snake.svg'
import signout from '../assets/signout.svg'

export default function Sidebar() {
const { logout, isPending } = useLogout()
const {user} = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className='user'>
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}</p>
        </div>
        <nav className='links' >
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Task</span>
              </NavLink>
            </li>
            <li className='logout'>

                <NavLink exact to="/login">
                  <img src={signout} alt="signout" />
                  <span>Sign Out</span>
                </NavLink>

                {/* // <li>
                //   {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                //   {isPending && <img src={snake} className="snake" alt='snake' />}
                // </li> */}

            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}