// Modules
import PropTypes from 'prop-types'

// Data
import { pageContentEntryIds } from 'data/page-content-ids'
import { pageRevalidate } from 'data/page-revalidate'

// Services
import { getPageContent } from 'services/contentful-service'

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.home)

  return {
    props: {
      metaData: pageContent?.homePageMetaData?.fields,
      pageContent: {},
      revalidate: pageRevalidate.home,
    },
  }
}

const Home = ({ pageContent }) => (
  <div>Home Page</div>
)

Home.propTypes = {
  pageContent: PropTypes.shape({
    align: PropTypes.string,
    headingText: PropTypes.string,
    headingType: PropTypes.string,
    homePageMetaData: PropTypes.shape({ fields: PropTypes.object }),
  }),
}

export default Home
