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

const MenuItemStyles = styled.li`
  .menu-item {
    position: relative;
    display: inline-block;
    padding: 0;
    background-color: transparent;

    &:focus,
    &:hover {
      .menu-item-content,
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
      
      .menu-item-title {
        padding: 0 var(--space-extra-small);
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

  .menu-item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 215px;
    height: 50px;
    border: 2px solid var(--primary-color);
    transition: all .2s;
  }

  .menu-item-icon,
  .menu-item-title {
    color: var(--accent-color-1);
  }

  .menu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 2rem;
    font-size: 2rem;
    margin-bottom: var(--space-extra-small);
  }

  .menu-item-title {
    font-family: var(--header-font);
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 1px solid transparent;
  }

  ${mediumUp} {
    .menu-item-content {
      width: 215px;
      height: 125px;
      padding: var(--space-medium) 0;
    }
  }
`

const MenuItem = ({
  menuItemData,
  onClickHandler,
}) => {
  const breakpoints = useContext(BreakpointContext)
  const { theme } = useContext(CurrentThemeContext)

  if (!menuItemData)
    return

  const {
    icon,
    name,
  } = menuItemData

  return (
    <MenuItemStyles>
      {menuItemData?.path
        ? (
          <Link
            passHref
            href={menuItemData.path}
          >
            <a className='menu-item' >
              <div className='hover-box' />
              <div
                className='menu-item-content'
                style={{ background: `radial-gradient(circle, transparent, ${theme.primaryColor}26)` }}
              >
                {!breakpoints.mobile && (
                  <span className='menu-item-icon'>
                    <FontAwesomeIcon icon={icon} />
                  </span>
                )}
                <span className='menu-item-title'>{name}</span>
              </div>
            </a>
          </Link>
        ) : (
          <button
            className='menu-item'
            type='button'
            onClick={onClickHandler}
          >
            <div className='hover-box' />
            <div
              className='menu-item-content'
              style={{ background: `radial-gradient(circle, transparent, ${theme.primaryColor}26)` }}
            >
              {!breakpoints.mobile && (
                <span className='menu-item-icon'>
                  <FontAwesomeIcon icon={icon} />
                </span>
                )}
              <span className='menu-item-title'>{name}</span>
            </div>
          </button>
        )}
    </MenuItemStyles>
  )
}

MenuItem.propTypes = {
  menuItemData: PropTypes.shape({
    icon: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
  }),
  onClickHandler: PropTypes.func,
}

export default MenuItem
