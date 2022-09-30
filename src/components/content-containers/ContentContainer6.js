// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer6Styles = styled.div`
  position: relative;
  margin: 9px;
`

const ContentContainer6 = ({ children }) => (
  <ContentContainer6Styles>
    <div className='content-container-6-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
  </ContentContainer6Styles>
)

ContentContainer6.propTypes = { children: PropTypes.any }
export default ContentContainer6
