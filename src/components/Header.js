// Modules
import styled from 'styled-components'

// Components
import Link from 'next/link'
import Logo from './Logo'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const HeaderStyles = styled.header`
  position: absolute;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 100% 1fr;
  width: 100%;
  color: var(--font-color);
  z-index: 1;

  ${mediumUp} {
    grid-template-columns: 1fr 550px 1fr;
    gap: 48px;
  }

  .header-border {
    position: relative;
    border-top: 2px solid var(--primary-color);
    
    &:first-of-type::after,
    &:last-of-type::after {
      position: absolute;
      top: 0;
      width: 60%;
      height: 8px;
      border-bottom: 4px solid var(--accent-color-1);
      box-shadow: inset 0 -5px 5px -5px var(--accent-color-1);
      content: '';
    }

    &:first-of-type::after { left: 0; }
    &:last-of-type::after { right: 0; }
  }

  .logo-shape {
    position: relative;
    display: flex;
    justify-content: center;
    padding: var(--space-extra-small) 0;
    background-color: var(--background-color);
    border-bottom: 2px solid var(--primary-color);
    box-shadow: inset 0 -5px 5px -5px var(--primary-color);

    &::before,
    &::after {
      position: absolute;
      top: -10px;
      height: 87px;
      content: '';
    }
    
    ${mediumUp} {
      &::before {
        left: -26px;
        transform: rotate(-35deg);
        border-left: 2px solid var(--primary-color)
      }
      
      &::after {
        right: -26px;
        transform: rotate(35deg);
        border-right: 2px solid var(--primary-color);
      }
    }
  }

  .logo-wrapper {
    display: grid;
    grid-template-columns: 1fr 41px 1fr;
    align-items: center;
    gap: var(--space-medium);

    span {
      font-size: 3vw;
      text-transform: uppercase;
      letter-spacing: 3px;
    
      ${mediumUp} { font-size: 1rem; }
      &:first-of-type { text-align: right; }
      &:last-of-type { text-align: left; }
    }
  }
`

const Header = () => (
  <HeaderStyles data-testid='header'>
    <div className='header-border' />
    <div className='logo-shape'>
      { }
      <Link
        passHref
        href='/'
      >
        {/*
            eslint-disable-next-line
            jsx-a11y/no-noninteractive-tabindex,
            jsx-a11y/tabindex-no-positive
            -- need tab index order
          */}
        <a tabIndex={1}>
          <div
            className='logo-wrapper'
          >
            <span>Sterling May</span>
            <Logo
              height={50}
              testID='header-logo'
              width={41}
            />
            <span>Web Developer</span>
          </div>
        </a>
      </Link>
    </div>
    <div className='header-border' />
  </HeaderStyles>
)

export default Header
