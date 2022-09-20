// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

// Components
import Button from 'components/Button'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Styles
const AccessabilitySettingsStyles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  padding: var(--space-medium) 0;

  form {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-medium);
    width: 100%;
    height: 100%;
  }

  & > fieldset { width: 100%; }

  fieldset { 
    border-color: var(--primary-color);
    box-shadow: inset 0 0 5px 1px var(--primary-color);

    legend { background-color: var(--background-color); }
  }

  .save-button-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`

const AccessabilitySettings = () => {
  const {
    isAnimationActive,
    isSoundActive,
    setIsAnimationActive,
    setIsSoundActive,
  } = useContext(SettingsContext)

  const {
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      appAnimation: isAnimationActive,
      appSound: isSoundActive,
    },
  })

  const accessabilitySettingsSaveHandler = data => {
    const {
      appSound,
      appAnimation,
    } = data

    if (appSound !== isSoundActive)
      setIsSoundActive(appSound)

    if (appAnimation !== isAnimationActive)
      setIsAnimationActive(appAnimation)
  }

  return (
    <AccessabilitySettingsStyles>
      <form>
        <fieldset className='accessibility'>
          <legend>Accessibility</legend>
          <label htmlFor='app-sound'>Sound</label>
          <input
            id='app-sound'
            type='checkbox'
            {...register('appSound')}
          />
          <label htmlFor='app-sound'>Animation</label>
          <input
            id='app-animation'
            type='checkbox'
            {...register('appAnimation')}
          />
        </fieldset>
        <div className='save-button-wrapper'>
          <Button
            className='save-button'
            onClickHandler={handleSubmit(accessabilitySettingsSaveHandler)}
          >Apply</Button>
        </div>
      </form>
    </AccessabilitySettingsStyles>
  )
}

AccessabilitySettings.propTypes = {}
export default AccessabilitySettings
