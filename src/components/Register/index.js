import React, { useState } from 'react'
import axios from 'axios'
import { Center, Container, Heading, Stack, Input, FormControl, FormLabel, Button, Select } from "@chakra-ui/react"

const Register = ({ businesses }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')

  const handleSubmit = async () => {
    await axios.post('http://localhost:3030/users', {
      name,
      password,
      email,
      businessId: business,
    })

    console.log('registered!')
  }

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
            <Input 
              value={name}  
              width={300} 
              type="text" 
              placeholder="John" 
              size="md" 
              onChange={e => setName(e.target.value)}
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
          <FormControl id="business">
            <FormLabel>Business</FormLabel>
            <Select onChange={(e) => setBusiness(e.target.value)} placeholder="Select business">
              {
                businesses.map(business => (
                  <option key={business.id} value={business.id}>{business.businessName}</option>
                ))
              }
            </Select>
          </FormControl>
          <Button 
            onClick={handleSubmit} 
            size="md" 
            width={300}  
            colorScheme="blue"
          >
            Sign up
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}

export default Register