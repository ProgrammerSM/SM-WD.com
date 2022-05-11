// Modules
import styled from 'styled-components'

// Components
import NavItem from './NavItem'

// Styles
const NavMenuStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: calc(var(--space-extra-large) + 12px);
  margin: var(--space-extra-large) 0;
`

const array = [
  0,
  1,
  2,
  3,
]

const NavMenu = () => (
  <NavMenuStyles>
    {
      array.map((item, index) => <NavItem key={`nav-item-${index}`} />)
    }
  </NavMenuStyles>
)

export default NavMenu
