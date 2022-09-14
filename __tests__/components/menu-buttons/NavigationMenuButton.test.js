import {
  render,
  screen,
} from '@testing-library/react'

// Components
import NavigationMenuButton from 'components/menu-buttons/NavigationMenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Navigation Menu Button', () => {
  it('should have button', () => {
    render(<NavigationMenuButton buttonName='menu' />, { wrapper: GlobalContext })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should be labeled with "menu"', () => {
    render(<NavigationMenuButton buttonName='menu' />, { wrapper: GlobalContext })
    expect(screen.getByText('menu')).toBeInTheDocument()
  })
})
