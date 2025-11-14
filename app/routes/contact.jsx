import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { apiRequest } from '../utils/api'
import AsyncButton from '../components/AsyncButton'

export default function Contact() {
  const [values, setValues] = useState({
    email: '',
    messages: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleContactSubmit = async () => {
    setError(null)

    // Basic validation
    if (!values.email || !values.messages) {
      setError('All fields are required')
      throw new Error('All fields are required')
    }

    if (!values.email.includes('@')) {
      setError('Please enter a valid email address')
      throw new Error('Please enter a valid email address')
    }

    const response = await apiRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit message')
    }

    // Success! Show success message
    setSuccess(true)
    setValues({ email: '', messages: '' })

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <div className='container align-self-center page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <form
            className='card border-0 bg-secondary bg-opacity-90 p-4 rounded-4'
          >
            <div className='card-header border-0 bg-transparent'>
              <p className='display-5'>Contact Us</p>
              <p className='fs-5 mb-0'>We appreciate your feedback!</p>
            </div>

            <div className='card-body'>
              {error && (
                <div
                  className='alert alert-danger animate-shake'
                  role='alert'
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className='alert alert-success animate-fade-in'
                  role='alert'
                >
                  Thank you! Your message has been sent successfully.
                  Redirecting...
                </div>
              )}

              <div className='form-floating mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='floatingInput'
                  name='email'
                  placeholder='name@example.com'
                  value={values.email}
                  onChange={handleChange}
                  required
                  disabled={success}
                />
                <label htmlFor='floatingInput'>Email Address</label>
              </div>

              <div className='form-floating'>
                <textarea
                  className='form-control'
                  placeholder='Enter your message here'
                  id='floatingTextarea'
                  name='messages'
                  style={{ height: '6rem' }}
                  value={values.messages}
                  onChange={handleChange}
                  required
                  disabled={success}
                ></textarea>
                <label htmlFor='floatingTextarea'>Message</label>
              </div>
            </div>

            <div className='card-footer border-0 bg-transparent text-end pt-0'>
              <Link
                className='btn btn-danger me-2'
                to='/'
              >
                Cancel
              </Link>
              <AsyncButton
                onClick={handleContactSubmit}
                loadingText='Submitting...'
                className='btn btn-success'
                type='button'
                disabled={success}
                onError={(err) => setError(err.message || 'An error occurred. Please try again.')}
              >
                Submit
              </AsyncButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
