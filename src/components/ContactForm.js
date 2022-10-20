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
    formState: { errors },
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
          {errors['First Name']?.type === 'maxLength' && <p role='alert'>Character limit exceeded</p>}
          {errors['First Name']?.type === 'pattern' && <p role='alert'>Enter valid first name</p>}
          {errors['First Name']?.type === 'required' && <p role='alert'>First name is required</p>}
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
          {errors['Last Name']?.type === 'maxLength' && <p role='alert'>Character limit exceeded</p>}
          {errors['Last Name']?.type === 'pattern' && <p role='alert'>Enter valid last Name</p>}
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
          {errors['Email']?.type === 'pattern' && <p role='alert'>Enter valid email</p>}
          {errors['Email']?.type === 'required' && <p role='alert'>Email is required</p>}
        </div>

        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            {...register('Message', { required: true })}
          />
          {errors['Message']?.type === 'required' && <p role='alert'>Message is required</p>}
        </div>

        {isDev ? (
          <div
            style={{
              alignItems: 'center',
              border: 'solid 2px var(--primary-color)',
              display: 'flex',
              height: '78px',
              justifyContent: 'center',
              width: '304px',
            }}
          >
            <p style={{ margin: 0 }}>reCaptcha Goes Here</p>
          </div>
        ) : (
          <ReCAPTCHA
            sitekey={process.env.CONTACT_FORM_RECAPTCHA_KEY}
            size='compact'
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
