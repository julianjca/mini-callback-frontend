import React from 'react'
import { Box, Center, Container, Heading, Stack, Input, FormControl, FormLabel, Button } from "@chakra-ui/react"

const Register = () => {
  return (
    <Container>
      <Center>
        <Heading>
          Register
        </Heading>
      </Center>
      <Center mt={10}>
        <Stack spacing={5}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input width={300} type="text" isFullWidth placeholder="John" size="md" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input width={300} type="email" isFullWidth placeholder="john@mail.com" size="md" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input width={300} type="password" isFullWidth placeholder="Enter your password" size="md" />
          </FormControl>
          <Button size="md" width={300} colorScheme="blue">
            Sign up
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default Register