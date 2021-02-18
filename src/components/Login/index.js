import React, { useState } from 'react'
import axios from 'axios'

import { Center, Container, Heading, Stack, Input, FormControl, FormLabel, Button } from "@chakra-ui/react"

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async () => {
    const res = await axios.post(`http://localhost:3030/users/login`, {
      email,
      password,
    })
    console.log('logged in!')
  }

  return (
    <Container>
      <Center>
        <Heading>
          Welcome
        </Heading>
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
            />
          </FormControl>
          <Button 
            onClick={submitForm} 
            size="md" width={300}
            colorScheme="blue"
          >
            Log in
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default LogIn