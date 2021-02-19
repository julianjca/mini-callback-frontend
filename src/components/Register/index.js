import React, { useState } from 'react'
import axios from 'axios'
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

const Register = ({ setRenderRegisterPage }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    await axios.post('http://localhost:3030/users', {
      name,
      password,
      email,
    })
    setRenderRegisterPage(false)
  }

  return (
    <Container>
      <Center>
        <Heading>Register</Heading>
      </Center>
      <Center mt={10}>
        <Stack spacing={5}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              width={300}
              type="text"
              placeholder="John"
              size="md"
              onChange={e => setName(e.target.value)}
              data-testid="name-input"
            />
          </FormControl>
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
          <Button onClick={handleSubmit} size="md" width={300} colorScheme="blue">
            Sign up
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default Register
