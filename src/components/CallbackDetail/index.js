import React from 'react'
import { Flex, Box, Button, Heading, Badge, Text, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAuthDispatch } from '../../context/auth'
import { DO_LOGOUT } from '../../constants'

import { mapColorScheme } from '../../lib'

const CallbackDetail = ({ callback }) => {
  const router = useRouter()
  const dispatch = useAuthDispatch()

  return (
    <Center flexDirection="column" pt={20} pb={20}>
      <Flex width="100%" maxWidth={600} alignItems="center" justifyContent="space-between">
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
            width={100}
            colorScheme="blue"
          >
            Log out
          </Button>
        </Box>
      </Flex>
      <Center width="100%" mt={50}>
        <Box maxWidth={600} width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={mapColorScheme(callback.callbackResponseCode)}
              >
                {callback.callbackResponseCode}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {callback.id}
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mt="5"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Virtual Account:{' '}
              <Text as="span" display="inline-block" fontWeight="normal">
                {callback.virtual_account}
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Bank Code:{' '}
              <Text as="span" display="inline-block" fontWeight="normal">
                {callback.bank_code}
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Timestamp:{' '}
              <Text as="span" display="inline-block" fontWeight="normal">
                {callback.timestamp}
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Transaction ID:{' '}
              <Text as="span" display="inline-block" fontWeight="normal">
                {callback.transaction_id}
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Business Code:{' '}
              <Text as="span" display="inline-block" fontWeight="normal">
                {callback.businessId}
              </Text>
            </Box>
            <Box mt={5} textAlign="right">
              {callback.callbackResponseCode >= 300 && <Button>Retry</Button>}
            </Box>
          </Box>
        </Box>
      </Center>
    </Center>
  )
}

export default CallbackDetail
