// Modules
import PropTypes from 'prop-types'

// Components
import MetaData from 'components/MetaData'

// Data
import { pageContentEntryIds } from 'data/page-content-ids'
import { pageRevalidate } from 'data/page-revalidate'

// Services
import { getPageContent } from 'services/contentful-service'

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.home)

  return {
    props: {
      pageContent,
      revalidate: pageRevalidate.home,
    },
  }
}

const Home = ({ pageContent }) => {
  const { homePageMetaData } = pageContent

  return (
    <MetaData data={homePageMetaData?.fields} />
  )
}

Home.propTypes = {
  pageContent: PropTypes.shape({
    align: PropTypes.string,
    headingText: PropTypes.string,
    headingType: PropTypes.string,
    homePageMetaData: PropTypes.shape({ fields: PropTypes.object }),
  }),
}

export default Home
