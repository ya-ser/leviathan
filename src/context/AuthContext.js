// context api: gives us a central place of shared data used to pass down and consume data in our components without needing to pass props to components that don't need it
// useReducer: makes it earier to work with similar related states that can be updated in different ways
import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

// create a context to store a global user state; it will cause a rerender of any node that uses this context when it changes
export const AuthContext = createContext()

// authReducer updates our state dependent on different dispatch actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    // first action that occurs when we first connect to firebase auth to see if user is signed in or not
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

// 
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })
// dispatch takes in obj as arg, called action and contains 2 props: type + payload, type describes the state change and payload contains the change we want to make 
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}