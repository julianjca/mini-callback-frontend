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

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars

  const submitForm = async () => {
    const res = await axios.post(`http://localhost:3030/users/login`, {
      email,
      password,
    })
    cookie.save('userToken', res.data.accessToken)
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
