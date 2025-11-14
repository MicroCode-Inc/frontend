import { Link } from 'react-router'
import { faChevronLeft, faChevronRight } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useMemo, useCallback } from 'react'

export default function Carousel({ items }) {
  const [isLarge, setIsLarge] = useState(false)

  const handleResize = useCallback(() => {
    setIsLarge(window.innerWidth >= 992)
  }, [])

  useEffect(() => {
    handleResize()

    let timeoutId
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [handleResize])

  const slides = useMemo(() => {
    return isLarge
      ? items.reduce((acc, item, i) => {
          if (i % 2 === 0) acc.push([item])
          else acc[acc.length - 1].push(item)
          return acc
        }, [])
      : items.map(item => [item])
  }, [items, isLarge])

  return (
    <div className='position-relative w-100 px-4'>
      <div
        key={isLarge ? 'lg' : 'sm'}
        id='carouselInterval'
        className='carousel slide'
        data-bs-ride='carousel'
      >
        <div className='carousel-inner px-4'>
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
                      className='card carousel-card-hover border-0 bg-light text-decoration-none rounded-4 d-block'
                      to={`/blog/${isLarge ? i * 2 + j : i}`}
                    >
                      <div className='row g-0'>
                        <div className='col-auto'>
                          <img
                            src={
                              item.image_url || 'https://placehold.co/200x200'
                            }
                            className='img-fluid rounded-start-4 h-100'
                            alt={item.image_alt || item.title}
                            loading='lazy'
                            decoding='async'
                            style={{
                              width: '200px',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        <div className='col'>
                          <div className='card-body py-2'>
                            <div className='d-flex'>
                              <h5 className='mb-1'>{item.title}</h5>
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
      <div
        className='h-100 position-absolute top-50 translate-middle-y d-flex align-items-center'
        style={{ left: '0.5rem' }}
      >
        <button
          className='btn btn-outline-secondary border-0 p-1 py-3 d-grid align-items-center'
          type='button'
          data-bs-target='#carouselInterval'
          data-bs-slide='prev'
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='fs-5 text-bg-body'
          />
        </button>
      </div>
      <div
        className='h-100 position-absolute top-50 translate-middle-y d-flex align-items-center'
        style={{ right: '0.5rem' }}
      >
        <button
          className='btn btn-outline-secondary border-0 p-1 py-3  d-grid align-items-center'
          type='button'
          data-bs-target='#carouselInterval'
          data-bs-slide='next'
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className='fs-5 text-bg-body'
          />
        </button>
      </div>
    </div>
  )
}
