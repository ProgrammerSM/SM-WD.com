// Modules
import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import HomePage from 'pages/index'

// Context
import GlobalContext from 'context/GlobalContext'

describe('home Page', () => {
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

  it('should have h1', () => {
    render(<HomePage />, { wrapper: GlobalContext })

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Website Coming Soon',
    })

    expect(heading).toBeInTheDocument()
  })
})
