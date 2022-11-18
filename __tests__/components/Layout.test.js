import {
  render,
  screen,
  within,
} from '@testing-library/react'

// Components
import Layout from 'components/Layout'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Layout', () => {
  it('should have header', () => {
    render(<Layout />, { wrapper: GlobalContext })
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('should have background svg', () => {
    render(<Layout />, { wrapper: GlobalContext })
    expect(screen.getByTestId('background-svg')).toBeInTheDocument()
  })

  it('should have menu/settings buttons', async () => {
    render(<Layout />, { wrapper: GlobalContext })
    const menuButtons = await screen.findAllByTestId('menu-button')

    expect(menuButtons).toHaveLength(1)
    expect(within(menuButtons[0]).getByText('menu')).toBeInTheDocument()
    // Expect(within(menuButtons[1]).getByText('settings')).toBeInTheDocument()
  })

  it('should have footer', () => {
    render(<Layout />, { wrapper: GlobalContext })
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
