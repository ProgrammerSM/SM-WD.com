// Modules
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

// Components
import ContentContainer1 from './content-containers/ContentContainer1'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
/* eslint-disable indent, curly -- prop contional styles */
const SideBySideStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-standard);

  ${props => {
    if (props.mobileReverse) {
      return css`
        flex-direction: column-reverse;
      `
    }

    return css`
      flex-direction: column;
    `
  }}

  ${mediumUp} {

    ${props => {
      if (props.reverse) {
        return css`
          flex-direction: row-reverse;
        `
      }

      return css`
        flex-direction: row;
      `
    }}
  }
`
/* eslint-enable indent, curly -- prop contional styles */

const SideBySide = ({
  column1Content,
  column2Content,
  isReverse,
  isMobileReverse,
}) => (
  <SideBySideStyles
    mobileReverse={isMobileReverse}
    reverse={isReverse}
  >
    <ContentContainer1>{column1Content}</ContentContainer1>
    <ContentContainer1>{column2Content}</ContentContainer1>
  </SideBySideStyles>
)

SideBySide.propTypes = {
  column1Content: PropTypes.any,
  column2Content: PropTypes.any,
  isMobileReverse: PropTypes.any,
  isReverse: PropTypes.any,
}

export default SideBySide
