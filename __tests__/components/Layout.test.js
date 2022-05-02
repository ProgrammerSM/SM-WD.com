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
  beforeEach(() => {
    render(<Layout />, { wrapper: GlobalContext })
  })

  it('should have header', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('should have background svg', () => {
    expect(screen.getByTestId('background-svg')).toBeInTheDocument()
  })

  it('should have menu/settings buttons', async () => {
    const menuButtons = await screen.findAllByTestId('menu-button')

    expect(menuButtons).toHaveLength(2)
    expect(within(menuButtons[0]).getByText('menu')).toBeInTheDocument()
    expect(within(menuButtons[1]).getByText('settings')).toBeInTheDocument()
  })

  it('should have footer', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})