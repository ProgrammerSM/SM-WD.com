// Modules
import PropTypes from 'prop-types'

// Components
import MetaData from 'components/MetaData'

// Data
import { pageContentEntryIds } from 'data/page-content-ids'

// Services
import { getPageContent } from 'services/contentful-service'

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.home)
  const revalidate = (60 * 60) * 24

  return {
    props: {
      pageContent,
      revalidate,
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
