// app/routes/login.jsx
import { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../utils/api'

export default function Login() {
  const [signupMode, setSignupMode] = useState(false)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()

  // Redirect to logout page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/logout', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const toggleSignup = () => {
    setSignupMode(e => !e)
    setError(null)
  }

  const handleChange = e => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    if (signupMode) {
      if (
        !values.username ||
        !values.email ||
        !values.password ||
        !values.retypePassword
      ) {
        setError('All fields are required')
        return
      }
      if (values.password !== values.retypePassword) {
        setError('Passwords do not match')
        return
      }
      if (values.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
    }

    const endpoint = signupMode ? '/signup' : '/login'
    const body = signupMode
      ? {
          username: values.username,
          email: values.email,
          password: values.password
        }
      : { email: values.email, password: values.password }

    try {
      const res = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(body)
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || (signupMode ? 'Signup failed' : 'Login failed'))
        return
      }

      login(json.token, json.user)

      await new Promise(resolve => setTimeout(resolve, 100))

      navigate('/', { replace: true })
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  return (
    <div className='container align-self-center page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <Form
            className='card border-0 bg-secondary bg-opacity-90 p-4 rounded-4'
            onSubmit={handleSubmit}
          >
            <div className='card-header border-0 bg-transparent'>
              <p className='display-5 mb-3'>
                {signupMode ? 'Sign Up' : 'Login'}
              </p>
              <p className='fs-5 my-0'>
                {signupMode
                  ? 'Please enter a unique email and strong password'
                  : 'Please login or sign up to access your dashboard'}
              </p>
            </div>
            <div className='card-body'>
              {error && <div className='alert alert-danger'>{error}</div>}

              {signupMode && (
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='floatingUsername'
                    name='username'
                    placeholder='Username'
                    value={values.username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingUsername'>Username</label>
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
                />
                <label htmlFor='floatingInput'>Email Address</label>
              </div>

              <div className='form-floating mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='floatingPassword'
                  name='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor='floatingPassword'>Password</label>
              </div>

              {signupMode && (
                <div className='form-floating mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='floatingRetypePassword'
                    name='retypePassword'
                    placeholder='Retype Password'
                    value={values.retypePassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='floatingRetypePassword'>
                    Retype Password
                  </label>
                </div>
              )}

              <div className='card-footer border-0 bg-transparent p-0 d-flex align-items-center'>
                <Link to='/forgot-password'>Forgot Password</Link>
                <button
                  className={`ms-auto btn btn-${
                    signupMode ? 'danger' : 'primary'
                  }`}
                  type='button'
                  onClick={toggleSignup}
                >
                  {signupMode ? 'Cancel' : 'Sign Up'}
                </button>
                <button
                  className='btn btn-success ms-2'
                  type='submit'
                >
                  {signupMode ? 'Submit' : 'Login'}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
