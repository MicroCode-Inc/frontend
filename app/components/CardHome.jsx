import { Link } from 'react-router'

export default function CardHome({
  imgUrl = 'https://placehold.co/50',
  imgAlt = 'img',
  title = 'Card Title',
  tags,
  to = '#'
}) {
  return (
    <div className='col'>
      <Link
        to={to}
        className='text-decoration-none'
      >
        <div className='card card-hover-effect rounded-4 overflow-hidden'>
          <div className='card-img-container'>
            <img
              src={imgUrl}
              alt={imgAlt}
              className='card-img'
            />
            <div className='card-img-overlay text-dark d-flex flex-column p-3'>
              {/* <span className='card-title text-capitalize h5 text-'>
                {title}
              </span> */}
              <div className='mt-auto'>
                {tags &&
                  tags.length > 0 &&
                  tags.slice(0, 3).map((tag, i) => (
                    <span
                      className={'me-1 badge'}
                      style={{ background: tag.color || '#6c757d' }}
                      key={i}
                    >
                      {tag.label || tag.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
