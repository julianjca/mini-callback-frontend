import React, { useState } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'

import {
  Center,
  Container,
  Heading,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthDispatch } from '../../context/auth'
import { SET_AUTHENTICATING, SET_LOGIN_STATE, SET_USER } from '../../constants'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const dispatch = useAuthDispatch()

  const submitForm = async () => {
    const res = await axios.post(`http://localhost:3030/users/login`, {
      email,
      password,
    })
    cookie.save('userToken', res.data.accessToken)

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
    router.push('/dashboard')
  }

  return (
    <Container>
      <Center>
        <Heading>Welcome</Heading>
      </Center>
      <Center mt={10}>
        <Stack spacing={5}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              width={300}
              type="email"
              placeholder="john@mail.com"
              size="md"
              onChange={e => setEmail(e.target.value)}
              data-testid="email-input"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              width={300}
              type="password"
              placeholder="Enter your password"
              size="md"
              onChange={e => setPassword(e.target.value)}
              data-testid="password-input"
            />
          </FormControl>
          <Button onClick={submitForm} size="md" width={300} colorScheme="blue">
            Log in
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default LogIn
