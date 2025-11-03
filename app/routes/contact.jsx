import { Form, Link } from 'react-router'

export default function Contact() {
  return (
    <div className='container align-self-center page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <div className='card border-0 bg-dark-subtle p-4 rounded-4'>
            <div className='card-header border-0 bg-transparent'>
              <p className='display-5'>Contact Us</p>
              <p className='fs-5 mb-0'>We appreciate your feedback!</p>
            </div>
            <Form>
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

                <div class='form-floating'>
                  <textarea
                    class='form-control'
                    placeholder='Enter your message here'
                    id='floatingTextarea'
                    style={{ height: '6rem' }}
                  ></textarea>
                  <label for='floatingTextarea'>Message</label>
                </div>
              </div>
              <div className='card-footer border-0 bg-transparent text-end pt-0'>
                <Link
                  className='btn btn-danger me-2'
                  to='/'
                >
                  Cancel
                </Link>
                <button className='btn btn-success'>Submit</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
