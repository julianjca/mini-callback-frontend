import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
