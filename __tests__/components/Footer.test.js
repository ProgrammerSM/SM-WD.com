// Modules
import {
  render,
  screen,
  within,
} from '@testing-library/react'

// Components
import Footer from 'components/Footer'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Footer', () => {
  it('should have copyright', () => {
    render(<Footer />, { wrapper: GlobalContext })

    const footer = screen.getByTestId('footer')
    const copyrightDate = `2021 - ${new Date().getFullYear()}`

    expect(within(footer).getByText(`Copyright © ${copyrightDate} Sterling May.`)).toBeInTheDocument()
    expect(within(footer).getByText('All rights reserved.')).toBeInTheDocument()
  })
})
