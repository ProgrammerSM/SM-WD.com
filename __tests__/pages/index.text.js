// Modules
import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import HomePage from 'pages/index'

describe('home Page', () => {
  it('should have h1', () => {
    render(<HomePage />)

    const heading = screen.getByText('Website Coming Soon')
    expect(heading).toBeInTheDocument()
  })
})
