import { useState } from 'react'
import { Form, Link } from 'react-router'

export default function Login() {
  const [signupMode, setSignupMode] = useState(false)

  const toggleSignup = () => {
    setSignupMode(e => !e)
  }

  return (
    <div className='container align-self-center page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <Form className='card border-0 bg-dark-subtle p-4 rounded-4'>
            <div className='card-header border-0 bg-transparent'>
              <p className='display-5 mb-3'>
                {signupMode ? 'Sign Up' : 'Login'}
              </p>
              <p className='fs-5 my-0'>
                {signupMode
                  ? 'Please enter a unqiue email and strong password'
                  : 'Please login or sign up to access your dashboard'}
              </p>
            </div>
            <div className='card-body'>
              <div className='form-floating mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='floatingInput'
                  placeholder='name@example.com'
                  required
                />
                <label htmlFor='floatingInput'>Email Address</label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  type='password'
                  className='form-control'
                  id='floatingPassword'
                  placeholder='Password'
                  required
                />
                <label htmlFor='floatingPassword'>Password</label>
              </div>
              {signupMode && (
                <div className='form-floating mb-3'>
                  <input
                    type='retypePassword'
                    className='form-control'
                    id='floatingRetypePassword'
                    placeholder='Retype Password'
                    required
                  />
                  <label htmlFor='floatingRetypePassword'>
                    Retype Password
                  </label>
                </div>
              )}
              <div className='card-footer border-0 bg-transparent p-0 d-flex align-items-center'>
                <Link>Forgot Password</Link>
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
