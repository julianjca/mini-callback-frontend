/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent, waitFor } from '../../../test-utils'
import axios from 'axios'

import SendCallback from './index'

jest.mock('axios')

describe('Register', () => {
  test('renders the right text', () => {
    const element = render(<SendCallback businesses={[]} />)

    expect(element).toMatchSnapshot()
  })

  test('renders email input, name input, and password input', () => {
    const element = render(<SendCallback businesses={[]} />)

    expect(element.getByTestId('va-input')).toBeInTheDocument()
    expect(element.getByTestId('trx-id-input')).toBeInTheDocument()
    expect(element.getByTestId('business-input')).toBeInTheDocument()
    expect(element.getByTestId('bank-code-input')).toBeInTheDocument()
  })

  test('runs register function', async () => {
    const element = render(<SendCallback businesses={[]} />)

    const axiosMock = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve())

    const vaInput = element.getByTestId('va-input')
    const trxIdInput = element.getByTestId('trx-id-input')
    const businessInput = element.getByTestId('business-input')
    const bankCodeInput = element.getByTestId('bank-code-input')

    fireEvent.change(vaInput, { target: { value: 'VA' } })
    fireEvent.change(trxIdInput, { target: { value: 'TRX' } })
    fireEvent.change(businessInput, { target: { value: 'businessId' } })
    fireEvent.change(bankCodeInput, { target: { value: 'BCA' } })

    const button = element.getByTestId('send-callback-button')
    fireEvent.click(button)

    await waitFor(() => expect(axiosMock).toHaveBeenCalledTimes(1))

    axiosMock.mockRestore()
  })
})
