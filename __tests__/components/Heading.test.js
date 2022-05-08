// Modules
import {
  render,
  screen,
  within,
} from '@testing-library/react'

// Components
import Heading from 'components/Heading'

// Context
import GlobalContext from 'context/GlobalContext'

describe('Heading', () => {
  it('should have "animated-heading"', () => {
    render(<Heading />, { wrapper: GlobalContext })

    expect(screen.getByTestId('animated-heading')).toBeInTheDocument()
  })

  it('should be h1 by default', () => {
    render(<Heading />, { wrapper: GlobalContext })

    const animatedHeading = screen.getByTestId('animated-heading')
    expect(within(animatedHeading).getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('should be able to change element type by prop', () => {
    render(<Heading as='h2' />, { wrapper: GlobalContext })

    const animatedHeading = screen.getByTestId('animated-heading')
    expect(within(animatedHeading).getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('should use text passed as children', () => {
    const headingText = 'Test Heading'
    render(<Heading>{headingText}</Heading>, { wrapper: GlobalContext })

    const animatedHeading = screen.getByTestId('animated-heading')
    expect(within(animatedHeading).getByRole('heading', {
      level: 1,
      name: headingText,
    })).toBeInTheDocument()
  })

  it('should have "center" class added by prop', () => {
    render(<Heading isCenter />, { wrapper: GlobalContext })

    const animatedHeading = screen.getByTestId('animated-heading')
    expect(animatedHeading.classList).toContain('center')
  })

  it('should have "right" class added by prop', () => {
    render(<Heading isRight />, { wrapper: GlobalContext })

    const animatedHeading = screen.getByTestId('animated-heading')
    expect(animatedHeading.classList).toContain('right')
  })
})
