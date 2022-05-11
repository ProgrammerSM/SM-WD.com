// Components
import AnimatedContent from 'components/AnimatedContent'
import Heading from 'components/Heading'
import MetaData from 'components/MetaData'
import NavMenu from 'components/navigaton-menu/NavMenu'

const animatedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed augue ante, blandit ac lobortis sed, tincidunt et ipsum. Integer fringilla bibendum libero, vitae tempor mauris dapibus eu. Fusce quis libero sed mauris varius sagittis. Fusce vel mi dignissim enim accumsan volutpat in vel odio. Aliquam vel purus vitae felis sagittis vestibulum eget ut nisi. Phasellus ut mattis tellus. Maecenas mattis quam vitae velit vulputate, ac imperdiet mauris fermentum. Nam tempor varius mattis.'
const Home = () => (
  <>
    <MetaData />
    <div>
      <Heading isCenter>Website Coming Soon</Heading>
      <AnimatedContent text={animatedText} />
      <NavMenu />
    </div>
  </>
)

export default Home
