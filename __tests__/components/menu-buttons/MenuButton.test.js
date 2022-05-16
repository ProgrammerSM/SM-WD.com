import {
  render,
  screen,
} from '@testing-library/react'

// Components
import MenuButton from 'components/menu-buttons/MenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Menu Button', () => {
  beforeEach(() => {
    render(<MenuButton buttonText='test' />, { wrapper: GlobalContext })
  })

  it('should have button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should have button text', () => {
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
