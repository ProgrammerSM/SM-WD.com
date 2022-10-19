// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import AnimatedContent from 'components/AnimatedContent'
import ContentContainer1 from 'components/content-containers/ContentContainer1'
import ContentContainer2 from 'components/content-containers/ContentContainer2'
import ContentContainer3 from 'components/content-containers/ContentContainer3'
import ContentContainer4 from 'components/content-containers/ContentContainer4'
import ContentContainer5 from 'components/content-containers/ContentContainer5'
import ContentContainer6 from 'components/content-containers/ContentContainer6'
import MetaData from 'components/MetaData'
import SideBySide from 'components/SideBySide'
import SquareImage from 'components/SquareImage'
import WideContentContainer from 'components/content-containers/WideContentContainer'

// Services
import { getPageContent } from 'services/contentful-service'

const animatedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, blandit ac lobortis sed, tincidunt et ipsum. Integer fringilla bibendum libero, vitae tempor mauris dapibus eu. Fusce quis libero sed mauris varius sagittis. Fusce vel mi dignissim enim accumsan volutpat in vel odio. Aliquam vel purus vitae felis sagittis vestibulum eget ut nisi. Phasellus ut mattis tellus. Maecenas mattis quam vitae velit vulputate, ac imperdiet mauris fermentum. Nam tempor varius mattis.'

// Styles
const TempContainerWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 1.38rem;
  margin-top: 2rem;

  & > div {
    width: 100%;
    max-width: 488px;
  }
`

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
      <TempContainerWrapper>
        <ContentContainer1>
          <p>Content Container 1</p>
          <p>{animatedText}</p>
        </ContentContainer1>

        <ContentContainer2>
          <p>Content Container 2</p>
          <p>{animatedText}</p>
        </ContentContainer2>

        <ContentContainer3>
          <p>Content Container 3</p>
          <p>{animatedText}</p>
        </ContentContainer3>

        <ContentContainer4>
          <p>Content Container 4</p>
          <p>{animatedText}</p>
        </ContentContainer4>

        <ContentContainer5>
          <p>Content Container 5</p>
          <p>{animatedText}</p>
        </ContentContainer5>

        <ContentContainer6>
          <p>Content Container 6</p>
          <p>{animatedText}</p>
        </ContentContainer6>
      </TempContainerWrapper>
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
