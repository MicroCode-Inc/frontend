import { Link } from 'react-router'

export default function Profile() {
  return (
    <div className='container'>
      <div className='d-flex bg-dark-subtle p-5 rounded-4 mt-4 mb-5'>
        <img
          className='img-thumbnail rounded-circle'
          src='https://placehold.co/200'
        />
        <div className='ms-5 d-flex flex-column justify-content-center'>
          <h2>User Name</h2>
          <h3 cl>Email@Address.com</h3>
          <h4 className='text-secondary'>Joined on 10/12/2024</h4>
        </div>
      </div>
      <div
        className='accordion'
        id='accordionExample'
      >
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button fs-4 collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              <span className='badge text-bg-success me-3'>8</span>
              Owned Courses
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed fs-4'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              <span className='badge text-bg-primary me-3'>8</span>
              Favourited Courses
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/courses/frontend/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button collapsed fs-4'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              <span className='badge text-bg-warning me-3'>8</span>
              Saved Blogs
            </button>
          </h2>
          <div
            id='collapseThree'
            className='accordion-collapse collapse'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='row row-cols-1 row-cols-lg-2'>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col'>
                  <Link
                    className='card mb-3 text-decoration-none bg-dark-subtle border-0 rounded-4'
                    to='/blog/0'
                  >
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src='https://placehold.co/150'
                          className='img-fluid rounded-start-4'
                          alt='...'
                        />
                      </div>
                      <div className='col'>
                        <div className='card-header border-0 bg-transparent mt-2 pb-0'>
                          <h5 className='card-title'>Card title</h5>
                        </div>
                        <div className='card-body pt-2'>
                          <p className='card-text'>
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
