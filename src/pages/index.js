import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Center, Text, Link } from '@chakra-ui/react'

import LogIn from '../components/Login'
import Register from '../components/Register'
import { useAuthState } from '../context/auth'

export default function Home() {
  const [renderRegisterPage, setRenderRegisterPage] = React.useState(false)
  const state = useAuthState()

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      Router.push('/dashboard', '/dashboard', { shallow: true })
    }
  }, [state])

  return (
    <Box pt={20} pb={20}>
      <Head>
        <title>Callback UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderRegisterPage ? (
        <>
          <Register setRenderRegisterPage={setRenderRegisterPage} />
          <Center mt={10}>
            <Text>
              Have an account?{' '}
              <Link onClick={() => setRenderRegisterPage(false)} colorScheme="blue" color="blue">
                login instead.
              </Link>
            </Text>
          </Center>
        </>
      ) : (
        <>
          <LogIn />
          <Center mt={10}>
            <Text>
              Don't have an account yet?{' '}
              <Link onClick={() => setRenderRegisterPage(true)} colorScheme="blue" color="blue">
                create one
              </Link>
            </Text>
          </Center>
        </>
      )}
    </Box>
  )
}
