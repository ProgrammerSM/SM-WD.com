// Modules
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import NavItem from 'components/menus/navigaton-menu/NavItem'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Navigation Item', () => {
  const props = {
    navItemData: {
      icon: faEarthAmericas,
      name: 'home',
      path: '/',
    },
  }

  it('should have link', () => {
    render(<NavItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should be have text home', () => {
    render(<NavItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link', { name: 'home' })).toBeInTheDocument()
  })

  it('should have href to home page', () => {
    render(<NavItem {...props} />, { wrapper: GlobalContext })

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
