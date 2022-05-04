// Components
import Button from 'components/Button'
import Heading from 'components/Heading'
import MetaData from 'components/MetaData'
import SquareImage from 'components/SquareImage'

const Home = () => (
  <>
    <MetaData />
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Heading isCenter>Website Coming Soon</Heading>
      <Button>Test Button</Button>
      <SquareImage
        height={400}
        image='https://spaceholder.cc/800x400'
        imageAlt='test alt text'
        width={800}
      />
    </div>
  </>
)

export default Home
