// Modules
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  faEnvelopeOpenText,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// Components
import Banner from 'components/content-containers/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import MetaData from 'components/MetaData'

// Context
import { BreakpointContext } from 'context/BreakpointContext'
import { LoadingContext } from 'context/LoadingContext'

// Data
import { pageContentEntryIds } from 'data/page-content-ids'
import { pageRevalidate } from 'data/page-revalidate'
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
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: var(--space-medium);

  a,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  button { background-color: transparent; }  
  .icon { color: var(--font-color); }
  .contact, .linkedIn { font-size: 1.2rem; }

  ${mediumUp} {
    top: .85rem;
    right: 1.5rem;
    flex-direction: row;
    gap: var(--space-large);
    
    .contact,
    .pdf {
      font-size: 1.75rem;
    }
    
    .linkedIn { font-size: 2rem; }
  }
`

export const getStaticProps = async () => {

  const pageContent = await getPageContent(pageContentEntryIds.resume)

  return {
    props: {
      pageContent,
      revalidate: pageRevalidate.resume,
    },
  }
}

const Resume = ({ pageContent }) => {
  const monthStarted = 11
  const yearStarted = 2015
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  let yearsWorked = currentYear - yearStarted

  if (currentMonth < monthStarted)
    yearsWorked = `over ${yearsWorked - 1}`

  if (currentMonth === 12)
    yearsWorked = `over ${yearsWorked}`

  const breakpoints = useContext(BreakpointContext)
  const {
    loadingOverlay,
    setLoadingOverlay,
  } = useContext(LoadingContext)

  const resumeRef = useRef()
  const hasCompletedRef = useRef(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    if (loadingOverlay.isComplete)
      hasCompletedRef.current = true
  }, [loadingOverlay])

  const checkFlag = () => {
    if (!hasCompletedRef.current)
      setTimeout(checkFlag, 50)
    else
      html2Canvas(resumeRef.current, { scale: 1 })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new JsPDF()
          pdf.addImage(imgData, 'JPEG', 0, 0)
          pdf.save('sterling-may-resume.pdf')
        })
        .finally(() => {
          hasCompletedRef.current = false
          setIsGeneratingPDF(false)
          setLoadingOverlay({
            isComplete: false,
            loading: false,
            loadingMessage: 'Loading',
          })
        })
  }

  const resumeClickHandler = () => {
    setLoadingOverlay({
      isComplete: false,
      isLoading: true,
      loadingMessage: 'Generating PDF',
    })

    setIsGeneratingPDF(true)
    checkFlag()
  }

  const {
    contactLink: { fields: { buttonOrLinkTitle: contactLinkTitle }},
    linkedInProfileLink: {
      fields: {
        linkUrl,
        buttonOrLinkTitle: linkedInProfileTitle,
      },
    },
    otherWorkExperienceSection: {
      fields: {
        workExperience: otherWorkExperience,
        workExperienceSectionTitle: otherWorkExperienceTitle,
      },
    },
    resumePageMetaData,
    resumePdfButton: { fields: { buttonOrLinkTitle: pdfTitle }},
    shared: { fields: { isLooking }},
    skillsSection: {
      fields: {
        skills,
        skillsSectionTitle,
      },
    },
    summarySection: {
      fields: {
        resumeSummarySectionTitle,
        summaryDetails,
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
    <>
      <MetaData data={resumePageMetaData?.fields} />
      {(!isLooking && pageContent?.resumeBanner) && (
        <Banner
          heading={pageContent?.resumeBanner?.fields?.bannerHeading}
          message={pageContent?.resumeBanner?.fields?.bannerMessage}
        />
      )}
      <div
        style={{
          backgroundColor: 'var(--transparent-background)',
          border: '2px solid var(--primary-color)',
          padding: '.75rem 1.5rem',
          position: 'relative',
        }}
      >
        <ResumeButtons>
          {isLooking && (
            <>
              <Link
                passHref
                href='/contact'
              >
                <a
                  aria-label={contactLinkTitle}
                  title={contactLinkTitle}
                >
                  <span className='icon contact'>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                  </span>
                </a>
              </Link>
              {breakpoints.desktop && (
                <button
                  aria-label={pdfTitle}
                  title={pdfTitle}
                  type='button'
                  onClick={resumeClickHandler}
                >
                  <span className='icon pdf'>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </span>
                </button>
              )}
            </>
          )}
          <a
            aria-label={linkedInProfileTitle}
            href={linkUrl}
            rel='noreferrer'
            target='_blank'
            title={linkedInProfileTitle}
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
    </>
  )
}

Resume.propTypes = {
  pageContent: PropTypes.shape({
    contactLink: PropTypes.shape({ fields: PropTypes.shape({ buttonOrLinkTitle: PropTypes.string }) }),
    linkedInProfileLink: PropTypes.shape({
      fields: PropTypes.shape({
        buttonOrLinkTitle: PropTypes.string,
        linkUrl: PropTypes.string,
      }),
    }),
    otherWorkExperienceSection: PropTypes.shape({
      fields: PropTypes.shape({
        workExperience: PropTypes.arrayOf(PropTypes.object),
        workExperienceSectionTitle: PropTypes.string,
      }),
    }),
    resumeBanner: PropTypes.shape({
      fields: PropTypes.shape({
        bannerHeading: PropTypes.string,
        bannerMessage: PropTypes.string,
      }),
    }),
    resumePageMetaData: PropTypes.shape({ fields: PropTypes.object }),
    resumePdfButton: PropTypes.shape({ fields: PropTypes.shape({ buttonOrLinkTitle: PropTypes.string }) }),
    shared: PropTypes.shape({ fields: PropTypes.shape({ isLooking: PropTypes.bool }) }),
    skillsSection: PropTypes.shape({
      fields: PropTypes.shape({
        skills: PropTypes.arrayOf(PropTypes.string),
        skillsSectionTitle: PropTypes.string,
      }),
    }),
    summarySection: PropTypes.shape({
      fields: PropTypes.shape({
        resumeSummarySectionTitle: PropTypes.string,
        summaryDetails: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    workExperienceSection: PropTypes.shape({
      fields: PropTypes.shape({
        workExperience: PropTypes.arrayOf(PropTypes.object),
        workExperienceSectionTitle: PropTypes.string,
      }),
    }),
  }),
}

export default Resume
