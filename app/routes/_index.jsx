export default function Home() {
  return (
    <>
      <div>
        <h1>BIEMVENIDO</h1>
      </div>
      <div>
        <h2 className='text-capitalize mt-3'>cursos</h2>
        <div className='card-group'>
          <div className='card'>
            <img
              src='https://placehold.co/50'
              class='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Html</h5>
              <p className='card-text'>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>Last updated ago</small>
            </div>
          </div>
          <div className='card'>
            <img
              src='https://placehold.co/50'
              class='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Css</h5>
              <p className='card-text'>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>Last updated ago</small>
            </div>
          </div>
          <div className='card'>
            <img
              src='https://placehold.co/50'
              class='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>Javascript</h5>
              <p className='card-text'>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>Last updated ago</small>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-capitalize mt-5'>blog</h2>
        <div
          id='carouselInterval'
          className='carousel slide'
          data-bs-ride='carousel'
        >
          <div className='carousel-inner'>
            <div
              className='carousel-item active'
              data-bs-interval='10000'
            >
              <img
                src='https://placehold.co/100'
                class='d-block w-100'
                alt='...'
              />
            </div>
            <div
              className='carousel-item'
              data-bs-interval='2000'
            >
              <img
                src='https://placehold.co/150'
                class='d-block w-100'
                alt='...'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='https://placehold.co/120'
                class='d-block w-100'
                alt='...'
              />
            </div>
          </div>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carouselInterval'
            data-bs-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carouselInterval'
            data-bs-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      </div>
    </>
  )
}
