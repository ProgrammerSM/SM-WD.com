// Modules
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import CloseButton from 'components/menus/CloseButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Menu Close Button', () => {
  it('should have close button', () => {
    render(<CloseButton />, { wrapper: GlobalContext })

    expect(screen.getByRole('button', { name: 'CLOSE' })).toBeInTheDocument()
  })
})
