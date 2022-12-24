// Modules
import PropTypes from 'prop-types'

// Components
import MetaData from 'components/MetaData'

// Data
import { pageContentEntryIds } from 'data/page-content-ids'

// Services
import { getPageContent } from 'services/contentful-service'
import { pageRevalidate } from 'data/page-revalidate'

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.about)

  return {
    props: {
      pageContent,
      revalidate: pageRevalidate.about,
    },
  }
}

const About = ({ pageContent }) => {
  const { aboutPageMetaData } = pageContent

  return (
    <>
      <MetaData data={aboutPageMetaData?.fields} />
      <div>About</div>
    </>
  )
}

About.propTypes = { pageContent: PropTypes.shape({ aboutPageMetaData: PropTypes.shape({ fields: PropTypes.any }) }) }
export default About
