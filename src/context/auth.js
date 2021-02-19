import React, { useEffect, createContext, useReducer } from 'react'
import cookie from 'react-cookies'
import axios from 'axios'

import { SET_LOGIN_STATE, SET_USER, SET_AUTHENTICATING, DO_LOGOUT } from '../constants'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE: {
      return { ...state, isLoggedIn: action.isLoggedIn }
    }

    case SET_USER: {
      return { ...state, user: action.user }
    }

    case SET_AUTHENTICATING: {
      return { ...state, isAuthenticating: action.isAuthenticating }
    }

    case DO_LOGOUT: {
      cookie.remove('userToken')
      return { ...state, isAuthenticating: false, user: null, isLoggedIn: false }
    }

    default:
      console.log('error')
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    user: null,
    isAuthenticating: true,
  })

  useEffect(() => {
    const cookies = cookie.load('userToken')
    const doAuth = async () => {
      dispatch({
        type: SET_AUTHENTICATING,
        isAuthenticating: true,
      })

      const res = await axios.get('http://localhost:3030/users/authenticate', {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })

      dispatch({
        type: SET_USER,
        user: res.data.user,
      })
      dispatch({
        type: SET_LOGIN_STATE,
        isLoggedIn: true,
      })
      dispatch({
        type: SET_AUTHENTICATING,
        isAuthenticating: false,
      })
    }
    if (typeof window !== undefined) {
      if (cookies) {
        doAuth()
      } else {
        cookie.remove('userToken')
        dispatch({
          type: SET_USER,
          user: null,
        })
        dispatch({
          type: SET_LOGIN_STATE,
          isLoggedIn: false,
        })
        dispatch({
          type: SET_AUTHENTICATING,
          isAuthenticating: false,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

const useAuthState = () => {
  const context = React.useContext(AuthStateContext)

  return context
}

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext)

  return context
}

export { AuthProvider, useAuthState, useAuthDispatch }
