import { Form, Link } from 'react-router'

export default function Login() {
  return (
    <div className='container align-self-center'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <Form className='card border-0 bg-dark-subtle py-3 px-2'>
            <div className='card-header border-0 bg-transparent'>
              <p className='display-5 mb-3'>Welcome</p>
              <p className='fs-5 my-0'>
                Please login or sign up to access your dashboard
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
              <div className='card-footer border-0 bg-transparent p-0 d-flex align-items-center'>
                <Link>Forgot Password</Link>
                <button
                  className='btn btn-primary ms-auto'
                  type='button'
                >
                  Sign Up
                </button>
                <button
                  className='btn btn-success ms-2'
                  type='submit'
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
