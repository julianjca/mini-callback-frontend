import React from 'react'
import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import axios from 'axios'
import cookies from 'next-cookies'

import Auth from '../../components/Auth'
import SendCallback from '../../components/SendCallback'

export default function CallbackDetailPage({ businesses }) {
  return (
    <Box>
      <Head>
        <title>Callback UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={1400}>
        <Auth>
          <SendCallback businesses={businesses} />
        </Auth>
      </Container>
    </Box>
  )
}

export async function getServerSideProps(ctx) {
  const allCookies = cookies(ctx)

  if (!allCookies.userToken) {
    return {
      props: {
        callbacks: null,
      },
    }
  }

  const res = await axios.get(`http://localhost:3030/businesses`, {
    headers: {
      Authorization: `Bearer ${allCookies.userToken}`,
    },
  })

  return {
    props: {
      businesses: res.data.businesses,
    },
  }
}
