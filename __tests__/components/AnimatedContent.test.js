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
  it('should have animated-content', async () => {
    render(<AnimatedContent as='p' />, { wrapper: GlobalContext })
    expect(screen.getByTestId('hidden-content')).toBeInTheDocument()

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('animated-content')).toBeInTheDocument()
      }, 100)
    })
  })

  it('should be left aligned by default', async () => {
    render(<AnimatedContent as='p' />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('animated-content').style.textAlign).toBe('left')
      }, 100)
    })
  })

  it('should set alignment to left from props', async () => {
    const props = {
      align: 'left',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('animated-content').style.textAlign).toBe('left')
      }, 100)
    })
  })

  it('should set alignment to center from props', async () => {
    const props = {
      align: 'center',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('animated-content').style.textAlign).toBe('center')
      }, 100)
    })
  })

  it('should set alignment to right from props', async () => {
    const props = {
      align: 'right',
      as: 'p',
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByTestId('animated-content').style.textAlign).toBe('right')
      }, 100)
    })
  })

  it('should animate content in', async () => {
    const testText = 'this is a string of text to test the animated content component'
    const partialText = testText.substring(0, 10)
    const props = {
      as: 'p',
      text: testText,
    }

    render(<AnimatedContent {...props} />, { wrapper: GlobalContext })

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.queryByText(testText)).not.toBeInTheDocument()
        expect(screen.getByTestId('animated-content')).toHaveTextContent(partialText)
      }, 100)

      setTimeout(() => {
        expect(screen.queryByText(testText)).toBeInTheDocument()
      }, 200)
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
