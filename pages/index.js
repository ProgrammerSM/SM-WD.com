// Modules
import PropTypes from 'prop-types'

// Components
import AnimatedContent from 'components/AnimatedContent'
import MetaData from 'components/MetaData'
import SquareImage from 'components/SquareImage'
import WideContentContainer from 'components/WideContentContainer'

// Services
import { getPageContent } from 'services/contentful-service'

const animatedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, blandit ac lobortis sed, tincidunt et ipsum. Integer fringilla bibendum libero, vitae tempor mauris dapibus eu. Fusce quis libero sed mauris varius sagittis. Fusce vel mi dignissim enim accumsan volutpat in vel odio. Aliquam vel purus vitae felis sagittis vestibulum eget ut nisi. Phasellus ut mattis tellus. Maecenas mattis quam vitae velit vulputate, ac imperdiet mauris fermentum. Nam tempor varius mattis.'

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
    <div>
      <WideContentContainer headingData={pageContent}>
        <AnimatedContent text={animatedText} />
      </WideContentContainer>
      <SquareImage
        height={200}
        image='https://spaceholder.cc/1000x200'
        imageAlt='testing'
        width={1000}
      />
    </div>
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
