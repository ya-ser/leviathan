import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import leviathan from './assets/leviathan.jpeg'
import arrow from './assets/arrow.svg'
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

import ChatBox from './Chat.js'
import { useState } from 'react'

function App() {
  const { user, authIsReady } = useAuthContext()
  const [myChat, setMyChat] = useState(false)

  //let showChat = true;
  function hideChat() {
    if (myChat === false) {
      setMyChat(true)
    }
    if(myChat === true) {
      setMyChat(false)
    }
  }

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
          {user && myChat && <ChatBox />}
          {user && <button className='show-chat' onClick={hideChat}>◀</button>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App