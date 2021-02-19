import React from 'react'
import {
  Flex,
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthDispatch } from '../../context/auth'
import { DO_LOGOUT } from '../../constants'
import { mapColorScheme } from '../../lib'

const Dashboard = ({ callbacks }) => {
  const router = useRouter()
  const dispatch = useAuthDispatch()

  return (
    <Box pt={20} pb={20}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box
          onClick={() => router.push('/dashboard', '/dashboard', { shallow: true })}
          cursor="pointer"
        >
          <Heading>Callback UI</Heading>
        </Box>
        <Box>
          <Button
            onClick={() => dispatch({ type: DO_LOGOUT })}
            size="lg"
            width={200}
            colorScheme="blue"
          >
            Log out
          </Button>
        </Box>
      </Flex>
      <Box mt={30}>
        <Button
          onClick={() => router.push('/callbacks/send', '/callbacks/send', { shallow: true })}
        >
          Send callback
        </Button>
      </Box>
      <Table mt={10} variant="simple">
        <Thead>
          <Tr>
            <Th>Callback ID</Th>
            <Th>Transaction ID</Th>
            <Th>Virtual Account</Th>
            <Th>Bank Code</Th>
            <Th>Status</Th>
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
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={mapColorScheme(callback.callbackResponseCode)}
                >
                  {callback.callbackResponseCode}
                </Badge>
              </Td>
              <Td>
                <Button
                  onClick={() =>
                    router.push('/callbacks/[id]', `/callbacks/${callback.id}`, { shallow: true })
                  }
                  size="sm"
                >
                  See detail
                </Button>
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </Box>
  )
}

export default Dashboard
