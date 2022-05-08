// Modules
import {
  render,
  screen,
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

  it.todo('should animate content in')
})
