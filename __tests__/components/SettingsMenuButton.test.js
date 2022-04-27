import '@testing-library/jest-dom'
import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import SettingsMenuButton from 'components/menu-buttons/SettingsMenuButton'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Settings Menu Button', () => {
  const { ResizeObserver } = window
  beforeEach(() => {
    delete window.ResizeObserver
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }))
  })

  afterEach(() => {
    window.ResizeObserver = ResizeObserver
    jest.restoreAllMocks()
  })

  it('should have button', () => {
    render(<SettingsMenuButton buttonName='settings' />, { wrapper: GlobalContext })

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('settings')).toBeInTheDocument()
  })
})
