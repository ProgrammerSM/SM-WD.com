// Modules
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import NavMenu from 'components/menus/NavMenu'

// Context
import GlobalContext from 'context/GlobalContext'

// Data
import navigationMenu from 'data/navigation-menu'

describe('Navigation Menu', () => {
  const navItemCount = navigationMenu.length

  it('should have close button', () => {
    render(<NavMenu />, { wrapper: GlobalContext })

    expect(screen.getByRole('button', { name: 'CLOSE' })).toBeInTheDocument()
  })

  it('should render all nav links', () => {
    render(<NavMenu />, { wrapper: GlobalContext })

    expect(screen.getAllByRole('link')).toHaveLength(navItemCount)
  })

  it('should render all but the home page link', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      events: { on: jest.fn() },
      pathname: '/',
    }))

    render(<NavMenu />, { wrapper: GlobalContext })

    expect(screen.getAllByRole('link')).toHaveLength(navItemCount - 1)
    navigationMenu.forEach(navItem => {
      if (navItem.path === '/')
        return

      expect(screen.getByRole('link', { name: navItem.name })).toBeInTheDocument()
    })
  })
})
