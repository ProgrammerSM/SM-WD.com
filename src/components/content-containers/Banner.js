// Modules
import PropTypes from 'prop-types'

// Components
import styled from 'styled-components'

const BannerStyles = styled.div`
  position: relative;
  margin: 8px auto calc(var(--space-extra-small) + 8px);
  background: linear-gradient(to right, transparent, var(--transparent-background), transparent);

  .banner-top-shape {
    position: absolute;
    top: -8px;
    left: 20%;
    width: 60%;
    height: 20px;
    border-top: 4px solid var(--accent-color-1);
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  }

  hr {
    height: 2px;
    margin: 0;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
    border: none;
  }

  .banner-content-container {
    padding: var(--space-small) 8vw;
    text-align: center;
    
    h5 {
      margin: 0 0 .25rem;
      font-size: 1rem;
    }

    p {
      margin-bottom: 0;
      font-size: 14px;
    }
  }

  .banner-bottom-border {
    position: absolute;
    bottom: -8px;
    left: 35%;
    width: 30%;
    height: 20px;
    border-bottom: 4px solid var(--accent-color-1);
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  }
`

const Banner = ({
  message,
  heading,
}) => (
  <BannerStyles>
    <div className='banner-top-shape' />
    <hr />
    <div className='banner-content-container'>
      {heading && <h5>{heading}</h5>}
      {message && <p>{message}</p>}
    </div>
    <hr />
    <div className='banner-bottom-border' />
  </BannerStyles>
)

Banner.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
}

export default Banner
