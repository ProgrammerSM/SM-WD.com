// Components
import Heading from 'components/Heading'
import MetaData from 'components/MetaData'

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
    </div>
  </>
)

export default Home
