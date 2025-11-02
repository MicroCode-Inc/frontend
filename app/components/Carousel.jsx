import { Link } from 'react-router'
import { faChevronLeft, faChevronRight } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDateShort } from '../utils/helpers'
import { useState, useEffect } from 'react'

export default function Carousel({ items }) {
  const [isLarge, setIsLarge] = useState(false)

  useEffect(() => {
    setIsLarge(window.innerWidth >= 992)
    const handleResize = () => setIsLarge(window.innerWidth >= 992)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slides = isLarge
    ? items.reduce((acc, item, i) => {
        if (i % 2 === 0) acc.push([item])
        else acc[acc.length - 1].push(item)
        return acc
      }, [])
    : items.map(item => [item])

  return (
    <div className='position-relative'>
      <div
        key={isLarge ? 'lg' : 'sm'}
        id='carouselInterval'
        className='carousel slide'
        data-bs-ride='carousel'
      >
        <div className='carousel-inner'>
          {slides.map((group, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? 'active' : ''}`}
              data-bs-interval='5000'
            >
              <div className='row row-cols-1 row-cols-lg-2 g-3'>
                {group.map((item, j) => (
                  <div
                    key={j}
                    className='col'
                  >
                    <Link
                      className='card border-0 bg-dark-subtle text-decoration-none rounded-4 d-block'
                      to={`/blog/${isLarge ? i * 2 + j : i}`}
                    >
                      <div className='row g-0'>
                        <div className='col-auto'>
                          <img
                            src='https://placehold.co/175'
                            className='img-fluid rounded-start-4 h-100'
                            alt={item.title}
                          />
                        </div>
                        <div className='col'>
                          <div className='card-body py-2'>
                            <div className='d-flex'>
                              <h5 className='mb-1'>{item.title}</h5>
                              <span className='ms-auto text-secondary'>
                                {formatDateShort(item.publication_date)}
                              </span>
                            </div>
                            <h6 className='mb-2'>{item.author_name}</h6>
                            <p className='mb-0'>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className='btn btn-outline-secondary border-0 p-1 py-3 position-absolute top-50 start-0 translate-middle-y d-grid align-items-center'
        style={{ marginLeft: '-2rem' }}
        type='button'
        data-bs-target='#carouselInterval'
        data-bs-slide='prev'
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='fs-4 text-bg-body'
        />
      </button>

      <button
        className='btn btn-outline-secondary border-0 p-1 py-3 position-absolute top-50 end-0 translate-middle-y d-grid align-items-center'
        style={{ marginRight: '-2rem' }}
        type='button'
        data-bs-target='#carouselInterval'
        data-bs-slide='next'
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className='fs-4 text-bg-body'
        />
      </button>
    </div>
  )
}
