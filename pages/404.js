// Modules
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import StyledLink from 'components/StyledLink'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const NotFoundStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 4px);
  
  .not-found-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--error-color);
    text-align: center;
    font-weight: bold;
  }

  .not-found-icon { font-size: 15vw; }
  .not-found-message-title {
    font-size: 12vw;
    font-family: var(--header-font);
  }

  ${mediumUp} {
    .not-found-message { font-size: 1.5rem; }
    .not-found-icon { font-size: 5rem; }
    .not-found-message-title { font-size: 4rem; }
  }
`

export const getStaticProps = () => ({ props: { showBgSvg: false }})

const NotFound = () => (
  <NotFoundStyles>
    <p className='not-found-message'>
      <span className='not-found-icon'>
        <FontAwesomeIcon icon={faLinkSlash} />
      </span>
      <span className='not-found-message-title'>404</span>
      <span>system route failure, please return to known location</span>
    </p>
    <Link href='/' >
      <a className='styled-link'>- Home Page -</a>
    </Link>
  </NotFoundStyles>
)

export default NotFound
