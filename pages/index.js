// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import AnimatedContent from 'components/AnimatedContent'
import ContentContainer4 from 'components/content-containers/ContentContainer4'
import MetaData from 'components/MetaData'

// Services
import { getPageContent } from 'services/contentful-service'

const animatedText = '<h1>Lorem ipsum dolor sit amet</h1> <a href=\'/\'>consectetur</a> <p>adipiscing elit.</p> <ul><li>Sed augue ante</li><li>blandit ac lobortis sed</li><li>tincidunt et ipsum</li></ul> <p>Integer fringilla bibendum libero, vitae tempor mauris dapibus eu.</p> <p>Fusce quis libero sed mauris varius sagittis. Fusce vel mi dignissim enim accumsan volutpat in vel odio. Aliquam vel purus vitae felis sagittis vestibulum eget ut nisi. Phasellus ut mattis tellus. Maecenas mattis quam vitae velit vulputate, ac imperdiet mauris fermentum. Nam tempor varius mattis.</p>'

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
  <>
    <MetaData />
    <ContentContainer4>
      <AnimatedContent
        content={animatedText}
      />
    </ContentContainer4>
  </>
)

Home.propTypes = {
  pageContent: PropTypes.shape({
    align: PropTypes.string,
    headingText: PropTypes.string,
    headingType: PropTypes.string,
  }),
}

export default Home
