// Modules
import PropTypes from 'prop-types'
import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

// Context
import { BreakpointContext } from 'context/BreakpointContext'
import { CurrentThemeContext } from 'context/CurrentThemeContext'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const focusInOut = keyframes`
  0% {
    letter-spacing: 1em;
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
`

const NavItemStyles = styled.li`

  .nav-link {
    position: relative;
    display: inline-block;

    &:focus,
    &:hover {
      .link-content,
      .hover-box {
        border-color: var(--accent-color-1);
      }

      .hover-box {
        top: -12px;
        right: -12px;
        bottom: -12px;
        left: -12px;
        border-width: 4px;
      }

      .link-icon { color: var(--accent-color-1); }
      .link-title {
        padding: 0 var(--space-extra-small);
        color: var(--accent-color-1);
        border-color: inherit;
        animation: ${focusInOut} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      }
    }
  }

  .hover-box {
    position: absolute;
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px;
    border: 2px solid var(--accent-color-1);
    transition: all .2s;
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  }

  .link-content {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 215px;
    height: 50px;
    border: 2px solid var(--primary-color);
    transition: all .2s;

    ${mediumUp} {
      width: 215px;
      height: 125px;
    }
  }

  .link-icon {
    width: var(--space-giant);
    margin-bottom: var(--space-extra-small);
  }

  .link-title {
    font-family: var(--header-font);
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 1px solid transparent;
  }
`

// REMOVE THIS ICON
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

// PropTypes
const propTypes = {}
const NavItem = () => {
  const icon = faEarthAmericas
  const location = '/'
  const title = 'Home'
  const breakpoints = useContext(BreakpointContext)
  const { theme } = useContext(CurrentThemeContext)

  return (
    <NavItemStyles>
      <Link
        passHref
        href={location}
      >
        <a className='nav-link' >
          <div className='hover-box' />
          <div
            className='link-content'
            style={{ background: `radial-gradient(circle, transparent, ${theme.primaryColor}26)` }}
          >
            {!breakpoints.mobile && (
              <span className='link-icon'>
                <FontAwesomeIcon icon={icon} />
              </span>
            )}
            <span className='link-title'>{title}</span>
          </div>
        </a>
      </Link>
    </NavItemStyles>
  )
}

NavItem.propTypes = propTypes
export default NavItem
