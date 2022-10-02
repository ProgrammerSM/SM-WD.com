// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styles
const ContentContainer4Styles = styled.div`
  position: relative;
  margin: 9px;

  .content-container-4-border-top-shape,
  .content-container-4-top-bottom-border,
  .content-container-4-left-right-border,
  .content-container-4-border-bottom-shape {
    position: absolute;
  }

  .content-container-4-border-top-shape,
  .content-container-4-border-bottom-shape {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    width: 100%;
    height: 20px;
  }

  .content-container-4-left-shape-border,
  .content-container-4-center-shape::before,
  .content-container-4-center-shape,
  .content-container-4-center-shape::after,
  .content-container-4-right-shape-border {
    border-color: var(--accent-color-1);
  }
  
  .content-container-4-left-shape-border,
  .content-container-4-center-shape,
  .content-container-4-right-shape-border {
    width: 100%;
  }

  .content-container-4-border-top-shape .content-container-4-center-shape::before,
  .content-container-4-border-bottom-shape .content-container-4-center-shape::after {
    transform: rotate(-35deg);
  }

  .content-container-4-border-top-shape .content-container-4-center-shape::after,
  .content-container-4-border-bottom-shape .content-container-4-center-shape::before {
    transform: rotate(35deg);
  }

  .content-container-4-border-top-shape {
    top: -8px;

    .content-container-4-left-shape-border,
    .content-container-4-right-shape-border {
      border-top: solid 4px;
    }

    .content-container-4-center-shape {
      border-bottom: solid 4px;

      &::before,
      &::after {
        bottom: -4px;
      }
    }
  }

  .content-container-4-center-shape {
    position: relative;

    &::before,
    &::after {
      position: absolute;
      height: 20px;
      content: '';
    }

    &::before {
      left: -7px;
      border-left: solid 4px;
    }

    &::after {
      right: -7px;
      border-right: solid 4px;
    }
  }

  .content-container-4-top-bottom-border {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100%;
    border-top: solid 2px var(--primary-color);
    border-bottom: solid 2px var(--primary-color);
    transform: translateX(-50%);
  }

  .content-container-4-left-right-border {
    top: 50%;
    width: 100%;
    height: 20%;
    transform: translateY(-50%);
    border-right: solid 4px var(--accent-color-2);
    border-left: solid 4px var(--accent-color-2);
  }

  .content-container-4-border-bottom-shape {
    bottom: -8px;
    
    .content-container-4-left-shape-border,
    .content-container-4-right-shape-border {
      border-bottom: solid 4px;
    }

    .content-container-4-center-shape {
      border-top: solid 4px;

      &::before,
      &::after {
        top: -4px;
      }
    }
  }
`

const ContentContainer4 = ({ children }) => (
  <ContentContainer4Styles>
    <div className='content-container-4-border-top-shape'>
      <div className='content-container-4-left-shape-border' />
      <div className='content-container-4-center-shape' />
      <div className='content-container-4-right-shape-border' />
    </div>
    <div className='content-container-4-top-bottom-border' />
    <div className='content-container-4-wrapper'>
      <div className='content-container scroller'>
        {children}
      </div>
    </div>
    <div className='content-container-4-left-right-border' />
    <div className='content-container-4-border-bottom-shape'>
      <div className='content-container-4-left-shape-border' />
      <div className='content-container-4-center-shape' />
      <div className='content-container-4-right-shape-border' />
    </div>
  </ContentContainer4Styles>
)

ContentContainer4.propTypes = { children: PropTypes.any }
export default ContentContainer4
