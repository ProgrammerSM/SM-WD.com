// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer1Styles = styled.div`
  position: relative;
  margin: 9px;

  .content-container-1-left-border,
  .content-container-1-right-border,
  .content-container-1-left-border::after,
  .content-container-1-right-border::before,
  .content-container-1-top-line,
  .content-container-1-right-line,
  .content-container-1-bottom-line,
  .content-container-1-left-line {
    position: absolute;
  }

  .content-container-1-left-border,
  .content-container-1-right-border {
    top: 0;
    bottom: 0;
    width: 75%;
    border-color: var(--color-primary);
  }

  .content-container-1-left-border::after,
  .content-container-1-right-border::before {
    width: 10%;
    border-color: var(--primary-color);
    content: '';
  }
  

  .content-container-1-left-border {
    left: 0;
    border-top: solid 2px;
    border-left: solid 2px;

    &::after {
      bottom: 0;
      left: 0;
      border-bottom: solid 2px;
    }
  }
  
  .content-container-1-right-border {
    right: 0;
    border-right: solid 2px;
    border-bottom: solid 2px;

    &::before {
      top: 0;
      right: 0;
      border-top: solid 2px;
    }
  }

  .content-container-1-top-line,
  .content-container-1-bottom-line {
    width: 60%;
    border-color: var(var(--accent-color-1));
  }

  .content-container-1-right-line,
  .content-container-1-left-line {
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    border-color: var(var(--accent-color-2));
  }

  .content-container-1-top-line {
    top: -10px;
    left: 20%;
    border-top: solid 4px;
  }

  .content-container-1-bottom-line {
    right: 20%;
    bottom: -10px;
    border-bottom: solid 4px;
  }

  .content-container-1-right-line {
    right: -10px;
    border-right: solid 4px;
  }

  .content-container-1-left-line {
    left: -10px;
    border-left: solid 4px;
  }
`

const ContentContainer1 = ({ children }) => (
  <ContentContainer1Styles>
    <div className='content-container-1-left-border'>
      <div className='content-container-1-top-line' />
      <div className='content-container-1-left-line' />
    </div>
    <div className='content-container-1-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
    <div className='content-container-1-right-border'>
      <div className='content-container-1-bottom-line' />
      <div className='content-container-1-right-line' />
    </div>
  </ContentContainer1Styles>
)

ContentContainer1.propTypes = { children: PropTypes.any }
export default ContentContainer1
