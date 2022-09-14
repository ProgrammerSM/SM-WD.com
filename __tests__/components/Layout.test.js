import {
  fireEvent,
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

    expect(menuButtons).toHaveLength(2)
    expect(within(menuButtons[0]).getByText('menu')).toBeInTheDocument()
    expect(within(menuButtons[1]).getByText('settings')).toBeInTheDocument()
  })

  it('should render nav menu if the menu button is clicked', async () => {
    render(<Layout />, { wrapper: GlobalContext })
    expect(screen.queryByTestId('nav-menu')).not.toBeInTheDocument()

    const menuButton = await screen.findAllByTestId('menu-button')
    fireEvent.click(menuButton[0])

    expect(screen.getByTestId('nav-menu')).toBeInTheDocument()
  })

  it('should have footer', () => {
    render(<Layout />, { wrapper: GlobalContext })
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
