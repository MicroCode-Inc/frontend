export default function CardHome({
  imgUrl = 'https://placehold.co/50',
  imgAlt = 'img',
  title = 'Card Title',
  tags
}) {
  return (
    <div className='col'>
      <div className='card'>
        <div className='card-img-container'>
          <img
            src={imgUrl}
            alt={imgAlt}
            className='card-img'
          />
          <div className='card-img-overlay text-dark d-flex flex-column p-2'>
            <span className='card-title text-capitalize h5'>{title}</span>
            <div className='mt-auto'>
              {tags.map(({ label, color }, i) => (
                <span
                  className={'me-1 badge'}
                  style={{ background: color }}
                  key={i}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
