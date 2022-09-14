import {
  render,
  screen,
} from '@testing-library/react'

// Components
import MenuButton from 'components/menu-buttons/MenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Menu Button', () => {
  it('should have button', () => {
    render(<MenuButton buttonText='test' />, { wrapper: GlobalContext })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should have button text', () => {
    render(<MenuButton buttonText='test' />, { wrapper: GlobalContext })
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
