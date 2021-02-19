import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ClipLoader from 'react-spinners/ClipLoader'
import { Center } from '@chakra-ui/react'

import { useAuthState } from '../../context/auth'

const Auth = ({ children }) => {
  const state = useAuthState()
  const router = useRouter()

  useEffect(() => {
    if (!state.isAuthenticating && !state.user && !state.isLoggedIn) {
      router.push('/', '/', { shallow: true })
    }
  }, [state, router])

  if (state.isAuthenticating) {
    return (
      <Center height="100vh">
        <ClipLoader color="#1c1c1c" loading={true} size={20} />
      </Center>
    )
  }
  if (!state.isAuthenticating && state.isLoggedIn && state.user) {
    return children
  }
}

export default Auth
