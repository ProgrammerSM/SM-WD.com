// Modules
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const ErrorPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 4px);
  
  .error-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--error-color);
    text-align: center;
    font-weight: bold;
  }

  .error-icon { font-size: 15vw; }
  .error-message-title { font-size: 12vw; }

  ${mediumUp} {
    .error-message { font-size: 1.5rem; }
    .error-icon { font-size: 5rem; }
    .error-message-title { font-size: 3rem; }
  }
`

export const getStaticProps = () => ({ props: { showBgSvg: false }})

const ErrorPage = () => (
  <ErrorPageStyles>
    <p className='error-message'>
      <span className='error-icon'>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </span>
      <span className='error-message-title'>FATAL ERROR</span>
      <span>a server error has occured, please return to a safer area</span>
    </p>
    <Link href='/' >
      <a className='styled-link'>- Home Page -</a>
    </Link>
  </ErrorPageStyles>
)

export default ErrorPage
