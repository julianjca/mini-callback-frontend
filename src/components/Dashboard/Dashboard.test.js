/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '../../../test-utils'
import * as context from '../../context/auth'
import * as nextRouter from 'next/router'
import { DO_LOGOUT } from '../../constants'

import Dashboard from './index'

jest.mock('../../context/auth')
jest.mock('next/router')
jest.mock('axios')

// eslint-disable-next-line no-import-assign
nextRouter.useRouter = jest.fn()
const push = jest.fn()
nextRouter.useRouter.mockImplementation(() => ({ push }))

const useAuthDispatch = jest.fn()
context.useAuthDispatch.mockImplementation(() => useAuthDispatch)

const callbacks = [
  {
    bank_code: 'BANK_ABC',
    businessId: '270cd61d-1965-4ed2-bbf3-a91425a030b8',
    callbackResponseCode: 200,
    createdAt: '2021-02-18T12:54:16.810Z',
    id: 'e8980029-04a0-4b9c-8c64-182c8a81cc43',
    timestamp: '2021-02-18T03:13:01.411Z',
    transaction_id: '123',
    updatedAt: '2021-02-18T12:54:16.810Z',
    virtual_account: '1234',
  },
]

describe('Dashboard', () => {
  test('renders the right text', () => {
    const element = render(<Dashboard callbacks={callbacks} />)

    expect(element).toMatchSnapshot()
  })

  test('runs log out function', () => {
    const element = render(<Dashboard callbacks={callbacks} />)

    const logOutButton = element.getByText('Log out')
    fireEvent.click(logOutButton)
    expect(useAuthDispatch).toHaveBeenCalledTimes(1)
    expect(useAuthDispatch).toHaveBeenCalledWith({
      type: DO_LOGOUT,
    })
  })

  test('renders the table', () => {
    const element = render(<Dashboard callbacks={callbacks} />)

    expect(element.getByText('BANK_ABC')).toBeInTheDocument()
    expect(element.getByText('200')).toBeInTheDocument()
    expect(element.getByText('123')).toBeInTheDocument()
    expect(element.getByText('1234')).toBeInTheDocument()
    expect(element.getByText('e8980029-04a0-4b9c-8c64-182c8a81cc43')).toBeInTheDocument()
  })

  test('open detail page when the button is clicked', () => {
    const element = render(<Dashboard callbacks={callbacks} />)

    const seeDetailButton = element.getByText('See detail')

    fireEvent.click(seeDetailButton)

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/callbacks/[id]', `/callbacks/${callbacks[0].id}`, {
      shallow: true,
    })
  })
})
