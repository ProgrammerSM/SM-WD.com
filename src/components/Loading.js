// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'

// Context
import { LoadingContext } from 'context/LoadingContext'

// Styles
const LoadingStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  z-index: 3;
`

const Loading = () => {
  const { loading: { loadingMessage }} = useContext(LoadingContext)
  return (
    <LoadingStyles>
      {loadingMessage}
    </LoadingStyles>
  )
}

Loading.propTypes = {}
export default Loading
