import {
  render,
  screen,
} from '@testing-library/react'

// Components
import SettingsMenuButton from 'components/menu-buttons/SettingsMenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Settings Menu Button', () => {
  it('should have button', () => {
    render(<SettingsMenuButton buttonName='settings' />, { wrapper: GlobalContext })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should be labeled with "settings"', () => {
    render(<SettingsMenuButton buttonName='settings' />, { wrapper: GlobalContext })
    expect(screen.getByText('settings')).toBeInTheDocument()
  })
})
