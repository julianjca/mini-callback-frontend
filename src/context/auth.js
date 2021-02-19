import React, { useEffect, createContext, useReducer } from 'react'
import cookie from 'react-cookies'
import axios from 'axios'

import { SET_LOGIN_STATE, SET_USER } from '../constants'

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

    default:
      console.log('error')
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    user: null,
  })

  useEffect(() => {
    const cookies = cookie.load('userToken')
    const doAuth = async () => {
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
