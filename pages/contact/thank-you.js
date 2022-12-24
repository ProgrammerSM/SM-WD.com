// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  faLinkedin,
  faSquareGithub,
} from '@fortawesome/free-brands-svg-icons'

// Components
import ContentContainer1 from 'components/content-containers/ContentContainer1'
import ContentContainer2 from 'components/content-containers/ContentContainer2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import MetaData from 'components/MetaData'
import WideContentContainer from 'components/content-containers/WideContentContainer'

// Data
import { largeUp } from 'data/media-queries'
import { pageContentEntryIds } from 'data/page-content-ids'
import { pageRevalidate } from 'data/page-revalidate'

// Services
import { getPageContent } from 'services/contentful-service'

// Styles
const ThankYouPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-medium);

  .thank-you-container { width: 100%; }
  
  .column-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-medium);
    
    h4 { 
      margin-top: 0;
      text-align: center;
    }
  }

  .social-container,
  .navigation-container {
    width: 100%;
  }

  .social-media-icons,
  .navigation-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-medium);
    width: 100%;
    height: 45px;
    text-align: center;
  }
  
  .social-media-icons {
    font-size: 2rem;
  }

  ${largeUp} {
    justify-content: center;
    height: calc(100% - 4px);
    
    .thank-you-container { max-width: 1050px; }
    .column-wrapper { flex-direction: row; }

    .social-container,
    .navigation-container {
      max-width: 516px;
    }
  }
`

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.thankYou)

  return {
    props: {
      pageContent,
      revalidate: pageRevalidate.thankYou,
    },
  }
}

const ThankYou = ({ pageContent }) => {
  const { thankYouPageMetaData } = pageContent

  return (
    <>
      <MetaData data={thankYouPageMetaData?.fields} />
      <ThankYouPageStyles>
        <div className='thank-you-container'>
          <WideContentContainer
            headingData={{ headingText: 'Thank You' }}
          >{'<p>Thank you for contacting me. Your request will be answered shortly, and you will receive a response to your email.</p>'}</WideContentContainer>
        </div>
        <div className='thank-you-container column-wrapper'>
          <div className='social-container'>
            <ContentContainer1>
              <div>
                <h4>Social Media</h4>
              </div>
              <div className='social-media-icons'>
                <a
                  href='https://www.linkedin.com/in/sterling-may-web-developer/'
                  rel='noreferrer noopener'
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href='https://github.com/ProgrammerSM'
                  rel='noreferrer noopener'
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faSquareGithub} />
                </a>
              </div>
            </ContentContainer1>
          </div>
          <div className='navigation-container'>
            <ContentContainer2>
              <div>
                <h4>Keep Exploring</h4>
              </div>
              <div className='navigation-link'>
                <Link href='/' >
                  <a className='styled-link'>Let's Go!</a>
                </Link>
              </div>
            </ContentContainer2>
          </div>
        </div>
      </ThankYouPageStyles>
    </>
  )
}

ThankYou.propTypes = { pageContent: PropTypes.shape({ thankYouPageMetaData: PropTypes.shape({ fields: PropTypes.any }) }) }
export default ThankYou
