// Modules
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import MenuItem from 'components/menus/MenuItem'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Navigation Item', () => {
  const props = {
    menuItemData: {
      icon: faEarthAmericas,
      name: 'home',
      path: '/',
    },
  }

  it('should have link', () => {
    render(<MenuItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should have text home', () => {
    render(<MenuItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument()
  })

  it('should have href to home page', () => {
    render(<MenuItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/')
  })
})
