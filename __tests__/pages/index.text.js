// Modules
import {
  render,
  screen,
} from '@testing-library/react'

// Components
import HomePage from 'pages/index'

// Context
import GlobalContext from 'context/GlobalContext'

// Router
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  asPath: '',
  pathname: '',
  query: '',
  route: '/',
}))

describe('home Page', () => {
  it('should have h1', () => {

    render(<HomePage />, { wrapper: GlobalContext })

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Website Coming Soon',
    })

    expect(heading).toBeInTheDocument()
  })
})
