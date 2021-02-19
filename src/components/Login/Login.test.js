/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent, waitFor } from '../../../test-utils'
import cookie from 'react-cookies'
import axios from 'axios'

import Login from './index'

jest.mock('react-cookies')
jest.mock('axios')

describe('Login', () => {
  test('renders the right text', () => {
    const element = render(<Login />)

    expect(element).toMatchSnapshot()
  })

  test('renders email input and password input', () => {
    const element = render(<Login />)

    expect(element.getByTestId('email-input')).toBeInTheDocument()
    expect(element.getByTestId('password-input')).toBeInTheDocument()
  })

  test('runs login function', async () => {
    const element = render(<Login />)

    const axiosMock = jest.spyOn(axios, 'post').mockImplementation(() =>
      Promise.resolve({
        data: {
          accessToken: 'accessToken',
        },
      }),
    )

    const cookiesMock = jest.spyOn(cookie, 'save')

    const emailInput = element.getByTestId('email-input')
    const passwordInput = element.getByTestId('password-input')

    fireEvent.change(emailInput, { target: { value: 'john@mail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    const button = element.getByText('Log in')
    fireEvent.click(button)

    await waitFor(() => expect(axiosMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(axiosMock).toHaveBeenCalledWith('http://localhost:3030/users/login', {
        email: 'john@mail.com',
        password: 'password',
      }),
    )

    await waitFor(() => expect(cookiesMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(cookiesMock).toHaveBeenCalledWith('userToken', 'accessToken'))

    axiosMock.mockRestore()
    cookiesMock.mockRestore()
  })
})
