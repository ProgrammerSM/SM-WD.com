// Modules
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import {
  useEffect,
  useState,
} from 'react'

// Components
import Button from './Button'
import ReCAPTCHA from 'react-google-recaptcha'

// Variables
const isDev = process.env.NODE_ENV === 'development'

const ContactForm = () => {
  const nameRegEx = /^[A-Za-zÀ-ÿ-,.']+$/
  const [recaptchaValue, setRecaptchaValue] = useState(null)
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = data => {
    const formData = new FormData()
    Object.keys(data).forEach(key => { formData.append(key, data[key]) })
    formData.append('g-recaptcha-response', recaptchaValue)

    fetch(process.env.FORMSPREE_CONTACT_FORM, {
      body: formData,
      headers: { Accept: 'application/json' },
      method: 'POST',
    }).then(response => {
      if (response.ok)
        console.log('success')
      else
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors'))
            console.error(data['errors'].map(error => error['message']).join(', '))
          else
            console.error('Oops! There was a problem submitting your form')
        })
    }).catch(() => {
      console.error('Oops! There was a problem submitting your form')
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const form = document.querySelector('form')
      form && form.reset()
    }
  }, [])

  return (
    <form
      name='sm-wd-contact'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type='hidden'
        value='New Contact Submission from {{Email}}'
        {...register('Subject')}
      />

      <fieldset>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input
            id='first_name'
            type='text'
            {...register('First Name', {
              maxLength: 80,
              pattern: nameRegEx,
              required: true,
            })}
          />
        </div>

        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input
            id='last_name'
            type='text'
            {...register('Last Name', {
              maxLength: 100,
              pattern: nameRegEx,
            })}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            {...register('Email', {
              pattern: /^\S+@\S+$/i,
              required: true,
            })}
          />
        </div>

        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            {...register('Message', { required: true })}
          />
        </div>

        {!isDev && (
          <ReCAPTCHA
            sitekey={process.env.CONTACT_FORM_RECAPTCHA_KEY}
            onChange={setRecaptchaValue}
          />
        )}
      </fieldset>
      <Button
        isSubmit
      >Submit</Button>
    </form>
  )
}

ContactForm.propTypes = {}
export default ContactForm
