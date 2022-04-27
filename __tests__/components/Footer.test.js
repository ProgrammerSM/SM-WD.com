// Modules
import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import Footer from 'components/Footer'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Footer', () => {
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

  it('should have copyright', () => {
    const copyrightDate = `2021 - ${new Date().getFullYear()}`
    render(<Footer />, { wrapper: GlobalContext })

    expect(screen.getByText(`Copyright © ${copyrightDate} Sterling May.`)).toBeInTheDocument()
    expect(screen.getByText('All rights reserved.')).toBeInTheDocument()
  })
})
