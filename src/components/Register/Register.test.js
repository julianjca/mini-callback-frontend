/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent, waitFor } from '../../../test-utils'
import axios from 'axios'

import Register from './index'

jest.mock('axios')

describe('Register', () => {
  test('renders the right text', () => {
    const element = render(<Register />)

    expect(element).toMatchSnapshot()
  })

  test('renders email input, name input, and password input', () => {
    const element = render(<Register />)

    expect(element.getByTestId('email-input')).toBeInTheDocument()
    expect(element.getByTestId('password-input')).toBeInTheDocument()
    expect(element.getByTestId('name-input')).toBeInTheDocument()
  })

  test('runs register function', async () => {
    const setRenderRegisterPage = jest.fn()
    const element = render(<Register setRenderRegisterPage={setRenderRegisterPage} />)

    const axiosMock = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve())

    const emailInput = element.getByTestId('email-input')
    const passwordInput = element.getByTestId('password-input')
    const nameInput = element.getByTestId('name-input')

    fireEvent.change(emailInput, { target: { value: 'john@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.change(nameInput, { target: { value: 'John' } })

    const button = element.getByText('Sign up')
    fireEvent.click(button)

    await waitFor(() => expect(axiosMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(axiosMock).toHaveBeenCalledWith('http://localhost:3030/users', {
        email: 'john@mail.com',
        password: 'password',
        name: 'John',
      }),
    )

    await waitFor(() => expect(setRenderRegisterPage).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(setRenderRegisterPage).toHaveBeenCalledWith(false))

    axiosMock.mockRestore()
    setRenderRegisterPage.mockReset()
  })
})
