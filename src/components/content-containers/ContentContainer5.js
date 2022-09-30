// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer5Styles = styled.div`
  position: relative;
  margin: 9px;
`

const ContentContainer5 = ({ children }) => (
  <ContentContainer5Styles>
    <div className='content-container-5-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
  </ContentContainer5Styles>
)

ContentContainer5.propTypes = { children: PropTypes.any }
export default ContentContainer5
