import {
  render,
  screen,
} from '@testing-library/react'

// Components
import NavigationMenuButton from 'components/menu-buttons/NavigationMenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Navigation Menu Button', () => {
  beforeEach(() => {
    render(<NavigationMenuButton buttonName='menu' />, { wrapper: GlobalContext })
  })

  it('should have button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should be labeled with "menu"', () => {
    expect(screen.getByText('menu')).toBeInTheDocument()
  })
})
