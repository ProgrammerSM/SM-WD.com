// Modules
import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import Header from 'components/Header'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Header', () => {
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

  it('should have clickable logo', () => {
    render(<Header />, { wrapper: GlobalContext })

    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByText('Sterling May')).toBeInTheDocument()
    expect(screen.getByText('Web Developer')).toBeInTheDocument()
  })
})
