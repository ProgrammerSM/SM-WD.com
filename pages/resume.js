// Modules
import PropTypes from 'prop-types'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import styled from 'styled-components'
import {
  useContext,
  useRef,
  useState,
} from 'react'

// Context
import { LoadingContext } from 'context/LoadingContext'

// Services
import { getPageContent } from 'services/contentful-service'

// Styles
const generatingStyles = {
  color: '#000000',
  fontSize: '14px',
  padding: '0 32px',
  width: '800px',
}

const ResumeStyles = styled.div`
  h1 {
    padding-bottom: var(--space-extra-small);
    border-bottom: 2px solid;
  }

  h4 { margin: .5rem 0; }
  
  ul {
    margin: var(--space-medium);
    padding-left: var(--space-medium);
  }

  li {
    position: relative;
    margin-bottom: 5px;

    &::before {
      position: absolute;
      top: 10px;
      left: -20px;
      transform: translateY(-50%);
      content: '◦'
    }
  }

  .resume-columns {
    display: flex;
    gap: var(--space-jumbo);
    margin-bottom: var(--space-extra-large);
  }

  .skills-wrapper { width: 25%; }

  .skills {
    height: 95%;
    border-right: 1px solid;
  }

  .experience-wrapper { width: 75%; }

  .company-details {
    margin-bottom: 0;
  }

  .company {
    font-size: 1.1rem;
  }

  .role {
    font-style: italic;
  }

  
`

export const getStaticProps = async () => {

  const pageContent = await getPageContent('R1gur8BkliujKaWku2pCS')
  const revalidate = (60 * 60) * 24

  return {
    props: {
      pageContent,
      revalidate,
    },
  }
}

const Resume = ({ pageContent }) => {
  const { setLoading } = useContext(LoadingContext)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const resumeRef = useRef()

  const resumeClickHandler = () => {
    const resume = resumeRef.current
    setLoading({
      isLoading: true,
      loadingMessage: 'Generating PDF',
    })

    setIsGeneratingPDF(true)

    setTimeout(() => {
      html2Canvas(resume, { scale: 1 })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new JsPDF()
          pdf.addImage(imgData, 'JPEG', 0, 0)
          // Pdf.output('dataurlnewwindow')
          pdf.save('sterling-may-resume.pdf')
        })
        .finally(() => {
          setIsGeneratingPDF(false)
          setLoading({
            loading: false,
            loadingMessage: 'Loading',
          })
        })
    }, 100)
  }

  const {
    summarySection: {
      fields: {
        resumeSummarySectionTitle,
        summaryDetails,
      },
    },
    skillsSection: {
      fields: {
        skills,
        skillsSectionTitle,
      },
    },
    workExperienceSection: {
      fields: {
        workExperience,
        workExperienceSectionTitle,
      },
    },
  } = pageContent

  return (
    <div
      style={{
        backgroundColor: 'var(--transparent-background)',
        border: '2px solid var(--primary-color)',
        padding: '.75rem 1.5rem',
      }}
    >
      <ResumeStyles ref={resumeRef}>
        <div style={isGeneratingPDF ? generatingStyles : {}}>
          {isGeneratingPDF && <h1>Sterling May</h1>}
          <h4>{resumeSummarySectionTitle}</h4>
          <ul>
            {summaryDetails.map((summaryItem, index) => (
              <li key={`summary-item-${index}`}>{summaryItem}</li>
            ))}
          </ul>
          <div className='resume-columns'>
            <div className='skills-wrapper'>
              <div className='skills'>
                <h4>{skillsSectionTitle}</h4>
                <ul>
                  {skills.map((skillsItem, index) => (
                    <li key={`skills-item-${index}`}>{skillsItem}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='experience-wrapper'>
              <h4>{workExperienceSectionTitle}</h4>
              {workExperience.map((workExperiencObject, index) => {
                const {
                  companyName,
                  experienceDetail,
                  positionTitle,
                  workExperienceDuration: {
                    fields: {
                      currentPosition,
                      endMonth,
                      endYear,
                      startMonth,
                      startYear,
                    },
                  },
                  workExperienceLocation: {
                    fields: {
                      city,
                      state,
                    },
                  },
                } = workExperiencObject.fields

                return (
                  <div
                    className='experience'
                    key={`work-experience-${index}`}
                  >
                    <p className='company-details'>
                      <strong
                        className='company'
                        style={isGeneratingPDF ? { color: 'blue' } : {}}
                      >{companyName} - {city}, {state}</strong>
                      <span className='role'> — {positionTitle}</span>
                    </p>
                    <p className='duration'>{`
                      ${startMonth} ${startYear} - ${currentPosition
                        ? 'Current'
                        : `${endMonth} ${endYear}`
                      }
                    `}</p>
                    <ul>
                      {experienceDetail.map((experienceDetail, index) => (
                        <li key={`experience-detail-${index}`}>{experienceDetail}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </ResumeStyles>
      <button
        type='button'
        onClick={resumeClickHandler}
      >Print Resume</button>
    </div>
  )
}

Resume.propTypes = { pageContent: PropTypes.any }export default Resume
