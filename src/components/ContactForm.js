// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  useEffect,
  useRef,
} from 'react'

// Components
import Button from './Button'
import ReCAPTCHA from 'react-google-recaptcha'

// Data
import {
  largeUp,
  mediumUp,
} from 'data/media-queries'

// Styles
const ContactFormStyles = styled.div`
  --left-shape-width: 0;
  --field-width: 100%;
  
  ${mediumUp} {
    --left-shape-width: 20%;
    --field-width: calc(100% - var(--left-shape-width));
  }
 
  ${largeUp} { --left-shape-width: 25%; }
  
  fieldset {
    padding: 2rem 0 2.5rem;
    border: none;
  }
  
  .field-wrapper {
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-bottom: 4.2rem;
    margin-left: auto;

    &:last-of-type { margin-bottom: 0; }
  }
  
  .field-left-shape {
    position: absolute;
    top: 0;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    row-gap: 2px;
    width: var(--left-shape-width);
    height: calc(100% + 30px);
    padding: 2px;
    border-right: solid 2px var(--primary-color);
    border-bottom: solid 2px var(--primary-color);

    &::before {
      position: absolute;
      bottom: -5px;
      left: -5px;
      width: 8px;
      height: 8px;
      background-color: var(--primary-color);
      border-radius: 50%;
      content: '';
    }

    .shape-lines {
      width: 25%;
      height: 4px;
      background-color: var(--primary-color);
      border-radius: 4px;
    }
  }
  
  input,
  textarea {
    width: var(--field-width);
    height: 60px;
    margin-left: auto;
    padding: 20px 20px var(--space-extra-small) var(--space-extra-small);
    background: var(--transparent-background);
    color: var(--font-color);
    font-size: 1.2rem;
    border: solid 2px var(--primary-color);

    &:focus ~ .field-angle-border {
      display: none;
    }

    &:focus ~ label,
    &.valid ~ label {
      top: -26px;
      font-size: 1rem;

      .field-type { margin-top: 4px; }
    }
  }

  textarea {
    resize: none;
    transition: height .2s linear;
    
    &:focus,
    &.valid {
      height: 100px;
    }
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--font-color);
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .field-angle-border {
    position: absolute;
    right: -14px;
    bottom: -12px;
    width: 30px;
    height: 30px;
    background-color: var(--background-color);
    border-top: solid 2px var(--primary-color);
    transform: rotate(-48deg);
  }

  label {
    position: absolute;
    top: 2px;
    left: var(--left-shape-width);
    padding-left: var(--space-extra-small);
    font-size: 1.5rem;
    font-weight: 600;
    font-family: var(--header-font);
    transition: all .2s linear;
  }

  .field-type {
    display: block;
    font-size: .85rem;
    font-weight: 400;
    font-family: var(--primary-font);
  }

  .error {
    position: absolute;
    top: calc(100% + 5px);
    left: var(--left-shape-width);
    margin: 0 var(--space-extra-small);
    color: red;
    font-size: .89rem;
    font-weight: 600;
  }

  button[type='submit'] { margin: 9px auto 0; }

  ${mediumUp} {
    .field-wrapper { margin-bottom: 4.5rem; }
    .field-left-shape { display: flex; }

    input,
    textarea {
      border-left: none;
    }

    .error { font-size: inherit; }
  }

  ${largeUp} {
    .field-wrapper { margin-bottom: 3rem; }
  }
`

// Variables
const isProduction = process.env.NODE_ENV === 'production'

