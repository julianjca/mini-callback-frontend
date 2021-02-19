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
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'
import cookie from 'react-cookies'
import { useRouter } from 'next/router'

const SuccessModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Success!</ModalHeader>
      <ModalCloseButton />

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

const SendCallback = ({ businesses }) => {
  const router = useRouter()
  const [virtualAccount, setVirtualAccount] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [businessId, setBusinessId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const resetForm = () => {
    setBusinessId('')
    setTransactionId('')
    setBankCode('')
    setVirtualAccount('')
  }

  const handleSubmit = async () => {
    await axios.post(
      'http://localhost:3030/callbacks',
      {
        virtual_account: virtualAccount,
        bank_code: bankCode,
        timestamp: new Date(),
        transaction_id: transactionId,
        business_id: businessId,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.load('userToken')}`,
        },
      },
    )
    onOpen()
    resetForm()
  }

  return (
    <>
      <SuccessModal isOpen={isOpen} onClose={onClose} />
      <Container pt={20} pb={20}>
        <Center>
          <Heading>Send callback</Heading>
        </Center>
        <Center mt={10}>
          <Stack spacing={5}>
            <FormControl id="va">
              <FormLabel>Virtual account</FormLabel>
              <Input
                value={virtualAccount}
                width={300}
                type="text"
                placeholder="Virtual Account"
                size="md"
                onChange={e => setVirtualAccount(e.target.value)}
                data-testid="va-input"
              />
            </FormControl>
            <FormControl id="bank-code">
              <FormLabel>Bank code</FormLabel>
              <Input
                value={bankCode}
                width={300}
                type="text"
                placeholder="Bank code"
                size="md"
                onChange={e => setBankCode(e.target.value)}
                data-testid="bank-code-input"
              />
            </FormControl>
            <FormControl id="trx">
              <FormLabel>Transaction ID</FormLabel>
              <Input
                value={transactionId}
                width={300}
                type="text"
                placeholder="Bank code"
                size="md"
                onChange={e => setTransactionId(e.target.value)}
                data-testid="trx-id-input"
              />
            </FormControl>
            <FormControl id="business">
              <FormLabel>Business</FormLabel>
              <Select
                value={businessId}
                onChange={e => setBusinessId(e.target.value)}
                placeholder="Select option"
                data-testid="business-input"
              >
                {businesses.map(business => (
                  <option key={business.id} value={business.id}>
                    {business.businessName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              size="md"
              width={300}
              colorScheme="blue"
              data-testid="send-callback-button"
            >
              Send callback
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              size="md"
              width={300}
              colorScheme="blue"
            >
              Go back
            </Button>
          </Stack>
        </Center>
      </Container>
    </>
  )
}

export default SendCallback
