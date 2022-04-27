import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import MenuButton from 'components/menu-buttons/MenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Menu Button', () => {
  const { ResizeObserver } = window
  beforeEach(() => {
    delete window.ResizeObserver
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }))
  })

  afterEach(() => {
    window.ResizeObserver = ResizeObserver
    jest.restoreAllMocks()
  })

  it('should have button', () => {
    render(<MenuButton />, { wrapper: GlobalContext })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should have button text', () => {
    render(<MenuButton buttonText='test' />, { wrapper: GlobalContext })

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
