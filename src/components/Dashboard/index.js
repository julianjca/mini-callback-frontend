import React from 'react'
import { Flex, Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

const Dashboard = ({ callbacks }) => {
  return (
    <Box pt={20} pb={20}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading>Dashboard</Heading>
        </Box>
        <Box>
          <Button onClick={() => console.log('log out')} size="lg" width={200} colorScheme="blue">
            Log out
          </Button>
        </Box>
      </Flex>
      <Table mt={20} variant="simple">
        <Thead>
          <Tr>
            <Th>Callback ID</Th>
            <Th>Transaction ID</Th>
            <Th>Virtual Account</Th>
            <Th>Bank Code</Th>
            <Th>Detail</Th>
          </Tr>
        </Thead>
        {callbacks.map(callback => (
          <Tbody key={callback.id}>
            <Tr>
              <Td>{callback.id}</Td>
              <Td>{callback.transaction_id}</Td>
              <Td>{callback.virtual_account}</Td>
              <Td>{callback.bank_code}</Td>
              <Td>
                <Button size="sm">See detail</Button>
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </Box>
  )
}

export default Dashboard
