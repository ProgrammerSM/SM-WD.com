// Modules
import styled from 'styled-components'

// Data
import { mediumUp } from 'data/media-queries'

const FooterStyles = styled.footer`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 100% 1fr;
  width: 100%;
  color: var(--font-color);
  text-align: center;

  ${mediumUp} {
    grid-template-columns: 1fr 365px 1fr;
    gap: 36px;
  }
  
  .footer-border {
    position: relative;
    border-bottom: 2px solid var(--primary-color);
    
    &:first-of-type::after,
    &:last-of-type::after {
      position: absolute;
      bottom: 0;
      width: 60%;
      height: 8px;
      border-top: 4px solid var(--accent-color-1);
      box-shadow: inset 0 5px 5px -5px var(--accent-color-1);
      content: '';
    }

    &:first-of-type::after { left: 0; }
    &:last-of-type::after { right: 0; }
  }


  .copyright-shape {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-extra-small) 0;
    background-color: var(--background-color);
    border-top: 2px solid var(--primary-color);
    box-shadow: inset 0 5px 5px -5px var(--primary-color);

    ${mediumUp} { height: 54px; }

    &::before,
    &::after {
      position: absolute;
      top: -7px;
      height: 66px;
      content: '';
    }

    ${mediumUp} {
      &::before {
        left: -19px;
        transform: rotate(35deg);
        border-left: 2px solid var(--primary-color);
      }
      
      &::after {
        right: -19px;
        transform: rotate(-35deg);
        border-right: 2px solid var(--primary-color);
      }
    }
  }

  .copyright {
    margin: 0 var(--space-small);
    font-size: .6rem;

    ${mediumUp} { font-size: .75rem; }

    span {
      white-space: nowrap;
    }
  }
`

const Footer = () => {
  const copyrightDate = `2021 - ${new Date().getFullYear()}`

  return (
    <FooterStyles>
      <div className='footer-border' />
      <div className='copyright-shape'>
        <p className='copyright'>
          <span>Copyright &copy; {copyrightDate} Sterling May.</span>
          {' '}
          <span>All rights reserved.</span>
        </p>
      </div>
      <div className='footer-border' />
    </FooterStyles>
  )
}

export default Footer
