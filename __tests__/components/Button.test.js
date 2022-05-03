// Modules
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react'

// Components
import Button from 'components/Button'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Button', () => {
  it('should have button element', () => {
    render(<Button />, { wrapper: GlobalContext })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should accept children content', () => {
    const testContent = 'test content'
    render(<Button>{testContent}</Button>, { wrapper: GlobalContext })

    expect(screen.getByRole('button', { name: testContent })).toBeInTheDocument()
  })

  it('should have class success', () => {
    render(<Button isSuccess />, { wrapper: GlobalContext })

    expect(screen.getByRole('button').classList).toContain('success')
  })

  it('should have class warn', () => {
    render(<Button isWarn />, { wrapper: GlobalContext })

    expect(screen.getByRole('button').classList).toContain('warn')
  })

  it('should have class fail', () => {
    render(<Button isFail />, { wrapper: GlobalContext })

    expect(screen.getByRole('button').classList).toContain('fail')
  })

  it('should use onClickHandler passed through prop', () => {
    const testHandler = jest.fn()
    render(<Button onClickHandler={testHandler} />, { wrapper: GlobalContext })

    fireEvent.click(screen.getByRole('button'))

    expect(testHandler).toHaveBeenCalledTimes(1)
  })
})
