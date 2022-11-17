// Modules
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useRef,
  useState,
} from 'react'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Context
import { BreakpointContext } from 'context/BreakpointContext'
import { LoadingContext } from 'context/LoadingContext'

// Data
import {
  largeUp,
  medium,
  mediumUp,
} from 'data/media-queries'

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
  &.other-work-experience {
    .experience:last-of-type .duration {
      margin-bottom: .5rem;
    }
  }
  
  h1 {
    padding-bottom: var(--space-extra-small);
    border-bottom: 2px solid;
  }

  h4 { margin: .5rem 0; }
  
  ul {
    margin: var(--space-medium);
    margin-bottom: 0;
    padding-left: var(--space-medium);
  }

  li {
    position: relative;
    margin-bottom: 5px;

    &::before,
    &::after {
      position: absolute;
      top: 10px;
      transform: translateY(-50%);
    }

    &::before {
      left: -20px;
      content: '⚬';
    }
  }

  .resume-columns {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--space-extra-large);
  }

  .skills-wrapper,
  .experience-wrapper { width: 100%; }  
  .company-details { margin-bottom: 0; }
  .company { font-size: 1.1rem; }
  .role { font-style: italic; }

  ${medium} {
    .skills ul {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      column-gap: var(--space-medium);
      padding-left: 0;

      
      li::before { content: ''; }
      li:not(:last-of-type)::after {
        right: -22px;
        content: '⚬';
      }
    }
  }

  ${mediumUp} {
    ul { margin-bottom: var(--space-medium); }
    .skills li { margin-right: var(--space-medium); }
  }

  ${largeUp} {
    .resume-columns {
      flex-direction: row;
      gap: var(--space-jumbo);
    }
    
    .skills-wrapper { width: 25%; }
    .skills {
      height: 100%;
      border-right: 1px solid;

      ul {
        display: block;
        padding-left: var(--space-medium);

        li {          
          &::before { content: '⚬'; }
          &:not(:last-of-type)::after { content: ''; }
        }
      }
    }
    
    .experience-wrapper { width: 75%; }
  }
`

const ResumeButtons = styled.div`
  position: absolute;
  top: .85rem;
  right: 1.5rem;
  display: flex;
  gap: var(--space-large);

  a,
  button {
    padding: 0;
  }

  button { background-color: transparent; }  
  .icon { color: var(--font-color); }
  .pdf { font-size: 1.76rem; }
  .linkedIn { font-size: 2rem; }
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
  const yearStarted = 2015
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  let yearsWorked = currentYear - yearStarted

  if (currentMonth === 12)
    yearsWorked = `over ${yearsWorked}`

  const breakpoints = useContext(BreakpointContext)
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
    isLooking,
    linkedInProfileLink: { fields: { linkUrl }},
    otherWorkExperienceSection: {
      fields: {
        workExperience: otherWorkExperience,
        workExperienceSectionTitle: otherWorkExperienceTitle,
      },
    },
    resumePdfButton: { fields: { buttonOrLinkTitle }},
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
        position: 'relative',
      }}
    >
      <ResumeButtons>
        {(isLooking && breakpoints.desktop) && (
          <button
            aria-label={buttonOrLinkTitle}
            title={buttonOrLinkTitle}
            type='button'
            onClick={resumeClickHandler}
          >
            <span className='icon pdf'>
              <FontAwesomeIcon icon={faFilePdf} />
            </span>
          </button>
        )}
        <a
          href={linkUrl}
          rel='noreferrer'
          target='_blank'
        >
          <span className='icon linkedIn'>
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        </a>
      </ResumeButtons>
      <ResumeStyles ref={resumeRef}>
        <div style={isGeneratingPDF ? generatingStyles : {}}>
          {isGeneratingPDF && <h1>Sterling May</h1>}
          <h4>{resumeSummarySectionTitle}</h4>
          <ul>
            {summaryDetails.map((summaryItem, index) => {
              const summaryText = summaryItem.replace('[Years]', yearsWorked)
              return <li key={`summary-item-${index}`}>{summaryText}</li>
            })}
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
                      {experienceDetail.map((experience, experienceIndex) => (
                        <li key={`experience-detail-${experienceIndex}`}>{experience}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </ResumeStyles>
      <ResumeStyles className='other-work-experience'>
        <h4>{otherWorkExperienceTitle}</h4>
        {otherWorkExperience.map((workExperiencObject, index) => {
          const {
            companyName,
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
            </div>
          )
        })}
      </ResumeStyles>
    </div>
  )
}

Resume.propTypes = { pageContent: PropTypes.shape({ isLooking: PropTypes.any }) }
export default Resume
