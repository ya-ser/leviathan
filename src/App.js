import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import leviathan from './assets/leviathan.jpeg'

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Task from './pages/task/Task'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

import ChatBox from './ChatComponent-1.js'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='nav'>
            <div className="container">
              <Navbar />
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/tasks/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Task />}
                </Route>
                <Route path="/login">
                  <div className='parent'>
                    {!user && <Login />}
                    <img src={leviathan} className='login-leviathan' alt='leviathan' />
                    {user && <Redirect to="/" />}
                  </div>
                </Route>
                <Route path="/signup">
                  <div className='parent'>
                    {!user && <Signup />}
                    <img src={leviathan} className='login-leviathan' alt='leviathan' />
                    {user && <Redirect to="/" />}
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
          {user && <OnlineUsers />}
          {user && <ChatBox />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App