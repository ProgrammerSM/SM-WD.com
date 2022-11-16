// Modules
import styled from 'styled-components'

// Components
import ContactForm from 'components/ContactForm'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const ContactPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-large);
  min-height: 100%;

  & > div {
    width: 100%;
  }

  ${mediumUp} {
    flex-direction: row;

    & > div {
      width: 50%;
    }
  }
`

const Contact = () => (
  <ContactPageStyles>
    <div>test section</div>
    <ContactForm />
  </ContactPageStyles>
)

export default Contact
