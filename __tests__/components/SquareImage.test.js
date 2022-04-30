// Modules
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import SquareImage from 'components/SquareImage'

// Context
import GlobalContext from 'context/GlobalContext'

describe('SquareImage', () => {
  const imageSrc = '/img/mock/test.png'
  const imageAltText = 'test image'
  const props = {
    height: 200,
    image: imageSrc,
    imageAlt: imageAltText,
    width: 500,
  }

  beforeEach(() => {
    render(<SquareImage {...props} />, { wrapper: GlobalContext })
  })

  it('should contain image', () => {
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should have image with correct alt text', () => {
    expect(screen.getByRole('img')).toHaveAttribute('alt', imageAltText)
  })
})
