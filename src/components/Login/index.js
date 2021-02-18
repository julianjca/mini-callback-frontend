import React from 'react'
import { Box, Center, Container, Heading, Stack, Input, FormControl, FormLabel, Button } from "@chakra-ui/react"

const LogIn = () => {
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
            <Input width={300} type="email" placeholder="john@mail.com" size="md" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input width={300} type="password" placeholder="Enter your password" size="md" />
          </FormControl>
          <Button size="md" width={300} colorScheme="blue">
            Log in
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default LogIn