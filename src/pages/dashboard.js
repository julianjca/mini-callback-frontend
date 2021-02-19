import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Center, Heading } from '@chakra-ui/react'

import { useAuthState } from '../context/auth'

export default function Home() {
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
      <Center>
        <Heading>Dashboard</Heading>
      </Center>
    </Box>
  )
}
