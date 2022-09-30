// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer2Styles = styled.div`
  position: relative;
  margin: 9px;
  
  .content-container-2-content {
    > *:last-of-type {
      margin-bottom: 0;
    }
  }

  .content-container-2-bottom-corner-shape,
  .content-container-2-bottom-corner-shape::before,
  .content-container-2-bottom-corner-shape::after,
  .content-container-2-top-corner-shape,
  .content-container-2-top-corner-shape::before,
  .content-container-2-top-corner-shape::after {
    position: absolute;
  }

  .content-container-2-bottom-corner-shape,
  .content-container-2-top-corner-shape {
    top: 0;
    width: 75%;
    height: 100%;
  }

  .content-container-2-bottom-corner-shape {
    left: 0;
    border-bottom: solid 2px var(--primary-color);
    border-left: solid 2px var(--primary-color);

    &::before {
      top: 20px;
      left: -10px;
      border-left: solid 4px;
    }

    &::after {
      bottom: -10px;
      left: -2px;
      border-bottom: solid 4px;
    }
  }

  .content-container-2-top-corner-shape {
    right: 0;
    border-top: solid 2px var(--primary-color);
    border-right: solid 2px var(--primary-color);

    &::before {
      top: -10px;
      right: -2px;
      border-top: solid 4px;
    }

    &::after {
      right: -10px;
      bottom: 20px;
      border-right: solid 4px;
    }
  }

  .content-container-2-bottom-corner-shape::before,
  .content-container-2-bottom-corner-shape::after,
  .content-container-2-top-corner-shape::before,
  .content-container-2-top-corner-shape::after {
    content: '';
  }

  .content-container-2-top-corner-shape::after,
  .content-container-2-bottom-corner-shape::before {
    height: 20%;
    border-color: var(--accent-color-2);
  }
  .content-container-2-top-corner-shape::before,
  .content-container-2-bottom-corner-shape::after {
    width: 75%;
    border-color: var(--accent-color-1);
  }
`

const ContentContainer2 = ({ children }) => (
  <ContentContainer2Styles>
    <div className='content-container-2-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
    <div className='content-container-2-top-corner-shape' />
    <div className='content-container-2-bottom-corner-shape' />
  </ContentContainer2Styles>
)

ContentContainer2.propTypes = { children: PropTypes.any }
export default ContentContainer2
