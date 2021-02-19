/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent, waitFor } from '../../../test-utils'
import cookie from 'react-cookies'
import axios from 'axios'
import * as context from '../../context/auth'
import * as nextRouter from 'next/router'
import { SET_AUTHENTICATING, SET_LOGIN_STATE, SET_USER } from '../../constants'

import Login from './index'

jest.mock('react-cookies')
jest.mock('axios')
jest.mock('../../context/auth')
jest.mock('next/router')

// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn()
const push = jest.fn()
nextRouter.useRouter.mockImplementation(() => ({ push }))

const useAuthDispatch = jest.fn()
context.useAuthDispatch.mockImplementation(() => useAuthDispatch)

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
          user: {
            name: 'John',
            email: 'john@mail.com',
          },
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

    expect(axiosMock).toHaveBeenCalledTimes(1)
    expect(axiosMock).toHaveBeenCalledWith('http://localhost:3030/users/login', {
      email: 'john@mail.com',
      password: 'password',
    })

    await waitFor(() => expect(cookiesMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(cookiesMock).toHaveBeenCalledWith('userToken', 'accessToken'))
    await waitFor(() => expect(useAuthDispatch).toHaveBeenCalledTimes(3))
    await waitFor(() => expect(push).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard'))
    await waitFor(() =>
      expect(useAuthDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_USER,
        user: {
          name: 'John',
          email: 'john@mail.com',
        },
      }),
    )
    await waitFor(() =>
      expect(useAuthDispatch).toHaveBeenNthCalledWith(2, {
        type: SET_LOGIN_STATE,
        isLoggedIn: true,
      }),
    )
    await waitFor(() =>
      expect(useAuthDispatch).toHaveBeenNthCalledWith(3, {
        type: SET_AUTHENTICATING,
        isAuthenticating: false,
      }),
    )

    axiosMock.mockRestore()
    cookiesMock.mockRestore()
    context.useAuthDispatch.mockRestore()
    nextRouter.useRouter.mockRestore()
  })
})
