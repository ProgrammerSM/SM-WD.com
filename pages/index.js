// Modules
import PropTypes from 'prop-types'

// Components
import MetaData from 'components/MetaData'

// Services
import { getPageContent } from 'services/contentful-service'

export const getStaticProps = async () => {

  const pageContent = await getPageContent('2dvhMSJAAU0REAkU9JEe6p')
  const revalidate = (60 * 60) * 24

  return {
    props: {
      pageContent,
      revalidate,
    },
  }
}

const Home = ({ pageContent }) => (
  <MetaData />
)

Home.propTypes = {
  pageContent: PropTypes.shape({
    align: PropTypes.string,
    headingText: PropTypes.string,
    headingType: PropTypes.string,
  }),
}

export default Home
