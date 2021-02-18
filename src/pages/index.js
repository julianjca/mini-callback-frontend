import React from 'react'
import Head from 'next/head'
import { Box, Center, Text, Link } from "@chakra-ui/react"

import LogIn from '../components/Login'
import Register from '../components/Register'
import axios from 'axios'

export default function Home({ businesses }) {
  const [renderRegisterPage, setRenderRegisterPage] = React.useState(false)
  return (
    <Box pt={20} pb={20}>
      <Head>
        <title>Callback UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderRegisterPage ? (
        <>
          <Register businesses={businesses} />
          <Center mt={10}>
            <Text>
             Have an account?{" "}
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
              Don't have an account yet?{" "}
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

export async function getServerSideProps() {
  const response = await axios('http://localhost:3030/businesses')
  return {
    props: {
      businesses: response.data.businesses
    },
  }
}