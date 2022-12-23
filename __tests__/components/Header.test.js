// Modules
import {
  render,
  screen,
  within,
} from '@testing-library/react'

// Components
import Header from 'components/Header'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Header', () => {
  it('should have clickable logo', () => {
    render(<Header />, { wrapper: GlobalContext })

    const headerLink = screen.getByRole('link')
    expect(headerLink).toBeInTheDocument()
    expect(within(headerLink).getByText('Sterling May')).toBeInTheDocument()
    expect(within(headerLink).getByTestId('header-logo')).toBeInTheDocument()
    expect(within(headerLink).getByText('Web Developer')).toBeInTheDocument()
  })
})
