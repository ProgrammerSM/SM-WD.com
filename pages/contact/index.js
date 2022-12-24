// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Banner from 'components/content-containers/Banner'
import ContactForm from 'components/ContactForm'

// Data
import { mediumUp } from 'data/media-queries'
import { pageContentEntryIds } from 'data/page-content-ids'
import { pageRevalidate } from 'data/page-revalidate'

// Services
import { getPageContent } from 'services/contentful-service'

// Styles
const ContactPageStyles = styled.div`
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-large);
    min-height: 100%;
    margin: -2px 0;
  
    & > div {
      width: 100%;
    }
  }

  ${mediumUp} {
    .form-wrapper {
      flex-direction: row;
  
      & > div {
        width: 50%;
      }
    }
  }
`

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.contact)

  return {
    props: {
      metaData: pageContent?.contactPageMetaData?.fields,
      pageContent: {
        contactBanner: pageContent?.contactBanner,
        isLooking: pageContent?.shared?.fields?.isLooking,
      },
      revalidate: pageRevalidate.contact,
      showBgSvg: false,
    },
  }
}

const Contact = ({ pageContent }) => {
  const { isLooking } = pageContent

  return (
    <ContactPageStyles>
      {(!isLooking && pageContent?.contactBanner) && (
        <Banner
          heading={pageContent?.contactBanner?.fields?.bannerHeading}
          message={pageContent?.contactBanner?.fields?.bannerMessage}
        />
      )}
      <div className='form-wrapper'>
        <div>test section</div>
        <ContactForm />
      </div>
    </ContactPageStyles>
  )
}

Contact.propTypes = {
  pageContent: PropTypes.shape({
    contactBanner: PropTypes.shape({
      fields: PropTypes.shape({
        bannerHeading: PropTypes.string,
        bannerMessage: PropTypes.string,
      }),
    }),
    contactPageMetaData: PropTypes.shape({ fields: PropTypes.object }),
    isLooking: PropTypes.bool,
  }),
}

export default Contact