const ContactForm = () => {
  const nameRegEx = /^[A-Za-zÀ-ÿ-,.']+$/
  const recaptchaRef = useRef()
  const router = useRouter()

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm()

  const allWatch = watch()

  const onSubmit = async data => {
    if (!isProduction) {
      console.log(data)
      router.push('/contact/thank-you')
      return
    }

    const recaptchaToken = await recaptchaRef.current.executeAsync()

    if (recaptchaToken) {
      const formData = new FormData()
      Object.keys(data).forEach(key => { formData.append(key, data[key]) })
      formData.append('g-recaptcha-response', recaptchaToken)

      fetch(process.env.FORMSPREE_CONTACT_FORM, {
        body: formData,
        headers: { Accept: 'application/json' },
        method: 'POST',
      }).then(response => {
        if (response.ok)
          router.push('/contact/thank-you')
        else {
          response.json().then(responseData => {
            if (Object.hasOwn(responseData, 'errors'))
              console.error(responseData['errors'].map(error => error['message']).join(', '))
            else
              console.error('Oops! There was a problem submitting your form')
          })

          recaptchaToken.current.reset()
        }
      }).catch(() => {
        console.error('Oops! There was a problem submitting your form')
        recaptchaToken.current.reset()
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const form = document.querySelector('form')
      form && form.reset()
    }
  }, [])

  return (
    <ContactFormStyles>
      <form
        name='sm-wd-contact'
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <div className='field-wrapper'>
            <div className='field-left-shape'>
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
            </div>
            <input
              className={allWatch?.['First Name'] && 'valid'}
              id='first_name'
              type='text'
              {...register('First Name', {
                maxLength: 80,
                pattern: nameRegEx,
                required: true,
              })}
            />
            <div className='field-angle-border' />
            <label htmlFor='first_name'>First Name <span className='field-type'>required</span></label>

            {errors['First Name']?.type === 'maxLength' && (
              <p
                className='error'
                role='alert'
              >Character limit exceeded</p>
            )}

            {errors['First Name']?.type === 'pattern' && (
              <p
                className='error'
                role='alert'
              >Enter valid first name</p>
            )}

            {errors['First Name']?.type === 'required' && (
              <p
                className='error'
                role='alert'
              >First name is required</p>
            )}
          </div>

          <div className='field-wrapper'>
            <div className='field-left-shape'>
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
            </div>
            <input
              className={allWatch?.['Last Name'] && 'valid'}
              id='last_name'
              type='text'
              {...register('Last Name', {
                maxLength: 100,
                pattern: nameRegEx,
              })}
            />
            <div className='field-angle-border' />
            <label htmlFor='last_name'>Last Name <span className='field-type'>optional</span></label>

            {errors['Last Name']?.type === 'maxLength' && (
              <p
                className='error'
                role='alert'
              >Character limit exceeded</p>
            )}

            {errors['Last Name']?.type === 'pattern' && (
              <p
                className='error'
                role='alert'
              >Enter valid last Name</p>
            )}
          </div>

          <div className='field-wrapper'>
            <div className='field-left-shape'>
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
            </div>
            <input
              className={allWatch?.['Email'] && 'valid'}
              id='email'
              type='text'
              {...register('Email', {
                pattern: /^\S+@\S+$/i,
                required: true,
              })}
            />
            <div className='field-angle-border' />
            <label htmlFor='email'>Email <span className='field-type'>required</span></label>

            {errors['Email']?.type === 'pattern' && (
              <p
                className='error'
                role='alert'
              >Enter valid email</p>
            )}

            {errors['Email']?.type === 'required' && (
              <p
                className='error'
                role='alert'
              >Email is required</p>
            )}
          </div>

          <div className='field-wrapper'>
            <div className='field-left-shape'>
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
              <div className='shape-lines' />
            </div>
            <textarea
              className={allWatch?.['Message'] && 'valid'}
              id='message'
              {...register('Message', { required: true })}
            />
            <div className='field-angle-border' />
            <label htmlFor='message'>Message <span className='field-type'>required</span></label>

            {errors['Message']?.type === 'required' && (
              <p
                className='error'
                role='alert'
              >Message is required</p>
            )}
          </div>

          {isProduction && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.CONTACT_FORM_RECAPTCHA_KEY}
              size='invisible'
            />
          )}
        </fieldset>
        <Button
          isSubmit
        >Submit</Button>
      </form>
    </ContactFormStyles>
  )
}

ContactForm.propTypes = {}
export default ContactForm
