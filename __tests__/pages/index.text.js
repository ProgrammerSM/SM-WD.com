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
  it('should have h1', () => {
    render(<HomePage />, { wrapper: GlobalContext })

    const heading = screen.getByText('Website Coming Soon')
    expect(heading).toBeInTheDocument()
  })
})
