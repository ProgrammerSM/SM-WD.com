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

  it('should contain image', () => {
    render(<SquareImage {...props} />, { wrapper: GlobalContext })
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should have image with correct alt text', () => {
    render(<SquareImage {...props} />, { wrapper: GlobalContext })
    expect(screen.getByRole('img')).toHaveAttribute('alt', imageAltText)
  })
})
