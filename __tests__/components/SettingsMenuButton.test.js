import {
  render,
  screen,
} from '@testing-library/react'

// Components
import SettingsMenuButton from 'components/menu-buttons/SettingsMenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Settings Menu Button', () => {
  beforeEach(() => {
    render(<SettingsMenuButton buttonName='settings' />, { wrapper: GlobalContext })
  })

  it('should have button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should be labeled with "settings"', () => {
    expect(screen.getByText('settings')).toBeInTheDocument()
  })
})
