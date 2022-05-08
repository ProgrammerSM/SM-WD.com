// Modules
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react'

// Components
import AnimatedContent from 'components/AnimatedContent'

// Context
import GlobalContext from 'context/GlobalContext'

describe('AnimatedContent', () => {
  it('should have animated-content', () => {
    render(<AnimatedContent as='p' />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content')).toBeInTheDocument()
  })

  it('should be left aligned by default', () => {
    render(<AnimatedContent as='p' />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.textAlign).toBe('left')
  })

  it('should set alignment to left from props', () => {
    const props = {
      align: 'left',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.textAlign).toBe('left')
  })

  it('should set alignment to center from props', () => {
    const props = {
      align: 'center',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.textAlign).toBe('center')
  })

  it('should set alignment to right from props', () => {
    const props = {
      align: 'right',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.textAlign).toBe('right')
  })

  it('should have min-height of 22.5 by default', () => {
    render(<AnimatedContent as='p' />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.minHeight).toBe('22.5px')
  })

  it('should set min-height from props', () => {
    const testMinHeight = 40
    const props = {
      as: 'p',
      minHeight: testMinHeight,
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })
    expect(screen.getByTestId('animated-content').style.minHeight).toBe(`${testMinHeight}px`)
  })

  it('should animate content in', async () => {
    const testText = 'this is a string of text to test the animated content component'
    const partialText = testText.substring(0, 10)
    const props = {
      as: 'p',
      text: testText,
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    const initialRender = screen.queryByText(testText)
    expect(initialRender).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(testText)).not.toBeInTheDocument()
      expect(screen.getByTestId('animated-content')).toHaveTextContent(partialText)

      setTimeout(() => {
        expect(screen.queryByText(testText)).toBeInTheDocument()
      }, 100)
    })
  })

  it('should display static-content after animation', async () => {
    const testText = 'this is a string of text to test the animated content component'
    const props = {
      as: 'p',
      text: testText,
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('static-content')).toBeInTheDocument()
      }, 100)
    })
  })
})
