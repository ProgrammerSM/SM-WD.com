// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer3Styles = styled.div`
  position: relative;
  margin: 8px 9px;

  .content-container-3-lower-thin-corner,
  .content-container-3-lower-thin-corner::before,
  .content-container-3-lower-thick-corner,
  .content-container-3-upper-thin-corner,
  .content-container-3-upper-thin-corner::after,
  .content-container-3-upper-thick-corner {
    position: absolute;
  }

  .content-container-3-lower-thin-corner,
  .content-container-3-upper-thin-corner {
    width: 30%;
    height: 80%;
    border-color: var(--primary-color);
  }

  .content-container-3-lower-thin-corner::before,
  .content-container-3-upper-thin-corner::after {
    height: 20%;
    border-color: var(--accent-color-2);
    content: "";
  }

  .content-container-3-lower-thick-corner,
  .content-container-3-upper-thick-corner {
    width: 80%;
    height: 30%;
    border-color: var(--accent-color-1);
  }
  
  .content-container-3-lower-thin-corner {
    bottom: 0;
    left: 0;
    border-bottom: solid 2px;
    border-left: solid 2px;

    &::before {
      bottom: 20px;
      left: -10px;
      border-left: solid 4px;
    }
  }

  .content-container-3-upper-thin-corner {
    top: 0;
    right: 0;
    border-top: solid 2px;
    border-right: solid 2px;

    &::after {
      top: 20px;
      right: -10px;
      border-right: solid 4px;
    }
  }

  .content-container-3-lower-thick-corner {
    top: -8px;
    left: -8px;
    border-top: solid 4px;
    border-left: solid 4px;
  }

  .content-container-3-upper-thick-corner {
    right: -8px;
    bottom: -8px;
    border-right: solid 4px;
    border-bottom: solid 4px;
  }
`

const ContentContainer3 = ({ children }) => (
  <ContentContainer3Styles>
    <div className='content-container-3-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
    <div className='content-container-3-lower-thin-corner' />
    <div className='content-container-3-lower-thick-corner' />
    <div className='content-container-3-upper-thin-corner' />
    <div className='content-container-3-upper-thick-corner' />
  </ContentContainer3Styles>
)

ContentContainer3.propTypes = { children: PropTypes.any }
export default ContentContainer3
